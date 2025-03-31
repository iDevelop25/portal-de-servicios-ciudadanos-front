// frontend/src/pages/Dashboard/Dashboard.tsx
import { useState } from "react"
import { Link } from "react-router-dom"
import { ROUTES } from "../../config/routes"
import DashboardLayout from "../../components/layout/DashboardLayout"
import {
	Users,
	FileText,
	HelpCircle,
	Eye,
	ArrowUp,
	ArrowDown,
	Settings,
	Clock,
	BarChart3,
} from "lucide-react"

function Dashboard() {
	// Estado para la pestaña activa
	const [activeTab, setActiveTab] = useState<"estadisticas" | "recientes">(
		"estadisticas"
	)

	// Datos de estadísticas
	const stats = [
		{
			title: "Usuarios registrados",
			value: "3,854",
			change: "+12.5%",
			increasing: true,
			icon: Users,
			color: "bg-blue-500",
		},
		{
			title: "Trámites completados",
			value: "18,472",
			change: "+8.3%",
			increasing: true,
			icon: FileText,
			color: "bg-green-500",
		},
		{
			title: "Consultas FAQs",
			value: "7,392",
			change: "+15.2%",
			increasing: true,
			icon: HelpCircle,
			color: "bg-purple-500",
		},
		{
			title: "Visitas totales",
			value: "245,107",
			change: "-2.4%",
			increasing: false,
			icon: Eye,
			color: "bg-orange-500",
		},
	]

	// Datos de actividad reciente
	const recentActivity = [
		{
			id: 1,
			type: "faq",
			description: "Nueva pregunta añadida a FAQs",
			user: "Juan Pérez",
			time: "Hace 10 minutos",
			icon: HelpCircle,
			color: "bg-purple-100 text-purple-600",
		},
		{
			id: 2,
			type: "user",
			description: "Usuario actualizado",
			user: "María González",
			time: "Hace 45 minutos",
			icon: Users,
			color: "bg-blue-100 text-blue-600",
		},
		{
			id: 3,
			type: "config",
			description: "Configuración del sistema actualizada",
			user: "Admin",
			time: "Hace 1 hora",
			icon: Settings,
			color: "bg-gray-100 text-gray-600",
		},
		{
			id: 4,
			type: "content",
			description: "Contenido de página principal modificado",
			user: "Carlos López",
			time: "Hace 2 horas",
			icon: FileText,
			color: "bg-green-100 text-green-600",
		},
		{
			id: 5,
			type: "faq",
			description: "Preguntas frecuentes reorganizadas",
			user: "Admin",
			time: "Hace 3 horas",
			icon: HelpCircle,
			color: "bg-purple-100 text-purple-600",
		},
	]

	// Tareas pendientes
	const pendingTasks = [
		{
			id: 1,
			task: "Revisar preguntas frecuentes nuevas",
			priority: "Alta",
			priorityColor: "text-red-600 bg-red-100",
			dueDate: "Hoy",
		},
		{
			id: 2,
			task: "Actualizar contenido de sección Servicios",
			priority: "Media",
			priorityColor: "text-yellow-600 bg-yellow-100",
			dueDate: "Mañana",
		},
		{
			id: 3,
			task: "Revisar solicitudes de usuarios pendientes",
			priority: "Baja",
			priorityColor: "text-green-600 bg-green-100",
			dueDate: "28/03/2025",
		},
	]

	return (
		<DashboardLayout title="Panel de Control">
			{/* Tarjetas de estadísticas */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				{stats.map((stat, index) => (
					<div
						key={index}
						className="bg-white rounded-lg shadow-sm p-6 flex flex-col"
					>
						<div className="flex justify-between items-start mb-4">
							<div>
								<p className="text-sm text-gray-500 mb-1">{stat.title}</p>
								<h3 className="text-2xl font-bold">{stat.value}</h3>
							</div>
							<div className={`${stat.color} text-white p-3 rounded-lg`}>
								<stat.icon size={18} />
							</div>
						</div>
						<div className="flex items-center">
							{stat.increasing ? (
								<ArrowUp size={16} className="text-green-500 mr-1" />
							) : (
								<ArrowDown size={16} className="text-red-500 mr-1" />
							)}
							<span
								className={stat.increasing ? "text-green-500" : "text-red-500"}
							>
								{stat.change}
							</span>
							<span className="text-gray-500 text-sm ml-1">
								vs mes anterior
							</span>
						</div>
					</div>
				))}
			</div>

			{/* Sección principal con contenido en pestañas */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
				{/* Panel izquierdo (2/3 del ancho en desktop) */}
				<div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
					{/* Navegación de pestañas */}
					<div className="border-b">
						<nav className="flex">
							<button
								className={`px-6 py-4 text-sm font-medium ${
									activeTab === "estadisticas"
										? "border-b-2 border-govco-primary text-govco-primary"
										: "text-gray-500 hover:text-gray-700"
								}`}
								onClick={() => setActiveTab("estadisticas")}
							>
								<div className="flex items-center">
									<BarChart3 size={16} className="mr-2" />
									Estadísticas
								</div>
							</button>
							<button
								className={`px-6 py-4 text-sm font-medium ${
									activeTab === "recientes"
										? "border-b-2 border-govco-primary text-govco-primary"
										: "text-gray-500 hover:text-gray-700"
								}`}
								onClick={() => setActiveTab("recientes")}
							>
								<div className="flex items-center">
									<Clock size={16} className="mr-2" />
									Actividad Reciente
								</div>
							</button>
						</nav>
					</div>

					{/* Contenido de las pestañas */}
					<div className="p-6">
						{activeTab === "estadisticas" ? (
							<div>
								<h3 className="text-lg font-medium mb-4">
									Resumen de actividad
								</h3>
								<div className="text-center py-8 text-gray-500">
									<p>Contenido de gráficos y estadísticas iría aquí</p>
									<p className="mt-2">
										Usa Recharts u otra librería de visualización
									</p>
								</div>
							</div>
						) : (
							<div>
								<h3 className="text-lg font-medium mb-4">Actividad Reciente</h3>
								<div className="space-y-4">
									{recentActivity.map((activity) => (
										<div key={activity.id} className="flex items-start">
											<div
												className={`rounded-full p-2 mr-3 ${activity.color}`}
											>
												<activity.icon size={16} />
											</div>
											<div className="flex-1">
												<p className="text-sm font-medium">
													{activity.description}
												</p>
												<div className="flex items-center text-xs text-gray-500 mt-1">
													<span>{activity.user}</span>
													<span className="mx-1">•</span>
													<span>{activity.time}</span>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Panel derecho (1/3 del ancho en desktop) */}
				<div className="bg-white rounded-lg shadow-sm p-6">
					<h3 className="text-lg font-medium mb-4">Tareas Pendientes</h3>

					<div className="space-y-4">
						{pendingTasks.map((task) => (
							<div
								key={task.id}
								className="flex items-center p-3 border border-gray-200 rounded-lg"
							>
								<div className="flex-1">
									<p className="text-sm font-medium">{task.task}</p>
									<p className="text-xs text-gray-500 mt-1">
										Vence: {task.dueDate}
									</p>
								</div>
								<span
									className={`text-xs px-2 py-1 rounded-full ${task.priorityColor}`}
								>
									{task.priority}
								</span>
							</div>
						))}
					</div>

					<div className="mt-6">
						<button className="w-full bg-govco-primary text-white py-2 px-4 rounded-md hover:bg-govco-primary/90 transition-colors">
							Ver todas las tareas
						</button>
					</div>
				</div>
			</div>

			{/* Enlaces Rápidos */}
			<div className="bg-white rounded-lg shadow-sm p-6">
				<h3 className="text-lg font-medium mb-4">Enlaces Rápidos</h3>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					<Link
						to={ROUTES.ADMIN_FAQS.path}
						className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-govco-primary hover:bg-govco-primary/5 transition-colors"
					>
						<HelpCircle size={24} className="text-govco-primary mb-2" />
						<span className="text-sm font-medium">Gestionar FAQs</span>
					</Link>
					<Link
						to={ROUTES.ADMIN_USERS.path}
						className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-govco-primary hover:bg-govco-primary/5 transition-colors"
					>
						<Users size={24} className="text-govco-primary mb-2" />
						<span className="text-sm font-medium">Usuarios</span>
					</Link>
					<Link
						to={ROUTES.ADMIN_CONTENT.path}
						className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-govco-primary hover:bg-govco-primary/5 transition-colors"
					>
						<FileText size={24} className="text-govco-primary mb-2" />
						<span className="text-sm font-medium">Contenido</span>
					</Link>
					<Link
						to={ROUTES.ADMIN_SETTINGS.path}
						className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-govco-primary hover:bg-govco-primary/5 transition-colors"
					>
						<Settings size={24} className="text-govco-primary mb-2" />
						<span className="text-sm font-medium">Configuración</span>
					</Link>
				</div>
			</div>
		</DashboardLayout>
	)
}

export default Dashboard
