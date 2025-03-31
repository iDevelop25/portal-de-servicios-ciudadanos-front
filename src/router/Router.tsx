// frontend/src/router/AppRouter.tsx
import { Suspense } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { publicRoutes } from "./routes/publicRoutes"
import { adminRoutes } from "./routes/adminRoutes" // Importar arreglo de rutas administrativas
import { ROUTES } from "../config/routes"
import { env } from "../utils/env"

/**
 * Componente de carga para mostrar mientras se cargan las páginas con lazy loading
 */
function LoadingFallback() {
	return (
		<div className="flex items-center justify-center h-screen">
			<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
		</div>
	)
}

/**
 * Componente principal del Router
 * Configura todas las rutas de la aplicación utilizando React Router
 */
function AppRouter() {
	return (
		<BrowserRouter basename={env.BASE_URL}>
			<Suspense fallback={<LoadingFallback />}>
				<Routes>
					{/* Redirección de la ruta raíz a la página de inicio */}
					<Route
						path="/"
						element={<Navigate to={ROUTES.HOME.path} replace />}
					/>

					{/* Rutas públicas */}
					{publicRoutes.map((route) => (
						<Route key={route.path} path={route.path} element={route.element} />
					))}

					{/* Rutas administrativas - mapeamos cada ruta directamente */}
					{adminRoutes.map((route) => (
						<Route key={route.path} path={route.path} element={route.element} />
					))}

					{/* Aquí se agregarán rutas protegidas en el futuro */}
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}

export default AppRouter
