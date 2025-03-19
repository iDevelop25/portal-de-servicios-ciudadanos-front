import { useState } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import { FaqItem } from "../../../types/faq.types"

interface FrequentQuestionsProps {
	title?: string
	description?: string
	items: FaqItem[]
	className?: string
}

/**
 * Componente FrequentQuestions
 *
 * Muestra una lista de preguntas frecuentes en un formato de acordeón con animaciones
 */
function FrequentQuestions({
	title = "Preguntas frecuentes",
	description = "Estamos para servirte. Acá encontrará las respuestas a las preguntas más frecuentes realizadas por nuestros ciudadanos.",
	items = [],
	className = "",
}: FrequentQuestionsProps) {
	// Estado para manejar qué preguntas están abiertas
	const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>(() => {
		// Inicializar con cualquier ítem que tenga isOpen=true
		const initialState: { [key: string]: boolean } = {}
		items.forEach((item) => {
			if (item.isOpen) {
				initialState[item.id] = true
			}
		})
		// Si no hay elementos abiertos por defecto, abrimos el primero
		if (Object.keys(initialState).length === 0 && items.length > 0) {
			initialState[items[0].id] = true
		}
		return initialState
	})

	// Función para manejar la apertura/cierre de preguntas
	const toggleItem = (id: string) => {
		setOpenItems((prev) => ({
			...prev,
			[id]: !prev[id],
		}))
	}

	return (
		<div className={`w-full py-12 ${className}`}>
			<div className="container mx-auto max-w-4xl px-4">
				{/* Encabezado */}
				<div className="text-center mb-10">
					<div className="w-20 h-2 rounded-2xl bg-govco-warning mx-auto mb-4"></div>
					<h2 className="text-2xl font-bold mb-3">{title}</h2>
					<p className="text-govco-gray-600 max-w-3xl mx-auto text-sm mb-6">
						{description}
					</p>
				</div>

				{/* Lista de preguntas */}
				<div className="space-y-4">
					{items.map((item) => (
						<div
							key={item.id}
							className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm transition-all duration-300 hover:shadow-md"
						>
							{/* Encabezado de la pregunta */}
							<button
								className={`w-full py-4 px-6 flex justify-between items-center text-left focus:outline-none focus:ring-2 focus:ring-govco-primary focus:ring-inset focus:ring-opacity-50 transition-colors duration-300 ${
									openItems[item.id] ? "bg-gray-50" : "hover:bg-gray-50"
								}`}
								onClick={() => toggleItem(item.id)}
								aria-expanded={openItems[item.id]}
								aria-controls={`faq-answer-${item.id}`}
							>
								<h3
									className={`font-medium transition-colors duration-300 ${
										openItems[item.id]
											? "text-govco-danger"
											: "text-govco-gray-900"
									}`}
								>
									{item.question}
								</h3>
								<div
									className={`ml-2 flex-shrink-0 transition-all duration-300 transform ${
										openItems[item.id]
											? "text-govco-danger"
											: "text-govco-gray-400"
									}`}
								>
									{openItems[item.id] ? (
										<ChevronUp
											size={20}
											className="transition-transform duration-300"
										/>
									) : (
										<ChevronDown
											size={20}
											className="transition-transform duration-300"
										/>
									)}
								</div>
							</button>

							{/* Contenido de la respuesta (colapsable con animación) */}
							<div
								id={`faq-answer-${item.id}`}
								className={`overflow-hidden transition-all duration-300 ease-in-out ${
									openItems[item.id]
										? "max-h-96 opacity-100"
										: "max-h-0 opacity-0"
								}`}
								style={{
									transitionProperty: "max-height, opacity, padding",
									maxHeight: openItems[item.id] ? "500px" : "0px",
								}}
							>
								<div
									className={`px-6 pb-5 pt-2 text-govco-gray-600 border-t border-gray-100 transition-all duration-300 ${
										openItems[item.id] ? "opacity-100" : "opacity-0"
									}`}
								>
									{item.answer}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default FrequentQuestions
