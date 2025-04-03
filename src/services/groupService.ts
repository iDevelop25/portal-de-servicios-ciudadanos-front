// src/services/groupService.ts
import axios from "axios"
import { ServiceGroup } from "../types/group.types"
import { env } from "../config/env"

// Clase para servicios relacionados con los grupos de servicios
class GroupService {
	private getApiBaseUrl(): string {
		// Obtener la URL base dependiendo del entorno
		return env.GROUP_API_URL || "http://10.101.5.61:8082/api/master/group"
	}

	// Método para obtener todos los grupos
	async getGroups(): Promise<ServiceGroup[]> {
		try {
			// Usar la ruta del proxy
			const response = await axios.get<ServiceGroup[]>(this.getApiBaseUrl())

			// Verificamos si la respuesta es válida
			if (response.status === 200 && Array.isArray(response.data)) {
				// Modificar las URLs de las imágenes agregando el host
				return response.data.map((group) => ({
					...group,
					// Agregamos el host a la URL de la imagen si es una ruta relativa
					imagenUrl: group.imagenUrl.startsWith("/")
						? `${env.API_HOST || "http://10.101.5.61:8082"}${group.imagenUrl}`
						: group.imagenUrl,
				}))
			}

			console.error("Error en formato de respuesta de grupos:", response)
			return []
		} catch (error) {
			console.error("Error al obtener grupos:", error)
			// En caso de error, retornamos un array vacío
			return []
		}
	}
}

// Exportamos una instancia del servicio
export const groupService = new GroupService()
