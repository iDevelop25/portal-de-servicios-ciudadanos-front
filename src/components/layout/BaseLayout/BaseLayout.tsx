// frontend/src/components/layout/BaseLayout/BaseLayout.tsx
import TopBar from "../TopBar"
import NavBar from "../NavBar"
import Footer from "../Footer"

interface BaseLayoutProps {
	children: React.ReactNode
	hideFooter?: boolean
}

function BaseLayout({ children, hideFooter = false }: BaseLayoutProps) {
	return (
		<div className="min-h-screen flex flex-col">
			<TopBar />
			<NavBar />
			<main className="flex-grow">{children}</main>
			{!hideFooter && <Footer />}
		</div>
	)
}

export default BaseLayout
