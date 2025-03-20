// frontend/src/components/layout/MainLayout/MainLayout.tsx

import { usePageTitle } from "../../../hooks/usePageTitle"
import { useLocation } from "react-router-dom"
import TopBar from "../TopBar"
import NavBar from "../NavBar"
import Footer from "../Footer"
import Fab from "../../common/Fab"
import { ROUTES } from "../../../config/routes"

// Importamos la imagen de Chatico
import logoChaticoImg from "../../../assets/images/chatico/logo-chatico.png"

/**
 * Props para el componente MainLayout
 */
interface MainLayoutProps {
	/** Título de la página */
	title: string
	/** Indica si se debe mostrar el título base del portal */
	withBaseTitle?: boolean
	/** Contenido de la página */
	children: React.ReactNode
}

/**
 * Layout principal de la aplicación
 * Incorpora elementos comunes como TopBar, NavBar y Footer que se mostrarán en todas las páginas
 */
function MainLayout({
	title,
	withBaseTitle = true,
	children,
}: MainLayoutProps) {
	// Actualiza el título de la página
	usePageTitle(title, withBaseTitle)

	// Obtenemos la ubicación actual para verificar la ruta
	const location = useLocation()

	// Verificamos si estamos en la página 404
	const isNotFoundPage =
		location.pathname !== ROUTES.HOME.path &&
		!Object.values(ROUTES)
			.filter((route) => route.path !== "*")
			.map((route) => route.path)
			.includes(location.pathname)

	return (
		<div className="min-h-screen flex flex-col">
			{/* TopBar - Se muestra en todas las páginas */}
			<TopBar />

			{/* NavBar - Menú principal de navegación */}
			<NavBar />

			{/* Contenido principal */}
			<main className="flex-grow">{children}</main>

			{/* Footer - Se oculta en la página 404 */}
			{!isNotFoundPage && <Footer />}

			{/* FAB de Chatico */}
			<Fab
				imageUrl={logoChaticoImg}
				altText="Logo Chatico"
				position="bottom-right"
			/>
		</div>
	)
}

export default MainLayout
