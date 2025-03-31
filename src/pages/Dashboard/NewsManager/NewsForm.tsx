import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Calendar, X, Save, ArrowLeft } from "lucide-react"
import { NewsItem } from "../../../types/news.types"

interface NewsFormProps {
	newsItem: NewsItem | null
	onSave: (newsData: NewsItem) => void
	onCancel: () => void
	isLoading: boolean
}

function NewsForm({ newsItem, onSave, onCancel, isLoading }: NewsFormProps) {
	// Estado para el formulario
	const [formData, setFormData] = useState<NewsItem>({
		title: "",
		content: "",
		date: format(new Date(), "yyyy-MM-dd"),
		subtitle: "",
		entityName: "",
		entityLogo: "",
		imageUrl: "",
		order: 0,
	})

	// Errores de validación
	const [errors, setErrors] = useState<Record<string, string>>({})

	// Cargar datos de la noticia cuando se edita
	useEffect(() => {
		if (newsItem) {
			setFormData({
				...newsItem,
				// Asegurarnos de tener valores por defecto para campos opcionales
				subtitle: newsItem.subtitle || "",
				entityName: newsItem.entityName || "",
				entityLogo: newsItem.entityLogo || "",
				imageUrl: newsItem.imageUrl || "",
				order: newsItem.order || 0,
			})
		}
	}, [newsItem])

	// Manejar cambios en los campos
	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))

		// Limpiar errores al editar
		if (errors[name]) {
			setErrors((prev) => {
				const newErrors = { ...prev }
				delete newErrors[name]
				return newErrors
			})
		}
	}

	// Validar el formulario
	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {}

		if (!formData.title.trim()) {
			newErrors.title = "El título es obligatorio"
		}

		if (!formData.content.trim()) {
			newErrors.content = "El contenido es obligatorio"
		}

		if (!formData.date) {
			newErrors.date = "La fecha es obligatoria"
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	// Manejar envío del formulario
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (validateForm()) {
			onSave(formData)
		}
	}

	return (
		<div className="bg-white rounded-lg border border-gray-200">
			<div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
				<h3 className="text-lg font-semibold text-govco-gray-900">
					{newsItem ? "Editar Noticia" : "Nueva Noticia"}
				</h3>
				<button
					onClick={onCancel}
					className="text-govco-gray-500 hover:text-govco-gray-700"
				>
					<X size={20} />
				</button>
			</div>

			<form onSubmit={handleSubmit} className="p-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Título */}
					<div className="col-span-2">
						<label className="block text-sm font-medium text-govco-gray-700 mb-1">
							Título <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							name="title"
							value={formData.title}
							onChange={handleChange}
							className={`w-full px-3 py-2 border ${
								errors.title ? "border-red-500" : "border-gray-300"
							} rounded-md focus:outline-none focus:ring-1 focus:ring-govco-primary`}
							placeholder="Título de la noticia"
						/>
						{errors.title && (
							<p className="mt-1 text-sm text-red-500">{errors.title}</p>
						)}
					</div>

					{/* Subtítulo */}
					<div className="col-span-2">
						<label className="block text-sm font-medium text-govco-gray-700 mb-1">
							Subtítulo
						</label>
						<input
							type="text"
							name="subtitle"
							value={formData.subtitle || ""}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-govco-primary"
							placeholder="Subtítulo (opcional)"
						/>
					</div>

					{/* Fecha */}
					<div>
						<label className="block text-sm font-medium text-govco-gray-700 mb-1">
							Fecha <span className="text-red-500">*</span>
						</label>
						<div className="relative">
							<input
								type="date"
								name="date"
								value={formData.date}
								onChange={handleChange}
								className={`w-full px-3 py-2 border ${
									errors.date ? "border-red-500" : "border-gray-300"
								} rounded-md focus:outline-none focus:ring-1 focus:ring-govco-primary`}
							/>
							<Calendar
								size={18}
								className="absolute right-3 top-2.5 text-govco-gray-400 pointer-events-none"
							/>
						</div>
						{errors.date && (
							<p className="mt-1 text-sm text-red-500">{errors.date}</p>
						)}
					</div>

					{/* Entidad */}
					<div>
						<label className="block text-sm font-medium text-govco-gray-700 mb-1">
							Nombre de la Entidad
						</label>
						<input
							type="text"
							name="entityName"
							value={formData.entityName || ""}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-govco-primary"
							placeholder="Ej: Secretaría de Ambiente"
						/>
					</div>

					{/* URL de Logo */}
					<div>
						<label className="block text-sm font-medium text-govco-gray-700 mb-1">
							URL del Logo de la Entidad
						</label>
						<input
							type="text"
							name="entityLogo"
							value={formData.entityLogo || ""}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-govco-primary"
							placeholder="https://ejemplo.com/logo.png"
						/>
					</div>

					{/* URL de imagen */}
					<div>
						<label className="block text-sm font-medium text-govco-gray-700 mb-1">
							URL de Imagen
						</label>
						<input
							type="text"
							name="imageUrl"
							value={formData.imageUrl || ""}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-govco-primary"
							placeholder="https://ejemplo.com/imagen.jpg"
						/>
					</div>

					{/* Orden */}
					<div>
						<label className="block text-sm font-medium text-govco-gray-700 mb-1">
							Orden
						</label>
						<input
							type="number"
							name="order"
							value={formData.order ?? 0}
							onChange={handleChange}
							min={0}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-govco-primary"
						/>
					</div>

					{/* Contenido */}
					<div className="col-span-2">
						<label className="block text-sm font-medium text-govco-gray-700 mb-1">
							Contenido <span className="text-red-500">*</span>
						</label>
						<textarea
							name="content"
							value={formData.content}
							onChange={handleChange}
							rows={6}
							className={`w-full px-3 py-2 border ${
								errors.content ? "border-red-500" : "border-gray-300"
							} rounded-md focus:outline-none focus:ring-1 focus:ring-govco-primary`}
							placeholder="Contenido de la noticia"
						></textarea>
						{errors.content && (
							<p className="mt-1 text-sm text-red-500">{errors.content}</p>
						)}
					</div>
				</div>

				{/* Botones de acción */}
				<div className="mt-8 flex justify-end space-x-3">
					<button
						type="button"
						onClick={onCancel}
						className="px-4 py-2 border border-gray-300 rounded-lg text-govco-gray-700 hover:bg-gray-50 flex items-center"
						disabled={isLoading}
					>
						<ArrowLeft size={18} className="mr-1" />
						Cancelar
					</button>
					<button
						type="submit"
						className="px-4 py-2 bg-govco-primary text-white rounded-lg hover:bg-govco-secondary flex items-center"
						disabled={isLoading}
					>
						<Save size={18} className="mr-1" />
						{isLoading
							? "Guardando..."
							: newsItem
							? "Actualizar Noticia"
							: "Guardar Noticia"}
					</button>
				</div>
			</form>
		</div>
	)
}

export default NewsForm
