// frontend/src/pages/Dashboard/FaqManager/FaqManager.tsx
import { useState } from "react"
import {
	Plus,
	Search,
	Edit,
	Trash2,
	Check,
	X,
	AlertTriangle,
	ChevronUp,
	ChevronDown,
	Save,
	Eye,
	Loader,
} from "lucide-react"
import DashboardLayout from "../../../components/layout/DashboardLayout"
import useFaqs from "../../../hooks/useFaqs"
import { FaqItem, CreateFaqData, UpdateFaqData } from "../../../types/faq.types"

interface FormState {
	question: string
	answer: string
	isOpen: boolean
	order?: number
}

// Estado inicial del formulario
const initialFormState: FormState = {
	question: "",
	answer: "",
	isOpen: false,
	order: 0,
}

function FaqManager() {
	// Usamos el hook personalizado para FAQs
	const { faqs, loading, error, getAllFaqs, createFaq, updateFaq, deleteFaq } =
		useFaqs()

	// Estados para el formulario
	const [formMode, setFormMode] = useState<"create" | "edit">("create")
	const [showForm, setShowForm] = useState(false)
	const [formState, setFormState] = useState<FormState>(initialFormState)
	const [editingId, setEditingId] = useState<number | null>(null)

	// Estado para el diálogo de confirmación de eliminación
	const [confirmDelete, setConfirmDelete] = useState<number | null>(null)

	// Estados para búsqueda y filtrado
	const [searchQuery, setSearchQuery] = useState("")
	const [filterActive, setFilterActive] = useState(true)

	// Estado para alertas
	const [alert, setAlert] = useState<{
		type: "success" | "error" | "info"
		message: string
	} | null>(null)

	// Función para mostrar alertas
	const showAlert = (type: "success" | "error" | "info", message: string) => {
		setAlert({ type, message })
		// Auto-ocultar después de 5 segundos
		setTimeout(() => setAlert(null), 5000)
	}

	// Función para manejar la ordenación de FAQs
	const handleReorder = async (id: number, direction: "up" | "down") => {
		const currentIndex = faqs.findIndex((faq) => faq.id === id)
		if (currentIndex === -1) return

		const newFaqs = [...faqs]
		const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1

		// Verificar límites
		if (targetIndex < 0 || targetIndex >= faqs.length) return

		// Intercambiar órdenes
		const currentOrder = newFaqs[currentIndex].order
		newFaqs[currentIndex].order = newFaqs[targetIndex].order
		newFaqs[targetIndex].order = currentOrder

		// Actualizar en el servidor
		try {
			await updateFaq(id, { order: newFaqs[currentIndex].order })
			await updateFaq(newFaqs[targetIndex].id, { order: currentOrder })

			// Recargar datos
			await getAllFaqs()
			showAlert("success", "Orden actualizada correctamente")
		} catch {
			showAlert("error", "Error al actualizar el orden")
		}
	}

	// Función para limpiar el formulario
	const resetForm = () => {
		setFormState(initialFormState)
		setEditingId(null)
		setFormMode("create")
		setShowForm(false)
	}

	// Función para preparar el formulario para crear una nueva FAQ
	const handleCreateNew = () => {
		resetForm()
		setFormMode("create")
		setShowForm(true)
	}

	// Función para preparar el formulario para editar una FAQ existente
	const handleEdit = (faq: FaqItem) => {
		setFormState({
			question: faq.question,
			answer: faq.answer,
			isOpen: faq.isOpen,
			order: faq.order,
		})
		setEditingId(faq.id)
		setFormMode("edit")
		setShowForm(true)
	}

	// Función para manejar el envío del formulario
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		// Validar campos
		if (!formState.question.trim() || !formState.answer.trim()) {
			showAlert("error", "La pregunta y la respuesta son obligatorias")
			return
		}

		try {
			if (formMode === "create") {
				// Crear nueva FAQ
				const newFaqData: CreateFaqData = {
					question: formState.question,
					answer: formState.answer,
					isOpen: formState.isOpen,
					order: formState.order,
				}

				const result = await createFaq(newFaqData)
				if (result) {
					showAlert("success", "Pregunta frecuente creada correctamente")
					resetForm()
				}
			} else if (formMode === "edit" && editingId) {
				// Actualizar FAQ existente
				const updateData: UpdateFaqData = {
					question: formState.question,
					answer: formState.answer,
					isOpen: formState.isOpen,
					order: formState.order,
				}

				const result = await updateFaq(editingId, updateData)
				if (result) {
					showAlert("success", "Pregunta frecuente actualizada correctamente")
					resetForm()
				}
			}
		} catch {
			showAlert("error", "Error al guardar la pregunta frecuente")
		}
	}

	// Función para manejar la eliminación de una FAQ
	const handleDelete = async (id: number) => {
		try {
			const success = await deleteFaq(id)
			if (success) {
				showAlert("success", "Pregunta frecuente eliminada correctamente")
				setConfirmDelete(null)
			}
		} catch {
			showAlert("error", "Error al eliminar la pregunta frecuente")
		}
	}

	// Función para filtrar y buscar FAQs
	const filteredFaqs = faqs
		.filter((faq) => {
			// Filtrar por estado activo
			if (filterActive && !faq.isActive) return false

			// Filtrar por texto de búsqueda
			if (searchQuery) {
				const query = searchQuery.toLowerCase()
				return (
					faq.question.toLowerCase().includes(query) ||
					faq.answer.toLowerCase().includes(query)
				)
			}

			return true
		})
		.sort((a, b) => a.order - b.order)

	// Función para cambiar el estado activo de una FAQ
	const handleToggleActive = async (id: number, currentStatus: boolean) => {
		try {
			await updateFaq(id, { isActive: !currentStatus })
			await getAllFaqs()
			showAlert(
				"success",
				`Pregunta frecuente ${
					!currentStatus ? "activada" : "desactivada"
				} correctamente`
			)
		} catch {
			showAlert("error", "Error al cambiar el estado de la pregunta frecuente")
		}
	}

	return (
		<DashboardLayout title="Gestión de Preguntas Frecuentes">
			{/* Alertas */}
			{alert && (
				<div
					className={`mb-4 p-4 rounded-lg cursor-pointer ${
						alert.type === "success"
							? "bg-green-100 text-green-800"
							: alert.type === "error"
							? "bg-red-100 text-red-800"
							: "bg-blue-100 text-blue-800"
					} flex items-start gap-2`}
				>
					{alert.type === "success" && (
						<Check className="h-5 w-5 shrink-0 mt-0.5" />
					)}
					{alert.type === "error" && (
						<AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
					)}
					{alert.type === "info" && <Eye className="h-5 w-5 shrink-0 mt-0.5" />}
					<span>{alert.message}</span>
					<button
						onClick={() => setAlert(null)}
						className="ml-auto text-gray-500 hover:text-gray-700 cursor-pointer"
					>
						<X size={16} />
					</button>
				</div>
			)}

			{/* Barra de herramientas */}
			<div className="bg-white rounded-lg shadow-md p-6 mb-6 cursor-pointer">
				<div className="flex flex-col md:flex-row md:items-center gap-4">
					<button
						onClick={handleCreateNew}
						className="flex items-center gap-2 bg-govco-primary text-white py-2 px-4 rounded-lg hover:bg-govco-secondary transition-colors cursor-pointer"
					>
						<Plus size={18} />
						<span>Crear nueva pregunta</span>
					</button>

					<div className="relative flex-1 md:max-w-md">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<Search size={18} className="text-gray-400" />
						</div>
						<input
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Buscar preguntas..."
							className="pl-9 pr-4 py-2 border rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-govco-primary"
						/>
					</div>

					<div className="flex items-center">
						<label className="inline-flex items-center cursor-pointer">
							<input
								type="checkbox"
								checked={filterActive}
								onChange={() => setFilterActive(!filterActive)}
								className="sr-only peer"
							/>
							<div className="relative w-11 h-6 bg-gray-200 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-govco-primary peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-govco-primary"></div>
							<span className="ml-3 text-sm font-medium text-gray-900">
								Mostrar solo activas
							</span>
						</label>
					</div>
				</div>
			</div>

			{/* Formulario */}
			{showForm && (
				<div className="bg-white rounded-lg shadow-md p-6 mb-6 cursor-pointer">
					<h3 className="text-lg font-medium mb-4">
						{formMode === "create" ? "Crear nueva pregunta" : "Editar pregunta"}
					</h3>

					<form onSubmit={handleSubmit}>
						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Pregunta
								</label>
								<input
									type="text"
									value={formState.question}
									onChange={(e) =>
										setFormState({ ...formState, question: e.target.value })
									}
									placeholder="Ingrese la pregunta"
									className="block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-govco-primary cursor-pointer"
									required
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Respuesta
								</label>
								<textarea
									value={formState.answer}
									onChange={(e) =>
										setFormState({ ...formState, answer: e.target.value })
									}
									placeholder="Ingrese la respuesta"
									rows={4}
									className="block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-govco-primary cursor-pointer"
									required
								/>
							</div>

							<div className="flex items-center cursor-pointer">
								<label className="inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										checked={formState.isOpen}
										onChange={() =>
											setFormState({ ...formState, isOpen: !formState.isOpen })
										}
										className="sr-only peer"
									/>
									<div className="relative w-11 h-6 bg-gray-200 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-govco-primary peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-govco-primary"></div>
									<span className="ml-3 text-sm font-medium text-gray-900">
										Mostrar expandida por defecto
									</span>
								</label>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Orden
								</label>
								<input
									type="number"
									min="1"
									value={formState.order}
									onChange={(e) =>
										setFormState({
											...formState,
											order: parseInt(e.target.value) || 0,
										})
									}
									className="block w-24 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-govco-primary cursor-pointer"
								/>
							</div>
						</div>

						<div className="mt-6 flex justify-end gap-3">
							<button
								type="button"
								onClick={resetForm}
								className="py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
							>
								Cancelar
							</button>
							<button
								type="submit"
								className="flex items-center gap-2 py-2 px-4 bg-govco-primary text-white rounded-lg hover:bg-govco-secondary transition-colors cursor-pointer"
							>
								<Save size={18} />
								Guardar
							</button>
						</div>
					</form>
				</div>
			)}

			{/* Lista de FAQs */}
			<div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
				<div className="p-4 border-b">
					<h3 className="text-lg font-medium">Lista de preguntas frecuentes</h3>
				</div>

				{loading ? (
					<div className="flex justify-center my-12">
						<div className="flex flex-col items-center">
							<Loader
								size={36}
								className="animate-spin text-govco-primary mb-2"
							/>
							<p className="text-govco-gray-600">
								Cargando preguntas frecuentes...
							</p>
						</div>
					</div>
				) : error ? (
					<div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 cursor-pointer">
						<div className="flex">
							<div className="flex-shrink-0">
								<AlertTriangle size={32} className="text-red-400" />
							</div>
							<div className="ml-3">
								<p className="text-sm text-red-700">{error}</p>
							</div>
							<div className="ml-auto pl-3">
								<button
									onClick={() => getAllFaqs()}
									className="inline-flex rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none cursor-pointer"
								>
									<X size={16} />
								</button>
							</div>
						</div>
					</div>
				) : filteredFaqs.length === 0 ? (
					<div className="text-center py-10 border rounded-lg bg-gray-50 cursor-pointer">
						<p className="text-govco-gray-600 mb-2">
							No se encontraron preguntas frecuentes
						</p>
						{searchQuery && (
							<p className="text-govco-gray-500 text-sm">
								Intenta con otro término de búsqueda o{" "}
								<button
									onClick={() => setSearchQuery("")}
									className="text-govco-primary ml-1 hover:underline cursor-pointer"
								>
									ver todas las preguntas
								</button>
							</p>
						)}
					</div>
				) : (
					<div className="divide-y cursor-pointer">
						{filteredFaqs.map((faq) => (
							<div
								key={faq.id}
								className={`p-4 hover:bg-gray-50 transition-colors ${
									!faq.isActive ? "opacity-60" : ""
								}`}
							>
								<div className="flex items-start gap-4">
									<div className="flex-1">
										<div className="flex items-center gap-2 mb-1">
											<h4 className="font-medium">{faq.question}</h4>
											{!faq.isActive && (
												<span className="px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-700">
													Inactiva
												</span>
											)}
										</div>
										<p className="text-sm text-gray-600 line-clamp-2">
											{faq.answer}
										</p>
										<div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
											<span>Orden: {faq.order}</span>
											<span>Expandida: {faq.isOpen ? "Sí" : "No"}</span>
											{faq.updatedAt && (
												<span>
													Actualizada:{" "}
													{new Date(faq.updatedAt).toLocaleDateString()}
												</span>
											)}
										</div>
									</div>

									<div className="flex flex-col sm:flex-row gap-2">
										{/* Controles de orden */}
										<div className="flex flex-col">
											<button
												onClick={() => handleReorder(faq.id, "up")}
												disabled={faq.order <= 1}
												className="p-1 text-gray-500 hover:text-govco-primary disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
												title="Mover arriba"
											>
												<ChevronUp size={16} />
											</button>
											<button
												onClick={() => handleReorder(faq.id, "down")}
												disabled={faq.order >= faqs.length}
												className="p-1 text-gray-500 hover:text-govco-primary disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
												title="Mover abajo"
											>
												<ChevronDown size={16} />
											</button>
										</div>

										{/* Botones de acción */}
										<div className="flex gap-1">
											<button
												onClick={() => handleEdit(faq)}
												className="p-1.5 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-md cursor-pointer"
												title="Editar"
											>
												<Edit size={16} />
											</button>
											<button
												onClick={() => handleToggleActive(faq.id, faq.isActive)}
												className="p-1.5 rounded-md hover:bg-green-50 cursor-pointer"
												title={faq.isActive ? "Desactivar" : "Activar"}
											>
												{faq.isActive ? (
													<X
														size={16}
														className="text-red-600 hover:text-red-900"
													/>
												) : (
													<Check
														size={16}
														className="text-green-600 hover:text-green-900"
													/>
												)}
											</button>
											<button
												onClick={() => setConfirmDelete(faq.id)}
												className="p-1.5 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md cursor-pointer"
												title="Eliminar"
											>
												<Trash2 size={16} />
											</button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Modal de confirmación para eliminación */}
			{confirmDelete !== null && (
				<div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-30 flex items-center justify-center p-4 cursor-pointer">
					<div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
						<h3 className="text-lg font-bold text-govco-gray-900 mb-4">
							Confirmar eliminación
						</h3>
						<p className="text-govco-gray-600 mb-6">
							¿Está seguro de que desea eliminar esta pregunta frecuente? Esta
							acción no se puede deshacer.
						</p>
						<div className="flex justify-end space-x-3">
							<button
								onClick={() => setConfirmDelete(null)}
								className="px-4 py-2 border border-gray-300 rounded-lg text-govco-gray-700 hover:bg-gray-50 cursor-pointer"
							>
								Cancelar
							</button>
							<button
								onClick={() => {
									if (confirmDelete) handleDelete(confirmDelete)
								}}
								className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
							>
								Eliminar
							</button>
						</div>
					</div>
				</div>
			)}
		</DashboardLayout>
	)
}

export default FaqManager
