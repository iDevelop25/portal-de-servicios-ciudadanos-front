/**
 * Configuración de variables de entorno
 *
 * Este archivo centraliza el acceso a las variables de entorno
 * y proporciona valores por defecto seguros.
 */

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

// Construir una URL completa para un endpoint específico
export const buildApiUrl = (endpoint: string): string => {
	return `${API_BASE_PATH}${endpoint}`
}

// Verificar si estamos en producción
export const isProduction = ENV === "production"

// Verificar si estamos en desarrollo
export const isDevelopment = ENV === "development"

// Verificar si estamos en staging
export const isStaging = ENV === "staging"

// URL reserva de turnos
export const RESERVATION_URL =
	import.meta.env.VITE_APP_RESERVATION_URL || "https://10.101.5.111:4433"

// URL de búsqueda
export const SEARCH_API_URL =
	import.meta.env.VITE_APP_SEARCH_API_URL ||
	"http://10.101.5.61:8082/api/master/search"
