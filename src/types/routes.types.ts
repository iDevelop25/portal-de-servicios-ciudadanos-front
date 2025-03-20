/**
 * Interfaz que define la estructura de una ruta en la aplicación
 * @interface RouteConfig
 */
export interface RouteConfig {
	/** Ruta URL (path) */
	path: string
	/** Título de la página para SEO y navegación */
	title: string
	/** Descripción para SEO */
	description?: string
	/** Indica si la ruta es exacta (para React Router) */
	exact?: boolean
	/** Indica si la ruta requiere autenticación */
	requiresAuth?: boolean
	/** Roles permitidos para acceder a esta ruta */
	roles?: string[]
}

/**
 * Tipo que define la estructura del mapa de rutas de la aplicación
 * @type RoutesMap
 */
export type RoutesMap = {
	[key: string]: RouteConfig
}

/**
 * Interfaz para las rutas dinámicas de servicios
 */
export interface ServiceRouteParams {
	id: string
}
