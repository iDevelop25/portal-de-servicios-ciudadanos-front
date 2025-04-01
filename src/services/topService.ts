// Archivo: /Users/johannesmoreno/Downloads/portal-servicios-ciudadanos/frontend/src/services/topService.ts

import axios from "axios"
import { TopItem } from "../types/top.types"

/**
 * Clase para servicios relacionados con los trámites y servicios más consultados
 */
class TopService {
	/**
	 * Obtiene la lista de trámites y servicios más consultados
	 * @returns {Promise<TopItem[]>} Lista de elementos más consultados
	 */
	async getTopItems(): Promise<TopItem[]> {
		try {
			// Usar la ruta del proxy en lugar de la URL completa
			const response = await axios.get<TopItem[]>("/api/master/top")

			// Verificamos si la respuesta es válida
			if (response.status === 200 && Array.isArray(response.data)) {
				return response.data
			}

			console.error(
				"Error en formato de respuesta de top consultados:",
				response
			)
			return []
		} catch (error) {
			console.error("Error al obtener top consultados:", error)
			// En caso de error, retornamos un array vacío para que la aplicación no falle
			return []
		}
	}
}

// Exportamos una instancia del servicio para su uso en la aplicación
export const topService = new TopService()
