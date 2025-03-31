import ServiceRouteLayout from "../../components/layout/ServiceRouteLayout"
import ReservationFrame from "../../components/reservation/ReservationFrame"
import { Calendar } from "lucide-react"

/**
 * Página de Reserva de Turnos
 *
 * Muestra una guía para acceder al sistema de reserva de turnos
 * usando el mismo layout y diseño que las otras páginas de servicio
 */
function Reservation() {
	const breadcrumbs = [
		{ text: "Servicios", url: "/servicios" },
		{ text: "Reserva de Turnos", url: "/reservar-turno" },
	]

	return (
		<ServiceRouteLayout
			title="Reserva de Turnos"
			bannerImageUrl="/images/banners/reserva-turnos.jpg" // Asegúrate de tener esta imagen o reemplázala
			breadcrumbs={breadcrumbs}
		>
			<div className="bg-white rounded-lg shadow-md p-6 -mt-10">
				<h2 className="text-2xl font-bold text-govco-primary mb-4 flex items-center">
					<Calendar className="mr-2" size={24} />
					Sistema de Reserva de Turnos
				</h2>

				<p className="text-gray-700 mb-6">
					Bienvenido al sistema de reserva de turnos para trámites y servicios
					de la Alcaldía Mayor de Bogotá. A través de este servicio, podrá
					programar una cita previa para realizar trámites presenciales,
					evitando filas y optimizando su tiempo.
				</p>

				<div className="border-t border-gray-200 pt-6 mb-4">
					<ReservationFrame />
				</div>
			</div>
		</ServiceRouteLayout>
	)
}

export default Reservation
