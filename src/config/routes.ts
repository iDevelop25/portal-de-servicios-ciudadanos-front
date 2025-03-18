import { RoutesMap } from "../types/routes.types"

/**
 * Mapa de rutas de la aplicación
 * Contiene todas las configuraciones de rutas disponibles
 * @constant ROUTES
 */
export const ROUTES: RoutesMap = {
	// Rutas públicas
	HOME: {
		path: "/inicio",
		title: "Página de Inicio",
		description: "Bienvenido a nuestra aplicación",
		exact: true,
	},
	ABOUT: {
		path: "/nosotros",
		title: "Acerca de Nosotros",
		description: "Conoce más sobre nuestra empresa",
		exact: true,
	},
	CONTACT: {
		path: "/contacto",
		title: "Contacto",
		description: "Ponte en contacto con nosotros",
		exact: true,
	},

	// Rutas que requerirán autenticación en el futuro
	DASHBOARD: {
		path: "/panel",
		title: "Panel Principal",
		description: "Panel de control principal",
		exact: true,
		requiresAuth: true,
	},
	PROFILE: {
		path: "/perfil",
		title: "Perfil de Usuario",
		description: "Gestiona tu perfil de usuario",
		exact: true,
		requiresAuth: true,
	},

	// Rutas de error
	NOT_FOUND: {
		path: "*",
		title: "Página no encontrada",
		description: "La página que buscas no existe",
	},
}

/**
 * Obtiene el path de una ruta a partir de su clave en el mapa de rutas
 * @function getRoutePath
 * @param {string} routeKey - Clave de la ruta en el mapa ROUTES
 * @returns {string} - Path de la ruta
 */
export const getRoutePath = (routeKey: keyof typeof ROUTES): string => {
	return ROUTES[routeKey]?.path || "/"
}

/**
 * Obtiene el título de una ruta a partir de su clave en el mapa de rutas
 * @function getRouteTitle
 * @param {string} routeKey - Clave de la ruta en el mapa ROUTES
 * @returns {string} - Título de la ruta
 */
export const getRouteTitle = (routeKey: keyof typeof ROUTES): string => {
	return ROUTES[routeKey]?.title || "Aplicación"
}
