import { useState, useEffect } from "react"
import { TopItem } from "../types/top.types"
import { Tramite } from "../types/service.types"
import { topService } from "../services/topService"
import { getIconForTramite } from "../utils/iconUtils"

/**
 * Hook personalizado para obtener y transformar los elementos más consultados
 * @param {number} limit - Número máximo de elementos a obtener
 * @returns Objeto con los trámites más consultados y estado de carga
 */
export function useTopItems(limit = 6) {
	const [tramites, setTramites] = useState<Tramite[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchTopItems = async () => {
			setLoading(true)
			try {
				const topItems = await topService.getTopItems()

				// Transformamos los elementos de la API al formato que necesita nuestro componente
				const mappedTramites = topItems.slice(0, limit).map(mapTopItemToTramite)

				setTramites(mappedTramites)
				setError(null)
			} catch (err) {
				console.error("Error al obtener trámites más consultados:", err)
				setError("No se pudieron cargar los trámites más consultados")
			} finally {
				setLoading(false)
			}
		}

		fetchTopItems()
	}, [limit])

	return { tramites, loading, error }
}

/**
 * Convierte un elemento de la API a nuestro formato de Trámite
 * @param {TopItem} item - Elemento de la API
 * @returns {Tramite} Trámite formateado para nuestro componente
 */
function mapTopItemToTramite(item: TopItem): Tramite {
	// Convertimos el ID numérico a string para nuestro formato
	const id = `tramite-${item.uniqueId}`

	// Construimos la URL del trámite
	const link = `/tramites/${id}`

	// Obtenemos un ícono adecuado según el título o tipo del trámite
	const icon = getIconForTramite(item.nombreDeLaOferta)

	return {
		id,
		title: item.nombreDeLaOferta,
		description: item.gdescripcion,
		icon,
		link,
	}
}
