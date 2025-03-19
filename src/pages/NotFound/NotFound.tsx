// frontend/src/pages/NotFound/NotFound.tsx
import BaseLayout from "../../components/layout/BaseLayout/BaseLayout"
import { Link } from "react-router-dom"
import { ROUTES } from "../../config/routes"

function NotFound() {
	return (
		<BaseLayout title="Página no encontrada" hideFooter={true}>
			<div className="flex flex-col items-center justify-center h-screen bg-gray-100">
				<h1 className="text-6xl font-bold text-govco-danger mb-4">404</h1>
				<p className="text-xl mb-6">
					Lo sentimos, la página que buscas no existe.
				</p>
				<Link
					to={ROUTES.HOME.path}
					className="bg-govco-primary text-white px-6 py-2 rounded-full hover:bg-govco-secondary transition-colors"
				>
					Volver al inicio
				</Link>
			</div>
		</BaseLayout>
	)
}

export default NotFound
