// src/hooks/useTramiteDetail.tsx
import { useState, useEffect } from "react"
import axios from "axios"

/**
 * Hook para obtener la información detallada de un trámite desde la API.
 * @param id Número identificador del trámite.
 * @returns { data, loading, error } donde data contiene la información del trámite.
 */
export default function useTramiteDetail(id: number) {
	const [data, setData] = useState<any | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		async function fetchTramite() {
			setLoading(true)
			try {
				// Se consume el endpoint con el id del trámite
				const response = await axios.get(
					`http://10.101.5.61:8082/api/master/tramites/${id}`
				)
				setData(response.data)
			} catch (err) {
				console.error("Error al obtener el trámite:", err)
				setError("No se pudo cargar la información del trámite.")
			} finally {
				setLoading(false)
			}
		}
		if (id) {
			fetchTramite()
		}
	}, [id])

	return { data, loading, error }
}
