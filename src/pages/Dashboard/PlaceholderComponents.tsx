// frontend/src/pages/Dashboard/PlaceholderComponents.tsx
import DashboardLayout from "../../components/layout/DashboardLayout"

/**
 * Componente de placeholder para la sección de usuarios
 */
export function UsersManager() {
	return (
		<DashboardLayout title="Gestión de Usuarios">
			<div className="p-6 bg-white rounded-lg shadow-sm">
				<p className="text-gray-600">Esta sección está en desarrollo.</p>
				<p className="mt-4 text-gray-600">
					Aquí se implementará la gestión de usuarios del portal, incluyendo:
				</p>
				<ul className="mt-2 list-disc list-inside text-gray-600 space-y-1">
					<li>Creación y edición de usuarios</li>
					<li>Asignación de roles y permisos</li>
					<li>Gestión de accesos</li>
					<li>Historial de actividad</li>
				</ul>
			</div>
		</DashboardLayout>
	)
}

/**
 * Componente de placeholder para la sección de contenido
 */
export function ContentManager() {
	return (
		<DashboardLayout title="Gestión de Contenido">
			<div className="p-6 bg-white rounded-lg shadow-sm">
				<p className="text-gray-600">Esta sección está en desarrollo.</p>
				<p className="mt-4 text-gray-600">
					Aquí se implementará la gestión de contenido del portal, incluyendo:
				</p>
				<ul className="mt-2 list-disc list-inside text-gray-600 space-y-1">
					<li>Edición de páginas</li>
					<li>Gestión de imágenes y recursos</li>
					<li>Publicación de noticias y eventos</li>
					<li>Administración de rutas de servicio</li>
				</ul>
			</div>
		</DashboardLayout>
	)
}

/**
 * Componente de placeholder para la sección de configuración
 */
export function SettingsManager() {
	return (
		<DashboardLayout title="Configuración">
			<div className="p-6 bg-white rounded-lg shadow-sm">
				<p className="text-gray-600">Esta sección está en desarrollo.</p>
				<p className="mt-4 text-gray-600">
					Aquí se implementará la configuración del portal, incluyendo:
				</p>
				<ul className="mt-2 list-disc list-inside text-gray-600 space-y-1">
					<li>Configuración general del sitio</li>
					<li>Personalización de apariencia</li>
					<li>Configuración de integraciones</li>
					<li>Gestión de notificaciones</li>
				</ul>
			</div>
		</DashboardLayout>
	)
}

/**
 * Componente de placeholder para la sección de perfil
 */
export function ProfileManager() {
	return (
		<DashboardLayout title="Perfil de Usuario">
			<div className="p-6 bg-white rounded-lg shadow-sm">
				<p className="text-gray-600">Esta sección está en desarrollo.</p>
				<p className="mt-4 text-gray-600">
					Aquí se implementará la gestión del perfil de administrador,
					incluyendo:
				</p>
				<ul className="mt-2 list-disc list-inside text-gray-600 space-y-1">
					<li>Información personal</li>
					<li>Cambio de contraseña</li>
					<li>Preferencias</li>
					<li>Historial de actividad</li>
				</ul>
			</div>
		</DashboardLayout>
	)
}
