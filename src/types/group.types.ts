// src/types/group.types.ts
export interface ServiceGroup {
	id: number
	title: string
	imagenUrl: string
	description: string
}

export interface ServiceGroupApiResponse {
	success: boolean
	data?: ServiceGroup[]
	message?: string
	errors?: unknown[]
}
