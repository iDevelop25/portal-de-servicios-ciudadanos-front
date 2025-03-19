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
		<div className="flex justify-center w-full relative -mt-2 z-20">
			<div className="w-full max-w-[80%] bg-white rounded-lg shadow-lg pt-10 px-4 pb-12 relative">
				{/* Iconos circulares en el borde superior */}
				<div className="absolute -top-7 left-0 right-0 px-2 sm:px-4 md:px-6 flex justify-around md:justify-evenly">
					{/* Contenedores con ancho fijo para evitar saltos de línea */}
					<div className="w-20 sm:w-24 md:w-28">
						<CircleIcon
							icon={Banknote}
							title="Quiero pagar"
							subtitle="Bogotá te escucha"
							href="#"
							className="mx-auto"
						/>
					</div>

					<div className="w-20 sm:w-24 md:w-28 hidden sm:block">
						<CircleIcon
							icon={PhoneCall}
							title="Quiero que me llamen"
							subtitle="Bogotá te escucha"
							href="#"
							className="mx-auto"
						/>
					</div>

					<div className="w-20 sm:w-24 md:w-28">
						<CircleIcon
							icon={Headphones}
							title="Hablar con un asesor"
							subtitle="Bogotá te escucha"
							href="#"
							className="mx-auto"
						/>
					</div>

					<div className="w-20 sm:w-24 md:w-28 hidden md:block">
						<CircleIcon
							icon={MessageSquare}
							title="Crear petición"
							subtitle="Bogotá te escucha"
							href="#"
							className="mx-auto"
						/>
					</div>

					<div className="w-20 sm:w-24 md:w-28 hidden lg:block">
						<CircleIcon
							icon={Calendar}
							title="Reservar turno"
							subtitle="Bogotá te escucha"
							href="#"
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

					{/* Nueva sección: Trámites y servicios por secretaría */}
					<div className="mt-16">
						<SecretaryServices />
					</div>
				</div>
			</div>
		</div>
	)
}

export default ServiceContainer
