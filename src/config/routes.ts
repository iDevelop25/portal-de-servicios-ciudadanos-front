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
	// Nuevas rutas para el NavBar
	MI_CIUDAD: {
		path: "/mi-ciudad",
		title: "Mi Ciudad",
		description: "Información sobre la ciudad de Bogotá",
		exact: true,
	},
	QUE_HACER: {
		path: "/que-hacer",
		title: "¿Qué hacer?",
		description: "Actividades y trámites disponibles",
		exact: true,
	},
	SERVICIOS: {
		path: "/servicios",
		title: "Servicios",
		description: "Servicios disponibles para los ciudadanos",
		exact: true,
	},
	YO_PARTICIPO: {
		path: "/yo-participo",
		title: "Yo Participo",
		description: "Participación ciudadana",
		exact: true,
	},
	ASI_VAMOS: {
		path: "/asi-vamos",
		title: "Así Vamos",
		description: "Indicadores y avances de la ciudad",
		exact: true,
	},
	INTERNACIONAL: {
		path: "/internacional",
		title: "Internacional",
		description: "Actividades y relaciones internacionales",
		exact: true,
	},

	SERVICIO_DETALLE: {
		path: "/servicios/:id",
		title: "Detalle de Servicio",
		description: "Información detallada sobre el servicio",
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
