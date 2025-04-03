import { useState } from "react"
import { ChevronRight } from "lucide-react"
import Modal from "./Modal/Modal"

interface ReadMoreProps {
	text: string
	maxLength?: number // Cantidad máxima de caracteres a mostrar inicialmente (por defecto 200)
	title?: string // Título opcional para el modal
	modalSize?: "sm" | "md" | "lg" | "xl" | "full" // Tamaño del modal
}

/**
 * Componente ReadMore mejorado
 * Muestra un texto truncado si es muy largo, con un botón "Mostrar más" que al pulsarlo
 * abre un modal con el texto completo en lugar de expandir el contenido in-place.
 */
export default function ReadMore({
	text,
	maxLength = 200,
	title = "Información completa",
	modalSize = "full",
}: ReadMoreProps) {
	const [isModalOpen, setIsModalOpen] = useState(false)

	// Si el texto es corto, se muestra completo sin botón
	if (text.length <= maxLength) {
		return <p className="text-gray-700 leading-relaxed">{text}</p>
	}

	// Texto truncado con puntos suspensivos
	const truncatedText = text.slice(0, maxLength) + "..."

	// Abrir el modal
	const openModal = () => setIsModalOpen(true)

	// Cerrar el modal
	const closeModal = () => setIsModalOpen(false)

	return (
		<div className="w-full">
			<p className="text-gray-700 leading-relaxed">
				{truncatedText}
				<button
					onClick={openModal}
					className="ml-2 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors focus:outline-none focus:underline"
				>
					Mostrar más
					<ChevronRight size={16} className="ml-1" />
				</button>
			</p>

			<Modal
				isOpen={isModalOpen}
				onClose={closeModal}
				title={title}
				size={modalSize}
			>
				<div className="prose prose-lg max-w-none">
					<p className="text-gray-700 leading-relaxed whitespace-pre-line">
						{text}
					</p>
				</div>
			</Modal>
		</div>
	)
}
