// /Users/johannesmoreno/Downloads/portal-servicios-ciudadanos/frontend/src/services/searchService.ts
import { SearchResult } from "../types/search.types"

// Datos de ejemplo para simular resultados de búsqueda
const mockSearchData: SearchResult[] = [
	{
		id: "1",
		title: "Pago de impuesto predial",
		type: "tramite",
		url: "/tramites/impuesto-predial",
		description:
			"Realiza el pago del impuesto predial unificado para tus propiedades en Bogotá.",
	},
	{
		id: "2",
		title: "Pago de fotomultas",
		type: "tramite",
		url: "/tramites/pago-fotomultas",
		description:
			"Consulta y paga tus multas de tránsito registradas en el sistema de Bogotá.",
	},
	{
		id: "3",
		title: "Pago de impuesto vehicular",
		type: "tramite",
		url: "/tramites/impuesto-vehicular",
		description:
			"Paga el impuesto de circulación y tránsito para tu vehículo particular.",
	},
	{
		id: "4",
		title: "Pagos PSE",
		type: "servicio",
		url: "/servicios/pagos-pse",
		description:
			"Pagos seguros electrónicos para diferentes trámites y servicios de la ciudad.",
	},
	{
		id: "5",
		title: "Impuesto de Industria y Comercio",
		type: "tramite",
		url: "/tramites/ica",
		description:
			"Pago del impuesto de industria, comercio, avisos y tableros (ICA).",
	},
	{
		id: "6",
		title: "Exención de pico y placa",
		type: "tramite",
		url: "/tramites/exencion-pico-placa",
		description: "Solicita la exención del pico y placa para tu vehículo.",
	},
	{
		id: "7",
		title: "Certificado de tradición",
		type: "tramite",
		url: "/tramites/certificado-tradicion",
		description:
			"Obtén el certificado que acredita la propiedad de un inmueble.",
	},
	{
		id: "8",
		title: "Certificado de residencia",
		type: "servicio",
		url: "/servicios/certificado-residencia",
		description:
			"Solicita el certificado que acredita tu lugar de residencia en Bogotá.",
	},
	{
		id: "9",
		title: "Política de pagos y devoluciones",
		type: "pagina",
		url: "/pagos-devoluciones",
		description:
			"Información sobre políticas de pagos y solicitudes de devolución.",
	},
	{
		id: "10",
		title: "Medios de pago aceptados",
		type: "pagina",
		url: "/medios-pago",
		description:
			"Conoce los medios de pago aceptados para trámites y servicios.",
	},
]

/**
 * Servicio para la búsqueda predictiva
 */
export const searchService = {
	/**
	 * Busca resultados que coincidan con la consulta proporcionada
	 * @param query Texto de búsqueda
	 * @returns Promesa con los resultados de búsqueda
	 */
	search: async (query: string): Promise<SearchResult[]> => {
		// Simulamos un tiempo de respuesta de la API
		await new Promise((resolve) =>
			setTimeout(resolve, 300 + Math.random() * 300)
		)

		// Filtramos los resultados que coinciden con la consulta
		const normalizedQuery = query.toLowerCase().trim()

		const results = mockSearchData.filter(
			(item) =>
				item.title.toLowerCase().includes(normalizedQuery) ||
				item.description?.toLowerCase().includes(normalizedQuery)
		)

		// Simulamos un error aleatorio ocasionalmente para pruebas
		if (Math.random() < 0.05) {
			throw new Error("Error de conexión simulado")
		}

		return results
	},
}
