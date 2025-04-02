import axios from "axios"
import { NewsItem } from "../types/news.types"
import { API_URL, API_BASE_PATH } from "../config/env"

// URL base para las operaciones con noticias
const NEWS_API_URL = `${API_URL}${API_BASE_PATH}/news`

// Respuesta para datos mockeados (para fallback)
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

/**
 * Servicio para gestionar las novedades
 * Consume la API real del backend, con fallback a datos de ejemplo
 */
export const newsService = {
	/**
	 * Obtiene la lista de novedades
	 * @param limit Número máximo de novedades a obtener
	 * @returns Lista de novedades
	 */
	async getNews(limit?: number): Promise<NewsItem[]> {
		try {
			// Intentar obtener datos de la API real
			const response = await axios.get(NEWS_API_URL)

			if (response.status === 200 && response.data.success) {
				const newsData = response.data.data || []
				// Si se especifica un límite, devolvemos solo ese número de elementos
				return limit ? newsData.slice(0, limit) : newsData
			}

			throw new Error("Respuesta inválida del servidor")
		} catch (error) {
			console.error(
				"Error al obtener noticias, usando datos de ejemplo:",
				error
			)
			// Fallback a datos mockup
			const result = limit ? mockNewsItems.slice(0, limit) : mockNewsItems
			return result
		}
	},

	/**
	 * Obtiene una novedad por su ID
	 * @param id ID de la novedad
	 * @returns Novedad encontrada o null
	 */
	async getNewsById(id: string): Promise<NewsItem | null> {
		try {
			// Intentar obtener la noticia de la API real
			const response = await axios.get(`${NEWS_API_URL}/${id}`)

			if (response.status === 200 && response.data.success) {
				return response.data.data || null
			}

			throw new Error("Respuesta inválida del servidor")
		} catch (error) {
			console.error(
				`Error al obtener noticia con ID ${id}, usando datos de ejemplo:`,
				error
			)
			// Fallback a datos mockup
			return mockNewsItems.find((news) => news.id === id) || null
		}
	},

	/**
	 * Crea una nueva noticia
	 * @param newsData Datos de la noticia a crear
	 * @returns La noticia creada
	 */
	async createNews(newsData: Omit<NewsItem, "id">): Promise<NewsItem | null> {
		try {
			const response = await axios.post(NEWS_API_URL, newsData)

			if (response.status === 201 && response.data.success) {
				return response.data.data
			}

			throw new Error(response.data.message || "Error al crear la noticia")
		} catch (error) {
			console.error("Error al crear noticia:", error)
			return null
		}
	},

	/**
	 * Actualiza una noticia existente
	 * @param id ID de la noticia a actualizar
	 * @param newsData Datos a actualizar
	 * @returns La noticia actualizada
	 */
	async updateNews(
		id: string,
		newsData: Partial<NewsItem>
	): Promise<NewsItem | null> {
		try {
			const response = await axios.put(`${NEWS_API_URL}/${id}`, newsData)

			if (response.status === 200 && response.data.success) {
				return response.data.data
			}

			throw new Error(response.data.message || "Error al actualizar la noticia")
		} catch (error) {
			console.error(`Error al actualizar noticia con ID ${id}:`, error)
			return null
		}
	},

	/**
	 * Elimina una noticia (soft delete)
	 * @param id ID de la noticia a eliminar
	 * @returns true si se eliminó correctamente
	 */
	async deleteNews(id: string): Promise<boolean> {
		try {
			const response = await axios.delete(`${NEWS_API_URL}/${id}`)

			if (response.status === 200 && response.data.success) {
				return true
			}

			throw new Error(response.data.message || "Error al eliminar la noticia")
		} catch (error) {
			console.error(`Error al eliminar noticia con ID ${id}:`, error)
			return false
		}
	},
}
