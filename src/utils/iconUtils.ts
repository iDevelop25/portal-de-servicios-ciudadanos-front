import {
	Car,
	FileText,
	FileSpreadsheet,
	CreditCard,
	Banknote,
	Building,
	Home,
	Map,
	Calendar,
	LucideIcon,
} from "lucide-react"

/**
 * Determina el ícono más apropiado según el título o características del trámite
 * @param {string} title - Título del trámite
 * @returns {LucideIcon} Componente de ícono de Lucide
 */
export function getIconForTramite(title: string): LucideIcon {
	// Convertir a minúsculas para hacer las comparaciones más sencillas
	const normalizedTitle = title.toLowerCase()

	// Determinar el ícono basado en palabras clave
	if (
		normalizedTitle.includes("vehículo") ||
		normalizedTitle.includes("pico y placa")
	) {
		return Car
	} else if (
		normalizedTitle.includes("impuesto") &&
		normalizedTitle.includes("predial")
	) {
		return Home
	} else if (
		normalizedTitle.includes("impuesto") &&
		normalizedTitle.includes("vehículo")
	) {
		return Car
	} else if (
		normalizedTitle.includes("certificado") ||
		normalizedTitle.includes("certificación")
	) {
		return FileText
	} else if (
		normalizedTitle.includes("pago") ||
		normalizedTitle.includes("facilidades de pago")
	) {
		return CreditCard
	} else if (normalizedTitle.includes("impuesto")) {
		return Banknote
	} else if (normalizedTitle.includes("renta")) {
		return Banknote
	} else if (
		normalizedTitle.includes("catastral") ||
		normalizedTitle.includes("predio")
	) {
		return Building
	} else if (
		normalizedTitle.includes("plano") ||
		normalizedTitle.includes("nomenclatura")
	) {
		return Map
	} else if (
		normalizedTitle.includes("cesantías") ||
		normalizedTitle.includes("report")
	) {
		return FileSpreadsheet
	} else if (
		normalizedTitle.includes("cita") ||
		normalizedTitle.includes("turno")
	) {
		return Calendar
	}

	// Icono por defecto
	return FileText
}
