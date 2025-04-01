// Archivo: /src/pages/TramiteDetail/TramiteDetail.tsx

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ServiceRouteLayout from "../../components/layout/ServiceRouteLayout"
import { getRoutePath } from "../../config/routes"
import { Tramite } from "../../types/service.types"
import { topService } from "../../services/topService"
import { getIconForTramite } from "../../utils/iconUtils"

// Importaciones para imágenes específicas de los trámites
import predialImage from "../../assets/images/top/predial.png"
import vehiculosImage from "../../assets/images/top/vehiculos.png"
import picoPlacaImage from "../../assets/images/top/pico-placa.png"
import facilidadesImage from "../../assets/images/top/facilidades.png"
import rentaImage from "../../assets/images/top/renta.png"

/**
 * Mapeo de IDs de trámites a sus imágenes correspondientes
 */
const tramiteImages: Record<number, string> = {
	1365: predialImage, // Impuesto predial unificado
	732: vehiculosImage, // Impuesto sobre vehículos automotores
	1403: picoPlacaImage, // Pico y Placa Solidario
	1219: facilidadesImage, // Facilidades de pago
	306: rentaImage, // Renta ciudadana
	// Añadir más imágenes según sea necesario
}

/**
 * Componente para mostrar el detalle de un trámite
 * Obtiene la información del trámite desde la API según el ID en la URL
 */
