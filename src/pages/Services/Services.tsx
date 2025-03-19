// frontend/src/pages/Services/Services.tsx
import BaseLayout from "../../components/layout/BaseLayout/BaseLayout"
import { useState } from "react"

function Services() {
	// Ejemplo de datos que podrían venir de una API
	const [services] = useState([
		{ id: 1, title: "Servicio 1", description: "Descripción del servicio 1" },
		{ id: 2, title: "Servicio 2", description: "Descripción del servicio 2" },
		{ id: 3, title: "Servicio 3", description: "Descripción del servicio 3" },
	])

	return (
		<BaseLayout title="Servicios">
			{/* Banner para páginas internas */}
			<div className="bg-govco-primary text-white py-12 px-4 mb-8">
				<div className="container mx-auto">
					<h1 className="text-3xl font-bold">Servicios</h1>
					<p className="mt-2">Conoce nuestros servicios disponibles</p>
				</div>
			</div>

			{/* Contenido de la página */}
			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{services.map((service) => (
						<div key={service.id} className="bg-white p-6 rounded-lg shadow-md">
							<h2 className="text-xl font-bold mb-2">{service.title}</h2>
							<p className="text-govco-gray-600">{service.description}</p>
						</div>
					))}
				</div>
			</div>
		</BaseLayout>
	)
}

export default Services
