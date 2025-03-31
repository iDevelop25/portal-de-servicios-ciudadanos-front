/**
 * Interfaz que define un ítem de Top Consultados devuelto por la API
 */
export interface TopItem {
	uniqueId: number
	nombreDeLaOferta: string
	gdescripcion: string
	tituloSeo?: string
	tipologia?: string
}

/**
 * Interfaz para la respuesta completa del endpoint de Top Consultados
 */
export interface TopApiResponse {
	items?: TopItem[]
	error?: string
}
