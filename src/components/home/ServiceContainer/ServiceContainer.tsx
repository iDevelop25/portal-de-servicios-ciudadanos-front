import { lazy, Suspense } from "react"
import { motion } from "framer-motion"
import {
	Banknote,
	PhoneCall,
	Headphones,
	MessageSquare,
	Calendar,
} from "lucide-react"

// Importamos las imágenes locales
// import victimasImage from "../../../assets/images/rutas/victimas.png"
// import migrantesImage from "../../../assets/images/rutas/migrantes.png"
// import educacionImage from "../../../assets/images/rutas/educacion.png"
import avancesImage from "../../../assets/images/avances.png"
import { useTopItems } from "../../../hooks/useTopItems"
// import { ServiceRoute } from "../../../types/service.types"

// Lazy loading de componentes
const CircleIcon = lazy(() => import("../../common/CircleIcon"))
const TramiteCard = lazy(() => import("../../common/TramiteCard"))
const CardSlider = lazy(() => import("../../common/CardSlider"))
const SecretaryServices = lazy(() => import("../../common/SecretaryServices"))
const ProgressStats = lazy(() => import("../../common/ProgressStats"))
const FrequentQuestions = lazy(() => import("../../common/FrequentQuestions"))
const ServiceNews = lazy(() => import("../../common/ServiceNews"))

// Componente para Suspense fallback
const LoadingPlaceholder = ({ height = "200px", width = "100%" }) => (
	<div
		className="bg-gray-100 animate-pulse rounded-lg"
		style={{ height, width }}
	></div>
)

// Componente para animación al hacer scroll
import { ReactNode } from "react"
import ServiceGroupSlider from "../../common/ServiceGroupSlider"

const FadeInSection = ({
	children,
	delay = 0,
	className = "",
}: {
	children: ReactNode
	delay?: number
	className?: string
}) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-100px" }}
			transition={{ duration: 0.6, ease: "easeOut", delay }}
			className={className}
		>
			{children}
		</motion.div>
	)
}

/**
 * Datos de ejemplo de rutas de servicio
 * En un futuro, estos datos vendrán de un backend
 */
// const serviceRoutesData: ServiceRoute[] = [
// 	{
// 		id: "victims",
// 		title: "Víctimas",
// 		description:
// 			"Conoce la hoja de ruta de Bogotá, que tiene como objetivo mejorar la calidad de vida de todas y todos los ciudadanos...",
// 		imageUrl: victimasImage,
// 		link: "/servicios/victimas",
// 	},
// 	{
// 		id: "migrants",
// 		title: "Migrantes",
// 		description:
// 			"Conoce la hoja de ruta de Bogotá, que tiene como objetivo mejorar la calidad de vida de todas y todos los ciudadanos...",
// 		imageUrl: migrantesImage,
// 		link: "/servicios/migrantes",
// 	},
// 	{
// 		id: "education",
// 		title: "Educación",
// 		description:
// 			"Conoce la hoja de ruta de Bogotá, que tiene como objetivo mejorar la calidad de vida de todas y todos los ciudadanos...",
// 		imageUrl: educacionImage,
// 		link: "/servicios/educacion",
// 	},
// ]

/**
 * Componente ServiceContainer
 *
 * Contenedor principal que se muestra debajo del slider para mostrar servicios destacados
 * y rutas de servicio en un contenedor único, con lazy loading y animaciones.
 */
