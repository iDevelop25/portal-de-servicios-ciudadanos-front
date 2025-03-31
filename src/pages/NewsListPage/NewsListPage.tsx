import { useState, useEffect } from "react"
import { ChevronRight, ArrowRight, Newspaper } from "lucide-react"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import useNewsService from "../../hooks/useNewsService"
import { NewsItem } from "../../types/news.types"
import ServiceRouteLayout from "../../components/layout/ServiceRouteLayout"
import { Link } from "react-router-dom"

/**
 * Página de Listado de Novedades
 *
 * Muestra las últimas noticias y novedades del servicio
 * usando el mismo layout y diseño que las otras páginas de servicio
 */
function NewsListPage() {
	const [newsItems, setNewsItems] = useState<NewsItem[]>([])
	const { getNews, loading, error } = useNewsService()
	const [activeItemId, setActiveItemId] = useState<string | null>(null)

	const breadcrumbs = [
		{ text: "Servicios", url: "/servicios" },
		{ text: "Novedades", url: "/noticias" },
	]

	useEffect(() => {
		const fetchNews = async () => {
			const news = await getNews()
			if (news.length > 0) {
				setNewsItems(news)
				setActiveItemId(news[0].id ?? null)
			}
		}

		fetchNews()
	}, [getNews])

	return (
		<ServiceRouteLayout
			title="Novedades en el Servicio"
			bannerImageUrl="/images/banners/novedades.jpg" // Asegúrate de tener esta imagen o reemplázala
			breadcrumbs={breadcrumbs}
		>
			<div className="bg-white rounded-lg shadow-md p-6 -mt-10">
				<h2 className="text-2xl font-bold text-govco-primary mb-4 flex items-center">
					<Newspaper className="mr-2" size={24} />
					Novedades en el Servicio
				</h2>

				<p className="text-gray-700 mb-6">
					Mantente informado sobre las últimas actualizaciones de nuestros
					servicios
				</p>

				<div className="border-t border-gray-200 pt-6">
					{loading && newsItems.length === 0 ? (
						<div className="flex justify-center py-16">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-govco-primary"></div>
						</div>
					) : error && newsItems.length === 0 ? (
						<div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
							<p className="text-red-700">{error}</p>
						</div>
					) : (
						<div className="border rounded-lg overflow-hidden">
							{newsItems.map((item) => {
								// Formateo de fecha
								const dateObj = parseISO(item.date)
								const dayNumber = format(dateObj, "d", { locale: es })
								const dayName = format(dateObj, "EEEE", {
									locale: es,
								}).toUpperCase()
								const monthName = format(dateObj, "MMMM", {
									locale: es,
								}).toUpperCase()

								const isActive = item.id === activeItemId

								return (
									<div key={item.id} className="border-b last:border-b-0">
										<div
											className={`p-4 cursor-pointer transition-colors ${
												isActive ? "bg-gray-50" : "hover:bg-gray-50"
											}`}
											onClick={() => setActiveItemId(item.id ?? null)}
										>
											<div className="flex items-start">
												{/* Sección del calendario (izquierda) */}
												<div className="bg-gray-100 p-2 md:p-4 rounded-lg mr-4 text-center w-20 flex-shrink-0">
													<div className="text-sm text-gray-600 font-medium">
														{dayName}
													</div>
													<div className="text-4xl font-bold text-govco-danger leading-none my-1">
														{dayNumber}
													</div>
													<div className="text-sm text-gray-600 font-medium">
														{monthName}
													</div>
												</div>

												{/* Contenido de la novedad (derecha) */}
												<div className="flex-grow">
													<h3 className="text-lg font-semibold mb-1">
														{item.title}
													</h3>
													{item.subtitle && (
														<h4 className="text-sm text-govco-gray-600 mb-2">
															{item.subtitle}
														</h4>
													)}
													<div className="flex items-center justify-between">
														{item.entityName && (
															<span className="text-xs text-govco-gray-500">
																{item.entityName}
															</span>
														)}
														<ChevronRight
															size={16}
															className={`transition-transform ${
																isActive ? "transform rotate-90" : ""
															}`}
														/>
													</div>
												</div>
											</div>
										</div>

										{/* Contenido expandido cuando está activo */}
										{isActive && (
											<div className="p-4 pt-0 pl-28 bg-gray-50 border-t border-gray-100">
												<p className="text-govco-gray-700 mb-4">
													{item.content}
												</p>
												<Link
													to={`/noticias/${item.id}`}
													className="inline-flex items-center text-govco-primary hover:text-govco-danger font-medium"
												>
													<span>Ver detalles completos</span>
													<ArrowRight size={16} className="ml-1" />
												</Link>
											</div>
										)}
									</div>
								)
							})}
						</div>
					)}
				</div>
			</div>
		</ServiceRouteLayout>
	)
}

export default NewsListPage
