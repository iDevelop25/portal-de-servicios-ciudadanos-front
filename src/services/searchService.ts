// Archivo: src/services/searchService.ts

import { SearchResult, ApiSearchResult } from "../types/search.types"
import axios from "axios"

/**
 * Servicio para la búsqueda predictiva
 */
export const searchService = {
	/**
	 * Busca resultados que coincidan con la consulta proporcionada
	 * @param query Texto de búsqueda
	 * @returns Promesa con los resultados de búsqueda
	 */
	search: async (query: string): Promise<SearchResult[]> => {
		try {
			// Usar la ruta del proxy en lugar de la URL completa
			const response = await axios.get<ApiSearchResult[]>(
				`/api/master/search?query=${encodeURIComponent(query)}`
			)

			// Transformar los resultados al formato que espera nuestra aplicación
			return response.data.map((item) => {
				const type = mapTipologiaToType(item.tipologia)

				// Determinar la URL según el tipo
				const url = determineUrl(type, item.uniqueId)

				return {
					id: item.uniqueId.toString(),
					title: item.nombreOferta,
					type,
					description: item.descripcion,
					url,
				}
			})
		} catch (error) {
			console.error("Error al realizar la búsqueda:", error)
			// Retornar array vacío en caso de error
			return []
		}
	},
}

/**
 * Mapea la tipología de la API al tipo esperado por la aplicación
 */
function mapTipologiaToType(tipologia: string): string {
	switch (tipologia.toLowerCase()) {
		case "servicio":
			return "servicio"
		case "tramite":
		case "tramite_unico":
			return "tramite"
		default:
			return tipologia.toLowerCase()
	}
}

/**
 * Determina la URL adecuada según el tipo y el ID
 */
function determineUrl(type: string, id: number | string): string {
	switch (type) {
		case "servicio":
			return `/servicios/servicio-${id}`
		case "tramite":
			return `/tramites/tramite-${id}`
		default:
			return `/servicios/${id}`
	}
}
