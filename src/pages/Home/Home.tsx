import { Home as HomeIcon } from "lucide-react"
import PageLayout from "../../components/layout/PageLayout/PageLayout"
import { ROUTES } from "../../config/routes"

/**
 * Componente de la página de inicio
 * @returns {JSX.Element} Elemento JSX que representa la página de inicio
 */
function Home() {
	return (
		<PageLayout title={ROUTES.HOME.title}>
			<div className="container mx-auto px-4 py-8">
				<div className="flex items-center mb-6">
					<HomeIcon className="mr-2" size={24} />
					<h1 className="text-3xl font-bold">
						Bienvenido a la Página de Inicio
					</h1>
				</div>

				<div className="bg-white shadow-md rounded-lg p-6">
					<p className="text-lg mb-4">
						Esta es la página principal de nuestra aplicación. Aquí puedes
						mostrar contenido relevante para tus usuarios.
					</p>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
						{/* Aquí puedes agregar tarjetas o secciones de contenido */}
						<div className="bg-blue-50 p-4 rounded-lg">
							<h3 className="font-semibold text-xl mb-2">Sección 1</h3>
							<p>Contenido de ejemplo para la sección 1</p>
						</div>

						<div className="bg-green-50 p-4 rounded-lg">
							<h3 className="font-semibold text-xl mb-2">Sección 2</h3>
							<p>Contenido de ejemplo para la sección 2</p>
						</div>

						<div className="bg-yellow-50 p-4 rounded-lg">
							<h3 className="font-semibold text-xl mb-2">Sección 3</h3>
							<p>Contenido de ejemplo para la sección 3</p>
						</div>
					</div>
				</div>
			</div>
		</PageLayout>
	)
}

export default Home
