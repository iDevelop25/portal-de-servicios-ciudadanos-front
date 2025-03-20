// frontend/src/components/common/Fab/Fab.tsx

import { FabProps } from "../../../types/fab.types"

/**
 * Componente Fab (Floating Action Button)
 *
 * Botón flotante que se muestra en una posición fija en la pantalla
 * con una imagen y texto como se muestra en el diseño
 */
function Fab({
	imageUrl,
	altText,
	onClick,
	href,
	className = "",
	position = "bottom-right",
}: FabProps) {
	// Determinar las clases de posición según la prop position
	const positionClasses = {
		"bottom-right": "bottom-6 right-6",
		"bottom-left": "bottom-6 left-6",
		"top-right": "top-6 right-6",
		"top-left": "top-6 left-6",
	}

	// Contenido interno del botón
	const fabContent = (
		<div className="flex flex-col items-center">
			{/* Solo la imagen sin bordes adicionales */}
			<img src={imageUrl} alt={altText} className="w-16 h-16 object-contain" />

			{/* Texto dividido en dos líneas */}
			<div className="text-center mt-1">
				<p className="font-bold text-base leading-tight">HABLA</p>
				<p className="font-bold text-xs text-red-600 leading-tight">
					CON CHATICO
				</p>
			</div>
		</div>
	)

	// Renderizar como enlace o como botón según las props
	return href ? (
		<a
			href={href}
			className={`fixed z-50 transition-all duration-300 hover:scale-105 ${positionClasses[position]} ${className}`}
		>
			{fabContent}
		</a>
	) : (
		<button
			onClick={onClick}
			className={`fixed z-50 transition-all duration-300 hover:scale-105 ${positionClasses[position]} ${className}`}
		>
			{fabContent}
		</button>
	)
}

export default Fab
