import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
	Menu,
	X,
	Home,
	Users,
	FileText,
	Settings,
	HelpCircle,
	Bell,
	ChevronDown,
	LogOut,
	User,
} from "lucide-react"
import { motion } from "framer-motion"
import { usePageTitle } from "../../../hooks/usePageTitle"
import { ROUTES } from "../../../config/routes"

// Logo de Bogotá
import logoBogoSVG from "../../../assets/images/logo-bogota.svg"

interface DashboardLayoutProps {
	title: string
	children: React.ReactNode
}

function DashboardLayout({ title, children }: DashboardLayoutProps) {
	// Estado para el menú lateral en móviles
	const [sidebarOpen, setSidebarOpen] = useState(false)
	// Estado para el dropdown del perfil de usuario
	const [profileOpen, setProfileOpen] = useState(false)

	// Obtener la ruta actual
	const location = useLocation()

	// Configurar el título de la página
	usePageTitle(`Admin - ${title}`)

	// Determinar si una ruta está activa
	const isActive = (path: string) => {
		return (
			location.pathname === path || location.pathname.startsWith(path + "/")
		)
	}

	// Enlaces del menú lateral
	const sidebarLinks = [
		{ path: ROUTES.ADMIN.path, icon: Home, label: "Dashboard", exact: true },
		{
			path: ROUTES.ADMIN_FAQS.path,
			icon: HelpCircle,
			label: "Preguntas Frecuentes",
		},
		// Solo añadir el enlace de noticias si ROUTES.ADMIN_NEWS existe
		{
			path: ROUTES.ADMIN_NEWS?.path || "/admin/noticias",
			icon: FileText,
			label: "Novedades",
		},
		{ path: ROUTES.ADMIN_USERS.path, icon: Users, label: "Usuarios" },
		{ path: ROUTES.ADMIN_CONTENT.path, icon: FileText, label: "Contenido" },
		{
			path: ROUTES.ADMIN_SETTINGS.path,
			icon: Settings,
			label: "Configuración",
		},
	]

	return (
		<div className="flex h-screen bg-gray-100">
			{/* Sidebar para escritorio */}
			<aside className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-white shadow-md z-10">
				{/* Logo */}
				<div className="flex items-center justify-center h-16 border-b">
					<Link to={ROUTES.ADMIN.path} className="flex items-center">
						<img
							src={logoBogoSVG}
							alt="Logo Alcaldía Mayor de Bogotá D.C."
							className="h-10"
						/>
					</Link>
				</div>

				{/* Navegación */}
				<nav className="flex-1 overflow-y-auto pt-5 pb-4">
					<div className="px-4 space-y-1">
						{sidebarLinks.map((link) => (
							<Link
								key={link.path}
								to={link.path}
								className={`flex items-center px-4 py-2 text-sm font-medium rounded-md group transition-colors ${
									isActive(link.path)
										? "bg-govco-primary text-white"
										: "text-gray-700 hover:bg-gray-100"
								}`}
							>
								<link.icon
									className={`mr-3 h-5 w-5 ${
										isActive(link.path)
											? "text-white"
											: "text-gray-400 group-hover:text-gray-500"
									}`}
								/>
								{link.label}
							</Link>
						))}
					</div>
				</nav>

				{/* Footer del sidebar */}
				<div className="border-t p-4">
					<div className="flex items-center">
						<div className="w-8 h-8 bg-govco-primary rounded-full flex items-center justify-center text-white">
							<span className="text-sm font-medium">AD</span>
						</div>
						<div className="ml-3">
							<p className="text-sm font-medium text-gray-700">Admin</p>
							<p className="text-xs text-gray-500">admin@bogota.gov.co</p>
						</div>
					</div>
				</div>
			</aside>

			{/* Mobile sidebar overlay */}
			{sidebarOpen && (
				<div
					className="md:hidden fixed inset-0 bg-gray-600 bg-opacity-50 z-20"
					onClick={() => setSidebarOpen(false)}
				></div>
			)}

			{/* Mobile sidebar */}
			<motion.aside
				className="md:hidden fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg"
				initial={{ x: "-100%" }}
				animate={{ x: sidebarOpen ? 0 : "-100%" }}
				transition={{ duration: 0.3 }}
			>
				{/* Logo y botón cerrar */}
				<div className="flex items-center justify-between h-16 border-b px-4">
					<Link to={ROUTES.ADMIN.path} className="flex items-center">
						<img
							src={logoBogoSVG}
							alt="Logo Alcaldía Mayor de Bogotá D.C."
							className="h-8"
						/>
					</Link>
					<button
						onClick={() => setSidebarOpen(false)}
						className="text-gray-500 hover:text-gray-700"
					>
						<X size={20} />
					</button>
				</div>

				{/* Navegación móvil */}
				<nav className="flex-1 overflow-y-auto pt-5 pb-4">
					<div className="px-4 space-y-1">
						{sidebarLinks.map((link) => (
							<Link
								key={link.path}
								to={link.path}
								className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
									isActive(link.path)
										? "bg-govco-primary text-white"
										: "text-gray-700 hover:bg-gray-100"
								}`}
								onClick={() => setSidebarOpen(false)}
							>
								<link.icon
									className={`mr-3 h-5 w-5 ${
										isActive(link.path) ? "text-white" : "text-gray-400"
									}`}
								/>
								{link.label}
							</Link>
						))}
					</div>
				</nav>
			</motion.aside>

			{/* Área de contenido principal */}
			<div className="md:ml-64 flex flex-col flex-1">
				{/* Barra superior */}
				<header className="bg-white shadow-sm z-10">
					<div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
						{/* Botón de menú (móvil) y título */}
						<div className="flex items-center">
							<button
								type="button"
								className="md:hidden text-gray-500 hover:text-gray-700 mr-2"
								onClick={() => setSidebarOpen(true)}
							>
								<Menu size={24} />
							</button>
							<h1 className="text-lg font-medium text-gray-900">{title}</h1>
						</div>

						{/* Opciones de usuario */}
						<div className="flex items-center space-x-4">
							{/* Notificaciones */}
							<button className="text-gray-500 hover:text-gray-700 relative">
								<Bell size={20} />
								<span className="absolute -top-1 -right-1 h-4 w-4 bg-govco-danger text-white text-xs rounded-full flex items-center justify-center">
									3
								</span>
							</button>

							{/* Perfil con dropdown */}
							<div className="relative">
								<button
									className="flex items-center space-x-2 focus:outline-none"
									onClick={() => setProfileOpen(!profileOpen)}
								>
									<div className="w-8 h-8 bg-govco-primary rounded-full flex items-center justify-center text-white">
										<span className="text-sm font-medium">AD</span>
									</div>
									<ChevronDown size={16} className="text-gray-500" />
								</button>

								{/* Dropdown del perfil */}
								{profileOpen && (
									<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border">
										<Link
											to={ROUTES.ADMIN_PROFILE.path}
											className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											onClick={() => setProfileOpen(false)}
										>
											<User size={16} className="mr-2 text-gray-500" />
											Mi perfil
										</Link>
										<Link
											to={ROUTES.ADMIN_SETTINGS.path}
											className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											onClick={() => setProfileOpen(false)}
										>
											<Settings size={16} className="mr-2 text-gray-500" />
											Configuración
										</Link>
										<div className="border-t my-1"></div>
										<Link
											to={ROUTES.HOME.path}
											className="flex items-center px-4 py-2 text-sm text-govco-danger hover:bg-gray-100"
											onClick={() => setProfileOpen(false)}
										>
											<LogOut size={16} className="mr-2 text-govco-danger" />
											Cerrar sesión
										</Link>
									</div>
								)}
							</div>
						</div>
					</div>
				</header>

				{/* Contenido principal */}
				<main className="flex-1 overflow-y-auto bg-gray-100 p-6">
					{children}
				</main>
			</div>
		</div>
	)
}

export default DashboardLayout
