import React from "react"
import { RouteObject } from "react-router-dom"
import { ROUTES } from "../../config/routes"

// Importación dinámica (lazy loading) de los componentes de página
const Home = React.lazy(() => import("../../pages/Home/Home"))
const ServiceRoute = React.lazy(
	() => import("../../pages/ServiceRoute/ServiceRoute")
)
const NewsListPage = React.lazy(() => import("../../pages/NewsListPage"))
const Reservation = React.lazy(
	() => import("../../pages/ReservationPage/ReservationPage")
)

// Página 404 (Not Found)
const NotFound = React.lazy(() =>
	import("../../pages/NotFound/NotFound").catch(() => {
		// Fallback simple en caso de que no exista el componente NotFound
		return {
			default: () => (
				<div className="flex flex-col items-center justify-center h-screen">
					<h1 className="text-4xl font-bold mb-4">404</h1>
					<p className="text-xl">Página no encontrada</p>
				</div>
			),
		}
	})
)

/**
 * Definición de rutas públicas de la aplicación
 * Estas rutas no requieren autenticación
 */
export const publicRoutes: RouteObject[] = [
	{
		path: ROUTES.HOME.path,
		element: <Home />,
	},
	{
		path: ROUTES.NEWS.path,
		element: <NewsListPage />,
	},
	// Ruta de detalle de servicio
	{
		path: ROUTES.SERVICIO_DETALLE.path,
		element: <ServiceRoute />,
	},
	{
		path: ROUTES.RESERVATION.path,
		element: <Reservation />,
	},

	// Ruta para manejar URLs no encontradas (debe ir al final)
	{
		path: ROUTES.NOT_FOUND.path,
		element: <NotFound />,
	},
]
