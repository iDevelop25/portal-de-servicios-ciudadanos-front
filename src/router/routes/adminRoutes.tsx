// frontend/src/router/routes/adminRoutes.tsx
import Dashboard from "../../pages/Dashboard"
import FaqManager from "../../pages/Dashboard/FaqManager"
import {
	UsersManager,
	ContentManager,
	SettingsManager,
	ProfileManager,
} from "../../pages/Dashboard/PlaceholderComponents"
import { ROUTES } from "../../config/routes"

/**
 * Tipo para las rutas administrativas
 */
interface AdminRoute {
	path: string
	element: React.ReactNode
}

/**
 * Rutas administrativas
 * Estas rutas son para el área de administración del portal
 */
export const adminRoutes: AdminRoute[] = [
	{
		path: ROUTES.ADMIN.path,
		element: <Dashboard />,
	},
	{
		path: ROUTES.ADMIN_FAQS.path,
		element: <FaqManager />,
	},
	{
		path: ROUTES.ADMIN_USERS.path,
		element: <UsersManager />,
	},
	{
		path: ROUTES.ADMIN_CONTENT.path,
		element: <ContentManager />,
	},
	{
		path: ROUTES.ADMIN_SETTINGS.path,
		element: <SettingsManager />,
	},
	{
		path: ROUTES.ADMIN_PROFILE.path,
		element: <ProfileManager />,
	},
]
