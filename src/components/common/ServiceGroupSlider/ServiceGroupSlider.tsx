// src/components/common/ServiceGroupSlider/ServiceGroupSlider.tsx
import { useState, useEffect } from "react"
import { groupService } from "../../../services/groupService"
import { ServiceGroup } from "../../../types/group.types"
import CardSlider from "../CardSlider"
import ServiceCard from "../ServiceCard"

interface ServiceGroupSliderProps {
	title?: string
	className?: string
}

function ServiceGroupSlider({
	title = "Rutas de Servicio",
	className = "",
}: ServiceGroupSliderProps) {
	// Estado para los grupos
	const [groups, setGroups] = useState<ServiceGroup[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	// Cargar los grupos al montar el componente
	useEffect(() => {
		const fetchGroups = async () => {
			setLoading(true)
			try {
				const data = await groupService.getGroups()
				setGroups(data)
				setError(null)
			} catch (err) {
				console.error("Error al cargar grupos:", err)
				setError("No se pudieron cargar las rutas de servicio")
			} finally {
				setLoading(false)
			}
		}

		fetchGroups()
	}, [])

	// Transformar los grupos al formato que espera ServiceCard
	const serviceRoutes = groups.map((group) => ({
		id: group.id.toString(),
		title: group.title,
		description: group.description,
		imageUrl: group.imagenUrl,
		link: `/servicios/${group.id}`,
	}))

	return (
		<div className={className}>
			{loading ? (
				<div className="flex justify-center py-8">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-govco-primary"></div>
				</div>
			) : error ? (
				<div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
					<p className="text-red-700">{error}</p>
				</div>
			) : (
				<CardSlider title={title} cardWidth={280} gap={24} visibleCards={4}>
					{serviceRoutes.map((route) => (
						<ServiceCard key={route.id} service={route} />
					))}
				</CardSlider>
			)}
		</div>
	)
}

export default ServiceGroupSlider
