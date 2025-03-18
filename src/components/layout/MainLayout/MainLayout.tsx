import { usePageTitle } from "../../../hooks/usePageTitle"
import TopBar from "../TopBar"
import NavBar from "../NavBar"

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
 * Incorpora elementos comunes como TopBar y NavBar que se mostrarán en todas las páginas
 */
function MainLayout({
	title,
	withBaseTitle = true,
	children,
}: MainLayoutProps) {
	// Actualiza el título de la página
	usePageTitle(title, withBaseTitle)

	return (
		<div className="min-h-screen flex flex-col">
			{/* TopBar - Se muestra en todas las páginas */}
			<TopBar />

			{/* NavBar - Menú principal de navegación */}
			<NavBar />

			{/* Contenido principal */}
			<main className="flex-grow">{children}</main>

			{/* Aquí se pueden agregar más componentes comunes como Footer */}
		</div>
	)
}

export default MainLayout
