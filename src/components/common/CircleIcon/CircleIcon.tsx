import { LucideIcon, ArrowRight, Banknote } from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

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
}

/**
 * Componente CircleIcon con animaciones avanzadas usando Framer Motion
 * Utilizando variables CSS de GOV.CO
 */
function CircleIcon({
	icon: Icon,
	title,
	subtitle,
	href,
	to,
	onClick,
	className = "",
}: CircleIconProps) {
	// Determine icon - use Banknote for payment-related icons
	const PaymentIcon = title.toLowerCase().includes("pagar") ? Banknote : Icon

	// Animation variants utilizando variables CSS
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

	// Contenido interno del componente
	const content = (
		<motion.div className="relative group" initial="initial" whileHover="hover">
			{/* Círculo con icono y efecto de iluminación mejorado */}
			<motion.div
				variants={circleVariants}
				className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-2 bg-white"
			>
				<motion.div variants={iconVariants} className="text-govco-danger">
					<PaymentIcon strokeWidth={1.5} className="w-6 h-6" />
				</motion.div>
			</motion.div>

			{/* Contenedor para título */}
			<motion.h3
				variants={textVariants}
				className="text-xs font-medium text-center whitespace-nowrap mb-1"
			>
				{title}
			</motion.h3>

			{/* Contenedor para subtítulo/flecha con posición absoluta */}
			<div className="relative h-4">
				{/* Subtítulo (visible solo sin hover) */}
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

				{/* Flecha (visible solo con hover) - Misma posición que subtítulo */}
				<motion.div
					variants={arrowVariants}
					className="absolute inset-0 flex justify-center items-center"
				>
					<ArrowRight className="w-4 h-4 text-govco-warning" />
				</motion.div>
			</div>
		</motion.div>
	)

	// Wrapper con clase de ancho personalizable
	const wrapperClasses = `block ${className}`

	// Si hay ruta interna (to), renderiza como Link de react-router
	if (to) {
		return (
			<Link to={to} className={wrapperClasses} onClick={onClick}>
				{content}
			</Link>
		)
	}

	// Si hay href, renderiza como enlace externo
	if (href) {
		return (
			<a href={href} className={wrapperClasses} onClick={onClick}>
				{content}
			</a>
		)
	}

	// Sin href ni to, renderiza como div con onClick opcional
	return (
		<div className={`cursor-pointer ${wrapperClasses}`} onClick={onClick}>
			{content}
		</div>
	)
}

export default CircleIcon
