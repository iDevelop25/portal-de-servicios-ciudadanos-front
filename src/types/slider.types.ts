// Tipos para el componente Slider (mantener lo existente)
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

// Tipos para el componente CardSlider
export interface CardSliderProps {
	/**
	 * Array de elementos hijos o un solo elemento hijo para mostrar en el slider
	 */
	children: React.ReactNode | React.ReactNode[]

	/**
	 * Título opcional para la sección del slider
	 */
	title?: string

	/**
	 * Ancho de cada tarjeta en píxeles
	 * @default 280
	 */
	cardWidth?: number

	/**
	 * Espacio entre tarjetas en píxeles
	 * @default 16
	 */
	gap?: number

	/**
	 * Número de tarjetas visibles a la vez (para diseño responsivo)
	 * @default 4
	 */
	visibleCards?: number

	/**
	 * Clases CSS adicionales
	 */
	className?: string

	/**
	 * Activar o desactivar el autoplay
	 * @default true
	 */
	autoplay?: boolean

	/**
	 * Intervalo de tiempo para el autoplay en milisegundos
	 * @default 4000
	 */
	autoplayInterval?: number
}
