import { ServiceRoute } from "../types/service.types"

// Definimos rutas directas a imágenes dentro de la carpeta public
const mockServiceRoutes: Record<string, ServiceRoute> = {
	educacion: {
		id: "educacion",
		title: "Educación",
		description:
			"Accede a información sobre trámites, servicios y programas educativos de la Alcaldía Mayor de Bogotá.",
		imageUrl: "/images/services-routes/educacion.png", // Ruta desde public
		link: "/servicios/educacion",
	},
	victimas: {
		id: "victimas",
		title: "Víctimas",
		description:
			"Conoce los servicios de atención, orientación y reparación para víctimas del conflicto armado.",
		imageUrl: "/images/services-routes/victimas.png", // Ruta desde public
		link: "/servicios/victimas",
	},
	migrantes: {
		id: "migrantes",
		title: "Migrantes",
		description:
			"Información sobre regularización, atención y orientación para población migrante en Bogotá.",
		imageUrl: "/images/services-routes/migrantes.png", // Ruta desde public
		link: "/servicios/migrantes",
	},
}

export const DEFAULT_IMAGE = "../assets/images/services-routes/default.png"
export default mockServiceRoutes
