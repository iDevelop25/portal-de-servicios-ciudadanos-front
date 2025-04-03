interface SkeletonCardProps {
	className?: string
}

/**
 * Componente que muestra una tarjeta de carga animada
 */
function SkeletonCard({ className = "" }: SkeletonCardProps) {
	return (
		<div
			className={`bg-white rounded-lg shadow-sm overflow-hidden animate-pulse ${className}`}
		>
			<div className="p-5">
				{/* Indicador de tipo */}
				<div className="mb-3 flex items-center">
					<div className="w-3 h-3 rounded-full bg-gray-200 mr-2"></div>
					<div className="w-20 h-4 bg-gray-200 rounded"></div>
				</div>

				{/* Título */}
				<div className="h-6 bg-gray-200 rounded mb-3"></div>

				{/* Descripción */}
				<div className="space-y-2 mb-5">
					<div className="h-4 bg-gray-200 rounded w-full"></div>
					<div className="h-4 bg-gray-200 rounded w-3/4"></div>
					<div className="h-4 bg-gray-200 rounded w-1/2"></div>
				</div>

				{/* Botones */}
				<div className="flex flex-col gap-3">
					<div className="h-10 bg-gray-200 rounded-full"></div>
					<div className="h-10 bg-gray-200 rounded-full"></div>
				</div>
			</div>
		</div>
	)
}

export default SkeletonCard
