// src/pages/TramiteDetail/TramiteDetail.tsx
import { motion } from "framer-motion"
import { useParams } from "react-router-dom"
import ServiceRouteLayout from "../../components/layout/ServiceRouteLayout"
import { getRoutePath } from "../../config/routes"
import useTramiteDetail from "../../hooks/useTramiteDetail"
import ReadMore from "../../components/common/ReadMore"
import defaultTramiteImage from "../../assets/images/top/default.png"

// Opcional: Mapear IDs de trámites a imágenes específicas
const tramiteImages: Record<number, string> = {
	// Ejemplo: 1403: "/assets/images/top/pico-placa.png"
}

function TramiteDetail() {
	// Se extrae el parámetro "id" de la URL (por ejemplo "tramite-1403")
	const { id } = useParams<{ id: string }>()
	const numericId = id ? parseInt(id.replace("tramite-", "")) : 0

	// Se utiliza el hook para obtener la información del trámite
	const { data: tramiteDetail, loading, error } = useTramiteDetail(numericId)

	// Configuración de breadcrumbs para el layout
	const breadcrumbs = [
		{ text: "Servicios", url: getRoutePath("SERVICIOS") },
		{ text: "Trámites", url: "/tramites" },
		{ text: tramiteDetail?.nombreDeLaOferta || "Detalle de Trámite", url: "" },
	]

	// Función para obtener la imagen del trámite, usando una imagen por defecto si no hay específica.
	const getTramiteImage = () => {
		if (!numericId) return defaultTramiteImage
		return tramiteImages[numericId] || defaultTramiteImage
	}

	return (
		<ServiceRouteLayout
			title={tramiteDetail?.nombreDeLaOferta || "Detalle de Trámite"}
			bannerImageUrl="/images/banners/tramites.jpg" // Ajusta esta ruta según tu proyecto.
			breadcrumbs={breadcrumbs}
		>
			<div className="bg-white rounded-lg shadow-md -mt-10 overflow-hidden">
				{loading && (
					<div className="flex justify-center py-8">
						<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-govco-primary"></div>
					</div>
				)}

				{error && (
					<div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
						<p className="text-red-700">{error}</p>
					</div>
				)}

				{!loading && !error && tramiteDetail && (
					<>
						{/* Encabezado con el título y proposito del trámite */}
						<div className="px-6 pt-6 pb-3">
							<div className="w-16 h-1 bg-yellow-400 mx-auto mb-4"></div>
							<h1 className="text-center text-2xl font-semibold mb-3">
								{tramiteDetail.nombreDeLaOferta}
							</h1>
							{tramiteDetail.proposito && (
								<ReadMore text={tramiteDetail.proposito} maxLength={150} />
							)}
						</div>

						{/* Sección de imagen y detalles generales */}
						<div className="flex flex-col md:flex-row px-6 pb-6">
							<div className="md:w-2/5 pr-0 md:pr-6 mb-4 md:mb-0">
								<img
									src={getTramiteImage()}
									alt={tramiteDetail.nombreDeLaOferta}
									className="w-full h-auto object-cover rounded"
								/>
							</div>
							<div className="md:w-3/5">
								<h3 className="text-red-600 font-semibold mb-2">
									Detalles del trámite
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
									<div>
										<p className="mb-1 font-medium">Producto final:</p>
										<p>{tramiteDetail.productoFinal}</p>
									</div>
									<div>
										<p className="mb-1 font-medium">Canal:</p>
										<p>{tramiteDetail.canal}</p>
									</div>
									<div>
										<p className="mb-1 font-medium">Tiempo de obtención:</p>
										<p>{tramiteDetail.tiempoDeObtencion}</p>
									</div>
									<div>
										<p className="mb-1 font-medium">¿Tiene costo?</p>
										<p>
											{tramiteDetail.tieneCosto === "Si"
												? "Sí requiere pago"
												: "No tiene costo"}
										</p>
									</div>
								</div>
								{tramiteDetail.gtengaEnCuenta && (
									<div className="mt-4">
										<h4 className="font-medium mb-1">Tenga en cuenta</h4>
										<ReadMore
											text={tramiteDetail.gtengaEnCuenta}
											maxLength={150}
										/>
									</div>
								)}
							</div>
						</div>

						{/* Sección de descripción y requisitos */}
						<div className="p-6 bg-white">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								<div>
									<h3 className="text-red-600 font-semibold mb-3">
										¿Qué es y para qué sirve?
									</h3>
									<ReadMore text={tramiteDetail.gdescripcion} maxLength={300} />

									<h3 className="text-red-600 font-semibold mt-6 mb-3">
										Requisitos para Persona Natural
									</h3>
									<ReadMore
										text={
											tramiteDetail.grequisitoPn ||
											"No hay requisitos específicos para persona natural"
										}
										maxLength={200}
									/>
									{tramiteDetail.grequisitoPj && (
										<>
											<h3 className="text-red-600 font-semibold mt-6 mb-3">
												Requisitos para Persona Jurídica
											</h3>
											<ReadMore
												text={tramiteDetail.grequisitoPj}
												maxLength={200}
											/>
										</>
									)}
								</div>

								<div>
									<h3 className="text-red-600 font-semibold mb-3">
										¿Dónde se realiza?
									</h3>
									{tramiteDetail.gdescripcionDonde ? (
										<ReadMore
											text={tramiteDetail.gdescripcionDonde}
											maxLength={200}
										/>
									) : (
										<p className="text-sm mb-6">
											{tramiteDetail.urlTramiteLinea ||
												"Se realiza de manera virtual"}
										</p>
									)}

									<h3 className="text-red-600 font-semibold mb-3">
										Costo del trámite
									</h3>
									{tramiteDetail.gdescripcionPago ? (
										<ReadMore
											text={tramiteDetail.gdescripcionPago}
											maxLength={200}
										/>
									) : (
										<p className="text-sm">
											{tramiteDetail.tieneCosto === "Si"
												? "Este trámite requiere un pago."
												: "No tiene costo asociado."}
										</p>
									)}
								</div>
							</div>
						</div>

						{/* Sección de Contactos */}
						<div className="bg-gray-50 px-6 py-6">
							<div className="w-16 h-1 bg-yellow-400 mx-auto mb-4"></div>
							<h3 className="text-xl font-semibold text-center mb-2">
								Contactos y puntos de atención
							</h3>
							<p className="text-center text-sm mb-6 px-6">
								{tramiteDetail.gpuntosDeAtencion ||
									"No se han definido puntos de atención específicos."}
							</p>
						</div>

						{/* Sección de Información legal (se mantiene igual) */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="border-t border-gray-200 px-6 py-4"
						>
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
						</motion.div>
					</>
				)}
			</div>
		</ServiceRouteLayout>
	)
}

export default TramiteDetail
