/**
 * Componente ServiceContainer
 *
 * Contenedor principal que se muestra debajo del slider para mostrar servicios destacados.
 * Tiene un ancho del 70% de la pantalla, fondo blanco y sombras.
 * Se superpone ligeramente al slider (-10px) para crear un efecto visual atractivo.
 */
function ServiceContainer() {
	return (
		<div className="flex justify-center w-full relative -mt-2 z-20">
			<div className="w-full max-w-[80%] bg-white rounded-lg shadow-lg p-6">
				{/* Contenido del contenedor de servicios */}
				<h3 className="text-xl font-semibold text-govco-gray-800 mb-4">
					Servicios destacados
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{/* Tarjetas de servicios */}
					<div className="p-4 border border-govco-gray-200 rounded-md hover:shadow-md transition-shadow">
						<h4 className="font-medium text-govco-primary">Impuestos</h4>
						<p className="text-sm text-govco-gray-600 mt-1">
							Consulta y paga tus impuestos distritales
						</p>
					</div>
					<div className="p-4 border border-govco-gray-200 rounded-md hover:shadow-md transition-shadow">
						<h4 className="font-medium text-govco-primary">Trámites</h4>
						<p className="text-sm text-govco-gray-600 mt-1">
							Realiza tus trámites en línea
						</p>
					</div>
					<div className="p-4 border border-govco-gray-200 rounded-md hover:shadow-md transition-shadow">
						<h4 className="font-medium text-govco-primary">PQRS</h4>
						<p className="text-sm text-govco-gray-600 mt-1">
							Peticiones, quejas, reclamos y sugerencias
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ServiceContainer
