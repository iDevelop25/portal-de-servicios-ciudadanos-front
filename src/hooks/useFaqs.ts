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
	 * @param showInactiveItems - Si es true, trae todas las FAQs (activas e inactivas); si es false, solo las activas
	 */
	const getAllFaqs = async (
		showInactiveItems: boolean = false
	): Promise<void> => {
		setLoading(true)
		setError(null)

		try {
			// Agregar query param para incluir inactivas si es necesario
			const endpoint = showInactiveItems
				? `${FAQS_ENDPOINT}?includeInactive=true`
				: `${FAQS_ENDPOINT}?includeInactive=false`

			const response = await api.get<FaqItem[]>(endpoint)
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
			setLoading(false) // Asegurarse de que loading se establezca en false
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
			setLoading(false) // Asegurarse de que loading se establezca en false
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
				// Actualizar datos sin establecer loading=true de nuevo
				const currentShowAll = faqs.some((faq) => !faq.isActive)
				const getResponse = await api.get<FaqItem[]>(
					currentShowAll
						? `${FAQS_ENDPOINT}?includeInactive=true`
						: `${FAQS_ENDPOINT}?includeInactive=false`
				)

				if (getResponse.success) {
					setFaqs(getResponse.data || [])
				}

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
			setLoading(false) // Asegurarse de que loading se establezca en false
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
				// Actualizar datos sin establecer loading=true de nuevo
				const currentShowAll = faqs.some((faq) => !faq.isActive)
				const getResponse = await api.get<FaqItem[]>(
					currentShowAll
						? `${FAQS_ENDPOINT}?includeInactive=true`
						: `${FAQS_ENDPOINT}?includeInactive=false`
				)

				if (getResponse.success) {
					setFaqs(getResponse.data || [])
				}

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
			setLoading(false) // Asegurarse de que loading se establezca en false
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
				// Actualizar datos sin establecer loading=true de nuevo
				const currentShowAll = faqs.some((faq) => !faq.isActive)
				const getResponse = await api.get<FaqItem[]>(
					currentShowAll
						? `${FAQS_ENDPOINT}?includeInactive=true`
						: `${FAQS_ENDPOINT}?includeInactive=false`
				)

				if (getResponse.success) {
					setFaqs(getResponse.data || [])
				}

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
			setLoading(false) // Asegurarse de que loading se establezca en false
		}
	}

	/**
	 * Elimina permanentemente una FAQ (hard delete)
	 * Se utiliza para eliminar definitivamente FAQs que ya están inactivas
	 */
	const permanentDeleteFaq = async (id: number): Promise<boolean> => {
		setLoading(true)
		setError(null)

		try {
			const response = await api.delete<void>(
				`${FAQS_ENDPOINT}/${id}/permanent`
			)
			if (response.success) {
				// Actualizar datos sin establecer loading=true de nuevo
				const currentShowAll = faqs.some((faq) => !faq.isActive)
				const getResponse = await api.get<FaqItem[]>(
					currentShowAll
						? `${FAQS_ENDPOINT}?includeInactive=true`
						: `${FAQS_ENDPOINT}?includeInactive=false`
				)

				if (getResponse.success) {
					setFaqs(getResponse.data || [])
				}

				return true
			} else {
				setError(
					response.message ||
						"Error al eliminar permanentemente la pregunta frecuente"
				)
				return false
			}
		} catch (error) {
			const apiError = error as ApiError
			setError(apiError.message || "Error al conectar con el servidor")
			return false
		} finally {
			setLoading(false) // Asegurarse de que loading se establezca en false
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

	/**
	 * Cambia el estado activo de una FAQ (activar/desactivar)
	 */
	const toggleActiveStatus = async (
		id: number,
		isCurrentlyActive: boolean
	): Promise<boolean> => {
		try {
			const result = await updateFaq(id, { isActive: !isCurrentlyActive })
			return !!result
		} catch {
			return false
		}
	}

	// Cargar FAQs al montar el componente, solo las activas por defecto
	useEffect(() => {
		let isMounted = true // Para evitar problemas con componentes desmontados

		const loadData = async () => {
			setLoading(true)
			setError(null)

			try {
				const endpoint = `${FAQS_ENDPOINT}?includeInactive=false`
				const response = await api.get<FaqItem[]>(endpoint)

				// Solo actualizar el estado si el componente sigue montado
				if (isMounted) {
					if (response.success) {
						setFaqs(response.data || [])
					} else {
						setError(
							response.message || "Error al obtener las preguntas frecuentes"
						)
					}
				}
			} catch (error) {
				if (isMounted) {
					const apiError = error as ApiError
					setError(apiError.message || "Error al conectar con el servidor")
				}
			} finally {
				if (isMounted) {
					setLoading(false)
				}
			}
		}

		loadData()

		// Función de limpieza para cuando el componente se desmonte
		return () => {
			isMounted = false
		}
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
		permanentDeleteFaq,
		toggleFaq,
		toggleFaqStatus,
		toggleActiveStatus,
	}
}

export default useFaqs
