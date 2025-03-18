/**
 * Interfaz que define la estructura de un slide dentro del carousel
 * @interface SlideItem
 */
export interface SlideItem {
	/** ID único del slide */
	id: string
	/** URL de la imagen de fondo */
	imageUrl: string
	/** Título principal del slide */
	title: string
	/** Subtítulo o descripción del slide */
	subtitle?: string
	/** Texto del botón de acción (si existe) */
	buttonText?: string
	/** URL de destino del botón */
	buttonLink?: string
	/** Indica si el botón de acción debe aparecer */
	showButton?: boolean
	/** Posición del contenido: 'left', 'center', 'right' */
	contentPosition?: "left" | "center" | "right"
	/** Orden de visualización en el carousel */
	order?: number
	/** Indica si el slide está activo/visible */
	isActive?: boolean
}

/**
 * Interfaz para las propiedades del componente Slider
 * @interface SliderProps
 */
export interface SliderProps {
	/** Array de slides a mostrar */
	slides: SlideItem[]
	/** Intervalo de cambio automático en ms (0 para desactivar) */
	autoplayInterval?: number
	/** Indica si muestra los controles de navegación */
	showControls?: boolean
	/** Indica si muestra los indicadores de posición */
	showIndicators?: boolean
	/** Altura personalizada del slider */
	height?: string
	/** Clase CSS adicional */
	className?: string
}
