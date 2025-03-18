import { Link } from "react-router-dom"

/**
 * TopBar Component
 *
 * Barra superior siguiendo los lineamientos de GOV.CO
 * Incluye logo de GOV.CO, opciones de inicio de sesión/registro y selector de idioma
 */
function TopBar() {
	return (
		<nav className="bg-govco-primary w-full" aria-label="Barra superior">
			<div className="container mx-auto px-4 py-2 flex flex-wrap justify-between items-center">
				{/* Logo GOV.CO con enlace al portal oficial */}
				<a
					href="https://www.gov.co/"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Portal del Estado Colombiano - GOV.CO"
					className="flex items-center no-underline text-white"
				>
					<img
						src="https://cdn.www.gov.co/assets/images/logo.svg"
						alt="Logo GOV.CO"
						className="h-6 mr-2"
					/>
				</a>

				{/* Opciones de autenticación e idioma - Responsive */}
				<div className="flex items-center gap-2 md:gap-4">
					<Link
						to="/iniciar-sesion"
						className="text-white hover:text-govco-gray-100 text-xs md:text-sm transition-colors whitespace-nowrap"
					>
						Iniciar sesión
					</Link>

					<Link
						to="/registrarse"
						className="bg-white text-govco-primary hover:bg-govco-gray-100 px-2 md:px-4 py-1 rounded-full text-xs md:text-sm font-medium transition-colors whitespace-nowrap"
					>
						Registrarse
					</Link>

					{/* Selector de idioma */}
					<div className="relative">
						<button
							className="text-white flex items-center hover:text-govco-gray-100 transition-colors"
							aria-label="Cambiar idioma"
							type="button"
						>
							<svg
								className="w-4 h-4 md:w-5 md:h-5 mr-1"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
								/>
							</svg>
							<span className="text-xs md:text-sm hidden sm:inline">
								Español
							</span>
							<svg
								className="ml-1 w-3 h-3 md:w-4 md:h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default TopBar
