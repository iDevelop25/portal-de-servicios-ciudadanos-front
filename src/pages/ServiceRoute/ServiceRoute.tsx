import { useParams } from "react-router-dom"
import ServiceRouteLayout from "../../components/layout/ServiceRouteLayout"
import { getRoutePath } from "../../config/routes"
import mockServiceRoutes, { DEFAULT_IMAGE } from "../../data/mockServiceRoutes"

function ServiceRoute() {
	const { id } = useParams<{ id: string }>()

	// Obtener datos del servicio desde el mock o crear datos por defecto
	const serviceData =
		id && mockServiceRoutes[id]
			? {
					title: mockServiceRoutes[id].title,
					bannerImage: mockServiceRoutes[id].imageUrl,
					description: mockServiceRoutes[id].description,
			  }
			: {
					title: id
						? `Servicio de ${id.charAt(0).toUpperCase() + id.slice(1)}`
						: "Servicio",
					bannerImage: DEFAULT_IMAGE,
					description: `Información sobre los servicios de ${
						id || "este sector"
					}`,
			  }

	// Configuración de breadcrumbs
	const breadcrumbs = [
		{ text: "Servicios", url: getRoutePath("SERVICIOS") },
		{ text: serviceData.title, url: "" },
	]

	return (
		<ServiceRouteLayout
			title={serviceData.title}
			bannerImageUrl={serviceData.bannerImage}
			breadcrumbs={breadcrumbs}
		>
			<div className="bg-white rounded-lg shadow-md p-6 -mt-10">
				<h2 className="text-2xl font-bold text-govco-primary mb-4">
					{serviceData.title}
				</h2>
				<p className="text-gray-700 mb-6">{serviceData.description}</p>

				{/* Contenedor vacío para futura implementación */}
				<div className="py-6 border-t border-gray-200 mt-6">
					<p className="text-gray-500 text-center">
						El contenido detallado de este servicio se implementará próximamente
					</p>
				</div>
			</div>
		</ServiceRouteLayout>
	)
}

export default ServiceRoute
