// Ruta: src/components/common/IframeSecure/IframeSecure.tsx

import { useState, useEffect, useRef } from "react"

interface IframeSecureProps {
	src: string
	title: string
	width?: string | number
	height?: string | number
	className?: string
	onLoad?: () => void
	onError?: () => void
}

/**
 * Componente IframeSecure
 *
 * Un iframe seguro con manejo mejorado de errores y estado de carga.
 * Se utiliza un proxy para cargar la URL problemática y evitar fallos por SSL.
 */
function IframeSecure({
	src,
	title,
	width = "100%",
	height = "500px",
	className = "",
	onLoad,
	onError,
}: IframeSecureProps) {
	const [isLoading, setIsLoading] = useState(true)
	const [hasError, setHasError] = useState(false)
	const iframeRef = useRef<HTMLIFrameElement>(null)
	// Inicializamos en null para no pasar una cadena vacía al iframe
	const [iframeSrc, setIframeSrc] = useState<string | null>(null)

	// Establecer el src del iframe después del renderizado inicial
	useEffect(() => {
		const timer = setTimeout(() => {
			if (src.startsWith("http")) {
				// Si la URL es la problemática, usamos el proxy para evitar problemas de SSL
				if (src === "https://10.101.5.111:4433") {
					setIframeSrc("/reservation-proxy")
				} else {
					setIframeSrc(src)
				}
			} else {
				setIframeSrc(src)
			}
		}, 100)
		return () => clearTimeout(timer)
	}, [src])

	useEffect(() => {
		const iframe = iframeRef.current
		if (!iframe) return

		// Manejador de carga exitosa
		const handleLoad = () => {
			setIsLoading(false)
			setHasError(false)
			if (onLoad) {
				onLoad()
			}
		}

		// Manejador de errores
		const handleError = () => {
			setIsLoading(false)
			setHasError(true)
			if (onError) {
				onError()
			}
		}

		// Agregar event listeners
		iframe.addEventListener("load", handleLoad)
		iframe.addEventListener("error", handleError)

		// Si el iframeSrc cambia y tiene un valor, reiniciamos los estados de carga y error
		if (iframeSrc) {
			setIsLoading(true)
			setHasError(false)
		}

		// Limpiar event listeners al desmontar o cambiar iframeSrc
		return () => {
			iframe.removeEventListener("load", handleLoad)
			iframe.removeEventListener("error", handleError)
		}
	}, [iframeSrc, onLoad, onError])

	// Contador para intentos de carga
	const [loadAttempts, setLoadAttempts] = useState(0)
	const maxAttempts = 3

	// Reintentar carga si hay error
	useEffect(() => {
		if (hasError && loadAttempts < maxAttempts) {
			const timer = setTimeout(() => {
				if (iframeRef.current && iframeSrc) {
					console.log(
						`Reintentando carga de iframe (intento ${
							loadAttempts + 1
						} de ${maxAttempts})...`
					)
					setLoadAttempts((prev) => prev + 1)
					setIsLoading(true)
					setHasError(false)
					// Forzar recarga agregando timestamp para evitar caché
					const timestamp = new Date().getTime()
					if (iframeSrc.includes("?")) {
						iframeRef.current.src = `${iframeSrc}&_t=${timestamp}`
					} else {
						iframeRef.current.src = `${iframeSrc}?_t=${timestamp}`
					}
				}
			}, 1500)
			return () => clearTimeout(timer)
		}
	}, [hasError, loadAttempts, iframeSrc])

	return (
		<div className={`iframe-container relative ${className}`}>
			{/* Indicador de carga */}
			{isLoading && (
				<div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 bg-opacity-60 z-10">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-govco-primary"></div>
					<p className="mt-4 text-govco-gray-700">Cargando contenido...</p>
				</div>
			)}

			{/* Mensaje de error */}
			{hasError && loadAttempts >= maxAttempts && (
				<div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50 border border-red-100 rounded-lg z-20">
					<div className="text-center p-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-12 w-12 text-red-500 mx-auto mb-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
						<p className="text-red-600 font-medium mb-2">
							No se pudo cargar el contenido
						</p>
						<p className="text-govco-gray-600 mb-4">
							El sistema podría estar temporalmente no disponible. Por favor,
							intente nuevamente más tarde.
						</p>
						<div className="flex flex-col sm:flex-row gap-2 justify-center">
							<button
								onClick={() => {
									setLoadAttempts(0)
									setIsLoading(true)
									setHasError(false)
									if (iframeRef.current && iframeSrc) {
										const timestamp = new Date().getTime()
										if (iframeSrc.includes("?")) {
											iframeRef.current.src = `${iframeSrc}&_t=${timestamp}`
										} else {
											iframeRef.current.src = `${iframeSrc}?_t=${timestamp}`
										}
									}
								}}
								className="px-4 py-2 bg-govco-primary text-white rounded-md hover:bg-govco-secondary transition-colors"
							>
								Reintentar
							</button>
							<a
								href={src}
								target="_blank"
								rel="noopener noreferrer"
								className="px-4 py-2 border border-govco-primary text-govco-primary hover:bg-govco-primary/10 rounded-md transition-colors"
							>
								Abrir en nueva ventana
							</a>
						</div>
					</div>
				</div>
			)}

			{/* Renderiza el iframe solo si iframeSrc tiene un valor válido */}
			{iframeSrc && (
				<iframe
					ref={iframeRef}
					src={iframeSrc}
					title={title}
					width={width}
					height={height}
					style={{
						border: "none",
						backgroundColor: "white",
						position: "relative",
						zIndex: 5,
					}}
					className="rounded-lg"
					sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				/>
			)}
		</div>
	)
}

export default IframeSecure
