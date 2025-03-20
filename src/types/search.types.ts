// /Users/johannesmoreno/Downloads/portal-servicios-ciudadanos/frontend/src/types/search.types.ts
/**
 * Interfaz para los resultados de búsqueda
 */
export interface SearchResult {
	/**
	 * Identificador único del resultado
	 */
	id: string

	/**
	 * Título del resultado
	 */
	title: string

	/**
	 * Tipo de resultado (trámite, servicio, etc.)
	 */
	type: "tramite" | "servicio" | "pagina" | "documento"

	/**
	 * URL para redirigir al hacer clic en el resultado
	 */
	url: string

	/**
	 * Descripción del resultado (opcional)
	 */
	description?: string

	/**
	 * Metadatos adicionales (opcional)
	 */
	metadata?: Record<string, unknown>
}
