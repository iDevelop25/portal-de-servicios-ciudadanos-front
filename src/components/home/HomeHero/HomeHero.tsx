// /components/home/HomeHero/HomeHero.tsx
import { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import { searchService } from "../../../services/searchService"
import { SearchResult } from "../../../types/search.types"
import { useNavigate } from "react-router-dom"

function HomeHero() {
	const navigate = useNavigate()

	// Usamos imágenes temporales que ya sabemos que funcionan
	const slides = [
		"https://www.bogota.gov.co/sites/default/files/styles/1050px/public/2020-01/plaza-de-bolivar.jpg",
		"https://www.bogota.gov.co/sites/default/files/styles/1050px/public/2019-12/monserrate.jpg",
		"https://www.bogota.gov.co/sites/default/files/styles/1050px/public/2019-12/panoramica-de-bogota.jpg",
	]

	const [currentSlide, setCurrentSlide] = useState(0)
	// Estado para el buscador predictivo
	const [searchQuery, setSearchQuery] = useState("")
	const [searchResults, setSearchResults] = useState<SearchResult[]>([])
	const [isSearching, setIsSearching] = useState(false)
	const [showResults, setShowResults] = useState(false)
	const searchRef = useRef<HTMLDivElement>(null)

	// Autoplay
	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % slides.length)
		}, 5000)
		return () => clearInterval(timer)
	}, [slides.length])

	// Efecto para manejar clics fuera del buscador
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				searchRef.current &&
				!searchRef.current.contains(event.target as Node)
			) {
				setShowResults(false)
			}
		}

		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [])

	// Búsqueda predictiva
	useEffect(() => {
		const delayDebounce = setTimeout(async () => {
			if (searchQuery.length >= 2) {
				setIsSearching(true)
				try {
					// Usar el servicio actualizado
					const results = await searchService.search(searchQuery)
					setSearchResults(results)
					setShowResults(true)
				} catch (error) {
					console.error("Error en la búsqueda:", error)
					setSearchResults([])
				} finally {
					setIsSearching(false)
				}
			} else {
				setSearchResults([])
				setShowResults(false)
			}
		}, 300) // Debounce de 300ms

		return () => clearTimeout(delayDebounce)
	}, [searchQuery])

	// Navegar al anterior slide
	const prevSlide = () => {
		setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
	}

	// Navegar al siguiente slide
	const nextSlide = () => {
		setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
	}

	// Manejar selección de resultado
	const handleResultSelect = (result: SearchResult) => {
		setSearchQuery(result.title)
		setShowResults(false)

		// Redirigir al usuario a la URL proporcionada por el resultado
		if (result.url) {
			navigate(result.url)
		}
	}

	// Manejar envío del formulario
	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (searchQuery.trim()) {
			console.log("Búsqueda enviada:", searchQuery)
			// Si hay resultados disponibles, navegar al primero
			if (searchResults.length > 0 && searchResults[0].url) {
				navigate(searchResults[0].url)
			}
		}
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
			<div
				className="absolute top-[110px] sm:top-[140px] md:top-[160px] inset-x-0 px-4 z-20"
				ref={searchRef}
			>
				<div className="max-w-3xl mx-auto">
					<form onSubmit={handleSearchSubmit}>
						<div className="bg-white rounded-full shadow-lg overflow-hidden transition-transform hover:shadow-xl hover:-translate-y-0.5">
							<div className="flex items-center">
								<div className="pl-4 sm:pl-6 py-2 sm:py-3 text-govco-gray-400 flex-shrink-0">
									<span className="text-xs sm:text-sm md:text-base whitespace-nowrap">
										¿Qué deseas buscar?
									</span>
								</div>
								<input
									type="text"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									onFocus={() => {
										if (searchResults.length > 0) {
											setShowResults(true)
										}
									}}
									placeholder="Pago de impuestos"
									className="flex-1 py-2 sm:py-3 pl-2 pr-3 outline-none text-govco-gray-600 placeholder-govco-gray-300 text-xs sm:text-sm md:text-base"
								/>
								<button
									type="submit"
									className="bg-govco-primary hover:bg-govco-secondary transition-colors text-white p-2 sm:p-3 rounded-full m-1 sm:m-1.5 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-govco-primary focus:ring-offset-2"
									aria-label="Buscar"
								>
									{isSearching ? (
										<div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
									) : (
										<Search
											size={18}
											className="sm:h-[20px] sm:w-[20px] md:h-[22px] md:w-[22px]"
										/>
									)}
								</button>
							</div>
						</div>
					</form>

					{/* Resultados predictivos */}
					{showResults && searchResults.length > 0 && (
						<div className="bg-white mt-2 rounded-lg shadow-lg max-h-60 overflow-y-auto">
							<ul className="py-1">
								{searchResults.map((result) => (
									<li key={result.id}>
										<button
											className="w-full text-left px-4 py-2 hover:bg-govco-gray-100 flex items-center"
											onClick={() => handleResultSelect(result)}
										>
											{result.type === "tramite" && (
												<span className="mr-2 text-xs px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
													Trámite
												</span>
											)}
											{result.type === "servicio" && (
												<span className="mr-2 text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
													Servicio
												</span>
											)}
											<span className="text-sm text-govco-gray-700">
												{result.title}
											</span>
										</button>
									</li>
								))}
							</ul>
						</div>
					)}
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
