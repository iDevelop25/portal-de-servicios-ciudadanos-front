import React from "react"
import { RouteObject } from "react-router-dom"
import { ROUTES } from "../../config/routes"

// Importación dinámica (lazy loading) de los componentes de página
const Home = React.lazy(() => import("../../pages/Home/Home"))

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
	// Aquí se agregarían más rutas públicas

	// Ruta para manejar URLs no encontradas (debe ir al final)
	{
		path: ROUTES.NOT_FOUND.path,
		element: <NotFound />,
	},
]
