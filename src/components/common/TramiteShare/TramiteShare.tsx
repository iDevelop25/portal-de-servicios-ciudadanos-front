// src/components/common/TramiteShare/TramiteShare.tsx
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import {
	Facebook,
	Twitter,
	Linkedin,
	Link2,
	MessageCircle,
	Check,
} from "lucide-react"

interface TramiteShareProps {
	tramiteId: number
	title: string
	className?: string
}

// Define all possible sharing platforms
type SharePlatform =
	| "facebook"
	| "twitter"
	| "whatsapp"
	| "linkedin"
	| "clipboard"
	| "email"

interface ShareStats {
	tramite_id: string
	share_count: number
	share_by_platform: Record<SharePlatform, number>
}

const TramiteShare = ({
	tramiteId,
	title,
	className = "",
}: TramiteShareProps) => {
	const [stats, setStats] = useState<ShareStats | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [copiedToClipboard, setCopiedToClipboard] = useState<boolean>(false)
	const [shareSuccess, setShareSuccess] = useState<string | null>(null)

	// URL actual para compartir
	const shareUrl = window.location.href

	// Cargar estadísticas al montar el componente
	useEffect(() => {
		const fetchStats = async () => {
			try {
				setLoading(true)
				const response = await axios.get(
					`/api/portal-servicios-ciudadanos/v1/tramites/${tramiteId}/shares`
				)
				if (response.data.success) {
					setStats(response.data.data)
				} else {
					throw new Error(
						response.data.message || "Error al cargar estadísticas"
					)
				}
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : "Error al cargar estadísticas"
				console.error("Error fetching share stats:", err)
				setError(errorMessage)
			} finally {
				setLoading(false)
			}
		}

		fetchStats()
	}, [tramiteId])

	// Registrar compartición en el backend
	const registerShare = async (platform: string) => {
		try {
			const response = await axios.post(
				"/api/portal-servicios-ciudadanos/v1/tramites/shares",
				{
					tramite_id: tramiteId.toString(), // Convertir a string como espera el backend
					platform,
					titulo: title,
				}
			)

			if (response.data.success) {
				setShareSuccess(platform)

				// Actualizar estadísticas localmente
				if (stats) {
					const updatedStats = { ...stats }
					updatedStats.share_count += 1

					// Usando una forma type-safe para actualizar el contador de plataformas
					const platformKey = platform as SharePlatform
					if (!updatedStats.share_by_platform[platformKey]) {
						updatedStats.share_by_platform[platformKey] = 0
					}
					updatedStats.share_by_platform[platformKey] += 1

					setStats(updatedStats)
				}

				// Reset mensaje de éxito después de 3 segundos
				setTimeout(() => {
					setShareSuccess(null)
				}, 3000)
			} else {
				throw new Error(
					response.data.message || "Error al registrar compartición"
				)
			}
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Error al registrar compartición"
			console.error("Error registering share:", err)
			setError(errorMessage)

			// Mostrar el error por 3 segundos
			setTimeout(() => {
				setError(null)
			}, 3000)
		}
	}

	// Compartir en Facebook
	const shareFacebook = () => {
		const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
			shareUrl
		)}`
		window.open(url, "_blank")
		registerShare("facebook")
	}

	// Compartir en Twitter
	const shareTwitter = () => {
		const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
			shareUrl
		)}&text=${encodeURIComponent(`Mira este trámite: ${title}`)}`
		window.open(url, "_blank")
		registerShare("twitter")
	}

	// Compartir en LinkedIn
	const shareLinkedIn = () => {
		const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
			shareUrl
		)}`
		window.open(url, "_blank")
		registerShare("linkedin")
	}

	// Compartir por WhatsApp
	const shareWhatsApp = () => {
		const url = `https://wa.me/?text=${encodeURIComponent(
			`Mira este trámite: ${title} ${shareUrl}`
		)}`
		window.open(url, "_blank")
		registerShare("whatsapp")
	}

	// Copiar enlace al portapapeles
	const copyToClipboard = () => {
		navigator.clipboard.writeText(shareUrl).then(() => {
			setCopiedToClipboard(true)
			registerShare("clipboard")

			// Reset después de 3 segundos
			setTimeout(() => {
				setCopiedToClipboard(false)
			}, 3000)
		})
	}

	// Animación para los botones
	const buttonVariants = {
		initial: { scale: 1 },
		hover: { scale: 1.1, transition: { duration: 0.2 } },
		tap: { scale: 0.95, transition: { duration: 0.1 } },
	}

	// Obtener porcentaje de cada plataforma para el gráfico
	const getSharePercentage = (platform: string) => {
		if (!stats || stats.share_count === 0) return 0
		const platformKey = platform as SharePlatform
		const count = stats.share_by_platform[platformKey] || 0
		return Math.round((count / stats.share_count) * 100)
	}

	return (
		<div className={`bg-white rounded-lg p-5 shadow-sm ${className}`}>
			<h3 className="text-lg font-semibold mb-3 text-center">
				Comparte este trámite
			</h3>

			{/* Botones de compartir */}
			<div className="flex justify-center space-x-4 mb-6">
				<motion.button
					variants={buttonVariants}
					initial="initial"
					whileHover="hover"
					whileTap="tap"
					onClick={shareFacebook}
					className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center"
					aria-label="Compartir en Facebook"
				>
					<Facebook size={20} />
				</motion.button>

				<motion.button
					variants={buttonVariants}
					initial="initial"
					whileHover="hover"
					whileTap="tap"
					onClick={shareTwitter}
					className="w-10 h-10 rounded-full bg-sky-400 text-white flex items-center justify-center"
					aria-label="Compartir en Twitter"
				>
					<Twitter size={20} />
				</motion.button>

				<motion.button
					variants={buttonVariants}
					initial="initial"
					whileHover="hover"
					whileTap="tap"
					onClick={shareWhatsApp}
					className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center"
					aria-label="Compartir en WhatsApp"
				>
					<MessageCircle size={20} />
				</motion.button>

				<motion.button
					variants={buttonVariants}
					initial="initial"
					whileHover="hover"
					whileTap="tap"
					onClick={shareLinkedIn}
					className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center"
					aria-label="Compartir en LinkedIn"
				>
					<Linkedin size={20} />
				</motion.button>

				<motion.button
					variants={buttonVariants}
					initial="initial"
					whileHover="hover"
					whileTap="tap"
					onClick={copyToClipboard}
					className="w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center relative"
					aria-label="Copiar enlace"
				>
					{copiedToClipboard ? <Check size={20} /> : <Link2 size={20} />}
				</motion.button>
			</div>

			{/* Mensaje de éxito */}
			<AnimatePresence>
				{shareSuccess && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className="text-center mb-4 text-green-600 bg-green-50 py-2 px-4 rounded-md"
					>
						¡Contenido compartido en {shareSuccess}!
					</motion.div>
				)}

				{copiedToClipboard && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className="text-center mb-4 text-green-600 bg-green-50 py-2 px-4 rounded-md"
					>
						¡Enlace copiado al portapapeles!
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

			{/* Estadísticas de compartición */}
			{stats && !loading && stats.share_count > 0 && (
				<div className="mt-6">
					<div className="flex justify-between items-center mb-4">
						<span className="text-lg font-semibold">
							Comparticiones totales
						</span>
						<span className="text-govco-primary font-bold text-xl">
							{stats.share_count}
						</span>
					</div>

					{/* Gráfico de distribución por plataforma */}
					<div className="space-y-3">
						{Object.keys(stats.share_by_platform).map((platform) => {
							const platformKey = platform as SharePlatform
							const count = stats.share_by_platform[platformKey] || 0
							if (count === 0) return null

							const platformColors: Record<string, string> = {
								facebook: "bg-blue-600",
								twitter: "bg-sky-400",
								whatsapp: "bg-green-500",
								linkedin: "bg-blue-700",
								clipboard: "bg-gray-700",
								email: "bg-yellow-500",
							}

							return (
								<div key={platform} className="flex items-center">
									<span className="text-sm capitalize w-20">{platform}</span>
									<div className="flex-1 mx-2 bg-gray-200 rounded-full h-2.5 overflow-hidden">
										<motion.div
											initial={{ width: 0 }}
											animate={{ width: `${getSharePercentage(platform)}%` }}
											transition={{ duration: 0.8, ease: "easeOut" }}
											className={`${
												platformColors[platform] || "bg-blue-500"
											} h-full rounded-full`}
										></motion.div>
									</div>
									<span className="text-xs text-gray-500 w-14 text-right">
										{count} ({getSharePercentage(platform)}%)
									</span>
								</div>
							)
						})}
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

export default TramiteShare