function TramiteDetail() {
	// Obtenemos el ID del trámite de los parámetros de la URL
	const { id } = useParams<{ id: string }>()

	// Estados para manejar la carga de datos
	const [tramite, setTramite] = useState<Tramite | null>(null)
	const [tramiteId, setTramiteId] = useState<number | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	// Efecto para cargar los datos del trámite
	useEffect(() => {
		const fetchTramiteDetail = async () => {
			setLoading(true)

			try {
				// Extraemos el ID numérico de la URL (formato: "tramite-1234")
				const numericId = id ? parseInt(id.replace("tramite-", "")) : 0

				if (isNaN(numericId) || numericId === 0) {
					throw new Error("ID de trámite inválido")
				}

				setTramiteId(numericId)

				// Obtenemos todos los trámites y buscamos el que coincide con el ID
				const topItems = await topService.getTopItems()
				const selectedItem = topItems.find(
					(item) => item.uniqueId === numericId
				)

				if (!selectedItem) {
					throw new Error("Trámite no encontrado")
				}

				// Extraemos la descripción real del texto que viene de la API
				let description = selectedItem.gdescripcion

				// Eliminamos "¿Qué es y para qué sirve?" si está presente
				if (description.includes("¿Qué es y para qué sirve?")) {
					description = description
						.replace("¿Qué es y para qué sirve?", "")
						.trim()
				}

				// Si el nombre del trámite está repetido al inicio de la descripción, lo eliminamos
				if (description.startsWith(selectedItem.nombreDeLaOferta + ":")) {
					description = description
						.replace(selectedItem.nombreDeLaOferta + ":", "")
						.trim()
				}

				// Convertimos el item al formato de Trámite
				const tramiteData: Tramite = {
					id: `tramite-${selectedItem.uniqueId}`,
					title: selectedItem.nombreDeLaOferta,
					description: description,
					icon: getIconForTramite(selectedItem.nombreDeLaOferta),
					link: `/tramites/tramite-${selectedItem.uniqueId}`,
				}

				setTramite(tramiteData)
				setError(null)
			} catch (err) {
				console.error("Error al cargar el detalle del trámite:", err)
				setError(
					err instanceof Error
						? err.message
						: "No se pudo cargar la información del trámite"
				)
			} finally {
				setLoading(false)
			}
		}

		fetchTramiteDetail()
	}, [id])

	// Título por defecto mientras se carga
	const defaultTitle = id
		? `Trámite ${id.replace("tramite-", "")}`
		: "Detalle de Trámite"

	// Configuración de breadcrumbs
	const breadcrumbs = [
		{ text: "Servicios", url: getRoutePath("SERVICIOS") },
		{ text: "Trámites", url: "/tramites" },
		{ text: tramite?.title || defaultTitle, url: "" },
	]

	// Seleccionar la imagen correcta para el trámite, o usar una por defecto
	const getTramiteImage = () => {
		if (tramiteId && tramiteImages[tramiteId]) {
			return tramiteImages[tramiteId]
		}
		// Imagen por defecto si no hay una específica
		return predialImage
	}

	return (
		<ServiceRouteLayout
			title={tramite?.title || defaultTitle}
			bannerImageUrl="/images/banners/tramites.jpg"
			breadcrumbs={breadcrumbs}
		>
			{/* Contenedor principal con sombra y bordes redondeados */}
			<div className="bg-white rounded-lg shadow-md -mt-10 overflow-hidden">
				{loading && (
					<div className="flex justify-center py-8">
						<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-govco-primary"></div>
					</div>
				)}

				{error && (
					<div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
						<div className="flex">
							<div className="ml-3">
								<p className="text-sm text-red-700">{error}</p>
							</div>
						</div>
					</div>
				)}

				{!loading && !error && tramite && (
					<>
						{/* Sección superior con el título y la descripción general */}
						<div className="px-6 pt-6 pb-3">
							{/* Línea amarilla decorativa */}
							<div className="w-16 h-1 bg-yellow-400 mx-auto mb-4"></div>

							{/* Título centralizado */}
							<h1 className="text-center text-2xl font-semibold mb-3">
								{tramite.title}
							</h1>

							{/* Descripción general */}
							<p className="text-center text-gray-700 mb-6">
								{tramite.description}
							</p>
						</div>

						{/* Sección con imagen y detalles */}
						<div className="flex flex-col md:flex-row px-6 pb-6">
							{/* Imagen del trámite a la izquierda */}
							<div className="md:w-2/5 pr-0 md:pr-6">
								<img
									src={getTramiteImage()}
									alt={tramite.title}
									className="w-full h-auto object-cover"
								/>
							</div>

							{/* Detalles del trámite a la derecha */}
							<div className="md:w-3/5 mt-6 md:mt-0">
								<div className="mb-4">
									<h3 className="text-red-600 font-semibold mb-2">
										Detalles del trámite
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
										<div>
											<p className="text-sm mb-1">Dependencia:</p>
											<p className="font-semibold">Secretaría de Hacienda</p>
										</div>
										<div>
											<p className="text-sm mb-1">Forma de presentación:</p>
											<p className="font-semibold">Presencial - virtual</p>
										</div>
										<div>
											<p className="text-sm mb-1">Tiempo de respuesta:</p>
											<p className="font-semibold">Obtención inmediata</p>
										</div>
									</div>
								</div>

								<div className="mt-6">
									<h3 className="text-red-600 font-semibold mb-2">
										Dirigido a:
									</h3>
									<ul className="list-none">
										<li className="mb-1">• Ciudadano</li>
										<li className="mb-1">• Organizaciones</li>
										<li className="mb-1">• Extranjeros</li>
										<li className="mb-1">
											• Instituciones o dependencias públicas
										</li>
									</ul>
								</div>
							</div>
						</div>

						{/* Sección de requisitos y ayudas */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-0">
							{/* Requisitos y condiciones */}
							<div className="p-6 bg-white">
								<h3 className="text-red-600 font-semibold mb-4">
									Requisitos y condiciones
								</h3>

								<div className="mb-4">
									<h4 className="font-medium mb-1">Documentos requeridos</h4>
									<p className="text-sm">
										Documento de identidad original, sea cédula de ciudadanía o
										extranjería
									</p>
								</div>

								<div className="mb-4">
									<h4 className="font-medium mb-1">Requisitos exigidos</h4>
									<p className="text-sm">Ser propietario del bien inmueble</p>
								</div>

								<div>
									<h4 className="font-medium mb-1">Condiciones especiales</h4>
									<p className="text-sm">
										En caso de no recibir su cuenta de cobro del impuesto
										predial en la dirección a cobro, se debe reclamar en los
										puntos de atención o podrá realizar su pago vía web
									</p>
								</div>
							</div>

							{/* Ayudas y guías */}
							<div className="p-6 bg-white">
								<h3 className="text-red-600 font-semibold mb-4">
									Ayudas y guías para realizar el pago
								</h3>

								<ul className="space-y-3">
									<li className="flex items-start">
										<div className="bg-yellow-100 text-yellow-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
											1
										</div>
										<div>
											<p className="text-sm">
												Paso a paso para pago virtual del impuesto predial
												<a
													href="#"
													className="text-red-600 ml-1 hover:underline"
												>
													Ingresa aquí
												</a>
											</p>
										</div>
									</li>
									<li className="flex items-start">
										<div className="bg-yellow-100 text-yellow-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
											2
										</div>
										<div>
											<p className="text-sm">
												Acceder al manual del trámite
												<a
													href="#"
													className="text-red-600 ml-1 hover:underline"
												>
													Ingresa aquí
												</a>
											</p>
										</div>
									</li>
									<li className="flex items-start">
										<div className="bg-yellow-100 text-yellow-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
											3
										</div>
										<div>
											<p className="text-sm">
												Consulta el estado de la solicitud
												<a
													href="#"
													className="text-red-600 ml-1 hover:underline"
												>
													Ingresa aquí
												</a>
											</p>
										</div>
									</li>
								</ul>

								<div className="mt-6 flex justify-start">
									<a
										href="#"
										className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded-lg font-medium transition-colors text-sm"
									>
										Realizar trámite
									</a>
								</div>
							</div>
						</div>

						{/* Sección de contactos con fondo de color */}
						<div className="bg-gray-100">
							{/* Línea amarilla decorativa */}
							<div className="w-16 h-1 bg-yellow-400 mx-auto mt-6 mb-4"></div>

							<h3 className="text-xl font-semibold text-center mb-2">
								Contactos y puntos de atención
							</h3>
							<p className="text-center text-sm mb-6 px-6">
								De manera presencial puedes dirigirte a las siguientes sedes:
							</p>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 pb-6">
								{/* Punto de atención 1 */}
								<div>
									<h4 className="font-semibold mb-1">Casa de Gobierno</h4>
									<p className="text-sm mb-1">
										<span>Dirección: carrera 79 # 41 Sur - 36.</span>
									</p>
									<p className="text-sm mb-1">
										<span>Teléfono: 604 4444144.</span>
									</p>
									<p className="text-sm mb-1">
										<span>Horario de Atención:</span>
									</p>
									<p className="text-sm">
										lunes jueves de 7:30 a.m. a 12.30 m. y 1:30 p.m. a 5:30 p.m.
										y viernes de 7:30 a.m. a 12:30 m. y de 1:30 p.m. a 4:30 p.m.
									</p>
								</div>

								{/* Punto de atención 2 */}
								<div>
									<h4 className="font-semibold mb-1">Casa de Gobierno</h4>
									<p className="text-sm mb-1">
										<span>Dirección: carrera 79 # 41 Sur - 36.</span>
									</p>
									<p className="text-sm mb-1">
										<span>Teléfono: 604 4444144.</span>
									</p>
									<p className="text-sm mb-1">
										<span>Horario de Atención:</span>
									</p>
									<p className="text-sm">
										lunes jueves de 7:30 a.m. a 12.30 m. y 1:30 p.m. a 5:30 p.m.
										y viernes de 7:30 a.m. a 12:30 m. y de 1:30 p.m. a 4:30 p.m.
									</p>
								</div>
							</div>
						</div>

						{/* Información legal */}
						<div className="border-t border-gray-200 px-6 py-4">
							<div className="border border-blue-200 p-3 bg-blue-50 text-xs text-gray-700">
								<p>
									En el marco de la política de racionalización de trámites y en
									cumplimiento del inciso 2 del artículo 6 del decreto 103 del
									20 de enero de 2015 Por el cual se reglamenta parcialmente la
									Ley 1712 de 2014 "Ley de transparencia y del derecho de acceso
									a la información pública".
								</p>

								<div className="mt-3 text-center">
									<p className="text-red-600 font-medium">
										Información del trámite y normativa asociada
									</p>
									<a
										href="https://www.gov.co/ficha-tramites-y-servicios/T19812"
										target="_blank"
										rel="noopener noreferrer"
										className="text-red-600 hover:underline"
									>
										https://www.gov.co/ficha-tramites-y-servicios/T19812
									</a>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</ServiceRouteLayout>
	)
}

export default TramiteDetail
