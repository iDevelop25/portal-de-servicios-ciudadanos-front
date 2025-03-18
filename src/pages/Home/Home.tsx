import MainLayout from "../../components/layout/MainLayout"
import HomeHero from "../../components/home/HomeHero"
import { ROUTES } from "../../config/routes"

/**
 * Componente de la página de inicio
 * @returns {JSX.Element} Elemento JSX que representa la página de inicio
 */
function Home() {
	return (
		<MainLayout title={ROUTES.HOME.title}>
			{/* Hero Section con Slider */}
			<HomeHero />

			<div className="container mx-auto px-4 py-8">
				{/* Contenido adicional de la página de inicio */}
			</div>
		</MainLayout>
	)
}

export default Home
