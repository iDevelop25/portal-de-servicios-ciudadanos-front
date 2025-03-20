// portal-servicios-ciudadanos/frontend/src/types/fab.types.ts
export interface FabProps {
	/**
	 * URL de la imagen a mostrar en el FAB
	 */
	imageUrl: string

	/**
	 * Texto alternativo para la imagen
	 */
	altText: string

	/**
	 * Función a ejecutar al hacer clic en el FAB
	 */
	onClick?: () => void

	/**
	 * URL a la que redirigirá al hacer clic (alternativa a onClick)
	 */
	href?: string

	/**
	 * Clases CSS adicionales
	 */
	className?: string

	/**
	 * Posición del FAB en la pantalla
	 * @default "bottom-right"
	 */
	position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
}
