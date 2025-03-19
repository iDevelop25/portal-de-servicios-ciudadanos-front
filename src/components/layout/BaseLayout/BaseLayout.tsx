// frontend/src/components/layout/BaseLayout/BaseLayout.tsx
import TopBar from "../TopBar"
import NavBar from "../NavBar"
import Footer from "../Footer"
import { usePageTitle } from "../../../hooks/usePageTitle"
import { useLocation } from "react-router-dom"
import { ROUTES } from "../../../config/routes"

interface BaseLayoutProps {
	title: string
	withBaseTitle?: boolean
	hideFooter?: boolean
	children: React.ReactNode
}

function BaseLayout({
	title,
	withBaseTitle = true,
	hideFooter = false,
	children,
}: BaseLayoutProps) {
	usePageTitle(title, withBaseTitle)

	// Verificar si estamos en la página 404
	const location = useLocation()
	const isNotFoundPage =
		location.pathname === "*" ||
		!Object.values(ROUTES)
			.filter((route) => route.path !== "*")
			.map((route) => route.path)
			.includes(location.pathname)

	// Si estamos en la página 404 o se especificó hideFooter, ocultamos el footer
	const shouldHideFooter = hideFooter || isNotFoundPage

	return (
		<div className="min-h-screen flex flex-col">
			<TopBar />
			<NavBar />
			<main className="flex-grow">{children}</main>
			{!shouldHideFooter && <Footer />}
		</div>
	)
}

export default BaseLayout
