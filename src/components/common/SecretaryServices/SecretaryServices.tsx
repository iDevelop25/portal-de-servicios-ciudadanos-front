import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ChevronDown, Plus, Loader2 } from "lucide-react"
import SecretaryServiceCard from "../SecretaryServiceCard"
import { SecretaryServiceItem } from "../../../types/service.types"

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

	// Restablecer itemsToShow cuando cambia el filtro
	useEffect(() => {
		setItemsToShow(initialItemsToShow)
	}, [activeFilter, initialItemsToShow])

	// Datos de ejemplo para trámites y servicios
	const servicesData: SecretaryServiceItem[] = [
		{
			id: "certificados-catastrales",
			title: "Certificados Catastrales Entidades Externas",
			type: "tramite",
			description:
				"Pago que todo propietario, poseedor o quien disfrute del bien ajeno, debe realizar sobre los bienes inmuebles...",
			link: "/tramites/certificados-catastrales",
		},
		{
			id: "impuesto-predial",
			title: "Certificado impuesto predial unificado",
			type: "tramite",
			description:
				"Pago que todo propietario, poseedor o quien disfrute del bien ajeno, debe realizar sobre los bienes inmuebles...",
			link: "/tramites/impuesto-predial",
		},
		{
			id: "exencion-pico-placa-1",
			title: "Exención de pico y placa",
			type: "servicio",
			description:
				"Pago que todo propietario, poseedor o quien disfrute del bien ajeno, debe realizar sobre los bienes inmuebles...",
			link: "/servicios/exencion-pico-placa",
		},
		{
			id: "validador-certificados",
			title: "Validador de certificados catastrales",
			type: "servicio",
			description:
				"Pago que todo propietario, poseedor o quien disfrute del bien ajeno, debe realizar sobre los bienes inmuebles...",
			link: "/servicios/validador-certificados",
		},
		{
			id: "exencion-pico-placa-2",
			title: "Exención de pico y placa",
			type: "tramite",
			description:
				"Pago que todo propietario, poseedor o quien disfrute del bien ajeno, debe realizar sobre los bienes inmuebles...",
			link: "/tramites/exencion-pico-placa-2",
		},
		{
			id: "exencion-pico-placa-3",
			title: "Exención de pico y placa",
			type: "tramite",
			description:
				"Pago que todo propietario, poseedor o quien disfrute del bien ajeno, debe realizar sobre los bienes inmuebles...",
			link: "/tramites/exencion-pico-placa-3",
		},
		{
			id: "plano-predio-catastral-1",
			title: "Plano predio catastral",
			type: "servicio",
			description:
				"Pago que todo propietario, poseedor o quien disfrute del bien ajeno, debe realizar sobre los bienes inmuebles...",
			link: "/servicios/plano-predio-catastral-1",
		},
		{
			id: "plano-predio-catastral-2",
			title: "Plano predio catastral",
			type: "servicio",
			description:
				"Pago que todo propietario, poseedor o quien disfrute del bien ajeno, debe realizar sobre los bienes inmuebles...",
			link: "/servicios/plano-predio-catastral-2",
		},
		// Agregar algunos elementos adicionales para probar la funcionalidad de "Cargar más"
		{
			id: "certificado-nomenclatura-1",
			title: "Certificado de nomenclatura",
			type: "tramite",
			description:
				"Pago que todo propietario, poseedor o quien disfrute del bien ajeno, debe realizar sobre los bienes inmuebles...",
			link: "/tramites/certificado-nomenclatura",
		},
		{
			id: "certificado-nomenclatura-2",
			title: "Certificado de nomenclatura urbana",
			type: "tramite",
			description:
				"Pago que todo propietario, poseedor o quien disfrute del bien ajeno, debe realizar sobre los bienes inmuebles...",
			link: "/tramites/certificado-nomenclatura-urbana",
		},
		{
			id: "copia-planos-1",
			title: "Copia de planos urbanísticos",
			type: "servicio",
			description:
				"Pago que todo propietario, poseedor o quien disfrute del bien ajeno, debe realizar sobre los bienes inmuebles...",
			link: "/servicios/copia-planos-urbanisticos",
		},
		{
			id: "copia-planos-2",
			title: "Copia de planos arquitectónicos",
			type: "servicio",
			description:
				"Pago que todo propietario, poseedor o quien disfrute del bien ajeno, debe realizar sobre los bienes inmuebles...",
			link: "/servicios/copia-planos-arquitectonicos",
		},
	]

	// Filtramos los servicios según el filtro activo
	const filteredServices = servicesData
		.filter((item) => {
			if (activeFilter === "todos") return true
			if (activeFilter === "tramites") return item.type === "tramite"
			if (activeFilter === "servicios") return item.type === "servicio"
			return true
		})
		.sort((a, b) => {
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
		// Simular carga desde el backend
		setIsLoading(true)

		// Simular un retraso de red
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
									: "bg-white text-govco-gray-700 border border-govco-gray-300 hover:bg-govco-gray-100"
							}`}
							onClick={() => setActiveFilter("tramites")}
						>
							Trámites
						</button>
						<button
							className={`py-2 px-6 rounded-full text-sm font-medium transition-colors ${
								activeFilter === "servicios"
									? "bg-blue-500 text-white"
									: "bg-white text-govco-gray-700 border border-govco-gray-300 hover:bg-govco-gray-100"
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

			{/* Grid de tarjetas de servicios/trámites */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
				{visibleServices.map((item) => (
					<SecretaryServiceCard key={item.id} item={item} />
				))}
			</div>

			{/* Botón "Cargar más" - Solo se muestra si hay más elementos */}
			{hasMoreItems && (
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
			<div className="mt-4 text-center text-sm text-govco-gray-600">
				Mostrando {visibleServices.length} de {filteredServices.length}{" "}
				resultados
			</div>
		</div>
	)
}

export default SecretaryServices
