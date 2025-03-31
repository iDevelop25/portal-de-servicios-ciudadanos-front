import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import useFaqs from "../../../hooks/useFaqs"

interface FrequentQuestionsProps {
	title?: string
	subtitle?: string
	className?: string
	items?: {
		id: string
		question: string
		answer: string
		isOpen?: boolean
	}[]
}

/**
 * Componente FrequentQuestions
 *
 * Muestra una lista de preguntas frecuentes con funcionalidad de acordeón
 * y efectos de animación al abrir/cerrar cada pregunta.
 */
function FrequentQuestions({
	title = "Preguntas Frecuentes",
	subtitle = "Aquí encontrarás respuestas a las dudas más comunes",
	className = "",
}: FrequentQuestionsProps) {
	// Usamos nuestro hook personalizado
	const { faqs, loading, error, toggleFaq } = useFaqs()

	// Animaciones para el acordeón
	const accordionVariants = {
		hidden: {
			opacity: 0,
			height: 0,
			transition: {
				duration: 0.3,
				ease: "easeInOut",
			},
		},
		visible: {
			opacity: 1,
			height: "auto",
			transition: {
				duration: 0.3,
				ease: "easeInOut",
			},
		},
	}

	// Animación para el icono
	const iconVariants = {
		closed: { rotate: 0 },
		open: { rotate: 180 },
	}

	return (
		<div className={`w-full py-12 px-4 ${className}`}>
			<div className="container mx-auto max-w-4xl">
				{/* Encabezado */}
				<div className="text-center mb-10">
					<h2 className="text-3xl font-bold mb-3">{title}</h2>
					{subtitle && <p className="text-gray-600">{subtitle}</p>}
				</div>

				{/* Estado de carga */}
				{loading && (
					<div className="flex justify-center my-8">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
					</div>
				)}

				{/* Mensaje de error */}
				{error && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
						<strong className="font-bold">Error:</strong>
						<span className="block sm:inline"> {error}</span>
					</div>
				)}

				{/* Lista de FAQs */}
				{!loading && faqs.length > 0 && (
					<div className="space-y-4">
						{faqs.map((faq) => (
							<div
								key={faq.id}
								className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
							>
								{/* Pregunta (cabecera del acordeón) */}
								<button
									className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 flex justify-between items-center transition-colors duration-200"
									onClick={() => toggleFaq(faq.id)}
									aria-expanded={faq.isOpen}
								>
									<span className="font-medium">{faq.question}</span>
									<motion.span
										className="text-blue-500"
										animate={faq.isOpen ? "open" : "closed"}
										variants={iconVariants}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
												clipRule="evenodd"
											/>
										</svg>
									</motion.span>
								</button>

								{/* Respuesta (contenido del acordeón) */}
								<AnimatePresence>
									{faq.isOpen && (
										<motion.div
											key={`answer-${faq.id}`}
											initial="hidden"
											animate="visible"
											exit="hidden"
											variants={accordionVariants}
											className="overflow-hidden"
										>
											<div className="px-6 py-4 bg-white">
												<p className="text-gray-700">{faq.answer}</p>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						))}
					</div>
				)}

				{/* Mensaje cuando no hay FAQs */}
				{!loading && faqs.length === 0 && !error && (
					<div className="text-center py-8 text-gray-500">
						No se encontraron preguntas frecuentes.
					</div>
				)}
			</div>
		</div>
	)
}

export default FrequentQuestions
