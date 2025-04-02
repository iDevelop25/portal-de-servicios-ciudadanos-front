import axios from "axios"

// Usar la URL base directamente para evitar los problemas de tipado
const TRAMITES_API_URL =
	import.meta.env.VITE_APP_TRAMITES_API_URL ||
	"http://10.101.5.61:8082/api/master/tramites"

export interface TramiteItem {
	id?: string
	uniqueId: number
	nombreDeLaOferta: string
	gdescripcion: string
	tituloSeo?: string
	tipologia: string
	canal?: string
	tiempoDeObtencion?: string
	productoFinal?: string
	tieneCosto?: string
	urlTramiteLinea?: string
}

export interface TramitesApiResponse {
	content: TramiteItem[]
	totalElements: number
	totalPages: number
	size: number
	number: number
}

export type TramiteTipologia =
	| "consulta_informacion"
	| "otros_proced_admini"
	| "servicio"
	| "tramite_unico"
	| ""

/**
 * Servicio para obtener trámites y servicios
 */
class TramitesService {
	/**
	 * Obtiene trámites y servicios con paginación y filtrado
	 * @param tipologia Tipología para filtrar (opcional)
	 * @param page Número de página (comienza en 0)
	 * @param size Tamaño de página
	 */
	async getTramites(
		tipologia: TramiteTipologia = "",
		page: number = 0,
		size: number = 20
	): Promise<TramitesApiResponse> {
		try {
			// Construir los parámetros de consulta
			const params: Record<string, string | number> = {
				page,
				size,
			}

			// Añadir tipología solo si se proporciona
			if (tipologia) {
				params.tipologia = tipologia
			}

			// Usar la URL base definida
			const response = await axios.get<TramitesApiResponse>(TRAMITES_API_URL, {
				params,
			})

			return response.data
		} catch (error) {
			console.error("Error al obtener trámites:", error)
			// Devolver un objeto vacío en caso de error
			return {
				content: [],
				totalElements: 0,
				totalPages: 0,
				size,
				number: page,
			}
		}
	}

	/**
	 * Obtiene un trámite específico por su ID
	 * @param id ID único del trámite
	 */
	async getTramiteById(id: number): Promise<TramiteItem | null> {
		try {
			const response = await axios.get<TramiteItem>(`${TRAMITES_API_URL}/${id}`)
			return response.data
		} catch (error) {
			console.error(`Error al obtener trámite con ID ${id}:`, error)
			return null
		}
	}
}

export const tramitesService = new TramitesService()
