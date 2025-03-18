import { usePageTitle } from "../../../hooks/usePageTitle"

/**
 * Props para el componente PageLayout
 */
interface PageLayoutProps {
	/** Título de la página */
	title: string
	/** Indica si se debe mostrar el título base del portal */
	withBaseTitle?: boolean
	/** Contenido de la página */
	children: React.ReactNode
}

/**
 * Componente de layout para páginas que gestiona el título del documento
 * @param props - Propiedades del componente
 * @returns Elemento JSX con el layout de la página
 */
function PageLayout({
	title,
	withBaseTitle = true,
	children,
}: PageLayoutProps) {
	// Utiliza el hook personalizado para actualizar el título
	usePageTitle(title, withBaseTitle)

	return <div className="min-h-screen">{children}</div>
}

export default PageLayout
