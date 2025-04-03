import { useState, useEffect } from "react"
import { ChevronRight, ArrowRight, Newspaper } from "lucide-react"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { motion, AnimatePresence } from "framer-motion"
import useNewsService from "../../hooks/useNewsService"
import { NewsItem } from "../../types/news.types"
import ServiceRouteLayout from "../../components/layout/ServiceRouteLayout"
import { Link } from "react-router-dom"

/**
 * Página de Listado de Novedades
 *
 * Muestra las últimas noticias y novedades del servicio con un diseño moderno,
 * compacto y con un outline rojo minimalista en el ítem activo.
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

	// Variantes para el contenedor principal
	const containerVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.4, ease: "easeOut" },
		},
	}

	// Variantes para cada tarjeta (más compacta)
	const itemVariants = {
		hidden: { opacity: 0, y: 5 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: { delay: i * 0.05, duration: 0.3, ease: "easeOut" },
		}),
	}

	// Variantes para el contenido expandido (acordeón)
	const contentVariants = {
		hidden: { opacity: 0, height: 0, overflow: "hidden", originY: 0 },
		visible: {
			opacity: 1,
			height: "auto",
			transition: { duration: 0.25, ease: "easeInOut" },
		},
		exit: {
			opacity: 0,
			height: 0,
			transition: { duration: 0.2, ease: "easeIn" },
		},
	}

	// Variantes para la flecha del botón de expandir
	const arrowVariants = {
		closed: { rotate: 0 },
		open: { rotate: 90, transition: { duration: 0.2, ease: "easeOut" } },
	}

	return (
		<ServiceRouteLayout
			title="Novedades en el Servicio"
			bannerImageUrl="/images/banners/novedades.jpg"
			breadcrumbs={breadcrumbs}
		>
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="bg-white rounded-lg shadow-md p-4 -mt-8"
			>
				<h2 className="text-xl font-bold text-red-600 mb-3 flex items-center">
					<Newspaper className="mr-2" size={20} />
					Novedades en el Servicio
				</h2>
				<p className="text-gray-600 mb-4 text-sm">
					Mantente informado sobre las últimas actualizaciones.
				</p>
				<div className="pt-4">
					{loading && newsItems.length === 0 ? (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="flex justify-center py-8"
						>
							<div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500"></div>
						</motion.div>
					) : error && newsItems.length === 0 ? (
						<motion.div
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							className="bg-red-50 border-l-4 border-red-500 p-3 mb-4 rounded"
						>
							<p className="text-red-700 text-sm">{error}</p>
						</motion.div>
					) : (
						<div className="space-y-4">
							{newsItems.map((item, index) => {
								// Formateo de fecha
								const dateObj = parseISO(item.date)
								const dayNumber = format(dateObj, "d", { locale: es })
								const dayName = format(dateObj, "EEEE", { locale: es })
									.substring(0, 3)
									.toUpperCase()
								const monthName = format(dateObj, "MMMM", { locale: es })
									.substring(0, 3)
									.toUpperCase()

								const isActive = item.id === activeItemId

								return (
									<motion.div
										key={item.id}
										custom={index}
										variants={itemVariants}
										initial="hidden"
										animate="visible"
										className={`overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 ${
											isActive ? "ring-2 ring-red-500" : "hover:shadow-md"
										}`}
									>
										<motion.div
											className={`p-3 cursor-pointer transition-colors ${
												isActive ? "bg-gray-50" : "bg-white"
											} rounded-t-lg flex items-center`}
											onClick={() =>
												setActiveItemId(isActive ? null : item.id ?? null)
											}
											whileTap={{ scale: 0.98 }}
										>
											{/* Calendario compacto */}
											<motion.div
												className="bg-white p-2 rounded-md mr-3 text-center w-14 flex-shrink-0 shadow border border-gray-200"
												whileHover={{
													y: -2,
													boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
												}}
											>
												<div className="text-xs text-gray-500 font-semibold bg-gray-100 rounded-t-sm -mt-1 -mx-1 p-1 mb-1">
													{dayName}
												</div>
												<div className="text-2xl font-bold text-red-500 leading-none my-1">
													{dayNumber}
												</div>
												<div className="text-xs text-gray-500 font-semibold bg-gray-100 rounded-b-sm -mb-1 -mx-1 p-1 mt-1">
													{monthName}
												</div>
											</motion.div>

											{/* Contenido de la noticia */}
											<div className="flex-grow">
												<h3 className="text-lg font-semibold mb-1 text-gray-800">
													{item.title}
												</h3>
												{item.subtitle && (
													<h4 className="text-sm text-gray-500 mb-2">
														{item.subtitle}
													</h4>
												)}
												<div className="flex items-center justify-between">
													{item.entityName && (
														<span className="text-xs text-gray-500">
															{item.entityName}
														</span>
													)}
													<motion.div
														variants={arrowVariants}
														animate={isActive ? "open" : "closed"}
														className="text-red-500 bg-gray-50 rounded-full p-1 shadow"
													>
														<ChevronRight size={16} />
													</motion.div>
												</div>
											</div>
										</motion.div>

										{/* Contenido expandido */}
										<AnimatePresence initial={false}>
											{isActive && (
												<motion.div
													key={`content-${item.id}`}
													variants={contentVariants}
													initial="hidden"
													animate="visible"
													exit="exit"
													className="overflow-hidden bg-gray-50 border-t border-gray-200"
												>
													<div className="p-3 pl-16">
														<motion.p
															initial={{ opacity: 0, y: 5 }}
															animate={{ opacity: 1, y: 0 }}
															transition={{ delay: 0.1 }}
															className="text-gray-700 text-sm leading-relaxed mb-3"
														>
															{item.content}
														</motion.p>
														<motion.div
															initial={{ opacity: 0, x: -5 }}
															animate={{ opacity: 1, x: 0 }}
															transition={{ delay: 0.2 }}
															className="mt-2"
														>
															<Link
																to={`/noticias/${item.id}`}
																className="inline-flex items-center text-red-500 hover:text-red-600 font-medium transition-colors bg-white py-2 px-4 rounded-full shadow text-sm"
															>
																<span>Ver detalles</span>
																<ArrowRight size={16} className="ml-2" />
															</Link>
														</motion.div>
													</div>
												</motion.div>
											)}
										</AnimatePresence>
									</motion.div>
								)
							})}
						</div>
					)}
				</div>
			</motion.div>
		</ServiceRouteLayout>
	)
}

export default NewsListPage
