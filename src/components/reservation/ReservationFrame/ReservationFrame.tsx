// Archivo: /Users/johannesmoreno/Downloads/portal-servicios-ciudadanos/frontend/src/components/reservation/ReservationFrame/ReservationFrame.tsx

import { useState } from "react"
import { env } from "../../../utils/env"
import { ExternalLink } from "lucide-react"
import IframeSecure from "../../common/IframeSecure"

interface ReservationFrameProps {
	className?: string
}

/**
 * Componente ReservationFrame
 *
 * Muestra el sistema de reserva de turnos con opciones mejoradas
 * para manejo de errores y visualización.
 */
function ReservationFrame({ className = "" }: ReservationFrameProps) {
	const [showDirectLink, setShowDirectLink] = useState(false)

	// URL del sistema de reservas
	const reservationUrl = env.RESERVATION_URL

	return (
		<div className={`w-full ${className}`}>
			<div className="mb-6 text-center">
				<h3 className="text-lg font-semibold mb-2 text-govco-gray-800">
					Sistema de Reserva de Turnos
				</h3>
				<p className="text-govco-gray-600 max-w-2xl mx-auto">
					Acceda al sistema de reserva de turnos para programar su atención
					presencial.
				</p>
			</div>

			{/* Vista principal con iframe */}
			<div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
				<IframeSecure
					src={reservationUrl}
					title="Sistema de Reserva de Turnos"
					height="600px"
					className="w-full"
					onError={() => setShowDirectLink(true)}
				/>
			</div>

			{/* Opción alternativa si el usuario prefiere abrir en nueva ventana */}
			<div className="mt-4 text-center">
				{showDirectLink ? (
					<div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
						<p className="text-yellow-700 mb-2">
							Si encuentra problemas para visualizar el sistema, puede abrirlo
							en una nueva ventana:
						</p>
						<a
							href={reservationUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center px-4 py-2 bg-govco-primary text-white rounded-full hover:bg-govco-secondary transition-colors"
						>
							<span>Abrir en nueva ventana</span>
							<ExternalLink className="ml-2" size={16} />
						</a>
					</div>
				) : (
					<button
						onClick={() => setShowDirectLink(true)}
						className="text-govco-primary text-sm hover:underline"
					>
						¿Problemas para visualizar el sistema? Haga clic aquí
					</button>
				)}
			</div>
		</div>
	)
}

export default ReservationFrame
