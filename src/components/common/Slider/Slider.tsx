import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { SliderProps } from "../../../types/slider.types"

/**
 * Componente Slider (Carousel)
 *
 * Muestra un carousel de slides con imágenes de fondo y contenido superpuesto,
 * permite navegación manual y automática entre slides.
 */
function Slider({
	slides,
	autoplayInterval = 5000,
	showControls = true,
	showIndicators = true,
	height = "300px", // Altura reducida un 40%
	className = "",
}: SliderProps) {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [isAutoplayActive, setIsAutoplayActive] = useState(autoplayInterval > 0)

	// Cálculo del slide actual
	const currentSlide = slides[currentIndex]

	// Función para ir al slide anterior
	const goToPrevious = useCallback(() => {
		const isFirstSlide = currentIndex === 0
		const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
		setCurrentIndex(newIndex)
	}, [currentIndex, slides.length])

	// Función para ir al slide siguiente
	const goToNext = useCallback(() => {
		const isLastSlide = currentIndex === slides.length - 1
		const newIndex = isLastSlide ? 0 : currentIndex + 1
		setCurrentIndex(newIndex)
	}, [currentIndex, slides.length])

	// Función para ir a un slide específico
	const goToSlide = (slideIndex: number) => {
		setCurrentIndex(slideIndex)
	}

	// Efecto para manejar el autoplay
	useEffect(() => {
		let slideInterval: ReturnType<typeof setInterval> | null = null

		if (isAutoplayActive && autoplayInterval > 0) {
			slideInterval = setInterval(() => {
				goToNext()
			}, autoplayInterval)
		}

		return () => {
			if (slideInterval) {
				clearInterval(slideInterval)
			}
		}
	}, [goToNext, isAutoplayActive, autoplayInterval])

	// Detener autoplay al hacer hover
	const handleMouseEnter = () => setIsAutoplayActive(false)
	const handleMouseLeave = () => setIsAutoplayActive(autoplayInterval > 0)

	// Variantes para animaciones con Framer Motion
	const slideVariants = {
		enter: (direction: number) => ({
			x: direction > 0 ? "100%" : "-100%",
			opacity: 0,
		}),
		center: {
			x: 0,
			opacity: 1,
		},
		exit: (direction: number) => ({
			x: direction < 0 ? "100%" : "-100%",
			opacity: 0,
		}),
	}

	// Si no hay slides, no renderizar nada
	if (!slides.length) return null

	return (
		<div
			className={`relative overflow-hidden ${className}`}
			style={{ height }}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{/* Slides con animaciones */}
			<AnimatePresence initial={false} custom={currentIndex}>
				<motion.div
					key={currentIndex}
					custom={currentIndex}
					variants={slideVariants}
					initial="enter"
					animate="center"
					exit="exit"
					transition={{
						x: { type: "spring", stiffness: 300, damping: 30 },
						opacity: { duration: 0.5 },
					}}
					className="absolute w-full h-full"
					style={{
						backgroundImage: `url(${currentSlide.imageUrl})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				>
					{/* Capa oscura para mejorar legibilidad */}
					<div className="absolute inset-0 bg-black bg-opacity-40"></div>
				</motion.div>
			</AnimatePresence>

			{/* Controles de navegación */}
			{showControls && slides.length > 1 && (
				<>
					<button
						onClick={goToPrevious}
						className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-full focus:outline-none transition-all z-10"
						aria-label="Slide anterior"
					>
						<ChevronLeft size={24} />
					</button>
					<button
						onClick={goToNext}
						className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-full focus:outline-none transition-all z-10"
						aria-label="Slide siguiente"
					>
						<ChevronRight size={24} />
					</button>
				</>
			)}

			{/* Indicadores de posición */}
			{showIndicators && slides.length > 1 && (
				<div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
					{slides.map((slide, slideIndex) => (
						<button
							key={slide.id}
							onClick={() => goToSlide(slideIndex)}
							className={`w-3 h-3 rounded-full transition-all focus:outline-none
               ${
									currentIndex === slideIndex
										? "bg-white scale-125"
										: "bg-white bg-opacity-50 hover:bg-opacity-75"
								}`}
							aria-label={`Ir al slide ${slideIndex + 1}`}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default Slider
