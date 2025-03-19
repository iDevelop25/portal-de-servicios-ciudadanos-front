/**
 * Interfaz para los elementos de preguntas frecuentes
 */
export interface FaqItem {
	id: string
	question: string
	answer: string
	isOpen?: boolean
}
