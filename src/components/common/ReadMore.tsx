// src/components/common/ReadMore.tsx
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ReadMoreProps {
	text: string
	maxLength?: number // Cantidad máxima de caracteres a mostrar inicialmente (por defecto 200)
}

/**
 * Componente ReadMore
 * Muestra un texto truncado si es muy largo, con un botón "Mostrar más" que al pulsarlo expande o contrae el contenido con animación.
 */
export default function ReadMore({ text, maxLength = 200 }: ReadMoreProps) {
	const [isExpanded, setIsExpanded] = useState(false)
	const toggleExpand = () => setIsExpanded((prev) => !prev)

	// Si el texto es corto, se muestra completo sin botón.
	if (text.length <= maxLength) {
		return <p className="text-sm text-gray-700">{text}</p>
	}

	// Texto truncado con puntos suspensivos.
	const truncatedText = text.slice(0, maxLength) + "..."

	return (
		<div className="overflow-hidden">
			{/* AnimatePresence y motion.div con la propiedad layout hacen que los cambios de altura se animen suavemente */}
			<AnimatePresence initial={false}>
				<motion.div
					key={isExpanded ? "expanded" : "collapsed"}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
					layout
				>
					<p className="text-sm text-gray-700">
						{isExpanded ? text : truncatedText}
					</p>
				</motion.div>
			</AnimatePresence>
			<button
				onClick={toggleExpand}
				className="text-blue-500 hover:underline text-xs mt-1 focus:outline-none"
			>
				{isExpanded ? "Mostrar menos" : "Mostrar más"}
			</button>
		</div>
	)
}
