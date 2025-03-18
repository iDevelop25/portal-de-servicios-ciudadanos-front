import { useEffect } from "react"

/**
 * Constante con el nombre base del portal para el título de la página
 */
export const BASE_TITLE = "Portal"

/**
 * Hook personalizado para gestionar el título de la página
 * @param pageTitle - Título específico de la página actual
 * @param withBaseTitle - Indica si se debe incluir el nombre base del portal
 */
export function usePageTitle(
	pageTitle: string,
	withBaseTitle: boolean = true
): void {
	useEffect(() => {
		// Si se debe incluir el título base, lo agrega antes del título de la página
		const fullTitle = withBaseTitle ? `${BASE_TITLE} | ${pageTitle}` : pageTitle

		// Actualiza el título de la página en el DOM
		document.title = fullTitle

		// Limpieza (opcional): restaura el título original cuando el componente se desmonta
		return () => {
			document.title = BASE_TITLE
		}
	}, [pageTitle, withBaseTitle])
}
