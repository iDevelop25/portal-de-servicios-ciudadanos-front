import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { motion, AnimatePresence } from "framer-motion"
import { NewsItem, ServiceNewsProps } from "../../../types/news.types"
import useNewsService from "../../../hooks/useNewsService"
import { Link } from "react-router-dom"

/**
 * Componente ServiceNews
 *
 * Muestra novedades en el servicio en un formato de slider con navegación
 * y fecha destacada al estilo calendario con animaciones mejoradas.
 */
function ServiceNews({
	title = "Novedades en el Servicio",
	className = "",
	showNavigation = true,
	autoplay = true,
	autoplayInterval = 5000,
}: ServiceNewsProps) {
	// Estado para el índice actual de la novedad
	const [currentIndex, setCurrentIndex] = useState(0)
	// Estado para la dirección de la animación (1: adelante, -1: atrás)
	const [direction, setDirection] = useState(1)
	// Estado para pausar/reanudar el autoplay
	const [isPaused, setIsPaused] = useState(false)
	// Estado para almacenar las novedades cargadas
	const [newsItems, setNewsItems] = useState<NewsItem[]>([])
	// Flag para controlar si ya se han cargado los datos
	const dataLoaded = useRef(false)
	// Usar el hook de noticias
	const { getNews, loading, error } = useNewsService()

	// Efecto para cargar las novedades solo una vez
	useEffect(() => {
		// Evitar cargar múltiples veces
		if (dataLoaded.current) return

		const fetchNews = async () => {
			const news = await getNews()
			if (news.length > 0) {
				setNewsItems(news)
				dataLoaded.current = true
			}
		}

		fetchNews()
	}, [getNews])

	// Navegar a la novedad anterior
	const goToPrevious = useCallback(() => {
		setDirection(-1)
		setCurrentIndex((prevIndex) => {
			if (prevIndex === 0) return newsItems.length - 1 // Loop al final si estamos en la primera
			return prevIndex - 1
		})
	}, [newsItems.length])

	// Navegar a la novedad siguiente
	const goToNext = useCallback(() => {
		setDirection(1)
		setCurrentIndex((prevIndex) => {
			if (prevIndex === newsItems.length - 1) return 0 // Loop al inicio si estamos en la última
			return prevIndex + 1
		})
	}, [newsItems.length])

	// Cambiar directamente a un índice específico
	const goToIndex = useCallback(
		(index: number) => {
			setDirection(index > currentIndex ? 1 : -1)
			setCurrentIndex(index)
		},
		[currentIndex]
	)

	// Efecto para el autoplay
	useEffect(() => {
		if (!autoplay || isPaused || newsItems.length <= 1) return

		const interval = setInterval(goToNext, autoplayInterval)
		return () => clearInterval(interval)
	}, [autoplay, isPaused, goToNext, autoplayInterval, newsItems.length])

	// Variantes para las animaciones de slide
	const slideVariants = {
		enter: (direction: number) => ({
			x: direction > 0 ? 300 : -300,
			opacity: 0,
		}),
		center: {
			x: 0,
			opacity: 1,
		},
		exit: (direction: number) => ({
			x: direction > 0 ? -300 : 300,
			opacity: 0,
		}),
	}

	// Variantes para los controles de navegación
	const controlVariants = {
		initial: { opacity: 0, scale: 0.8 },
		animate: { opacity: 1, scale: 1, transition: { delay: 0.2 } },
		hover: { scale: 1.1, backgroundColor: "#3366CC", color: "#FFFFFF" },
	}

	// Variantes para los indicadores
	const indicatorVariants = {
		inactive: { width: "8px", backgroundColor: "#C7D2FE" },
		active: {
			width: "24px",
			backgroundColor: "#3366CC",
			transition: { duration: 0.3 },
		},
		hover: { scale: 1.2 },
	}

	// Variantes para la aparición del título
	const titleVariants = {
		hidden: { opacity: 0, y: -20 },
		visible: { opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.5 } },
	}

	// Mostrar estado de carga solo en la carga inicial
	if (loading && newsItems.length === 0) {
		return (
			<div className={`w-full ${className}`}>
				{title && (
					<motion.div
						initial="hidden"
						animate="visible"
						variants={titleVariants}
						className="text-center mb-8"
					>
						<div className="w-20 h-2 rounded-2xl bg-govco-warning mx-auto mb-4"></div>
						<h2 className="text-2xl font-bold mb-3">{title}</h2>
					</motion.div>
				)}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
					className="border border-gray-200 rounded-lg p-8 flex justify-center"
				>
					<div className="animate-spin rounded-full h-10 w-10 border-b-2 border-govco-primary"></div>
				</motion.div>
			</div>
		)
	}

	// Mostrar mensaje de error
	if (error && newsItems.length === 0) {
		return (
			<div className={`w-full ${className}`}>
				{title && (
					<motion.div
						initial="hidden"
						animate="visible"
						variants={titleVariants}
						className="text-center mb-8"
					>
						<div className="w-20 h-2 rounded-2xl bg-govco-warning mx-auto mb-4"></div>
						<h2 className="text-2xl font-bold mb-3">{title}</h2>
					</motion.div>
				)}
				<motion.div
					initial={{ opacity: 0, x: -10 }}
					animate={{ opacity: 1, x: 0 }}
					className="border border-gray-200 rounded-lg p-8 text-center text-govco-danger"
				>
					{error}
				</motion.div>
			</div>
		)
	}

	// Si no hay elementos, no mostramos nada
	if (newsItems.length === 0) return null

	// Obtener la novedad actual
	const currentNews = newsItems[currentIndex]

	// Formatear la fecha para mostrar
	const dateObj = parseISO(currentNews.date)
	const dayNumber = format(dateObj, "d", { locale: es })
	const dayName = format(dateObj, "EEEE", { locale: es }).toUpperCase()
	const monthName = format(dateObj, "MMMM", { locale: es }).toUpperCase()

	return (
		<div className={`w-full ${className}`}>
			{title && (
				<motion.div
					initial="hidden"
					animate="visible"
					variants={titleVariants}
					className="text-center mb-8"
				>
					<div className="w-20 h-2 rounded-2xl bg-govco-warning mx-auto mb-4"></div>
					<h2 className="text-2xl font-bold mb-3">{title}</h2>
				</motion.div>
			)}

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="relative border border-gray-200 rounded-lg overflow-hidden shadow-md"
				onMouseEnter={() => setIsPaused(true)}
				onMouseLeave={() => setIsPaused(false)}
			>
				<AnimatePresence initial={false} custom={direction} mode="wait">
					<motion.div
						key={currentIndex}
						custom={direction}
						variants={slideVariants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={{
							x: { type: "spring", stiffness: 300, damping: 30 },
							opacity: { duration: 0.3 },
						}}
						className="w-full"
					>
						<div className="flex flex-col md:flex-row">
							{/* Sección del calendario (izquierda) */}
							<motion.div
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 0.2, duration: 0.3 }}
								className="bg-gray-100 p-4 md:p-8 md:w-64 flex-shrink-0"
							>
								<div className="text-center">
									<div className="text-lg text-gray-600 font-medium">
										{dayName}
									</div>
									<motion.div
										initial={{ scale: 0.8 }}
										animate={{ scale: 1 }}
										transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
										className="text-8xl font-bold text-govco-danger leading-none my-2"
									>
										{dayNumber}
									</motion.div>
									<div className="text-lg text-gray-600 font-medium">
										{monthName}
									</div>
								</div>
							</motion.div>

							{/* Contenido de la novedad (derecha) */}
							<div className="flex-grow p-6">
								<motion.h3
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.2 }}
									className="text-xl font-semibold mb-2"
								>
									{currentNews.title}
								</motion.h3>
								{currentNews.subtitle && (
									<motion.h4
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: 0.3 }}
										className="text-md text-govco-gray-600 mb-3"
									>
										{currentNews.subtitle}
									</motion.h4>
								)}
								<motion.p
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.4 }}
									className="text-govco-gray-700"
								>
									{currentNews.content}
								</motion.p>

								{currentNews.entityName && (
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.5 }}
										className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between"
									>
										<div className="flex-grow">
											<span className="text-sm text-govco-gray-600">
												{currentNews.entityName}
											</span>
										</div>
										<div className="flex-shrink-0 mr-20">
											<motion.div
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
											>
												<Link
													to="/noticias"
													className="inline-flex items-center text-govco-primary hover:text-govco-danger text-sm font-medium transition-colors"
												>
													<span>Ver más</span>
													<Plus size={16} className="ml-1" />
												</Link>
											</motion.div>
										</div>
									</motion.div>
								)}
							</div>
						</div>
					</motion.div>
				</AnimatePresence>

				{/* Indicadores de posición */}
				{newsItems.length > 1 && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.6 }}
						className="absolute bottom-4 left-4 flex space-x-2"
					>
						{newsItems.map((_, index) => (
							<motion.button
								key={index}
								variants={indicatorVariants}
								initial="inactive"
								animate={index === currentIndex ? "active" : "inactive"}
								whileHover="hover"
								className="h-2 rounded-full transition-all bg-govco-gray-300"
								onClick={() => goToIndex(index)}
								aria-label={`Ir a novedad ${index + 1}`}
							/>
						))}
					</motion.div>
				)}

				{/* Controles de navegación */}
				{showNavigation && newsItems.length > 1 && (
					<motion.div
						initial="initial"
						animate="animate"
						className="absolute right-4 bottom-4 flex space-x-2"
					>
						<motion.button
							variants={controlVariants}
							whileHover="hover"
							whileTap={{ scale: 0.9 }}
							onClick={goToPrevious}
							className="p-2 bg-white rounded-full border border-gray-200 shadow-sm hover:bg-govco-primary hover:text-white transition-colors"
							aria-label="Novedad anterior"
						>
							<ChevronLeft size={16} />
						</motion.button>
						<motion.button
							variants={controlVariants}
							whileHover="hover"
							whileTap={{ scale: 0.9 }}
							onClick={goToNext}
							className="p-2 bg-white rounded-full border border-gray-200 shadow-sm hover:bg-govco-primary hover:text-white transition-colors"
							aria-label="Novedad siguiente"
						>
							<ChevronRight size={16} />
						</motion.button>
					</motion.div>
				)}
			</motion.div>
		</div>
	)
}

export default ServiceNews
