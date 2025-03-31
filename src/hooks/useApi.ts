import axios from "axios"
import { ApiResponse, ApiConfig, ApiError } from "../types/api.types"
import { API_URL, API_BASE_PATH } from "../config/env"

// Tipo para datos de respuesta desconocidos
type UnknownResponseData = Record<string, unknown>

// Interfaz para tipado de errores de axios sin depender de AxiosError
interface ErrorWithResponse {
	response?: {
		data?: unknown
		status?: number
	}
	message?: string
	request?: unknown
}

/**
 * Hook para manejar las peticiones HTTP
 */
const useApi = () => {
	// Crear instancia de axios con configuración base
	const apiClient = axios.create({
		baseURL: `${API_URL}${API_BASE_PATH}`,
		headers: {
			"Content-Type": "application/json",
		},
	})

	// Transformación simple para asegurarse de que la respuesta tenga la propiedad 'success'
	const transformResponse = <T>(response: unknown): ApiResponse<T> => {
		// Primero convertimos a un objeto con propiedades desconocidas
		const data = response as UnknownResponseData

		// Si ya tiene propiedad success, asumimos que ya es ApiResponse
		if (typeof data.success === "boolean") {
			return data as unknown as ApiResponse<T>
		}

		// Si no, construimos una respuesta adecuada
		return {
			success: true,
			data: data as unknown as T,
		}
	}

	/**
	 * Función para crear un objeto ApiError a partir de un error
	 */
	const createApiError = (error: unknown): ApiError => {
		// Comprobación si parece un error de Axios
		if (error && typeof error === "object" && "response" in error) {
			// Convertir a nuestro tipo ErrorWithResponse
			const axiosError = error as ErrorWithResponse

			// Extraer datos de respuesta si existen
			const responseData = axiosError.response?.data as
				| UnknownResponseData
				| undefined

			// Mensaje del error
			const errorMessage =
				axiosError.message || "Error al conectar con el servidor"

			// Mensaje de la respuesta si existe
			const responseMessage =
				responseData && typeof responseData.message === "string"
					? responseData.message
					: undefined

			return {
				success: false,
				message: responseMessage || errorMessage,
				errors:
					responseData && "errors" in responseData
						? (responseData.errors as unknown[])
						: undefined,
			}
		}

		// Si es un error normal
		if (error instanceof Error) {
			return {
				success: false,
				message: error.message,
			}
		}

		// Si no sabemos qué tipo de error es
		return {
			success: false,
			message: "Error desconocido",
		}
	}

	/**
	 * Método GET
	 */
	const get = async <T>(
		url: string,
		config?: ApiConfig
	): Promise<ApiResponse<T>> => {
		try {
			const response = await apiClient.get(url, config)
			return transformResponse<T>(response.data)
		} catch (error: unknown) {
			return createApiError(error)
		}
	}

	/**
	 * Método POST
	 */
	const post = async <T>(
		url: string,
		data?: unknown,
		config?: ApiConfig
	): Promise<ApiResponse<T>> => {
		try {
			const response = await apiClient.post(url, data, config)
			return transformResponse<T>(response.data)
		} catch (error: unknown) {
			return createApiError(error)
		}
	}

	/**
	 * Método PUT
	 */
	const put = async <T>(
		url: string,
		data?: unknown,
		config?: ApiConfig
	): Promise<ApiResponse<T>> => {
		try {
			const response = await apiClient.put(url, data, config)
			return transformResponse<T>(response.data)
		} catch (error: unknown) {
			return createApiError(error)
		}
	}

	/**
	 * Método DELETE
	 */
	const delete_ = async <T>(
		url: string,
		config?: ApiConfig
	): Promise<ApiResponse<T>> => {
		try {
			const response = await apiClient.delete(url, config)
			return transformResponse<T>(response.data)
		} catch (error: unknown) {
			return createApiError(error)
		}
	}

	return {
		get,
		post,
		put,
		delete: delete_,
	}
}

export default useApi
