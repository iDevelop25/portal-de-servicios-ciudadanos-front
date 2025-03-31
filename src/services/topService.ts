import axios from "axios"
import { TopItem } from "../types/top.types"
import { env } from "../utils/env"

/**
 * URL base del endpoint de Top Consultados
 * Se obtiene de las variables de entorno según el ambiente (development, staging, production)
 */
const TOP_API_URL = env.get(
	"TOP_API_URL",
	"http://10.101.5.61:8082/api/master/top"
)

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
			const response = await axios.get<TopItem[]>(TOP_API_URL)

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
