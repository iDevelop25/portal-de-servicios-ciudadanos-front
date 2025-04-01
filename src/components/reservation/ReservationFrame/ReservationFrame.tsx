// Archivo: /Users/johannesmoreno/Downloads/portal-servicios-ciudadanos/frontend/src/components/reservation/ReservationFrame/ReservationFrame.tsx

import { useState, useEffect } from "react"
import { env } from "../../../utils/env"
import { AlertTriangle, ExternalLink, Info, ChevronRight } from "lucide-react"
import IframeSecure from "../../common/IframeSecure"

interface ReservationFrameProps {
	className?: string
}

/**
 * Componente ReservationFrame
 *
 * Guía al usuario para acceder al sistema de reserva de turnos
 * con manejo de certificados SSL inválidos en desarrollo.
 */
function ReservationFrame({ className = "" }: ReservationFrameProps) {
	const [isFirstVisit, setIsFirstVisit] = useState(true)
	const [currentStep, setCurrentStep] = useState(1)
	const [showIframe, setShowIframe] = useState(false)

	// Comprobar si ya visitó antes
	useEffect(() => {
		const hasVisited = localStorage.getItem("reservation_visited") === "true"
		if (hasVisited) {
			setIsFirstVisit(false)
		}
	}, [])

	const handleContinue = () => {
		// Guardar en localStorage que ya no es primera visita
		localStorage.setItem("reservation_visited", "true")
		setIsFirstVisit(false)
		setShowIframe(true)
	}

	const resetGuide = () => {
		localStorage.removeItem("reservation_visited")
		setIsFirstVisit(true)
		setCurrentStep(1)
		setShowIframe(false)
	}

	// No mostrar guía en producción/staging a menos que se fuerce
	if (!env.SHOW_CERT_GUIDE && !env.isDevelopment) {
		return (
			<div className={`w-full text-center ${className}`}>
				{showIframe ? (
					<IframeSecure
						src={env.RESERVATION_URL}
						title="Sistema de Reserva de Turnos"
						height="600px"
						className="mt-4 w-full"
					/>
				) : (
					<button
						onClick={() => setShowIframe(true)}
						className="flex items-center justify-center mx-auto px-6 py-3 bg-govco-primary text-white rounded-full hover:bg-govco-secondary transition-colors"
					>
						<span>Abrir Sistema de Reserva de Turnos</span>
						<ExternalLink className="ml-2" size={18} />
					</button>
				)}
			</div>
		)
	}

	return (
		<div className={`w-full ${className}`}>
			{isFirstVisit ? (
				<div>
					<div className="flex items-start mb-6">
						<Info
							size={24}
							className="text-govco-primary mr-3 mt-0.5 flex-shrink-0"
						/>
						<h3 className="text-xl font-semibold text-govco-gray-800">
							Información importante sobre el sistema de reservas
						</h3>
					</div>

					<div className="mb-6 pl-9">
						<p className="text-govco-gray-600">
							El sistema de reserva de turnos se abrirá en una nueva ventana.
							Por motivos de seguridad, su navegador mostrará una advertencia
							que deberá aceptar para continuar.
						</p>
					</div>

					{currentStep === 1 && (
						<div className="bg-yellow-50 border-l-4 border-yellow-400 pl-4 py-3 mb-6">
							<div className="flex">
								<span className="flex-shrink-0 w-7 h-7 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
									1
								</span>
								<div className="flex-1">
									<h4 className="font-semibold mb-2 text-govco-gray-800">
										Verá una advertencia de seguridad
									</h4>
									<p className="text-govco-gray-600 mb-3">
										Su navegador mostrará una pantalla similar a esta:
									</p>
									<div className="bg-white shadow-sm border border-govco-gray-200 p-3 rounded-lg mb-3">
										<p className="font-medium text-red-600 mb-2">
											La conexión no es privada
										</p>
										<p className="text-govco-gray-700 text-sm mb-2">
											Es posible que un atacante esté intentando robarte la
											información de <strong>10.101.5.111</strong>
										</p>
										<p className="text-govco-gray-500 text-xs mb-2">
											NET::ERR_CERT_AUTHORITY_INVALID
										</p>
									</div>
								</div>
							</div>
							<div className="flex justify-end mt-2">
								<button
									onClick={() => setCurrentStep(2)}
									className="text-govco-primary flex items-center hover:underline"
								>
									<span>Siguiente paso</span>
									<ChevronRight size={16} className="ml-1" />
								</button>
							</div>
						</div>
					)}

					{currentStep === 2 && (
						<div className="bg-blue-50 border-l-4 border-blue-400 pl-4 py-3 mb-6">
							<div className="flex">
								<span className="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
									2
								</span>
								<div className="flex-1">
									<h4 className="font-semibold mb-2 text-govco-gray-800">
										Haga clic en "Avanzado" o "Configuración avanzada"
									</h4>
									<p className="text-govco-gray-600 mb-3">
										Dependiendo de su navegador, busque la opción para ver más
										detalles o configuración avanzada:
									</p>
									<div className="bg-white shadow-sm border border-govco-gray-200 p-3 rounded-lg mb-2">
										<p className="text-govco-gray-700 mb-2">
											<strong>Chrome/Edge:</strong> Busque "Configuración
											avanzada" en la parte inferior
										</p>
										<p className="text-govco-gray-700 mb-2">
											<strong>Firefox:</strong> Busque "Avanzado" o "Añadir
											excepción"
										</p>
										<p className="text-govco-gray-700">
											<strong>Safari:</strong> Haga clic en "Mostrar detalles" y
											luego "Visitar este sitio web"
										</p>
									</div>
								</div>
							</div>
							<div className="flex justify-between mt-2">
								<button
									onClick={() => setCurrentStep(1)}
									className="text-govco-gray-600 flex items-center hover:underline"
								>
									<ChevronRight size={16} className="mr-1 rotate-180" />
									<span>Anterior</span>
								</button>
								<button
									onClick={() => setCurrentStep(3)}
									className="text-govco-primary flex items-center hover:underline"
								>
									<span>Siguiente paso</span>
									<ChevronRight size={16} className="ml-1" />
								</button>
							</div>
						</div>
					)}

					{currentStep === 3 && (
						<div className="bg-green-50 border-l-4 border-green-400 pl-4 py-3 mb-6">
							<div className="flex">
								<span className="flex-shrink-0 w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
									3
								</span>
								<div className="flex-1">
									<h4 className="font-semibold mb-2 text-govco-gray-800">
										Haga clic en "Continuar" o "Aceptar el riesgo"
									</h4>
									<p className="text-govco-gray-600 mb-3">
										Dependiendo de su navegador, busque la opción para continuar
										al sitio:
									</p>
									<div className="bg-white shadow-sm border border-govco-gray-200 p-3 rounded-lg mb-2">
										<p className="text-govco-gray-700 mb-2">
											<strong>Chrome/Edge:</strong> "Continuar a 10.101.5.111
											(no seguro)"
										</p>
										<p className="text-govco-gray-700 mb-2">
											<strong>Firefox:</strong> "Aceptar el riesgo y continuar"
										</p>
										<p className="text-govco-gray-700">
											<strong>Safari:</strong> "Visitar el sitio web"
										</p>
									</div>
									<p className="text-sm mt-3 flex items-start text-govco-gray-600">
										<AlertTriangle
											size={16}
											className="text-yellow-500 mr-2 flex-shrink-0 mt-0.5"
										/>
										Esta advertencia aparece porque estamos en un entorno de
										desarrollo. En el sistema de producción, este paso no será
										necesario.
									</p>
								</div>
							</div>
							<div className="flex justify-between mt-2">
								<button
									onClick={() => setCurrentStep(2)}
									className="text-govco-gray-600 flex items-center hover:underline"
								>
									<ChevronRight size={16} className="mr-1 rotate-180" />
									<span>Anterior</span>
								</button>
								<button
									onClick={() => setCurrentStep(4)}
									className="text-govco-primary flex items-center hover:underline"
								>
									<span>Siguiente paso</span>
									<ChevronRight size={16} className="ml-1" />
								</button>
							</div>
						</div>
					)}

					{currentStep === 4 && (
						<div className="bg-govco-primary bg-opacity-10 border-l-4 border-govco-primary pl-4 py-3 mb-6">
							<div className="flex">
								<span className="flex-shrink-0 w-7 h-7 bg-govco-primary text-white rounded-full flex items-center justify-center font-bold mr-3">
									4
								</span>
								<div className="flex-1">
									<h4 className="font-semibold mb-2 text-govco-gray-800">
										¡Listo para usar el sistema de reservas!
									</h4>
									<p className="text-govco-gray-600 mb-3">
										Una vez que acepte la advertencia, podrá acceder al sistema
										de reserva de turnos.
									</p>
									<div className="bg-white shadow-sm border border-govco-gray-200 p-3 rounded-lg mb-3">
										<p className="text-govco-gray-700">
											El sistema de reservas se cargará correctamente y podrá
											utilizarlo para programar su turno.
										</p>
									</div>
								</div>
							</div>
							<div className="flex justify-between mt-2">
								<button
									onClick={() => setCurrentStep(3)}
									className="text-govco-gray-600 flex items-center hover:underline"
								>
									<ChevronRight size={16} className="mr-1 rotate-180" />
									<span>Anterior</span>
								</button>
							</div>
						</div>
					)}

					<div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 border-t border-govco-gray-200 pt-6">
						<button
							onClick={handleContinue}
							className="w-full sm:w-auto px-6 py-3 bg-govco-primary text-white rounded-full hover:bg-govco-secondary transition-colors flex items-center justify-center"
						>
							<span>Continuar al sistema de reservas</span>
							<ExternalLink className="ml-2" size={18} />
						</button>

						<button
							onClick={() => setCurrentStep(1)}
							className="text-govco-gray-600 text-sm hover:underline"
						>
							Volver al inicio de la guía
						</button>
					</div>
				</div>
			) : (
				<div className="text-center">
					<h3 className="text-lg font-semibold mb-4 text-govco-gray-800">
						Sistema de Reserva de Turnos
					</h3>

					<p className="text-govco-gray-600 mb-6 max-w-2xl mx-auto">
						Haga clic en el botón para abrir el sistema de reserva de turnos.
						Recuerde que deberá aceptar la advertencia de seguridad para
						acceder.
					</p>

					{showIframe ? (
						<IframeSecure
							src={env.RESERVATION_URL}
							title="Sistema de Reserva de Turnos"
							height="600px"
							className="mt-4 w-full"
						/>
					) : (
						<div className="flex flex-col sm:flex-row justify-center gap-4">
							<button
								onClick={() => setShowIframe(true)}
								className="px-6 py-3 bg-govco-primary text-white rounded-full hover:bg-govco-secondary transition-colors flex items-center justify-center mx-auto"
							>
								<span>Abrir Sistema de Reserva de Turnos</span>
								<ExternalLink className="ml-2" size={18} />
							</button>

							<button
								onClick={resetGuide}
								className="text-govco-primary text-sm hover:underline"
							>
								Ver instrucciones de nuevo
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default ReservationFrame
