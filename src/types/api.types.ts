// Archivo: frontend/src/types/api.types.ts

/**
 * Configuración para las peticiones HTTP
 */
export interface ApiConfig {
	headers?: Record<string, string>
	params?: Record<string, string>
	[key: string]: unknown
}

/**
 * Respuesta genérica de la API
 */
export interface ApiResponse<T> {
	success: boolean
	data?: T
	message?: string
	errors?: unknown[]
	fromCache?: boolean
}

/**
 * Respuesta de error de la API
 */
export interface ApiError {
	success: false
	message: string
	errors?: unknown[]
}
