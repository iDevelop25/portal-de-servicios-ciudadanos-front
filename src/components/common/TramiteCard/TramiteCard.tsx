// src/components/common/TramiteCard/TramiteCard.tsx
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Tramite } from "../../../types/service.types"
import { useState } from "react"

interface TramiteCardProps {
	tramite: Tramite
	className?: string
}

/**
 * Componente TramiteCard
 *
 * Versión mejorada con diseño más rectangular y compacto
 * Mejor UI/UX con efectos sutiles de hover
 */
function TramiteCard({ tramite, className = "" }: TramiteCardProps) {
	const { title, icon: Icon, link } = tramite
	const [isHovered, setIsHovered] = useState(false)

	return (
		<div
			className={`bg-white rounded-lg shadow-sm h-full transition-all duration-300 hover:shadow-md ${className}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{ maxWidth: "280px" }}
		>
			<div className="flex items-start p-4">
				{/* Ícono del trámite con efecto de hover */}
				<div
					className={`mr-4 text-govco-gray-500 transition-colors duration-300 ${
						isHovered ? "text-govco-danger" : ""
					}`}
				>
					<Icon
						size={32}
						strokeWidth={1.5}
						className={`transition-transform duration-300 ${
							isHovered ? "scale-110" : ""
						}`}
					/>
				</div>

				{/* Contenido a la derecha del ícono */}
				<div className="flex-1">
					{/* Título del trámite */}
					<h3
						className={`text-base font-semibold mb-3 transition-colors duration-300 ${
							isHovered ? "text-govco-danger" : ""
						}`}
					>
						{title}
					</h3>

					{/* Botón de acción con efecto de hover */}
					<Link
						to={link}
						className="flex items-center text-sm font-medium group"
						aria-label={`Realizar trámite de ${title}`}
					>
						<span
							className={`transition-colors duration-300 ${
								isHovered ? "text-govco-danger" : "text-govco-gray-600"
							}`}
						>
							Realizar trámite
						</span>
						<div
							className={`ml-2 rounded-full p-1.5 text-white transition-all duration-300 ${
								isHovered
									? "bg-govco-danger transform translate-x-1"
									: "bg-govco-warning"
							}`}
						>
							<ArrowRight size={14} />
						</div>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default TramiteCard
