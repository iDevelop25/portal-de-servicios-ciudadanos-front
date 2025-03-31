import { useState, useEffect } from "react"
import { StatItem } from "../../../types/stats.types"

interface ProgressStatsProps {
	title?: string
	backgroundImage?: string
	stats: StatItem[]
	className?: string
}

/**
 * Componente ProgressStats
 *
 * Muestra estadísticas de avance con contador animado sobre un fondo personalizable
 */
function ProgressStats({
	title = "¡Conoce nuestros avances!",
	backgroundImage = "/src/assets/images/avances.png",
	stats = [],
	className = "",
}: ProgressStatsProps) {
	// Estado para los valores actuales durante la animación
	const [currentValues, setCurrentValues] = useState<number[]>(
		stats.map(() => 0)
	)

	// Efecto para animar los contadores cuando el componente es visible
	useEffect(() => {
		const animationDuration = 2000 // 2 segundos para la animación
		const steps = 50 // Cantidad de pasos en la animación
		const interval = animationDuration / steps

		// Calcular incremento por paso para cada estadística
		const increments = stats.map((stat) => stat.value / steps)

		// Iniciar animación
		let step = 0
		const timer = setInterval(() => {
			step += 1

			if (step <= steps) {
				setCurrentValues((prevValues) =>
					prevValues.map((_, index) => {
						// Calcula el nuevo valor para este paso
						const newValue = Math.min(
							stats[index].value,
							Math.round(step * increments[index])
						)
						return newValue
					})
				)
			} else {
				// Asegurarse de que los valores finales sean exactos
				setCurrentValues(stats.map((stat) => stat.value))
				clearInterval(timer)
			}
		}, interval)

		return () => clearInterval(timer)
	}, [stats])

	// Función para formatear números grandes con separadores de miles
	const formatNumber = (num: number): string => {
		return new Intl.NumberFormat("es-CO").format(num)
	}

	return (
		<div
			className={`relative w-full py-16 px-4 overflow-hidden ${className}`}
			style={{
				backgroundImage: `url(${backgroundImage})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			{/* Contenido */}
			<div className="relative z-10 container mx-auto max-w-6xl">
				{/* Título */}
				{title && (
					<h2 className="text-center text-3xl font-bold text-black mb-12">
						{title}
					</h2>
				)}

				{/* Grid de estadísticas */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
					{stats.map((stat, index) => (
						<div key={index} className="text-center">
							<p className="text-5xl md:text-6xl font-bold text-white mb-3">
								{formatNumber(currentValues[index])}
							</p>
							<p className="text-black text-lg max-w-xs mx-auto font-medium">
								{stat.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default ProgressStats
