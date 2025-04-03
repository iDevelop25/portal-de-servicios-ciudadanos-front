// src/components/common/TramiteRating/TramiteRating.tsx
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import { Star } from "lucide-react"

interface TramiteRatingProps {
	tramiteId: number
	title: string
	className?: string
}

interface RatingStats {
	tramite_id: string
	rating_count: number
	rating_average: number
	rating_distribution: {
		"1": number
		"2": number
		"3": number
		"4": number
		"5": number
	}
}

const TramiteRating = ({
	tramiteId,
	title,
	className = "",
}: TramiteRatingProps) => {
	const [rating, setRating] = useState<number>(0)
	const [hoveredRating, setHoveredRating] = useState<number>(0)
	const [hasVoted, setHasVoted] = useState<boolean>(false)
	const [stats, setStats] = useState<RatingStats | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [submitted, setSubmitted] = useState<boolean>(false)

	// Cargar estadísticas al montar el componente
	useEffect(() => {
		const fetchStats = async () => {
			try {
				setLoading(true)
				const response = await axios.get(
					`/api/portal-servicios-ciudadanos/v1/tramites/${tramiteId}/ratings`
				)

				if (response.data.success) {
					setStats(response.data.data)

					// Si hay estadísticas de valoración, asumimos que el usuario actual ya votó
					// y establecemos su valoración como la valoración promedio (aproximada)
					if (response.data.data && response.data.data.rating_count > 0) {
						const average = Math.round(response.data.data.rating_average)
						setRating(average > 0 ? average : 0)
					}
				} else {
					throw new Error(
						response.data.message || "Error al cargar estadísticas"
					)
				}
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : "Error al cargar estadísticas"
				console.error("Error fetching rating stats:", err)
				setError(errorMessage)
			} finally {
				setLoading(false)
			}
		}

		fetchStats()
	}, [tramiteId, submitted])

	// Enviar calificación al backend
	const submitRating = async (selectedRating: number) => {
		try {
			setLoading(true)
			const response = await axios.post(
				"/api/portal-servicios-ciudadanos/v1/tramites/ratings",
				{
					tramite_id: tramiteId.toString(), // Convertir a string como espera el backend
					rating: selectedRating,
					titulo: title,
				}
			)

			if (response.data.success) {
				setHasVoted(true)
				setRating(selectedRating)
				setSubmitted(true)

				// Actualizar las estadísticas localmente para reflejar el cambio sin esperar nueva carga
				if (stats) {
					// Clonar las estadísticas actuales
					const updatedStats = { ...stats }

					// Si el usuario no había votado antes, incrementar el contador
					if (!hasVoted) {
						updatedStats.rating_count += 1
					}

					// Actualizar la distribución (incrementar la nueva valoración)
					updatedStats.rating_distribution[
						selectedRating.toString() as "1" | "2" | "3" | "4" | "5"
					] += 1

					// Recalcular el promedio (aproximado)
					let total = 0
					let count = 0

					for (let i = 1; i <= 5; i++) {
						const key = i.toString() as "1" | "2" | "3" | "4" | "5"
						total += i * updatedStats.rating_distribution[key]
						count += updatedStats.rating_distribution[key]
					}

					updatedStats.rating_average = count > 0 ? total / count : 0

					// Actualizar el estado
					setStats(updatedStats)
				}

				// Mostrar mensaje de éxito temporalmente
				setTimeout(() => {
					setSubmitted(false)
				}, 3000)
			} else {
				throw new Error(response.data.message || "Error al enviar calificación")
			}
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Error al enviar calificación"
			console.error("Error submitting rating:", err)
			setError(errorMessage)
		} finally {
			setLoading(false)
		}
	}

	// Calcular el porcentaje para las barras de distribución
	const calculatePercentage = (count: number) => {
		if (!stats || stats.rating_count === 0) return 0
		return Math.round((count / stats.rating_count) * 100)
	}

	return (
		<div className={`bg-white rounded-lg p-5 shadow-sm ${className}`}>
			<h3 className="text-lg font-semibold mb-3 text-center">
				¿Qué te pareció este trámite?
			</h3>

			{/* Estrellas interactivas */}
			<div className="flex justify-center mb-4">
				{[1, 2, 3, 4, 5].map((star) => (
					<motion.button
						key={star}
						className="mx-1"
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={() => submitRating(star)}
						onMouseEnter={() => setHoveredRating(star)}
						onMouseLeave={() => setHoveredRating(0)}
						disabled={loading}
						aria-label={`Calificar con ${star} ${
							star === 1 ? "estrella" : "estrellas"
						}`}
					>
						<Star
							size={32}
							className={`transition-colors duration-200 ${
								hoveredRating >= star || (rating >= star && hasVoted)
									? "fill-yellow-400 text-yellow-400"
									: rating >= star
									? "fill-yellow-400 text-yellow-400" // Si ya tiene una valoración mostrarla
									: "text-gray-300"
							}`}
						/>
					</motion.button>
				))}
			</div>

			{/* Mensaje de éxito o error */}
			<AnimatePresence>
				{submitted && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className="text-center mb-4 text-green-600 bg-green-50 py-2 px-4 rounded-md"
					>
						¡Gracias por tu calificación!
					</motion.div>
				)}

				{error && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className="text-center mb-4 text-red-600 bg-red-50 py-2 px-4 rounded-md"
					>
						{error}
					</motion.div>
				)}
			</AnimatePresence>

			{/* Estadísticas de calificación */}
			{stats && !loading && (
				<div className="mt-6">
					<div className="flex justify-between items-center mb-4">
						<span className="text-xl font-bold">
							{stats.rating_average ? stats.rating_average.toFixed(1) : "0.0"}
						</span>
						<span className="text-gray-500 text-sm">
							{stats.rating_count}{" "}
							{stats.rating_count === 1 ? "valoración" : "valoraciones"}
						</span>
					</div>

					{/* Distribución de calificaciones */}
					<div className="space-y-2">
						{[5, 4, 3, 2, 1].map((num) => (
							<div key={num} className="flex items-center">
								<span className="text-sm w-8">{num}</span>
								<div className="flex-1 mx-2 bg-gray-200 rounded-full h-2.5 overflow-hidden">
									<motion.div
										initial={{ width: 0 }}
										animate={{
											width: `${calculatePercentage(
												stats.rating_distribution[
													num.toString() as "1" | "2" | "3" | "4" | "5"
												]
											)}%`,
										}}
										transition={{ duration: 0.8, ease: "easeOut" }}
										className="bg-yellow-400 h-full rounded-full"
									></motion.div>
								</div>
								<span className="text-xs text-gray-500 w-10 text-right">
									{calculatePercentage(
										stats.rating_distribution[
											num.toString() as "1" | "2" | "3" | "4" | "5"
										]
									)}
									%
								</span>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Estado de carga */}
			{loading && (
				<div className="flex justify-center py-4">
					<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-govco-primary"></div>
				</div>
			)}
		</div>
	)
}

export default TramiteRating
