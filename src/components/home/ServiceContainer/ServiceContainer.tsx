import CircleIcon from "../../common/CircleIcon"
import ServiceCard from "../../common/ServiceCard"
import TramiteCard from "../../common/TramiteCard"
import CardSlider from "../../common/CardSlider"
import SecretaryServices from "../../common/SecretaryServices"
import { ServiceRoute, Tramite } from "../../../types/service.types"
import {
	Banknote,
	PhoneCall,
	Headphones,
	MessageSquare,
	Calendar,
	Car,
	FileText,
	FileSpreadsheet,
	CreditCard,
} from "lucide-react"

// Importamos las imágenes locales
import victimasImage from "../../../assets/images/rutas/victimas.png"
import migrantesImage from "../../../assets/images/rutas/migrantes.png"
import educacionImage from "../../../assets/images/rutas/educacion.png"
import ProgressStats from "../../common/ProgressStats"
import avancesImage from "../../../assets/images/avances.png"
import FrequentQuestions from "../../common/FrequentQuestions"
import ServiceNews from "../../common/ServiceNews"

/**
 * Datos de ejemplo de rutas de servicio
 * En un futuro, estos datos vendrán de un backend
 */
const serviceRoutesData: ServiceRoute[] = [
	{
		id: "victims",
		title: "Víctimas",
		description:
			"Conoce la hoja de ruta de Bogotá, que tiene como objetivo mejorar la calidad de vida de todas y todos los ciudadanos...",
		imageUrl: victimasImage,
		link: "/servicios/victimas",
	},
	{
		id: "migrants",
		title: "Migrantes",
		description:
			"Conoce la hoja de ruta de Bogotá, que tiene como objetivo mejorar la calidad de vida de todas y todos los ciudadanos...",
		imageUrl: migrantesImage,
		link: "/servicios/migrantes",
	},
	{
		id: "education",
		title: "Educación",
		description:
			"Conoce la hoja de ruta de Bogotá, que tiene como objetivo mejorar la calidad de vida de todas y todos los ciudadanos...",
		imageUrl: educacionImage,
		link: "/servicios/educacion",
	},
]

/**
 * Datos de ejemplo de trámites más consultados
 * En un futuro, estos datos vendrán de un backend
 */
const tramitesData: Tramite[] = [
	{
		id: "pico-placa",
		title: "Exención de pico y placa",
		icon: Car,
		link: "/tramites/exencion-pico-placa",
	},
	{
		id: "impuesto-predial",
		title: "Impuesto predial unificado",
		icon: FileText,
		link: "/tramites/impuesto-predial",
	},
	{
		id: "ficha-catastral",
		title: "Ficha catastral de predio",
		icon: FileSpreadsheet,
		link: "/tramites/ficha-catastral",
	},
	{
		id: "pago-fotomultas",
		title: "Pago Fotomultas",
		icon: CreditCard,
		link: "/tramites/pago-fotomultas",
	},
	{
		id: "certificado-tradicion",
		title: "Certificado de tradición",
		icon: FileText,
		link: "/tramites/certificado-tradicion",
	},
	{
		id: "licencia-construccion",
		title: "Licencia de construcción",
		icon: FileSpreadsheet,
		link: "/tramites/licencia-construccion",
	},
]

/**
 * Componente ServiceContainer
 *
 * Contenedor principal que se muestra debajo del slider para mostrar servicios destacados
 * y rutas de servicio en un contenedor único.
 */
function ServiceContainer() {
	return (
		<div className="flex justify-center w-full relative -mt-2 mb-28 md:mb-15 z-20">
			<div className="w-full max-w-[80%] bg-white rounded-lg shadow-lg pt-10 px-4 pb-12 relative">
				{/* Iconos circulares en el borde superior */}
				<div className="absolute -top-7 left-0 right-0 px-2 sm:px-4 md:px-6 flex justify-around md:justify-evenly">
					{/* Contenedores con ancho fijo para evitar saltos de línea */}
					<div className="w-20 sm:w-24 md:w-28">
						<CircleIcon
							icon={Banknote}
							title="Quiero pagar"
							subtitle="Pagos Bogotá"
							href="https://www.bogota.gov.co/servicios/pagosbogota"
							className="mx-auto"
						/>
					</div>

					<div className="w-20 sm:w-24 md:w-28">
						<CircleIcon
							icon={PhoneCall}
							title="Quiero que me llamen"
							subtitle="Ingresa tus datos"
							href="#"
							className="mx-auto"
						/>
					</div>

					<div className="w-20 sm:w-24 md:w-28">
						<CircleIcon
							icon={Headphones}
							title="Quiero hablar con un asesor"
							subtitle="Línea 195"
							isAdvisorLine={true}
							advisorWebMessage="Para comunicarte con un asesor, por favor llama al número 195 desde tu teléfono móvil."
							className="mx-auto"
						/>
					</div>

					<div className="w-20 sm:w-24 md:w-28 hidden md:block">
						<CircleIcon
							icon={MessageSquare}
							title="Crear una petición"
							subtitle="Bogotá te escucha"
							href="https://bogota.gov.co/servicios/bogota-te-escucha"
							className="mx-auto"
						/>
					</div>

					<div className="w-20 sm:w-24 md:w-28 hidden lg:block">
						<CircleIcon
							icon={Calendar}
							title="Reservar turno"
							subtitle="Bogotá te escucha"
							to="/reservar-turno" // Usar 'to' para navegación interna
							className="mx-auto"
						/>
					</div>
				</div>

				{/* Sección de Rutas de Servicio (dentro del contenedor) */}
				<div className="mt-20">
					{/* Encabezado de la sección */}
					<div className="text-center mb-8">
						<div className="w-20 h-2 rounded-2xl bg-govco-warning mx-auto mb-4"></div>
						<h2 className="text-2xl font-bold mb-3">Rutas de servicio</h2>
						<p className="text-govco-gray-600 max-w-3xl mx-auto text-sm mb-6">
							Conoce la hoja de ruta de Bogotá, que tiene como objetivo mejorar
							la calidad de vida de todas y todos los ciudadanos, abordando
							problemas y creando oportunidades para un futuro mejor
						</p>
					</div>

					{/* Grid de tarjetas de servicio */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{serviceRoutesData.map((service) => (
							<ServiceCard key={service.id} service={service} />
						))}
					</div>

					{/* Slider de trámites más consultados */}
					<div className="mt-16">
						<CardSlider
							title="Más consultados"
							cardWidth={250}
							gap={24}
							visibleCards={4}
						>
							{tramitesData.map((tramite) => (
								<TramiteCard
									key={tramite.id}
									tramite={tramite}
									className="h-full"
								/>
							))}
						</CardSlider>
					</div>

					{/* Nueva sección: Novedades en el Servicio */}
					<div className="mt-16">
						<ServiceNews />
					</div>

					{/* Nueva sección: Trámites y servicios por secretaría */}
					<div className="mt-16">
						<SecretaryServices />
					</div>
				</div>

				{/* Sección: Estadísticas de avances */}
				<div className="mt-16 -mx-4">
					<ProgressStats
						backgroundImage={avancesImage}
						stats={[
							{
								value: 207597,
								description: "Personas atendidas en enero de 2025",
							},
							{ value: 288846, description: "Interacciones en enero de 2025" },
							{ value: 39098, description: "Otro dato más" },
						]}
					/>
				</div>

				{/* Nueva sección: Preguntas frecuentes */}
				<div className="mt-16">
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
				</div>
			</div>
		</div>
	)
}

export default ServiceContainer
