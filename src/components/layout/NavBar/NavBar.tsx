import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ROUTES } from "../../../config/routes"
import "./NavBar.css"

// Importar el logo correctamente
import logoBogoSVG from "../../../assets/images/logo-bogota.svg"

/**
 * NavBar Component
 *
 * Barra de navegación principal siguiendo los lineamientos de GOV.CO
 * Se muestra debajo del TopBar y contiene los enlaces principales del sitio
 */
function NavBar() {
	const location = useLocation()
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	// Verifica si la ruta actual coincide con el path del enlace
	const isActive = (path: string) => {
		return location.pathname === path
	}

	// Componente de NavLink con estilos personalizados
	const NavLink = ({
		to,
		children,
	}: {
		to: string
		children: React.ReactNode
	}) => {
		const active = isActive(to)

		return (
			<Link
				to={to}
				className={`py-4 px-3 font-medium nav-link text-black ${
					active ? "active" : ""
				} relative group`}
			>
				{children}
				{active && (
					<motion.div
						className="absolute bottom-0 left-0 w-full h-0.5 bg-govco-danger"
						layoutId="activeIndicator"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
					/>
				)}
			</Link>
		)
	}

	return (
		<nav className="bg-white shadow-sm sticky top-0 z-50">
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center h-16">
					{/* Logo de la Alcaldía */}
					<div className="flex items-center">
						<Link
							to={ROUTES.HOME.path}
							aria-label="Inicio - Alcaldía Mayor de Bogotá D.C."
						>
							<img
								src={logoBogoSVG}
								alt="Logo Alcaldía Mayor de Bogotá D.C."
								className="h-12"
							/>
						</Link>
					</div>

					{/* Menú de navegación en pantallas grandes */}
					<div className="hidden md:flex items-center space-x-1">
						<NavLink to="/mi-ciudad">Mi ciudad</NavLink>
						<div className="relative group">
							<button className="py-4 px-3 font-medium text-black hover:text-govco-danger nav-link flex items-center">
								¿Qué hacer?
								<svg
									className="ml-1 w-4 h-4"
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
							{/* Dropdown - se implementará más adelante */}
						</div>
						<NavLink to="/servicios">Servicios</NavLink>
						<NavLink to="/yo-participo">Yo participo</NavLink>
						<NavLink to="/asi-vamos">Así vamos</NavLink>
						<NavLink to="/internacional">Internacional</NavLink>
					</div>

					{/* Botón de menú móvil */}
					<div className="md:hidden flex items-center">
						<button
							className="text-black hover:text-govco-danger focus:outline-none"
							onClick={toggleMenu}
							aria-expanded={isMenuOpen}
							aria-label="Abrir menú principal"
						>
							<AnimatePresence mode="wait">
								{isMenuOpen ? (
									<motion.div
										key="close"
										initial={{ opacity: 0, rotate: -90 }}
										animate={{ opacity: 1, rotate: 0 }}
										exit={{ opacity: 0, rotate: 90 }}
										transition={{ duration: 0.2 }}
									>
										<X className="h-6 w-6" aria-hidden="true" />
									</motion.div>
								) : (
									<motion.div
										key="menu"
										initial={{ opacity: 0, rotate: 90 }}
										animate={{ opacity: 1, rotate: 0 }}
										exit={{ opacity: 0, rotate: -90 }}
										transition={{ duration: 0.2 }}
									>
										<Menu className="h-6 w-6" aria-hidden="true" />
									</motion.div>
								)}
							</AnimatePresence>
						</button>
					</div>
				</div>
			</div>

			{/* Menú móvil desplegable con animación */}
			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						className="md:hidden overflow-hidden"
					>
						<div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
							<Link
								to="/mi-ciudad"
								className="block px-3 py-2 text-base font-medium text-black hover:text-govco-danger nav-link"
								onClick={() => setIsMenuOpen(false)}
							>
								Mi ciudad
							</Link>
							<button className="flex justify-between w-full px-3 py-2 text-base font-medium text-black hover:text-govco-danger nav-link">
								¿Qué hacer?
								<svg
									className="w-4 h-4 mt-1"
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
							<Link
								to="/servicios"
								className="block px-3 py-2 text-base font-medium text-black hover:text-govco-danger nav-link"
								onClick={() => setIsMenuOpen(false)}
							>
								Servicios
							</Link>
							<Link
								to="/yo-participo"
								className="block px-3 py-2 text-base font-medium text-black hover:text-govco-danger nav-link"
								onClick={() => setIsMenuOpen(false)}
							>
								Yo participo
							</Link>
							<Link
								to="/asi-vamos"
								className="block px-3 py-2 text-base font-medium text-black hover:text-govco-danger nav-link"
								onClick={() => setIsMenuOpen(false)}
							>
								Así vamos
							</Link>
							<Link
								to="/internacional"
								className="block px-3 py-2 text-base font-medium text-black hover:text-govco-danger nav-link"
								onClick={() => setIsMenuOpen(false)}
							>
								Internacional
							</Link>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	)
}

export default NavBar
