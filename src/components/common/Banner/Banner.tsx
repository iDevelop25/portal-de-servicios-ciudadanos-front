interface BannerProps {
	imageUrl: string
	title: string
}

function Banner({ imageUrl, title }: BannerProps) {
	return (
		<div className="relative h-64 bg-cover bg-center w-full mb-8 bg-gray-300">
			{/* Usamos una imagen real en lugar de background-image para mejor manejo */}
			<img
				src={imageUrl}
				alt={title}
				className="absolute inset-0 w-full h-full object-cover"
				onError={(e) => {
					e.currentTarget.src = "/images/services-routes/default.png" // Fallback a imagen estática en public
					console.log("Error al cargar la imagen, usando imagen por defecto")
				}}
			/>

			<div className="absolute inset-0 bg-black bg-opacity-40">
				{/* Título en la esquina superior izquierda */}
				<div className="absolute top-6 left-6">
					<h1 className="text-white text-4xl font-bold">{title}</h1>
				</div>
			</div>
		</div>
	)
}

export default Banner
