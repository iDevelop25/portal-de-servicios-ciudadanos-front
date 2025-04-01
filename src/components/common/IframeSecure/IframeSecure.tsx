// Archivo: /Users/johannesmoreno/Downloads/portal-servicios-ciudadanos/frontend/src/components/common/IframeSecure/IframeSecure.tsx

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
 * Un iframe seguro con manejo de errores y estado de carga
 * Útil para cargar contenido externo que podría tener problemas de SSL
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

		// Iniciar la carga nuevamente cuando cambia la URL
		setIsLoading(true)
		setHasError(false)

		// Limpiar event listeners
		return () => {
			iframe.removeEventListener("load", handleLoad)
			iframe.removeEventListener("error", handleError)
		}
	}, [src, onLoad, onError])

	// Usar URL de proxy en desarrollo
	const iframeSrc = src.startsWith("http") ? `/reservation-proxy` : src

	return (
		<div className={`iframe-container relative ${className}`}>
			{isLoading && (
				<div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-govco-primary"></div>
				</div>
			)}

			{hasError && (
				<div className="absolute inset-0 flex items-center justify-center bg-red-50 border border-red-100 rounded-lg">
					<div className="text-center p-4">
						<p className="text-red-500 font-medium mb-2">
							No se pudo cargar el contenido
						</p>
						<button
							onClick={() => {
								setIsLoading(true)
								setHasError(false)
								if (iframeRef.current) {
									iframeRef.current.src = iframeSrc
								}
							}}
							className="px-4 py-2 bg-govco-primary text-white rounded-md hover:bg-govco-secondary transition-colors"
						>
							Reintentar
						</button>
					</div>
				</div>
			)}

			<iframe
				ref={iframeRef}
				src={iframeSrc}
				title={title}
				width={width}
				height={height}
				style={{ border: "none" }}
				sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
				className="rounded-lg bg-white"
			/>
		</div>
	)
}

export default IframeSecure
