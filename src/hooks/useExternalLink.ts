import { useMemo } from "react"

/**
 * Hook para generar atributos de enlace externo.
 * Si se pasa un href, retorna target="_blank" y rel="noopener noreferrer"
 * para abrir el enlace en una nueva pestaña y prevenir vulnerabilidades.
 *
 * @param href URL del enlace (opcional)
 * @returns Objeto con atributos para enlaces externos.
 */
export function useExternalLink(href?: string) {
	return useMemo(() => {
		if (href) {
			return {
				target: "_blank",
				rel: "noopener noreferrer",
			}
		}
		return {}
	}, [href])
}
