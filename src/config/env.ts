// API URL base
export const API_URL =
	import.meta.env.VITE_APP_API_URL || "http://localhost:8000"

// Base path para los endpoints
export const API_BASE_PATH =
	import.meta.env.VITE_APP_API_BASE_PATH ||
	"/api/portal-servicios-ciudadanos/v1"

// Endpoint para FAQs
export const FAQS_ENDPOINT = import.meta.env.VITE_APP_FAQS_ENDPOINT || "/faqs"

// URL base de la aplicación
export const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "/"

// Modo debug
export const DEBUG = import.meta.env.VITE_APP_DEBUG === "true"

// Nivel de log
export const LOG_LEVEL = import.meta.env.VITE_APP_LOG_LEVEL || "error"

// Entorno actual
export const ENV = import.meta.env.VITE_APP_ENV || "development"

// URL base para la API de búsqueda
export const SEARCH_API_URL =
	import.meta.env.VITE_APP_SEARCH_API_URL ||
	"http://10.101.5.61:8082/api/master/search"

// URL para la API de trámites más consultados
export const TOP_API_URL =
	import.meta.env.VITE_APP_TOP_API_URL ||
	"http://10.101.5.61:8082/api/master/top"

// Construir una URL completa para un endpoint específico
export const buildApiUrl = (endpoint: string): string => {
	return `${API_BASE_PATH}${endpoint}`
}

/**
 * Objeto que contiene las variables de entorno de la aplicación
 * Facilita el tipado y el acceso a las variables en toda la aplicación
 */
export const env = {
	/**
	 * Entorno de la aplicación (development, production, staging)
	 */
	NODE_ENV: import.meta.env.MODE,

	/**
	 * Indica si la aplicación está en modo desarrollo
	 */
	isDevelopment: import.meta.env.MODE === "development",

	/**
	 * Indica si la aplicación está en modo producción
	 */
	isProduction: import.meta.env.MODE === "production",

	/**
	 * Indica si la aplicación está en modo staging (pre-producción)
	 */
	isStaging: import.meta.env.MODE === "staging",

	/**
	 * URL base de la API
	 */
	API_URL,

	/**
	 * URL base de la aplicación
	 */
	BASE_URL,

	/**
	 * URL del sistema de reserva de turnos
	 */
	RESERVATION_URL:
		(import.meta.env.VITE_APP_RESERVATION_URL as string) ||
		"https://10.101.5.111:4433",

	/**
	 * Indica si se debe mostrar la guía para el certificado SSL
	 */
	SHOW_CERT_GUIDE:
		(import.meta.env.VITE_APP_SHOW_CERT_GUIDE as string) === "true",

	/**
	 * URL para la API de búsqueda
	 */
	SEARCH_API_URL,

	/**
	 * URL para la API de trámites más consultados
	 */
	TOP_API_URL,

	/**
	 * Obtiene una variable de entorno específica
	 * @param key - Nombre de la variable de entorno
	 * @param defaultValue - Valor por defecto si la variable no existe
	 * @returns El valor de la variable de entorno o el valor por defecto
	 */
	get: (key: string, defaultValue: string = ""): string => {
		return (import.meta.env[`VITE_APP_${key}`] as string) || defaultValue
	},
}
