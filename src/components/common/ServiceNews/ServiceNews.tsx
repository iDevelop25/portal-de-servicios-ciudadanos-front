import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { NewsItem, ServiceNewsProps } from "../../../types/news.types"
import useNewsService from "../../../hooks/useNewsService"

/**
 * Componente ServiceNews
 *
 * Muestra novedades en el servicio en un formato de slider con navegación
 * y fecha destacada al estilo calendario.
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
		setCurrentIndex((prevIndex) => {
			if (prevIndex === 0) return newsItems.length - 1 // Loop al final si estamos en la primera
			return prevIndex - 1
		})
	}, [newsItems.length])

	// Navegar a la novedad siguiente
	const goToNext = useCallback(() => {
		setCurrentIndex((prevIndex) => {
			if (prevIndex === newsItems.length - 1) return 0 // Loop al inicio si estamos en la última
			return prevIndex + 1
		})
	}, [newsItems.length])

	// Efecto para el autoplay
	useEffect(() => {
		if (!autoplay || isPaused || newsItems.length <= 1) return

		const interval = setInterval(goToNext, autoplayInterval)
		return () => clearInterval(interval)
	}, [autoplay, isPaused, goToNext, autoplayInterval, newsItems.length])

	// Mostrar estado de carga solo en la carga inicial
	if (loading && newsItems.length === 0) {
		return (
			<div className={`w-full ${className}`}>
				{title && (
					<div className="text-center mb-8">
						<div className="w-20 h-2 rounded-2xl bg-govco-warning mx-auto mb-4"></div>
						<h2 className="text-2xl font-bold mb-3">{title}</h2>
					</div>
				)}
				<div className="border border-gray-200 rounded-lg p-8 flex justify-center">
					<div className="animate-spin rounded-full h-10 w-10 border-b-2 border-govco-primary"></div>
				</div>
			</div>
		)
	}

	// Mostrar mensaje de error
	if (error && newsItems.length === 0) {
		return (
			<div className={`w-full ${className}`}>
				{title && (
					<div className="text-center mb-8">
						<div className="w-20 h-2 rounded-2xl bg-govco-warning mx-auto mb-4"></div>
						<h2 className="text-2xl font-bold mb-3">{title}</h2>
					</div>
				)}
				<div className="border border-gray-200 rounded-lg p-8 text-center text-govco-danger">
					{error}
				</div>
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
				<div className="text-center mb-8">
					<div className="w-20 h-2 rounded-2xl bg-govco-warning mx-auto mb-4"></div>
					<h2 className="text-2xl font-bold mb-3">{title}</h2>
				</div>
			)}

			<div
				className="relative border border-gray-200 rounded-lg overflow-hidden"
				onMouseEnter={() => setIsPaused(true)}
				onMouseLeave={() => setIsPaused(false)}
			>
				<div className="flex flex-col md:flex-row">
					{/* Sección del calendario (izquierda) */}
					<div className="bg-gray-100 p-4 md:p-8 md:w-64 flex-shrink-0">
						<div className="text-center">
							<div className="text-lg text-gray-600 font-medium">{dayName}</div>
							<div className="text-8xl font-bold text-govco-danger leading-none my-2">
								{dayNumber}
							</div>
							<div className="text-lg text-gray-600 font-medium">
								{monthName}
							</div>
						</div>
					</div>

					{/* Contenido de la novedad (derecha) */}
					<div className="flex-grow p-6">
						<h3 className="text-xl font-semibold mb-2">{currentNews.title}</h3>
						{currentNews.subtitle && (
							<h4 className="text-md text-govco-gray-600 mb-3">
								{currentNews.subtitle}
							</h4>
						)}
						<p className="text-govco-gray-700">{currentNews.content}</p>

						{currentNews.entityName && (
							<div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
								<span className="text-sm text-govco-gray-600">
									{currentNews.entityName}
								</span>
								<button className="flex items-center text-govco-primary hover:text-govco-danger text-sm font-medium transition-colors">
									<span>Ver más</span>
									<Plus size={16} className="ml-1" />
								</button>
							</div>
						)}
					</div>
				</div>

				{/* Controles de navegación */}
				{showNavigation && newsItems.length > 1 && (
					<div className="absolute right-4 bottom-4 flex space-x-2">
						<button
							onClick={goToPrevious}
							className="p-2 bg-white rounded-full border border-gray-200 shadow-sm hover:bg-govco-primary hover:text-white transition-colors"
							aria-label="Novedad anterior"
						>
							<ChevronLeft size={16} />
						</button>
						<button
							onClick={goToNext}
							className="p-2 bg-white rounded-full border border-gray-200 shadow-sm hover:bg-govco-primary hover:text-white transition-colors"
							aria-label="Novedad siguiente"
						>
							<ChevronRight size={16} />
						</button>
					</div>
				)}

				{/* Indicadores de posición */}
				{newsItems.length > 1 && (
					<div className="absolute bottom-4 left-4 flex space-x-2">
						{newsItems.map((_, index) => (
							<button
								key={index}
								className={`w-2 h-2 rounded-full transition-all ${
									index === currentIndex
										? "bg-govco-primary w-6"
										: "bg-govco-gray-300"
								}`}
								onClick={() => setCurrentIndex(index)}
								aria-label={`Ir a novedad ${index + 1}`}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default ServiceNews
