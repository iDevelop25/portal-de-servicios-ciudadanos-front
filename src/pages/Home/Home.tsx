import MainLayout from "../../components/layout/MainLayout"
import { ROUTES } from "../../config/routes"

/**
 * Componente de la página de inicio
 * @returns {JSX.Element} Elemento JSX que representa la página de inicio
 */
function Home() {
	return (
		<MainLayout title={ROUTES.HOME.title}>
			<div className="container mx-auto px-4 py-8"></div>
		</MainLayout>
	)
}

export default Home
