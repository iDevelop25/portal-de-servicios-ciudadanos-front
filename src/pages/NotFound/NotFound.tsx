import { useNavigate } from "react-router-dom"
import { AlertTriangle } from "lucide-react"
import { ROUTES } from "../../config/routes"
import MainLayout from "../../components/layout/MainLayout"

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
		<MainLayout title={ROUTES.NOT_FOUND.title}>
			<div className="flex flex-col items-center justify-center py-16 p-4">
				<AlertTriangle size={64} className="text-govco-warning mb-4" />

				<h1 className="text-4xl font-bold text-govco-dark mb-2">404</h1>
				<h2 className="text-2xl font-semibold text-govco-secondary mb-6">
					Página no encontrada
				</h2>

				<p className="text-govco-gray-500 max-w-md text-center mb-8">
					Lo sentimos, la página que estás buscando no existe o ha sido movida.
				</p>

				<button onClick={handleGoHome} className="btn-govco btn-govco-primary">
					Volver al inicio
				</button>
			</div>
		</MainLayout>
	)
}

export default NotFound
