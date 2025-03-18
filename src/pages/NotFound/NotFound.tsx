import { useNavigate } from "react-router-dom"
import { AlertTriangle } from "lucide-react"
import { ROUTES } from "../../config/routes"
import PageLayout from "../../components/layout/PageLayout/PageLayout"

/**
 * Componente para la página 404 (Not Found)
 * Se muestra cuando el usuario navega a una ruta que no existe
 */
function NotFound() {
	const navigate = useNavigate()

	/**
	 * Función para redirigir al usuario a la página de inicio
	 */
	const handleGoHome = () => {
		navigate(ROUTES.HOME.path)
	}

	return (
		<PageLayout title={ROUTES.NOT_FOUND.title}>
			<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
				<AlertTriangle size={64} className="text-yellow-500 mb-4" />

				<h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
				<h2 className="text-2xl font-semibold text-gray-700 mb-6">
					Página no encontrada
				</h2>

				<p className="text-gray-600 max-w-md text-center mb-8">
					Lo sentimos, la página que estás buscando no existe o ha sido movida.
				</p>

				<button
					onClick={handleGoHome}
					className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
				>
					Volver al inicio
				</button>
			</div>
		</PageLayout>
	)
}

export default NotFound
