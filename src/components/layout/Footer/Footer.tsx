import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ChevronUp, Twitter, Instagram, Facebook } from "lucide-react"
import {
	FooterLink,
	SocialMedia,
	ContactInfo,
	FooterLogo,
} from "../../../types/footer.types"

// Importamos logos
import logoBogota from "../../../assets/images/logo-bogota.svg"
import logoCoSvg from "../../../assets/images/footer/co.svg"

interface FooterProps {
	contactInfo?: ContactInfo
	legalLinks?: FooterLink[]
	socialMedia?: SocialMedia[]
	additionalLogos?: FooterLogo[]
	className?: string
}

/**
 * Componente Footer
 *
 * Pie de página principal de la aplicación con información de contacto,
 * enlaces legales, redes sociales y logos institucionales
 */
function Footer({
	contactInfo = {
		address: "Carrera 8 No. 10 - 65",
		city: "Bogotá - Colombia",
		postalCode: "111711",
		schedule: "Lunes a Viernes: 7:00am - 4:30pm",
		phone: "PBX +57 1 3813000",
		phoneExtension: "Línea:195",
		email: "ventanillaelectronica@alcaldiabogota.gov.co",
		judicialEmail: "notificacionesarticulo197secgeneral@alcaldiabogota.gov.co",
	},
	legalLinks = [
		{ id: "privacy", text: "Políticas del sitio", url: "/politicas-del-sitio" },
		{ id: "sitemap", text: "Mapa del sitio", url: "/mapa-del-sitio" },
		{
			id: "terms",
			text: "Términos y Condiciones",
			url: "/terminos-y-condiciones",
		},
	],
	socialMedia = [
		{
			id: "twitter",
			platform: "twitter",
			username: "@GAB_Bogota",
			url: "https://twitter.com/GAB_Bogota",
		},
		{
			id: "instagram",
			platform: "instagram",
			username: "@gobiernoabiertobogota",
			url: "https://instagram.com/gobiernoabiertobogota",
		},
		{
			id: "facebook",
			platform: "facebook",
			username: "Gobierno Abierto Bogotá",
			url: "https://facebook.com/GobiernoAbiertoBogota",
		},
	],
	additionalLogos = [
		{
			id: "colombia",
			imageUrl: logoCoSvg,
			altText: "Colombia",
			link: "https://www.colombia.co/",
		},
		{
			id: "govco",
			imageUrl: "https://cdn.www.gov.co/assets/images/logo.svg",
			altText: "GOV.CO",
			link: "https://www.gov.co/",
		},
	],
	className = "",
}: FooterProps) {
	// Estado para controlar si el botón "Ir arriba" es visible
	const [, setShowScrollButton] = useState(false)

	// Función para desplazarse al inicio de la página
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" })
	}

	// Efecto para mostrar/ocultar el botón según el scroll
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 300) {
				setShowScrollButton(true)
			} else {
				setShowScrollButton(false)
			}
		}

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	// Determinar qué ícono usar para cada red social usando Lucide icons
	const getSocialIcon = (platform: string) => {
		switch (platform.toLowerCase()) {
			case "twitter":
				return <Twitter size={18} strokeWidth={1.5} />
			case "instagram":
				return <Instagram size={18} strokeWidth={1.5} />
			case "facebook":
				return <Facebook size={18} strokeWidth={1.5} />
			default:
				return null
		}
	}

	return (
		<footer className={`w-full relative mt-24 sm:mt-28 md:mt-26 ${className}`}>
			{/* Contenedor principal - Fondo rojo con altura ajustada */}
			<div className="bg-[#D32D37] pt-20 pb-[300px] px-4 relative">
				{/* Contenedor blanco flotante con bordes redondeados y altura reducida */}
				<div className="absolute left-0 right-0 mx-auto w-[95%] sm:w-[92%] md:w-[90%] max-w-[1719px] bg-[#FCFCFC] rounded-[20px] shadow-lg p-4 mt-10 sm:mt-0 sm:p-6 md:p-8 top-[-220px] sm:top-[-140px] md:top-[-190px] z-10">
					<div className="container mx-auto max-w-6xl">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-10">
							{/* Columna izquierda: Información de contacto */}
							<div className="px-1 sm:px-2 md:px-4">
								<h2 className="text-govco-danger text-lg sm:text-xl font-bold mb-3 sm:mb-5">
									Alcaldía Mayor de Bogotá
								</h2>

								<div className="space-y-2 sm:space-y-4">
									{contactInfo.address && (
										<div>
											<h3 className="text-govco-gray-800 font-semibold text-sm sm:text-base mb-0.5 sm:mb-1.5">
												Dirección:
											</h3>
											<p className="text-govco-gray-600 text-xs sm:text-sm leading-snug sm:leading-normal">
												{contactInfo.address}
											</p>
											{contactInfo.city && (
												<p className="text-govco-gray-600 text-xs sm:text-sm leading-snug sm:leading-normal">
													{contactInfo.city}
												</p>
											)}
										</div>
									)}

									{contactInfo.postalCode && (
										<div>
											<h3 className="text-govco-gray-800 font-semibold text-sm sm:text-base mb-0.5 sm:mb-1.5">
												Código postal:
											</h3>
											<p className="text-govco-gray-600 text-xs sm:text-sm leading-snug sm:leading-normal">
												{contactInfo.postalCode}
											</p>
										</div>
									)}

									{contactInfo.schedule && (
										<div>
											<h3 className="text-govco-gray-800 font-semibold text-sm sm:text-base mb-0.5 sm:mb-1.5">
												Horario de Atención:
											</h3>
											<p className="text-govco-gray-600 text-xs sm:text-sm leading-snug sm:leading-normal">
												{contactInfo.schedule}
											</p>
										</div>
									)}

									{(contactInfo.phone || contactInfo.phoneExtension) && (
										<div>
											<h3 className="text-govco-gray-800 font-semibold text-sm sm:text-base mb-0.5 sm:mb-1.5">
												Teléfono:
											</h3>
											<p className="text-govco-gray-600 text-xs sm:text-sm leading-snug sm:leading-normal">
												{contactInfo.phone}
												{contactInfo.phoneExtension && (
													<span className="ml-1">
														{contactInfo.phoneExtension}
													</span>
												)}
											</p>
										</div>
									)}

									{contactInfo.email && (
										<div>
											<h3 className="text-govco-gray-800 font-semibold text-sm sm:text-base mb-0.5 sm:mb-1.5">
												Correo electrónico institucional:
											</h3>
											<a
												href={`mailto:${contactInfo.email}`}
												className="text-govco-gray-600 hover:underline break-words text-xs sm:text-sm leading-snug sm:leading-normal inline-block"
											>
												{contactInfo.email}
											</a>
										</div>
									)}

									{contactInfo.judicialEmail && (
										<div>
											<h3 className="text-govco-gray-800 font-semibold text-sm sm:text-base mb-0.5 sm:mb-1.5">
												Correo electrónico de notificaciones judiciales:
											</h3>
											<a
												href={`mailto:${contactInfo.judicialEmail}`}
												className="text-govco-gray-600 hover:underline break-words text-xs sm:text-sm leading-snug sm:leading-normal inline-block"
											>
												{contactInfo.judicialEmail}
											</a>
										</div>
									)}
								</div>
							</div>

							{/* Columna derecha: Logo y redes sociales */}
							<div className="flex flex-col items-start md:items-end px-1 sm:px-2 md:px-4 mt-4 md:mt-0">
								{/* Logo de Bogotá */}
								<div className="flex items-center mb-4 sm:mb-6 md:mb-8 w-full md:justify-end">
									<img
										src={logoBogota}
										alt="Logo Bogotá"
										className="h-8 sm:h-10 md:h-12"
									/>
								</div>

								{/* Redes sociales */}
								{socialMedia && socialMedia.length > 0 && (
									<div className="mb-3 sm:mb-5 w-full">
										<h3 className="text-govco-gray-800 font-semibold text-sm sm:text-base mb-2 sm:mb-3 md:text-right">
											Redes sociales:
										</h3>

										<div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-1 gap-1.5 sm:gap-2">
											{socialMedia.map((social) => (
												<a
													key={social.id}
													href={social.url}
													target="_blank"
													rel="noopener noreferrer"
													className="flex items-center md:justify-end text-govco-gray-700 hover:text-govco-danger transition-colors group"
												>
													<div className="mr-1.5 text-govco-danger group-hover:scale-110 transition-transform">
														{getSocialIcon(social.platform)}
													</div>
													<span className="text-xs sm:text-sm truncate max-w-[120px] xs:max-w-[150px] sm:max-w-[180px] md:max-w-none">
														{social.username}
													</span>
												</a>
											))}
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Botón de "Ir arriba" */}
						<div className="absolute right-3 sm:right-6 md:right-8 bottom-10 sm:bottom-14 md:bottom-16">
							<button
								onClick={scrollToTop}
								className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-red-100 text-govco-danger hover:bg-govco-danger hover:text-white transition-all shadow-sm"
								aria-label="Ir arriba"
							>
								<ChevronUp
									size={16}
									strokeWidth={2}
									className="sm:h-5 sm:w-5 md:h-6 md:w-6"
								/>
							</button>
							<span className="text-[10px] sm:text-xs text-center text-govco-gray-700 block mt-0.5 sm:mt-1 whitespace-nowrap">
								IR ARRIBA
							</span>
						</div>

						{/* Enlaces legales */}
						<div className="mt-5 sm:mt-6 flex flex-wrap justify-center md:justify-end gap-1 sm:gap-2 text-[10px] xs:text-xs sm:text-sm text-govco-gray-700 pt-3 border-t border-gray-100">
							{legalLinks.map((link, index) => (
								<span key={link.id} className="whitespace-nowrap">
									<Link
										to={link.url}
										className="hover:text-govco-danger hover:underline transition-colors"
									>
										{link.text}
									</Link>
									{index < legalLinks.length - 1 && (
										<span className="mx-1 sm:mx-2 text-govco-gray-400">|</span>
									)}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Sección inferior - fondo azul con logos adicionales */}
			<div className="bg-[#3366CC] py-4 sm:py-6 md:py-8 px-4">
				<div className="container mx-auto max-w-6xl flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
					{/* Logos adicionales */}
					<div className="flex flex-wrap gap-4 sm:gap-6 items-center justify-center sm:justify-start">
						{additionalLogos.map((logo) => (
							<a
								key={logo.id}
								href={logo.link}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-block hover:opacity-80 transition-opacity"
							>
								<img
									src={logo.imageUrl}
									alt={logo.altText}
									className="h-5 sm:h-6 md:h-8"
								/>
							</a>
						))}
					</div>

					{/* Conoce GOV.CO aquí */}
					<div className="text-white text-xs sm:text-sm mt-2 sm:mt-0">
						<Link to="https://www.gov.co/" className="hover:underline">
							Conoce GOV.CO aquí
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
