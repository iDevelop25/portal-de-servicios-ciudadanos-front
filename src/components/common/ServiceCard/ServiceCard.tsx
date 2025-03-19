import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { ServiceRoute } from "../../../types/service.types"
import { useState } from "react"

interface ServiceCardProps {
	service: ServiceRoute
}

/**
 * Componente ServiceCard Mejorado
 *
 * Versión premium con efectos avanzados y mejor experiencia de usuario
 * Diseño moderno con animaciones suaves y transiciones elegantes
 * Sin etiqueta sobre la imagen, para un aspecto más limpio
 */
function ServiceCard({ service }: ServiceCardProps) {
	const { title, description, imageUrl, link } = service
	const [isHovered, setIsHovered] = useState(false)

	return (
		<div
			className="group flex flex-col bg-white rounded-2xl overflow-hidden h-full relative shadow-md hover:shadow-xl transition-all duration-500 ease-in-out transform hover:-translate-y-1"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Borde superior con efecto degradado animado */}
			<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-govco-warning via-govco-danger to-govco-primary z-10 before:absolute before:inset-0 before:bg-gradient-to-r before:from-govco-primary before:via-govco-warning before:to-govco-danger before:opacity-0 before:transition-opacity before:duration-700 group-hover:before:opacity-100"></div>

			{/* Contenedor de imagen con ratio 16:9 */}
			<div
				className="relative overflow-hidden"
				style={{ paddingBottom: "56.25%" }}
			>
				{/* Imagen con efecto de zoom y enfoque */}
				<img
					src={imageUrl}
					alt={title}
					className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:filter group-hover:brightness-90"
				/>

				{/* Overlay gradiente que se intensifica en hover */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80"></div>

				{/* Título sobre la imagen con animación */}
				<div className="absolute bottom-0 left-0 right-0 p-5 transform transition-transform duration-300 ease-out">
					<h3 className="text-xl sm:text-2xl font-bold text-white mb-1 drop-shadow-md">
						{title}
					</h3>

					{/* Línea decorativa que se expande en hover */}
					<div className="w-12 h-0.5 bg-govco-warning rounded transition-all duration-500 group-hover:w-20"></div>
				</div>
			</div>

			{/* Contenido de la tarjeta */}
			<div className="p-5 sm:p-6 flex flex-col flex-grow bg-white">
				{/* Descripción con ajuste de altura mínima */}
				<p className="text-govco-gray-600 mb-6 flex-grow min-h-[4rem] leading-relaxed">
					{description}
				</p>

				{/* Enlace "Conoce más..." con animación de deslizamiento */}
				<Link
					to={link}
					className="flex items-center justify-between mt-auto group/link"
					aria-label={`Ver más información sobre ${title}`}
				>
					<span
						className={`font-medium text-sm transition-all duration-300 ${
							isHovered ? "text-govco-danger" : "text-govco-gray-600"
						}`}
					>
						Conoce más...
					</span>

					{/* Contenedor del ícono con efecto de deslizamiento */}
					<div
						className={`relative overflow-hidden rounded-full transition-all duration-300 ${
							isHovered ? "bg-govco-danger" : "bg-govco-warning"
						}`}
					>
						{/* Círculo base */}
						<div className="p-2 text-white flex items-center justify-center relative z-10">
							<ArrowRight
								size={16}
								className={`transition-transform duration-300 ${
									isHovered ? "transform translate-x-0.5" : ""
								}`}
							/>
						</div>

						{/* Efecto de onda al hacer clic */}
						<div className="absolute inset-0 scale-0 rounded-full bg-white/20 group-active/link:scale-150 transition-transform duration-500"></div>
					</div>
				</Link>
			</div>

			{/* Overlay de efecto 3D sutil en hover */}
			<div
				className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
				style={{
					boxShadow:
						"inset 0 -2px 10px rgba(255,255,255,0.2), inset 0 2px 5px rgba(0,0,0,0.1)",
				}}
			></div>
		</div>
	)
}

export default ServiceCard
