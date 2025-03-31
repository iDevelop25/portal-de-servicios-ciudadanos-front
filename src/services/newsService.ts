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

/**
 * Servicio para gestionar las novedades
 * Actualmente utiliza datos de ejemplo, pero está preparado para conectarse a un backend
 */
export const newsService = {
	/**
	 * Obtiene la lista de novedades
	 * @param limit Número máximo de novedades a obtener
	 * @returns Lista de novedades
	 */
	async getNews(limit?: number): Promise<NewsItem[]> {
		// Simulamos una llamada a API con un delay
		return new Promise((resolve) => {
			setTimeout(() => {
				const result = limit ? mockNewsItems.slice(0, limit) : mockNewsItems
				resolve(result)
			}, 500)
		})
	},

	/**
	 * Obtiene una novedad por su ID
	 * @param id ID de la novedad
	 * @returns Novedad encontrada o null
	 */
	async getNewsById(id: string): Promise<NewsItem | null> {
		// Simulamos una llamada a API con un delay
		return new Promise((resolve) => {
			setTimeout(() => {
				const item = mockNewsItems.find((news) => news.id === id) || null
				resolve(item)
			}, 300)
		})
	},
}
