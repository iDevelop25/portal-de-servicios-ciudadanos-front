/**
 * Interfaz para enlaces del footer
 */
export interface FooterLink {
	id: string
	text: string
	url: string
}

/**
 * Interfaz para redes sociales
 */
export interface SocialMedia {
	id: string
	platform: "twitter" | "instagram" | "facebook" | "youtube" | string
	username: string
	url: string
	icon?: React.ElementType
}

/**
 * Interfaz para información de contacto
 */
export interface ContactInfo {
	address?: string
	city?: string
	postalCode?: string
	schedule?: string
	phone?: string
	phoneExtension?: string
	email?: string
	judicialEmail?: string
}

/**
 * Interfaz para logos
 */
export interface FooterLogo {
	id: string
	imageUrl: string
	altText: string
	link?: string
}
