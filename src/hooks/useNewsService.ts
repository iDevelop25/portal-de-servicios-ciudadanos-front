import { useState, useCallback } from "react"
import useApi from "./useApi"
import { NewsItem } from "../types/news.types"

// Datos de ejemplo para desarrollo
const mockNewsItems: NewsItem[] = [
	{
		id: "news-1",
		title: "Secretaría Distrital de Ambiente - Red CADE",
		subtitle: "SECRETARÍA DISTRITAL DE AMBIENTE - SDA",
		content:
			"Información importante sobre los nuevos horarios de atención en la red CADE para trámites ambientales.",
		date: "2025-03-31", // Lunes 31 de Marzo
		entityName: "Secretaría Distrital de Ambiente",
	},
	{
		id: "news-2",
		title: "Mantenimiento Sistema de Turnos",
		subtitle: "SECRETARÍA GENERAL",
		content:
			"El sistema de turnos estará en mantenimiento durante el fin de semana. Disculpe las molestias.",
		date: "2025-04-01", // Martes 1 de Abril
		entityName: "Secretaría General",
	},
	{
		id: "news-3",
		title: "Nuevos trámites en línea disponibles",
		subtitle: "SECRETARÍA DE GOBIERNO DIGITAL",
		content:
			"A partir de hoy, podrá realizar más trámites en línea sin necesidad de desplazarse a las oficinas.",
		date: "2025-04-02", // Miércoles 2 de Abril
		entityName: "Secretaría de Gobierno Digital",
	},
]

// Variable para determinar si usamos datos simulados o API real
const USE_MOCK_DATA = true

/**
 * Hook personalizado para gestionar las operaciones relacionadas con las noticias/novedades
 */
const useNewsService = () => {
	const api = useApi()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	/**
	 * Obtiene la lista de novedades
	 * @param limit Número máximo de novedades a obtener
	 * @returns Lista de novedades
	 */
	const getNews = useCallback(
		async (limit?: number): Promise<NewsItem[]> => {
			setLoading(true)
			setError(null)

			try {
				// Si usamos datos simulados, devolvemos los datos de ejemplo
				if (USE_MOCK_DATA) {
					// Simular una demora para que sea más realista
					await new Promise((resolve) => setTimeout(resolve, 500))
					const result = limit ? mockNewsItems.slice(0, limit) : mockNewsItems
					return result
				}

				// Si usamos la API real
				const response = await api.get<NewsItem[]>("/news", {
					params: limit ? { limit: limit.toString() } : undefined,
				})

				if (!response.success) {
					setError(response.message || "Error al obtener las novedades")
					return []
				}

				return response.data || []
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : "Error desconocido"
				setError(`Error al obtener novedades: ${errorMessage}`)
				console.error("Error al obtener novedades:", err)
				return []
			} finally {
				setLoading(false)
			}
		},
		[api]
	)

	/**
	 * Obtiene una novedad por su ID
	 * @param id ID de la novedad
	 * @returns Novedad encontrada o null
	 */
	const getNewsById = useCallback(
		async (id: string): Promise<NewsItem | null> => {
			setLoading(true)
			setError(null)

			try {
				// Si usamos datos simulados, buscamos en los datos de ejemplo
				if (USE_MOCK_DATA) {
					// Simular una demora para que sea más realista
					await new Promise((resolve) => setTimeout(resolve, 300))
					return mockNewsItems.find((news) => news.id === id) || null
				}

				// Si usamos la API real
				const response = await api.get<NewsItem>(`/news/${id}`)

				if (!response.success) {
					setError(
						response.message || `Error al obtener la novedad con ID ${id}`
					)
					return null
				}

				return response.data || null
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : "Error desconocido"
				setError(`Error al obtener novedad con ID ${id}: ${errorMessage}`)
				console.error(`Error al obtener novedad con ID ${id}:`, err)
				return null
			} finally {
				setLoading(false)
			}
		},
		[api]
	)

	return {
		getNews,
		getNewsById,
		loading,
		error,
	}
}

export default useNewsService
