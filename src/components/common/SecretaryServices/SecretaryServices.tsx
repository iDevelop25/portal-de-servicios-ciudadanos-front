import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ChevronDown, Plus, Loader2 } from "lucide-react"
import SecretaryServiceCard from "../SecretaryServiceCard"
import SkeletonCard from "../SkeletonCard"
import { SecretaryServiceItem } from "../../../types/service.types"
import {
	tramitesService,
	TramiteTipologia,
} from "../../../services/tramitesService"

interface SecretaryServicesProps {
	title?: string
	description?: string
	className?: string
	initialItemsToShow?: number
	loadIncrement?: number
}

/**
 * Componente SecretaryServices
 *
 * Muestra una lista de trámites y servicios filtrados por categoría
 * con opciones de ordenamiento y filtrado y paginación progresiva
 */
function SecretaryServices({
	title = "Trámites y servicios por secretaría",
	description = "Aquí encontrarás información y herramientas para acceder de manera rápida y sencilla a trámites, servicios y recursos de interés.",
	className = "",
	initialItemsToShow = 8,
	loadIncrement = 4,
}: SecretaryServicesProps) {
	// Estado para los filtros
	const [activeFilter, setActiveFilter] = useState<
		"todos" | "tramites" | "servicios"
	>("todos")
	// Estado para el dropdown de ordenamiento
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	// Estado para el criterio de ordenamiento
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
	// Estado para la cantidad de elementos a mostrar
	const [itemsToShow, setItemsToShow] = useState(initialItemsToShow)
	// Estado para simular carga
	const [isLoading, setIsLoading] = useState(false)
	// Estado para almacenar los datos de la API
	const [allServices, setAllServices] = useState<SecretaryServiceItem[]>([])
	// Estado para controlar la carga inicial
	const [initialLoading, setInitialLoading] = useState(true)
	// Estado para almacenar el error
	const [error, setError] = useState<string | null>(null)

	// Opciones de ordenamiento
	const sortOptions = [
		{ value: "asc", label: "A - Z" },
		{ value: "desc", label: "Z - A" },
	]

	// Función para cambiar el orden
	const handleSortChange = (order: "asc" | "desc") => {
		setSortOrder(order)
		setIsDropdownOpen(false)
	}

	// Cargar datos iniciales desde la API
	useEffect(() => {
		const fetchServices = async () => {
			setInitialLoading(true)
			try {
				// Determinar la tipología según el filtro activo
				let tipologia: TramiteTipologia = ""
				if (activeFilter === "tramites") {
					tipologia = "tramite_unico"
				} else if (activeFilter === "servicios") {
					tipologia = "servicio"
				}

				// Obtener los datos de la API
				const response = await tramitesService.getTramites(tipologia)

				// Mapear los datos al formato requerido por la interfaz
				const mappedServices: SecretaryServiceItem[] = response.content.map(
					(item) => ({
						id: item.uniqueId.toString(),
						title: item.nombreDeLaOferta,
						type: mapTipologiaToType(item.tipologia),
						description: item.gdescripcion || "Sin descripción disponible",
						link: getItemLink(item.tipologia, item.uniqueId),
					})
				)

				setAllServices(mappedServices)
				setError(null)
			} catch (err) {
				console.error("Error al cargar trámites y servicios:", err)
				setError(
					"Error al cargar trámites y servicios. Por favor, intente de nuevo más tarde."
				)
			} finally {
				setInitialLoading(false)
			}
		}

		fetchServices()
	}, [activeFilter])

	// Restablecer itemsToShow cuando cambia el filtro
	useEffect(() => {
		setItemsToShow(initialItemsToShow)
	}, [activeFilter, initialItemsToShow])

	// Mapear tipología a tipo
	function mapTipologiaToType(tipologia: string): "tramite" | "servicio" {
		if (tipologia === "servicio") {
			return "servicio"
		}
		return "tramite" // Por defecto, considerar como trámite
	}

	// Generar el enlace adecuado según el tipo
	function getItemLink(tipologia: string, id: number): string {
		if (tipologia === "servicio") {
			return `/servicios/servicio-${id}`
		}
		return `/tramites/tramite-${id}`
	}

	// Filtramos y ordenamos los servicios
	const filteredServices = allServices.sort((a, b) => {
		if (sortOrder === "asc") {
			return a.title.localeCompare(b.title)
		} else {
			return b.title.localeCompare(a.title)
		}
	})

	// Los elementos que se mostrarán según el estado actual
	const visibleServices = filteredServices.slice(0, itemsToShow)

	// Determinar si hay más elementos para cargar
	const hasMoreItems = visibleServices.length < filteredServices.length

	// Función para cargar más elementos
	const handleLoadMore = () => {
		// Mantener el comportamiento actual con un estado de carga
		setIsLoading(true)

		// Simular un retraso de red (mantener el comportamiento existente)
		setTimeout(() => {
			setItemsToShow((prevCount) => prevCount + loadIncrement)
			setIsLoading(false)
		}, 800)
	}

	// Función para cerrar el dropdown cuando se hace clic fuera
	const handleClickOutside = () => {
		if (isDropdownOpen) {
			setIsDropdownOpen(false)
		}
	}

	return (
		<div className={`w-full ${className}`} onClick={handleClickOutside}>
			{/* Encabezado de la sección */}
			<div className="text-center mb-8">
				<div className="w-20 h-2 rounded-2xl bg-govco-warning mx-auto mb-4"></div>
				<h2 className="text-2xl font-bold mb-3">{title}</h2>
				<p className="text-govco-gray-600 max-w-3xl mx-auto text-sm mb-6">
					{description}{" "}
					<span className="font-medium">
						Si desea realizar algún pago y visualizar sus acciones favoritas,
						puede{" "}
						<Link
							to="/iniciar-sesion"
							className="text-govco-danger hover:underline"
						>
							iniciar sesión
						</Link>
						.
					</span>
				</p>
			</div>

			{/* Barra de filtros y ordenamiento */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
				{/* Filtros */}
				<div className="flex flex-wrap items-center gap-2">
					<span className="text-govco-gray-700 font-medium">Filtrar por:</span>
					<div className="flex flex-wrap gap-2">
						<button
							className={`py-2 px-6 rounded-full text-sm font-medium transition-colors ${
								activeFilter === "todos"
									? "bg-govco-danger text-white"
									: "bg-white text-govco-gray-700 border border-govco-gray-300 hover:bg-govco-gray-100"
							}`}
							onClick={() => setActiveFilter("todos")}
						>
							Todos
						</button>
						<button
							className={`py-2 px-6 rounded-full text-sm font-medium transition-colors ${
								activeFilter === "tramites"
									? "bg-emerald-500 text-white"
									: "bg-white text-emerald-700 border border-emerald-500 hover:bg-emerald-50"
							}`}
							onClick={() => setActiveFilter("tramites")}
						>
							Trámites
						</button>
						<button
							className={`py-2 px-6 rounded-full text-sm font-medium transition-colors ${
								activeFilter === "servicios"
									? "bg-blue-500 text-white"
									: "bg-white text-blue-700 border border-blue-500 hover:bg-blue-50"
							}`}
							onClick={() => setActiveFilter("servicios")}
						>
							Servicios
						</button>
					</div>
				</div>

				{/* Ordenamiento con Dropdown */}
				<div className="flex items-center relative">
					<span className="mr-2 text-govco-gray-700 font-medium">
						Ordenar por:
					</span>
					<div className="relative">
						<button
							className="flex items-center justify-between w-24 bg-white border border-govco-gray-300 rounded-full py-2 px-4 text-sm font-medium text-govco-gray-700 hover:bg-govco-gray-100 transition-colors"
							onClick={(e) => {
								e.stopPropagation()
								setIsDropdownOpen(!isDropdownOpen)
							}}
							aria-expanded={isDropdownOpen}
							aria-haspopup="true"
						>
							{sortOrder === "asc" ? "A - Z" : "Z - A"}
							<ChevronDown size={16} className="ml-1 text-govco-danger" />
						</button>

						{/* Dropdown menu */}
						{isDropdownOpen && (
							<div className="absolute right-0 mt-1 w-24 bg-white rounded-md shadow-lg z-10 border border-govco-gray-200">
								<div className="py-1">
									{sortOptions.map((option) => (
										<button
											key={option.value}
											className={`block w-full text-left px-4 py-2 text-sm ${
												sortOrder === option.value
													? "bg-govco-gray-100 text-govco-danger font-medium"
													: "text-govco-gray-700 hover:bg-govco-gray-50"
											}`}
											onClick={(e) => {
												e.stopPropagation()
												handleSortChange(option.value as "asc" | "desc")
											}}
										>
											{option.label}
										</button>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Estado de carga inicial con SkeletonCard */}
			{initialLoading && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
					{[...Array(8)].map((_, index) => (
						<SkeletonCard key={`skeleton-${index}`} />
					))}
				</div>
			)}

			{/* Mensaje de error */}
			{error && !initialLoading && (
				<div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
					<div className="flex">
						<div className="ml-3">
							<p className="text-sm text-red-700">{error}</p>
						</div>
					</div>
				</div>
			)}

			{/* Grid de tarjetas de servicios/trámites */}
			{!initialLoading && !error && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
					{visibleServices.map((item) => (
						<SecretaryServiceCard key={item.id} item={item} />
					))}
				</div>
			)}

			{/* Botón "Cargar más" - Solo se muestra si hay más elementos */}
			{!initialLoading && !error && hasMoreItems && (
				<div className="mt-8 text-center">
					<button
						onClick={handleLoadMore}
						disabled={isLoading}
						className="inline-flex items-center justify-center py-2 px-6 rounded-full text-sm border border-govco-danger text-govco-danger hover:bg-govco-danger/10 font-medium transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group"
					>
						{isLoading ? (
							<>
								<Loader2 size={16} className="mr-2 animate-spin" />
								<span>Cargando...</span>
							</>
						) : (
							<>
								<Plus
									size={16}
									className="mr-1.5 transition-transform group-hover:rotate-90"
								/>
								<span>Cargar más trámites y servicios</span>
								<ChevronDown
									size={16}
									className="ml-1.5 transition-transform group-hover:translate-y-0.5"
								/>
							</>
						)}
					</button>
				</div>
			)}

			{/* Mostrar contador de resultados cuando hay elementos */}
			{!initialLoading && !error && visibleServices.length > 0 && (
				<div className="mt-4 text-center text-sm text-govco-gray-600">
					Mostrando {visibleServices.length} de {filteredServices.length}{" "}
					resultados
				</div>
			)}
		</div>
	)
}

export default SecretaryServices
