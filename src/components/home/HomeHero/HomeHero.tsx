import { useState, useEffect } from "react"
import { Search } from "lucide-react"

function HomeHero() {
	// Usamos imágenes temporales que ya sabemos que funcionan
	const slides = [
		"https://www.bogota.gov.co/sites/default/files/styles/1050px/public/2020-01/plaza-de-bolivar.jpg",
		"https://www.bogota.gov.co/sites/default/files/styles/1050px/public/2019-12/monserrate.jpg",
		"https://www.bogota.gov.co/sites/default/files/styles/1050px/public/2019-12/panoramica-de-bogota.jpg",
	]

	const [currentSlide, setCurrentSlide] = useState(0)

	// Autoplay
	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % slides.length)
		}, 5000)
		return () => clearInterval(timer)
	}, [slides.length])

	// Navegar al anterior slide
	const prevSlide = () => {
		setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
	}

	// Navegar al siguiente slide
	const nextSlide = () => {
		setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
	}

	return (
		<section className="relative w-full">
			{/* Slider de imágenes - Altura adaptable según dispositivo */}
			<div className="h-[360px] sm:h-[350px] md:h-[380px] relative overflow-hidden">
				{slides.map((src, idx) => (
					<div
						key={idx}
						className={`absolute inset-0 transition-opacity duration-1000 ${
							idx === currentSlide ? "opacity-100" : "opacity-0"
						}`}
					>
						<img
							src={src}
							alt={`Slide ${idx + 1}`}
							className="w-full h-full object-cover"
						/>
						<div className="absolute inset-0 bg-black opacity-40"></div>
					</div>
				))}

				{/* Botones laterales - Aumentando z-index para garantizar que funcionen */}
				<button
					onClick={prevSlide}
					className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-60 hover:bg-opacity-80 p-2 rounded-full z-30 transition-all focus:outline-none focus:ring-2 focus:ring-govco-primary"
					aria-label="Slide anterior"
				>
					<svg
						className="w-5 h-5 md:w-6 md:h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>
				<button
					onClick={nextSlide}
					className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-60 hover:bg-opacity-80 p-2 rounded-full z-30 transition-all focus:outline-none focus:ring-2 focus:ring-govco-primary"
					aria-label="Slide siguiente"
				>
					<svg
						className="w-5 h-5 md:w-6 md:h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</button>

				{/* Navegación del slider - Movido arriba del texto de ayuda */}
				<div className="absolute bottom-20 sm:bottom-24 md:bottom-28 inset-x-0 flex justify-center gap-2 z-20">
					{slides.map((_, idx) => (
						<button
							key={idx}
							className={`h-1.5 rounded-full transition-all ${
								idx === currentSlide ? "w-8 bg-govco-warning" : "w-3 bg-white"
							}`}
							onClick={() => setCurrentSlide(idx)}
							aria-label={`Ir a slide ${idx + 1}`}
						></button>
					))}
				</div>
			</div>

			{/* Título y subtítulo - Posicionamiento mejorado */}
			<div className="absolute top-6 sm:top-10 md:top-12 inset-x-0 text-center z-10 px-4">
				<h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 drop-shadow-lg tracking-tight leading-tight max-w-4xl mx-auto">
					Bienvenido al Portal de Servicios Ciudadanos
				</h1>
				<p className="text-xs sm:text-base md:text-lg text-white drop-shadow-lg max-w-3xl mx-auto mb-6 sm:mb-8">
					¡Explora y simplifica tus gestiones con nosotros!
				</p>
			</div>

			{/* Buscador - Posicionamiento ajustado para evitar solapamientos */}
			<div className="absolute top-[110px] sm:top-[140px] md:top-[160px] inset-x-0 px-4 z-20">
				<div className="max-w-3xl mx-auto bg-white rounded-full shadow-lg overflow-hidden transition-transform hover:shadow-xl hover:-translate-y-0.5">
					<div className="flex items-center">
						<div className="pl-4 sm:pl-6 py-2 sm:py-3 text-govco-gray-400 flex-shrink-0">
							<span className="text-xs sm:text-sm md:text-base whitespace-nowrap">
								¿Qué deseas buscar?
							</span>
						</div>
						<input
							type="text"
							placeholder="Pago de impuestos"
							className="flex-1 py-2 sm:py-3 pl-2 pr-3 outline-none text-govco-gray-600 placeholder-govco-gray-300 text-xs sm:text-sm md:text-base"
						/>
						<button
							className="bg-govco-primary hover:bg-govco-secondary transition-colors text-white p-2 sm:p-3 rounded-full m-1 sm:m-1.5 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-govco-primary focus:ring-offset-2"
							aria-label="Buscar"
						>
							<Search
								size={18}
								className="sm:h-[20px] sm:w-[20px] md:h-[22px] md:w-[22px]"
							/>
						</button>
					</div>
				</div>
			</div>

			{/* Sección "¿Cómo podemos ayudarte?" - Posicionamiento ajustado */}
			<div className="absolute bottom-6 sm:bottom-10 md:bottom-12 inset-x-0 text-center z-10 px-4">
				<h2 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 drop-shadow-lg">
					¿Cómo podemos ayudarte?
				</h2>
				<p className="text-xs sm:text-sm text-white drop-shadow-lg px-4 max-w-3xl mx-auto">
					Estos son accesos rápidos para servicios o trámites que requieras
				</p>
			</div>
		</section>
	)
}

export default HomeHero
