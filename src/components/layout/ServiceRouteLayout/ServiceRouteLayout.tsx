import TopBar from "../TopBar"
import NavBar from "../NavBar"
import Footer from "../Footer"
import Fab from "../../common/Fab"
import Breadcrumbs from "../../common/Breadcrumbs/Breadcrumbs"
import Banner from "../../common/Banner/Banner"
import { usePageTitle } from "../../../hooks/usePageTitle"

// Importamos la imagen de Chatico
import logoChaticoImg from "../../../assets/images/chatico/logo-chatico.png"

interface ServiceRouteLayoutProps {
	children: React.ReactNode
	title: string
	bannerImageUrl: string
	breadcrumbs: { text: string; url: string }[]
}

function ServiceRouteLayout({
	children,
	title,
	bannerImageUrl,
	breadcrumbs,
}: ServiceRouteLayoutProps) {
	// Configurar el título de la página
	usePageTitle(title)

	return (
		<div className="min-h-screen flex flex-col">
			{/* TopBar - Se muestra en todas las páginas */}
			<TopBar />

			{/* NavBar - Menú principal de navegación */}
			<NavBar />

			{/* Estructura con superposición */}
			<div className="relative flex-grow">
				{/* Breadcrumbs */}
				<Breadcrumbs items={breadcrumbs} />

				{/* Banner */}
				<Banner imageUrl={bannerImageUrl} title={title} />

				{/* Contenido principal con superposición */}
				<main className="relative z-20 -mt-16">
					<div className="container mx-auto px-4 pb-16">{children}</div>
				</main>
			</div>

			{/* Footer - Siempre visible en este layout */}
			<Footer />

			{/* FAB de Chatico */}
			<Fab
				imageUrl={logoChaticoImg}
				altText="Logo Chatico"
				position="bottom-right"
			/>
		</div>
	)
}

export default ServiceRouteLayout
