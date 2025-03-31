// frontend/src/hooks/useFaqs.ts
import { useState, useEffect } from "react"
import useApi from "./useApi"
import { FaqItem, CreateFaqData, UpdateFaqData } from "../types/faq.types"
import { ApiError } from "../types/api.types"
import { FAQS_ENDPOINT } from "../config/env"

/**
 * Hook principal para manejar las FAQs
 *
 * Este hook se conecta con el backend para gestionar todas las operaciones
 * relacionadas con las preguntas frecuentes.
 */
export const useFaqs = () => {
	// Estado para almacenar las FAQs
	const [faqs, setFaqs] = useState<FaqItem[]>([])
	// Estado para manejar carga
	const [loading, setLoading] = useState<boolean>(false)
	// Estado para manejar errores
	const [error, setError] = useState<string | null>(null)

	// Utilizamos el hook de API
	const api = useApi()

	/**
	 * Obtiene todas las FAQs desde la API
	 * El backend ya se encarga de enviar solo las FAQs activas y ordenadas
	 */
	const getAllFaqs = async (): Promise<void> => {
		setLoading(true)
		setError(null)

		try {
			const response = await api.get<FaqItem[]>(FAQS_ENDPOINT)
			if (response.success) {
				setFaqs(response.data || [])
			} else {
				setError(
					response.message || "Error al obtener las preguntas frecuentes"
				)
			}
		} catch (error) {
			const apiError = error as ApiError
			setError(apiError.message || "Error al conectar con el servidor")
		} finally {
			setLoading(false)
		}
	}

	/**
	 * Obtiene una FAQ específica por su ID
	 */
	const getFaqById = async (id: number): Promise<FaqItem | null> => {
		setLoading(true)
		setError(null)

		try {
			const response = await api.get<FaqItem>(`${FAQS_ENDPOINT}/${id}`)
			if (response.success && response.data) {
				return response.data
			} else {
				setError(response.message || "Error al obtener la pregunta frecuente")
				return null
			}
		} catch (error) {
			const apiError = error as ApiError
			setError(apiError.message || "Error al conectar con el servidor")
			return null
		} finally {
			setLoading(false)
		}
	}

	/**
	 * Crea una nueva FAQ
	 * En base al handler createFaq del backend, que espera:
	 * - question: string (requerido)
	 * - answer: string (requerido)
	 * - isOpen: boolean (opcional, default: false)
	 * - order: number (opcional, el backend calculará el siguiente)
	 */
	const createFaq = async (faqData: CreateFaqData): Promise<FaqItem | null> => {
		setLoading(true)
		setError(null)

		try {
			const response = await api.post<FaqItem>(FAQS_ENDPOINT, faqData)
			if (response.success && response.data) {
				// Actualizamos la lista de FAQs
				await getAllFaqs()
				return response.data
			} else {
				setError(response.message || "Error al crear la pregunta frecuente")
				return null
			}
		} catch (error) {
			const apiError = error as ApiError
			setError(apiError.message || "Error al conectar con el servidor")
			return null
		} finally {
			setLoading(false)
		}
	}

	/**
	 * Actualiza una FAQ existente
	 * En base al handler updateFaq del backend, que permite actualizar:
	 * - question
	 * - answer
	 * - isOpen
	 * - order
	 * - isActive
	 */
	const updateFaq = async (
		id: number,
		faqData: UpdateFaqData
	): Promise<FaqItem | null> => {
		setLoading(true)
		setError(null)

		try {
			const response = await api.put<FaqItem>(`${FAQS_ENDPOINT}/${id}`, faqData)
			if (response.success && response.data) {
				// Actualizamos la lista de FAQs
				await getAllFaqs()
				return response.data
			} else {
				setError(
					response.message || "Error al actualizar la pregunta frecuente"
				)
				return null
			}
		} catch (error) {
			const apiError = error as ApiError
			setError(apiError.message || "Error al conectar con el servidor")
			return null
		} finally {
			setLoading(false)
		}
	}

	/**
	 * Elimina una FAQ (soft delete)
	 * El backend realiza un soft delete (marcando isActive = false)
	 */
	const deleteFaq = async (id: number): Promise<boolean> => {
		setLoading(true)
		setError(null)

		try {
			const response = await api.delete<void>(`${FAQS_ENDPOINT}/${id}`)
			if (response.success) {
				// Actualizamos la lista de FAQs
				await getAllFaqs()
				return true
			} else {
				setError(response.message || "Error al eliminar la pregunta frecuente")
				return false
			}
		} catch (error) {
			const apiError = error as ApiError
			setError(apiError.message || "Error al conectar con el servidor")
			return false
		} finally {
			setLoading(false)
		}
	}

	/**
	 * Cambia el estado de abierto/cerrado de una FAQ en la UI local
	 * Este método solo actualiza el estado en el frontend
	 */
	const toggleFaq = (id: number): void => {
		setFaqs((prevFaqs) =>
			prevFaqs.map((faq) =>
				faq.id === id ? { ...faq, isOpen: !faq.isOpen } : faq
			)
		)
	}

	/**
	 * Actualiza el estado de isOpen en una FAQ en el backend
	 */
	const toggleFaqStatus = async (
		id: number,
		isCurrentlyOpen: boolean
	): Promise<boolean> => {
		try {
			const result = await updateFaq(id, { isOpen: !isCurrentlyOpen })
			return !!result
		} catch {
			return false
		}
	}

	// Cargar FAQs al montar el componente
	useEffect(() => {
		getAllFaqs()
	}, [])

	return {
		faqs,
		loading,
		error,
		getAllFaqs,
		getFaqById,
		createFaq,
		updateFaq,
		deleteFaq,
		toggleFaq,
		toggleFaqStatus,
	}
}

export default useFaqs
