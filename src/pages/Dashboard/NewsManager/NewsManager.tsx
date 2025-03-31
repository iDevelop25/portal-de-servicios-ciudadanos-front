import { useState, useEffect } from "react"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import {
	PlusCircle,
	Edit,
	Trash2,
	Calendar,
	Search,
	X,
	Loader,
} from "lucide-react"
import DashboardLayout from "../../../components/layout/DashboardLayout"
import { newsService } from "../../../services/newsService"
import { NewsItem } from "../../../types/news.types"
import NewsForm from "./NewsForm"

/**
 * Componente NewsManager
 *
 * Gestiona la creación, edición y eliminación de noticias desde el panel de administración
 */
function NewsManager() {
	// Estados
	const [news, setNews] = useState<NewsItem[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [searchTerm, setSearchTerm] = useState("")
	const [showForm, setShowForm] = useState(false)
	const [currentNews, setCurrentNews] = useState<NewsItem | null>(null)
	const [isDeleting, setIsDeleting] = useState(false)
	const [newsToDelete, setNewsToDelete] = useState<string | null>(null)

	// Cargar noticias al montar el componente
	useEffect(() => {
		fetchNews()
	}, [])

	// Función para cargar noticias
	const fetchNews = async () => {
		setIsLoading(true)
		try {
			const newsData = await newsService.getNews()
			setNews(newsData)
			setError(null)
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error ? error.message : "Error desconocido"
			setError(`Error de conexión: ${errorMessage}`)
		} finally {
			setIsLoading(false)
		}
	}

	// Filtrar noticias según el término de búsqueda
	const filteredNews = news.filter(
		(item) =>
			item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
			(item.entityName &&
				item.entityName.toLowerCase().includes(searchTerm.toLowerCase()))
	)

	// Abre el formulario para crear una nueva noticia
	const handleCreate = () => {
		setCurrentNews(null)
		setShowForm(true)
	}

	// Abre el formulario para editar una noticia existente
	const handleEdit = (newsItem: NewsItem) => {
		setCurrentNews(newsItem)
		setShowForm(true)
	}

	// Cierra el formulario
	const handleCloseForm = () => {
		setShowForm(false)
		setCurrentNews(null)
	}

	// Guarda una noticia (creación o edición)
	const handleSave = async (newsData: NewsItem) => {
		setIsLoading(true)
		try {
			// Como el servicio de ejemplo no tiene métodos de crear/actualizar,
			// simulamos una actualización exitosa
			if (newsData.id) {
				// En producción, aquí llamaríamos a la API para actualizar
				// Actualizar la lista de noticias localmente
				setNews((prevNews) =>
					prevNews.map((item) => (item.id === newsData.id ? newsData : item))
				)
			} else {
				// En producción, aquí llamaríamos a la API para crear
				// Asignar un ID simulado
				const newNewsItem: NewsItem = {
					...newsData,
					id: `news-${Date.now()}`, // ID temporal simulado
				}
				// Añadir la nueva noticia a la lista
				setNews((prevNews) => [...prevNews, newNewsItem])
			}
			setShowForm(false)
			setError(null)
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error ? error.message : "Error desconocido"
			setError(`Error: ${errorMessage}`)
		} finally {
			setIsLoading(false)
		}
	}

	// Muestra el diálogo de confirmación para eliminar
	const handleDelete = (id: string) => {
		setNewsToDelete(id)
		setIsDeleting(true)
	}

	// Cancela la eliminación
	const cancelDelete = () => {
		setNewsToDelete(null)
		setIsDeleting(false)
	}

	// Confirma y ejecuta la eliminación
	const confirmDelete = async () => {
		if (!newsToDelete) return

		setIsLoading(true)
		try {
			// En producción, aquí llamaríamos a la API para eliminar
			// Eliminar de la lista local
			setNews((prevNews) => prevNews.filter((item) => item.id !== newsToDelete))
			setIsDeleting(false)
			setNewsToDelete(null)
			setError(null)
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error ? error.message : "Error desconocido"
			setError(`Error: ${errorMessage}`)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<DashboardLayout title="Gestión de Noticias">
			<div className="bg-white rounded-lg shadow-md p-6">
				{/* Encabezado y botones de acción */}
				<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
					<div className="flex items-center mb-4 md:mb-0">
						<Calendar className="text-govco-primary mr-2" size={24} />
						<h2 className="text-xl font-bold">Noticias y Novedades</h2>
					</div>
					<div className="flex flex-col sm:flex-row gap-3">
						<div className="relative">
							<input
								type="text"
								placeholder="Buscar noticias..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-9 pr-4 py-2 border rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-govco-primary"
							/>
							<Search
								className="absolute left-3 top-2.5 text-gray-400"
								size={18}
							/>
							{searchTerm && (
								<button
									onClick={() => setSearchTerm("")}
									className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
								>
									<X size={18} />
								</button>
							)}
						</div>
						<button
							onClick={handleCreate}
							className="flex items-center justify-center px-4 py-2 bg-govco-primary text-white rounded-lg hover:bg-govco-secondary transition-colors"
						>
							<PlusCircle size={18} className="mr-2" />
							<span>Nueva Noticia</span>
						</button>
					</div>
				</div>

				{/* Mensaje de error */}
				{error && (
					<div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
						<div className="flex">
							<div className="flex-shrink-0">
								<svg
									className="h-5 w-5 text-red-400"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							<div className="ml-3">
								<p className="text-sm text-red-700">{error}</p>
							</div>
							<div className="ml-auto pl-3">
								<div className="-mx-1.5 -my-1.5">
									<button
										onClick={() => setError(null)}
										className="inline-flex rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none"
									>
										<span className="sr-only">Descartar</span>
										<X size={16} />
									</button>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Estado de carga */}
				{isLoading && !showForm && (
					<div className="flex justify-center my-12">
						<div className="flex flex-col items-center">
							<Loader
								size={36}
								className="animate-spin text-govco-primary mb-2"
							/>
							<p className="text-govco-gray-600">Cargando noticias...</p>
						</div>
					</div>
				)}

				{/* Lista de noticias */}
				{!isLoading && !showForm && filteredNews.length === 0 && (
					<div className="text-center py-10 border rounded-lg bg-gray-50">
						<p className="text-govco-gray-600 mb-2">
							No se encontraron noticias
						</p>
						{searchTerm && (
							<p className="text-govco-gray-500 text-sm">
								Intenta con otro término de búsqueda o{" "}
								<button
									onClick={() => setSearchTerm("")}
									className="text-govco-primary ml-1 hover:underline"
								>
									ver todas las noticias
								</button>
							</p>
						)}
					</div>
				)}

				{!isLoading && !showForm && filteredNews.length > 0 && (
					<div className="overflow-x-auto">
						<table className="w-full border-collapse">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Fecha
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Título
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Entidad
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Acciones
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{filteredNews.map((newsItem) => {
									// Formatear la fecha
									const dateFormatted = format(
										parseISO(newsItem.date),
										"dd/MM/yyyy",
										{
											locale: es,
										}
									)

									return (
										<tr key={newsItem.id} className="hover:bg-gray-50">
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="flex items-center">
													<Calendar
														size={16}
														className="text-govco-gray-500 mr-2"
													/>
													<span className="text-sm text-govco-gray-700">
														{dateFormatted}
													</span>
												</div>
											</td>
											<td className="px-6 py-4">
												<div className="text-sm font-medium text-govco-gray-900 truncate max-w-xs">
													{newsItem.title}
												</div>
												{newsItem.subtitle && (
													<div className="text-xs text-govco-gray-500 truncate max-w-xs">
														{newsItem.subtitle}
													</div>
												)}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-govco-gray-600">
												{newsItem.entityName || "-"}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
												<div className="flex space-x-2">
													<button
														onClick={() => handleEdit(newsItem)}
														className="text-indigo-600 hover:text-indigo-900"
														title="Editar"
													>
														<Edit size={18} />
													</button>
													<button
														onClick={() =>
															newsItem.id && handleDelete(newsItem.id)
														}
														className="text-red-600 hover:text-red-900"
														title="Eliminar"
													>
														<Trash2 size={18} />
													</button>
												</div>
											</td>
										</tr>
									)
								})}
							</tbody>
						</table>
					</div>
				)}

				{/* Formulario para crear/editar noticias */}
				{showForm && (
					<NewsForm
						newsItem={currentNews}
						onSave={handleSave}
						onCancel={handleCloseForm}
						isLoading={isLoading}
					/>
				)}

				{/* Diálogo de confirmación para eliminar */}
				{isDeleting && (
					<div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-30 flex items-center justify-center p-4">
						<div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
							<h3 className="text-lg font-bold text-govco-gray-900 mb-4">
								Confirmar eliminación
							</h3>
							<p className="text-govco-gray-600 mb-6">
								¿Está seguro de que desea eliminar esta noticia? Esta acción no
								se puede deshacer.
							</p>
							<div className="flex justify-end space-x-3">
								<button
									onClick={cancelDelete}
									className="px-4 py-2 border border-gray-300 rounded-lg text-govco-gray-700 hover:bg-gray-50"
								>
									Cancelar
								</button>
								<button
									onClick={confirmDelete}
									className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
									disabled={isLoading}
								>
									{isLoading ? "Eliminando..." : "Eliminar"}
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</DashboardLayout>
	)
}

export default NewsManager
