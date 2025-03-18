import CircleIcon from "../../common/CircleIcon"
import {
	Banknote,
	PhoneCall,
	Headphones,
	MessageSquare,
	Calendar,
} from "lucide-react"

/**
 * Componente ServiceContainer
 *
 * Contenedor principal que se muestra debajo del slider para mostrar servicios destacados.
 * - Diseño responsivo mejorado
 * - Espaciado optimizado para evitar cortes de texto
 * - Soporte para diferentes tamaños de pantalla
 */
function ServiceContainer() {
	return (
		<div className="flex justify-center w-full relative -mt-2 z-20">
			<div className="w-full max-w-[70%] bg-white rounded-lg shadow-lg pt-10 px-4 pb-6 relative">
				{/* Iconos circulares en el borde superior - Espaciado mejorado */}
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
			</div>
		</div>
	)
}

export default ServiceContainer
