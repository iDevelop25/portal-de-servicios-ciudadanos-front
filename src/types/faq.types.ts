// Archivo: frontend/src/types/faq.types.ts

// Definición de una pregunta frecuente
export interface FaqItem {
	id: number
	question: string
	answer: string
	isOpen: boolean
	order: number
	isActive: boolean
	createdAt?: string
	updatedAt?: string
}

// Datos para crear una nueva FAQ
export interface CreateFaqData {
	question: string
	answer: string
	isOpen?: boolean
	order?: number
}

// Datos para actualizar una FAQ existente
export interface UpdateFaqData {
	question?: string
	answer?: string
	isOpen?: boolean
	order?: number
	isActive?: boolean
}

// Respuesta de la API para operaciones con FAQs
export interface FaqApiResponse {
	success: boolean
	data?: FaqItem | FaqItem[]
	message?: string
	errors?: unknown[]
	fromCache?: boolean
}
