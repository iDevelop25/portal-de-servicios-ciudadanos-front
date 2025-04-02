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
 * Muestra las últimas noticias y novedades del servicio
 * usando un acordeón con animaciones mejoradas para una experiencia más fluida
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

	// Variantes para la animación del contenedor principal
	const containerVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: "easeOut",
			},
		},
	}

	// Variantes para la animación de los items
	const itemVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: i * 0.05,
				duration: 0.3,
				ease: "easeOut",
			},
		}),
	}

	// Variantes para el contenido expandido
	const contentVariants = {
		hidden: {
			opacity: 0,
			height: 0,
			overflow: "hidden",
			originY: 0,
		},
		visible: {
			opacity: 1,
			height: "auto",
			transition: {
				height: {
					duration: 0.3,
					ease: [0.04, 0.62, 0.23, 0.98],
				},
				opacity: {
					duration: 0.25,
					delay: 0.1,
				},
			},
		},
		exit: {
			opacity: 0,
			height: 0,
			transition: {
				height: {
					duration: 0.2,
					ease: "easeIn",
				},
				opacity: {
					duration: 0.15,
				},
			},
		},
	}

	// Variantes para la animación de la flecha
	const arrowVariants = {
		closed: { rotate: 0 },
		open: {
			rotate: 90,
			transition: {
				duration: 0.2,
				ease: "easeOut",
			},
		},
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
				className="bg-white rounded-lg shadow-md p-6 -mt-10"
			>
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
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="flex justify-center py-16"
						>
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-govco-primary"></div>
						</motion.div>
					) : error && newsItems.length === 0 ? (
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-r"
						>
							<p className="text-red-700">{error}</p>
						</motion.div>
					) : (
						<div className="space-y-4">
							{newsItems.map((item, index) => {
								// Formateo de fecha
								const dateObj = parseISO(item.date)
								const dayNumber = format(dateObj, "d", { locale: es })
								const dayName = format(dateObj, "EEEE", {
									locale: es,
								})
									.substring(0, 3)
									.toUpperCase()
								const monthName = format(dateObj, "MMMM", {
									locale: es,
								})
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
										className="overflow-hidden rounded-lg bg-white shadow-sm"
									>
										<motion.div
											className={`p-4 cursor-pointer transition-colors ${
												isActive ? "bg-gray-50" : ""
											} rounded-t-lg hover:bg-gray-50 flex items-start`}
											onClick={() =>
												setActiveItemId(isActive ? null : item.id ?? null)
											}
											whileTap={{ scale: 0.98 }}
										>
											{/* Calendario con efecto de tarjeta */}
											<motion.div
												className="bg-white p-2 md:p-3 rounded-lg mr-4 text-center w-16 flex-shrink-0 shadow-sm border border-gray-100"
												whileHover={{
													y: -2,
													boxShadow: "0 4px 6px rgba(0, 0, 0, 0.07)",
												}}
											>
												<div className="text-xs text-gray-600 font-medium bg-gray-50 rounded-t-sm -mt-2 -mx-2 p-1 mb-1">
													{dayName}
												</div>
												<div className="text-3xl font-bold text-govco-danger leading-none my-1">
													{dayNumber}
												</div>
												<div className="text-xs text-gray-600 font-medium bg-gray-50 rounded-b-sm -mb-2 -mx-2 p-1 mt-1">
													{monthName}
												</div>
											</motion.div>

											{/* Contenido de la novedad */}
											<div className="flex-grow">
												<h3 className="text-lg font-semibold mb-1 text-govco-gray-900">
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
													<motion.div
														variants={arrowVariants}
														animate={isActive ? "open" : "closed"}
														className="text-govco-primary bg-gray-50 rounded-full p-1 shadow-sm"
													>
														<ChevronRight size={18} />
													</motion.div>
												</div>
											</div>
										</motion.div>

										{/* Contenido expandido con AnimatePresence mejorada */}
										<AnimatePresence initial={false}>
											{isActive && (
												<motion.div
													key={`content-${item.id}`}
													variants={contentVariants}
													initial="hidden"
													animate="visible"
													exit="exit"
													className="overflow-hidden bg-gray-50 border-t border-gray-100"
												>
													<div className="p-5 pt-4 pl-24">
														<motion.p
															initial={{ opacity: 0, y: 10 }}
															animate={{ opacity: 1, y: 0 }}
															transition={{ delay: 0.1 }}
															className="text-govco-gray-700 mb-4 leading-relaxed"
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
																className="inline-flex items-center text-govco-primary hover:text-govco-danger font-medium transition-colors bg-white py-2 px-4 rounded-full shadow-sm hover:shadow-md"
															>
																<span>Ver detalles completos</span>
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
