// frontend/src/config/routes.ts
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

	// Rutas de noticias
	NEWS: {
		path: "/noticias",
		title: "Novedades en el Servicio",
		description: "Últimas actualizaciones y novedades de servicios",
		exact: true,
	},
	NEWS_DETAIL: {
		path: "/noticias/:id",
		title: "Detalle de Novedad",
		description: "Información detallada sobre la novedad",
		exact: true,
	},

	// Rutas reservación de turnos
	RESERVATION: {
		path: "/reservar-turno",
		title: "Reserva de Turnos",
		description: "Sistema de reserva de turnos para atención presencial",
		exact: true,
	},

	// Rutas de administración
	ADMIN: {
		path: "/admin",
		title: "Dashboard Administrativo",
		description: "Panel de control administrativo",
		exact: true,
		requiresAuth: true,
	},
	ADMIN_FAQS: {
		path: "/admin/faqs",
		title: "Gestión de FAQs",
		description: "Administración de preguntas frecuentes",
		exact: true,
		requiresAuth: true,
	},
	ADMIN_NEWS: {
		path: "/admin/noticias",
		title: "Gestión de Noticias",
		description: "Administración de noticias y novedades",
		exact: true,
		requiresAuth: true,
	},
	ADMIN_USERS: {
		path: "/admin/usuarios",
		title: "Gestión de Usuarios",
		description: "Administración de usuarios del sistema",
		exact: true,
		requiresAuth: true,
	},
	ADMIN_CONTENT: {
		path: "/admin/contenido",
		title: "Gestión de Contenido",
		description: "Administración de contenido del portal",
		exact: true,
		requiresAuth: true,
	},
	ADMIN_SETTINGS: {
		path: "/admin/configuracion",
		title: "Configuración",
		description: "Configuración del sistema",
		exact: true,
		requiresAuth: true,
	},
	ADMIN_PROFILE: {
		path: "/admin/perfil",
		title: "Perfil",
		description: "Perfil de administrador",
		exact: true,
		requiresAuth: true,
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
