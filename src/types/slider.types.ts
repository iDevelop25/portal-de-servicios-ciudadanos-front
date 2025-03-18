// Tipos para el componente Slider
export interface SlideItem {
	id: string
	imageUrl: string
	title?: string
	description?: string
	linkUrl?: string
}

export interface SliderProps {
	/**
	 * Array de slides que se mostrarán en el carousel
	 */
	slides: SlideItem[]

	/**
	 * Intervalo en milisegundos para el cambio automático de slides
	 * Si es 0 o negativo, se desactiva el autoplay
	 * @default 5000
	 */
	autoplayInterval?: number

	/**
	 * Mostrar u ocultar los controles de navegación (flechas)
	 * @default true
	 */
	showControls?: boolean

	/**
	 * Mostrar u ocultar los indicadores de posición
	 * @default true
	 */
	showIndicators?: boolean

	/**
	 * Altura del slider (valor CSS)
	 * @default "300px"
	 */
	height?: string

	/**
	 * Clases CSS adicionales
	 */
	className?: string

	/**
	 * Posición de los indicadores (clases de Tailwind para posicionamiento)
	 * @default "bottom-4"
	 */
	indicatorPosition?: string
}
