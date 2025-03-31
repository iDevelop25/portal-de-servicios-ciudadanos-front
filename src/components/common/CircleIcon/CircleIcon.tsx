// Ruta: /src/components/common/CircleIcon/CircleIcon.tsx

import { useState } from "react"
import { LucideIcon, ArrowRight, Banknote, Headphones } from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useExternalLink } from "../../../hooks/useExternalLink"

// Función para detectar si es dispositivo móvil
const isMobileDevice = () => {
	// Forzamos que siempre sea un string, incluso si algunas propiedades no existen.
	const userAgent: string =
		navigator.userAgent ||
		navigator.vendor ||
		(window as Window & { opera?: string }).opera ||
		""
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		userAgent
	)
}

/**
 * Props para el componente CircleIcon
 */
interface CircleIconProps {
	/** Componente de icono de Lucide */
	icon: LucideIcon
	/** Título que se mostrará debajo del círculo */
	title: string
	/** Subtítulo o descripción (opcional) */
	subtitle?: string
	/** URL para enlace (opcional) */
	href?: string
	/** URL interna para react-router (opcional) */
	to?: string
	/** Función onClick (opcional) */
	onClick?: () => void
	/** Clases adicionales para personalizar el componente */
	className?: string
	/** Indica si es el botón de línea de asesor */
	isAdvisorLine?: boolean
	/** Mensaje configurable para mostrar en la alerta en dispositivos web */
	advisorWebMessage?: string
}

/**
 * Componente CircleIcon con animaciones avanzadas usando Framer Motion
 * Utilizando variables CSS de GOV.CO.
 */
function CircleIcon({
	icon: Icon,
	title,
	subtitle,
	href,
	to,
	onClick,
	className = "",
	isAdvisorLine = false,
	advisorWebMessage = "Para hablar con un asesor, por favor llame al número 195 desde su teléfono móvil.",
}: CircleIconProps) {
	const [showAlert, setShowAlert] = useState(false)

	// Determinar el ícono a usar según el tipo de botón.
	const ActionIcon = isAdvisorLine
		? Headphones
		: title.toLowerCase().includes("pagar")
		? Banknote
		: Icon

	// Manejador para el clic en la línea de asesor
	const handleAdvisorClick = () => {
		if (isAdvisorLine) {
			if (isMobileDevice()) {
				// En móvil: inicia la llamada al 195
				window.location.href = "tel:195"
			} else {
				// En web: muestra un modal de alerta
				setShowAlert(true)
			}
			return
		}
		if (onClick) onClick()
	}

	// Variantes para animaciones con Framer Motion
	const circleVariants = {
		initial: {
			scale: 1,
			boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
			backgroundColor: "#FFFFFF",
		},
		hover: {
			scale: 1.1,
			boxShadow:
				"0 0 20px rgba(var(--color-govco-danger-rgb, 168, 5, 33), 0.5), inset 0 0 10px rgba(var(--color-govco-danger-rgb, 168, 5, 33), 0.2)",
			backgroundColor: "#FFFFFF",
			transition: {
				type: "spring",
				stiffness: 400,
				damping: 10,
			},
		},
	}

	const iconVariants = {
		initial: {
			rotate: 0,
			fill: "var(--color-govco-danger, #a80521)",
		},
		hover: {
			rotate: [0, -5, 5, -5, 0],
			fill: "var(--color-govco-danger, #a80521)",
			transition: {
				rotate: { repeat: 0, duration: 0.5 },
				fill: { duration: 0.2 },
			},
		},
	}

	const textVariants = {
		initial: { color: "var(--color-govco-gray-600, #323232)" },
		hover: {
			color: "var(--color-govco-danger, #a80521)",
			transition: { duration: 0.3 },
		},
	}

	const subtitleVariants = {
		initial: { opacity: 1, y: 0 },
		hover: {
			opacity: 0,
			y: -5,
			transition: { duration: 0.2 },
		},
	}

	const arrowVariants = {
		initial: { opacity: 0, y: 10, scale: 0.8 },
		hover: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				type: "spring",
				stiffness: 500,
				damping: 25,
				delay: 0.1,
			},
		},
	}

	// Contenido interno del ícono con animaciones
	const content = (
		<motion.div className="relative group" initial="initial" whileHover="hover">
			<motion.div
				variants={circleVariants}
				className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-2 bg-white"
			>
				<motion.div variants={iconVariants} className="text-govco-danger">
					<ActionIcon strokeWidth={1.5} className="w-6 h-6" />
				</motion.div>
			</motion.div>
			<motion.h3
				variants={textVariants}
				className="text-xs font-medium text-center whitespace-nowrap mb-1"
			>
				{title}
			</motion.h3>
			<div className="relative h-4">
				{subtitle && (
					<motion.div
						variants={subtitleVariants}
						className="absolute inset-0 text-center whitespace-nowrap overflow-hidden"
					>
						<p className="text-[10px] text-govco-gray-600 font-bold">
							{subtitle}
						</p>
					</motion.div>
				)}
				<motion.div
					variants={arrowVariants}
					className="absolute inset-0 flex justify-center items-center"
				>
					<ArrowRight className="w-4 h-4 text-govco-warning" />
				</motion.div>
			</div>
		</motion.div>
	)

	// Modal de alerta para la línea de asesor en dispositivos web
	const AlertModal = () => (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white rounded-lg p-6 max-w-md m-4">
				<h3 className="text-lg font-semibold mb-3">Línea de Atención</h3>
				<p className="mb-4">{advisorWebMessage}</p>
				<div className="flex justify-end">
					<button
						className="px-4 py-2 bg-govco-primary text-white rounded hover:bg-govco-danger"
						onClick={() => setShowAlert(false)}
					>
						Entendido
					</button>
				</div>
			</div>
		</div>
	)

	// Clase contenedora
	const wrapperClasses = `block ${className}`

	// Usar el hook para obtener atributos para enlaces externos (target="_blank" y rel="noopener noreferrer")
	const externalLinkProps = useExternalLink(href)

	// Caso especial: botón para línea de asesor
	if (isAdvisorLine) {
		return (
			<>
				{showAlert && <AlertModal />}
				<div
					className={`cursor-pointer ${wrapperClasses}`}
					onClick={handleAdvisorClick}
				>
					{content}
				</div>
			</>
		)
	}

	// Si se usa la prop "to", renderiza como Link de react-router
	if (to) {
		return (
			<Link to={to} className={wrapperClasses} onClick={onClick}>
				{content}
			</Link>
		)
	}

	// Si se usa la prop "href", renderiza como enlace externo con atributos del hook
	if (href) {
		return (
			<a
				href={href}
				{...externalLinkProps}
				className={wrapperClasses}
				onClick={onClick}
			>
				{content}
			</a>
		)
	}

	// Por defecto, renderiza un div con onClick
	return (
		<div className={`cursor-pointer ${wrapperClasses}`} onClick={onClick}>
			{content}
		</div>
	)
}

export default CircleIcon
