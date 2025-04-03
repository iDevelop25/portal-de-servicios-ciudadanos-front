// src/hooks/useTramiteDetail.ts
import { useState, useEffect } from "react"
import { tramitesService, TramiteItem } from "../services/tramitesService"

/**
 * Hook personalizado para obtener detalles de un trámite
 * @param id ID único del trámite
 * @returns Objeto con datos del trámite, estado de carga y error
 */
function useTramiteDetail(id: number) {
	const [data, setData] = useState<TramiteItem | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchTramiteDetail = async () => {
			try {
				setLoading(true)
				const tramiteData = await tramitesService.getTramiteById(id)

				if (tramiteData) {
					setData(tramiteData)
					setError(null)
				} else {
					setError("No se pudo encontrar información para este trámite")
				}
			} catch (err) {
				const errorMessage =
					err instanceof Error
						? err.message
						: "Error al cargar los detalles del trámite"
				console.error(`Error al obtener detalles del trámite ${id}:`, err)
				setError(errorMessage)
			} finally {
				setLoading(false)
			}
		}

		if (id) {
			fetchTramiteDetail()
		} else {
			setError("ID de trámite no válido")
			setLoading(false)
		}
	}, [id])

	return { data, loading, error }
}

export default useTramiteDetail
