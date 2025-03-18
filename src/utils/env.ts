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
	API_URL: import.meta.env.VITE_APP_API_URL as string,

	/**
	 * URL base de la aplicación
	 */
	BASE_URL: import.meta.env.VITE_APP_BASE_URL as string,

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
