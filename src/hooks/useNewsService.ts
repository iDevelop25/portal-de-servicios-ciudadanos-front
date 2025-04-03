import { useState, useCallback } from "react"
import { NewsItem } from "../types/news.types"
import { newsService } from "../services/newsService"

/**
 * Hook personalizado para gestionar las operaciones relacionadas con las noticias/novedades
 */
const useNewsService = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	/**
	 * Obtiene la lista de novedades
	 * @param limit Número máximo de novedades a obtener
	 * @returns Lista de novedades
	 */
	const getNews = useCallback(async (limit?: number): Promise<NewsItem[]> => {
		setLoading(true)
		setError(null)

		try {
			// Usar el servicio actualizado que se conecta al backend
			const news = await newsService.getNews(limit)
			return news
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Error desconocido"
			setError(`Error al obtener novedades: ${errorMessage}`)
			console.error("Error al obtener novedades:", err)
			return []
		} finally {
			setLoading(false)
		}
	}, [])

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
				// Usar el servicio actualizado
				const newsItem = await newsService.getNewsById(id)
				return newsItem
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
		[]
	)

	/**
	 * Crea una nueva noticia
	 * @param newsData Datos de la noticia a crear
	 * @returns La noticia creada o null en caso de error
	 */
	const createNews = useCallback(
		async (newsData: Omit<NewsItem, "id">): Promise<NewsItem | null> => {
			setLoading(true)
			setError(null)

			try {
				const result = await newsService.createNews(newsData)
				return result
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : "Error desconocido"
				setError(`Error al crear noticia: ${errorMessage}`)
				console.error("Error al crear noticia:", err)
				return null
			} finally {
				setLoading(false)
			}
		},
		[]
	)

	/**
	 * Actualiza una noticia existente
	 * @param id ID de la noticia
	 * @param newsData Datos a actualizar
	 * @returns La noticia actualizada o null en caso de error
	 */
	const updateNews = useCallback(
		async (
			id: string,
			newsData: Partial<NewsItem>
		): Promise<NewsItem | null> => {
			setLoading(true)
			setError(null)

			try {
				const result = await newsService.updateNews(id, newsData)
				return result
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : "Error desconocido"
				setError(`Error al actualizar noticia: ${errorMessage}`)
				console.error("Error al actualizar noticia:", err)
				return null
			} finally {
				setLoading(false)
			}
		},
		[]
	)

	/**
	 * Elimina una noticia
	 * @param id ID de la noticia a eliminar
	 * @returns true si se eliminó correctamente
	 */
	const deleteNews = useCallback(async (id: string): Promise<boolean> => {
		setLoading(true)
		setError(null)

		try {
			const result = await newsService.deleteNews(id)
			return result
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Error desconocido"
			setError(`Error al eliminar noticia: ${errorMessage}`)
			console.error("Error al eliminar noticia:", err)
			return false
		} finally {
			setLoading(false)
		}
	}, [])

	return {
		getNews,
		getNewsById,
		createNews,
		updateNews,
		deleteNews,
		loading,
		error,
	}
}

export default useNewsService
