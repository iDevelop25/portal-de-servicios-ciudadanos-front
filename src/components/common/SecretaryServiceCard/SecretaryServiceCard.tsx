import { useState } from "react"
import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import { SecretaryServiceItem } from "../../../types/service.types"

interface SecretaryServiceCardProps {
	item: SecretaryServiceItem
	className?: string
}

/**
 * Componente SecretaryServiceCard
 *
 * Tarjeta individual para mostrar un trámite o servicio
 * en la sección de trámites y servicios por secretaría
 */
function SecretaryServiceCard({
	item,
	className = "",
}: SecretaryServiceCardProps) {
	const { title, description, type, link } = item
	const [isHovered, setIsHovered] = useState(false)

	// Colores y textos según el tipo
	const typeColors = {
		tramite: {
			indicator: "bg-emerald-500",
			button: "bg-emerald-500 hover:bg-emerald-600",
			outline: "border-emerald-500 text-emerald-500 hover:bg-emerald-50",
			hoverBorder: "hover:border-emerald-200",
			icon: "text-emerald-500",
		},
		servicio: {
			indicator: "bg-blue-500",
			button: "bg-blue-500 hover:bg-blue-600",
			outline: "border-blue-500 text-blue-500 hover:bg-blue-50",
			hoverBorder: "hover:border-blue-200",
			icon: "text-blue-500",
		},
	}

	// Texto para los botones según el tipo
	const typeText = type === "tramite" ? "trámite" : "servicio"

	return (
		<div
			className={`bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md border border-gray-100 ${typeColors[type].hoverBorder} ${className}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="p-5">
				{/* Indicador de tipo */}
				<div className="mb-3 flex items-center">
					<span
						className={`inline-block w-3 h-3 rounded-full ${typeColors[type].indicator} mr-2`}
					></span>
					<span className="text-xs text-govco-gray-500 capitalize">
						{typeText}
					</span>
				</div>

				{/* Título con altura fija y recorte si es muy largo */}
				<h3
					className={`font-semibold mb-3 min-h-[2.5rem] line-clamp-2 transition-colors duration-300 ${
						isHovered ? typeColors[type].icon : "text-govco-gray-900"
					}`}
				>
					{title}
				</h3>

				{/* Descripción con altura fija y recorte para mantener consistencia */}
				<p className="text-govco-gray-600 text-sm mb-5 min-h-[4rem] line-clamp-3">
					{description}
				</p>

				{/* Botones con colores según el tipo */}
				<div className="flex flex-col gap-3">
					<Link
						to={link}
						className={`text-center py-2 px-4 rounded-full text-white text-sm font-medium transition-all duration-300 ${
							typeColors[type].button
						} ${isHovered ? "translate-y-[-2px]" : ""}`}
						aria-label={`Realizar ${typeText} de ${title}`}
					>
						Realizar {typeText}
					</Link>

					{/* Botón de "Conoce el trámite/servicio" con borde del mismo color que el tipo */}
					<Link
						to={`${link}/info`}
						className={`text-center py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 flex items-center justify-center gap-1 border ${
							isHovered
								? typeColors[type].outline
								: "border-gray-300 text-govco-gray-700 hover:bg-govco-gray-50"
						}`}
						aria-label={`Conoce el ${typeText} de ${title}`}
					>
						<span>Conoce el {typeText}</span>
						<ChevronRight
							size={16}
							className={`transition-transform duration-300 ${
								isHovered ? "transform translate-x-1" : ""
							}`}
						/>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default SecretaryServiceCard
