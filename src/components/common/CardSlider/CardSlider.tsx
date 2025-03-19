import { useState, useRef, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { CardSliderProps } from "../../../types/slider.types"

/**
 * Componente CardSlider
 *
 * Slider horizontal mejorado con autoplay más consistente y mejor UI/UX
 */
function CardSlider({
	children,
	title,
	cardWidth = 280,
	gap = 16,
	visibleCards = 4,
	className = "",
	autoplay = true,
	autoplayInterval = 4000,
}: CardSliderProps) {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [maxIndex, setMaxIndex] = useState(0)
	const [isPaused, setIsPaused] = useState(false)
	const sliderRef = useRef<HTMLDivElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const autoplayTimerRef = useRef<number | null>(null)

	// Calcular el número máximo de slides según el ancho del contenedor
	useEffect(() => {
		const updateSliderMetrics = () => {
			if (containerRef.current && sliderRef.current) {
				const containerWidth = containerRef.current.offsetWidth
				const actualVisibleCards = Math.floor(
					containerWidth / (cardWidth + gap)
				)
				setMaxIndex(Math.max(0, children.length - actualVisibleCards))
			}
		}

		updateSliderMetrics()
		window.addEventListener("resize", updateSliderMetrics)
		return () => window.removeEventListener("resize", updateSliderMetrics)
	}, [children.length, cardWidth, gap])

	// Navegar al slider anterior
	const goToPrevious = useCallback(() => {
		setCurrentIndex((prevIndex) => {
			if (prevIndex === 0) return maxIndex // Loop al final si estamos en el primero
			return Math.max(0, prevIndex - 1)
		})
	}, [maxIndex])

	// Navegar al slider siguiente
	const goToNext = useCallback(() => {
		setCurrentIndex((prevIndex) => {
			if (prevIndex === maxIndex) return 0 // Loop al inicio si estamos en el último
			return Math.min(maxIndex, prevIndex + 1)
		})
	}, [maxIndex])

	// Efecto mejorado para manejar el autoplay con más consistencia
	useEffect(() => {
		const startAutoplayTimer = () => {
			if (autoplayTimerRef.current) {
				window.clearTimeout(autoplayTimerRef.current)
			}

			if (autoplay && !isPaused) {
				autoplayTimerRef.current = window.setTimeout(() => {
					goToNext()
					startAutoplayTimer() // Reiniciar el temporizador después de cada cambio
				}, autoplayInterval)
			}
		}

		startAutoplayTimer()

		// Limpieza al desmontar el componente
		return () => {
			if (autoplayTimerRef.current) {
				window.clearTimeout(autoplayTimerRef.current)
			}
		}
	}, [autoplay, isPaused, goToNext, autoplayInterval, currentIndex])

	// Pausar el autoplay al hacer hover
	const handleMouseEnter = () => setIsPaused(true)
	const handleMouseLeave = () => setIsPaused(false)

	// Calcular desplazamiento del slider
	const translateX = -currentIndex * (cardWidth + gap)

	// Verificar si hay suficientes elementos para justificar el slider
	const shouldShowNavigation = children.length > visibleCards

	return (
		<div
			className={`${className}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{/* Título si se proporciona */}
			{title && (
				<div className="text-center mb-8">
					<div className="w-20 h-2 rounded-2xl bg-govco-warning mx-auto mb-4"></div>
					<h2 className="text-2xl font-bold">{title}</h2>
				</div>
			)}

			{/* Contenedor del slider con controles */}
			<div className="relative" ref={containerRef}>
				{/* Botón anterior */}
				{shouldShowNavigation && (
					<button
						onClick={goToPrevious}
						className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white shadow-md hover:shadow-lg text-govco-gray-600 hover:text-govco-danger p-2 rounded-full focus:outline-none transition-all z-10"
						aria-label="Ver anterior grupo de tarjetas"
					>
						<ChevronLeft size={18} />
					</button>
				)}

				{/* Contenedor de overflow para el slider */}
				<div className="overflow-hidden py-2">
					{/* Track del slider con animación */}
					<div
						ref={sliderRef}
						className="flex transition-transform duration-500 ease-out"
						style={{
							transform: `translateX(${translateX}px)`,
						}}
					>
						{/* Mapear los elementos hijos con espaciado */}
						{children.map((card, index) => (
							<div
								key={index}
								className="flex-shrink-0"
								style={{ width: `${cardWidth}px`, marginRight: `${gap}px` }}
							>
								{card}
							</div>
						))}
					</div>
				</div>

				{/* Botón siguiente */}
				{shouldShowNavigation && (
					<button
						onClick={goToNext}
						className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white shadow-md hover:shadow-lg text-govco-gray-600 hover:text-govco-danger p-2 rounded-full focus:outline-none transition-all z-10"
						aria-label="Ver siguiente grupo de tarjetas"
					>
						<ChevronRight size={18} />
					</button>
				)}
			</div>

			{/* Indicadores de posición estilo círculos */}
			{shouldShowNavigation && (
				<div className="flex justify-center space-x-3 mt-6">
					{Array.from({ length: maxIndex + 1 }).map((_, index) => (
						<button
							key={index}
							onClick={() => setCurrentIndex(index)}
							className={`w-3 h-3 rounded-full transition-all duration-300 ${
								index === currentIndex
									? "bg-govco-danger" // Círculo rojo para el activo
									: "bg-gray-400" // Gris más oscuro para mejor visibilidad
							}`}
							aria-label={`Ir a slide ${index + 1}`}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default CardSlider
