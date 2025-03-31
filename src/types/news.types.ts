/**
 * Interfaz para un ítem de novedad o noticia
 */
export interface NewsItem {
	id: string
	title: string
	subtitle?: string
	content: string
	date: string // Formato ISO: YYYY-MM-DD
	entityName?: string
	entityLogo?: string
	imageUrl?: string
}

/**
 * Props para el componente ServiceNews
 */
export interface ServiceNewsProps {
	title?: string
	className?: string
	showNavigation?: boolean
	autoplay?: boolean
	autoplayInterval?: number
}

/**
 * Respuesta de la API para novedades
 */
export interface NewsApiResponse {
	items: NewsItem[]
	total: number
}
