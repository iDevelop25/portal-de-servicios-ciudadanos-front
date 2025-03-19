import { LucideIcon } from "lucide-react"

// /src/types/service.types.ts
export interface ServiceRoute {
	id: string
	title: string
	description: string
	imageUrl: string
	link: string
}

// Tipo para los trámites consultados
export interface Tramite {
	id: string
	title: string
	icon: LucideIcon // Usar LucideIcon directamente en lugar de React.ComponentType<any>
	link: string
	// Campos adicionales para futura expansión
	description?: string
	category?: string
	featured?: boolean
}

export interface SecretaryServiceItem {
	id: string
	title: string
	type: "tramite" | "servicio"
	description: string
	link: string
}
