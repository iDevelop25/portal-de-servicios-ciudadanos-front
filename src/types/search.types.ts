// Mantener los tipos existentes
export interface SearchResult {
	id: string
	title: string
	type: string
	url?: string
	description?: string
}

// Añadir el nuevo tipo para la respuesta de la API
export interface ApiSearchResult {
	uniqueId: string
	nombreOferta: string
	descripcion: string
	tituloSeo: string
	tipologia: string
}
