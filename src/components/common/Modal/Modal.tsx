import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	title?: string
	children: React.ReactNode
	size?: "sm" | "md" | "lg" | "xl" | "full"
}

/**
 * Componente Modal reutilizable y moderno
 *
 * Muestra un diálogo modal en el centro de la pantalla con animación
 * y cierre al hacer clic fuera, con el botón de cerrar o presionando Escape
 */
function Modal({
	isOpen,
	onClose,
	title,
	children,
	size = "full",
}: ModalProps) {
	const modalRef = useRef<HTMLDivElement>(null)

	// Mapeo de tamaños para la clase de ancho
	const sizeClasses = {
		sm: "max-w-sm w-full",
		md: "max-w-md w-full",
		lg: "max-w-lg w-full",
		xl: "max-w-xl w-full",
		full: "w-full mx-4 sm:mx-8",
	}

	// Evitar scroll del body cuando el modal está abierto
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden"
		} else {
			document.body.style.overflow = "auto"
		}

		return () => {
			document.body.style.overflow = "auto"
		}
	}, [isOpen])

	// Manejar clic fuera del modal para cerrarlo
	const handleOutsideClick = (e: React.MouseEvent) => {
		if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
			onClose()
		}
	}

	// Manejar tecla escape para cerrar el modal
	useEffect(() => {
		const handleEscKey = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isOpen) {
				onClose()
			}
		}

		if (isOpen) {
			window.addEventListener("keydown", handleEscKey)
		}

		return () => {
			window.removeEventListener("keydown", handleEscKey)
		}
	}, [isOpen, onClose])

	return (
		<AnimatePresence>
			{isOpen && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
					style={{
						paddingTop: "var(--sticky-menu-height, 60px)",
						paddingBottom: "1rem",
						paddingLeft: "1rem",
						paddingRight: "1rem",
					}}
				>
					{/* Overlay con animación de fade in/out */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="absolute inset-0 bg-black/40 backdrop-blur-sm"
						onClick={handleOutsideClick}
					/>

					{/* Contenido del modal con animación */}
					<motion.div
						ref={modalRef}
						initial={{ opacity: 0, scale: 0.95, y: 10 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 10 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
						className={`${sizeClasses[size]} relative bg-white rounded-lg shadow-xl overflow-hidden flex flex-col`}
						style={{
							maxHeight: "calc(100vh - var(--sticky-menu-height, 60px) - 2rem)",
						}}
					>
						{/* Encabezado del modal */}
						{title && (
							<div className="flex items-center justify-between p-4 border-b">
								<h3 className="text-lg font-medium text-gray-900">{title}</h3>
								<button
									onClick={onClose}
									className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
									aria-label="Cerrar"
								>
									<X size={20} />
								</button>
							</div>
						)}

						{/* Cuerpo del modal */}
						<div className="p-4 sm:p-6 overflow-auto flex-1">{children}</div>

						{/* Botón de cerrar si no hay título */}
						{!title && (
							<button
								onClick={onClose}
								className="absolute top-3 right-3 p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
								aria-label="Cerrar"
							>
								<X size={20} />
							</button>
						)}
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	)
}

export default Modal