function ServiceContainer() {
	// Usar el hook para obtener los trámites más consultados de forma dinámica
	const {
		tramites: tramitesData,
		loading: tramitesLoading,
		error: tramitesError,
	} = useTopItems(6)

	return (
		<div className="flex justify-center w-full relative -mt-2 mb-28 md:mb-15 z-20">
			<div className="w-full max-w-[80%] bg-white rounded-lg shadow-lg pt-10 px-4 pb-12 relative">
				{/* Iconos circulares en el borde superior */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="absolute -top-7 left-0 right-0 px-2 sm:px-4 md:px-6 flex justify-around md:justify-evenly"
				>
					{/* Contenedores con ancho fijo para evitar saltos de línea */}
					<div className="w-20 sm:w-24 md:w-28">
						<Suspense
							fallback={<LoadingPlaceholder height="80px" width="80px" />}
						>
							<CircleIcon
								icon={Banknote}
								title="Quiero pagar"
								subtitle="Pagos Bogotá"
								href="https://www.bogota.gov.co/servicios/pagosbogota"
								className="mx-auto"
							/>
						</Suspense>
					</div>

					<div className="w-20 sm:w-24 md:w-28">
						<Suspense
							fallback={<LoadingPlaceholder height="80px" width="80px" />}
						>
							<CircleIcon
								icon={PhoneCall}
								title="Quiero que me llamen"
								subtitle="Ingresa tus datos"
								href="#"
								className="mx-auto"
							/>
						</Suspense>
					</div>

					<div className="w-20 sm:w-24 md:w-28">
						<Suspense
							fallback={<LoadingPlaceholder height="80px" width="80px" />}
						>
							<CircleIcon
								icon={Headphones}
								title="Quiero hablar con un asesor"
								subtitle="Línea 195"
								isAdvisorLine={true}
								advisorWebMessage="Para comunicarte con un asesor, por favor llama al número 195 desde tu teléfono móvil."
								className="mx-auto"
							/>
						</Suspense>
					</div>

					<div className="w-20 sm:w-24 md:w-28 hidden md:block">
						<Suspense
							fallback={<LoadingPlaceholder height="80px" width="80px" />}
						>
							<CircleIcon
								icon={MessageSquare}
								title="Crear una petición"
								subtitle="Bogotá te escucha"
								href="https://bogota.gov.co/servicios/bogota-te-escucha"
								className="mx-auto"
							/>
						</Suspense>
					</div>

					<div className="w-20 sm:w-24 md:w-28 hidden lg:block">
						<Suspense
							fallback={<LoadingPlaceholder height="80px" width="80px" />}
						>
							<CircleIcon
								icon={Calendar}
								title="Reservar turno"
								subtitle="Bogotá te escucha"
								to="/reservar-turno" // Usar 'to' para navegación interna
								className="mx-auto"
							/>
						</Suspense>
					</div>
				</motion.div>

				{/* Nueva sección: Novedades en el Servicio */}
				<FadeInSection delay={0.1} className="mt-16">
					<Suspense fallback={<LoadingPlaceholder height="350px" />}>
						<ServiceNews />
					</Suspense>
				</FadeInSection>

				{/* Sección de Rutas de Servicio (dentro del contenedor) */}
				<div className="mt-20">
					{/* Encabezado de la sección */}
					<FadeInSection delay={0.2}>
						<div className="text-center mb-8">
							<div className="w-20 h-2 rounded-2xl bg-govco-warning mx-auto mb-4"></div>
							<h2 className="text-2xl font-bold mb-3">Rutas de servicio</h2>
							<p className="text-govco-gray-600 max-w-3xl mx-auto text-sm mb-6">
								Conoce las rutas de servicio que hemos diseñado para hacer más
								fácil tu experiencia de conocer y acceder a la oferta que tiene
								el distrito.
							</p>
						</div>
					</FadeInSection>

					{/* Slider de Rutas de Servicio */}
					<FadeInSection delay={0.3}>
						<Suspense fallback={<LoadingPlaceholder height="350px" />}>
							<ServiceGroupSlider />
						</Suspense>
					</FadeInSection>

					{/* Slider de trámites más consultados */}
					<FadeInSection delay={0.4} className="mt-16">
						<Suspense fallback={<LoadingPlaceholder height="300px" />}>
							<CardSlider
								title="Más consultados"
								cardWidth={250}
								gap={24}
								visibleCards={4}
							>
								{tramitesLoading
									? Array(4)
											.fill(0)
											.map((_, index) => (
												<div
													key={`skeleton-${index}`}
													className="h-full p-4 bg-gray-100 rounded-lg animate-pulse"
												>
													<div className="w-10 h-10 bg-gray-200 rounded-full mb-4"></div>
													<div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
													<div className="h-4 bg-gray-200 rounded w-1/2"></div>
												</div>
											))
									: tramitesError
									? [
											<div key="error" className="p-4 text-red-500">
												No se pudieron cargar los trámites más consultados
											</div>,
									  ]
									: tramitesData.map((tramite) => (
											<Suspense
												key={tramite.id}
												fallback={
													<LoadingPlaceholder height="300px" width="250px" />
												}
											>
												<TramiteCard tramite={tramite} className="h-full" />
											</Suspense>
									  ))}
							</CardSlider>
						</Suspense>
					</FadeInSection>

					{/* Nueva sección: Trámites y servicios por secretaría */}
					<FadeInSection delay={0.4} className="mt-16">
						<Suspense fallback={<LoadingPlaceholder height="400px" />}>
							<SecretaryServices />
						</Suspense>
					</FadeInSection>
				</div>

				{/* Sección: Estadísticas de avances */}
				<FadeInSection delay={0.5} className="mt-16 -mx-4">
					<Suspense fallback={<LoadingPlaceholder height="300px" />}>
						<ProgressStats
							backgroundImage={avancesImage}
							stats={[
								{
									value: 207597,
									description: "Personas atendidas en enero de 2025",
								},
								{
									value: 288846,
									description: "Interacciones en enero de 2025",
								},
								{ value: 39098, description: "Otro dato más" },
							]}
						/>
					</Suspense>
				</FadeInSection>

				{/* Nueva sección: Preguntas frecuentes */}
				<FadeInSection delay={0.6} className="mt-16">
					<Suspense fallback={<LoadingPlaceholder height="400px" />}>
						<FrequentQuestions
							items={[
								{
									id: "pagos-pendientes",
									question: "¿Cómo consulto el estado de mis pagos pendientes?",
									answer:
										"Estamos para servirte. Acá encontrará las respuestas a las preguntas más frecuentes realizadas por nuestros ciudadanos. Estamos para servirte. Acá encontrará las respuestas a las preguntas más frecuentes realizadas por nuestros ciudadanos.. Estamos para servirte. Acá encontrará las respuestas a las preguntas más frecuentes realizadas por nuestros ciudadanos.",
									isOpen: true,
								},
								{
									id: "varios-tramites",
									question:
										"¿Puedo pagar varios trámites en una sola transacción?",
									answer:
										"Sí, es posible realizar el pago de varios trámites en una sola transacción. Para ello, debe seleccionar todos los trámites que desea pagar y agregarlos al carrito de compras. Luego, podrá proceder al pago en un solo paso.",
								},
								{
									id: "pagos-presenciales",
									question: "¿Es posible realizar pagos de manera presencial?",
									answer:
										"Sí, puede realizar pagos de manera presencial en cualquiera de nuestros puntos de atención o en entidades bancarias autorizadas presentando el recibo con código de barras que puede generar desde nuestro portal.",
								},
								{
									id: "comprobante-pago",
									question: "¿Cómo puedo obtener un comprobante de pago?",
									answer:
										"Puede obtener un comprobante de pago ingresando a la sección 'Mis trámites' de su cuenta, seleccionando el trámite correspondiente y haciendo clic en 'Descargar comprobante'. También puede solicitarlo presencialmente en nuestros puntos de atención.",
								},
								{
									id: "pago-no-reflejado",
									question:
										"¿Qué debo hacer si mi pago no se ve reflejado en el sistema?",
									answer:
										"Si su pago no se ve reflejado en el sistema después de 48 horas, le recomendamos conservar su comprobante de pago y comunicarse con nuestra línea de atención al ciudadano al 123-456-7890 o escribirnos a soporte@bogota.gov.co para verificar el estado de su transacción.",
								},
							]}
						/>
					</Suspense>
				</FadeInSection>
			</div>
		</div>
	)
}

export default ServiceContainer
