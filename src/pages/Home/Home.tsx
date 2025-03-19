// frontend/src/pages/Home/Home.tsx
import BaseLayout from "../../components/layout/BaseLayout/BaseLayout"
import HomeHero from "../../components/home/HomeHero/HomeHero"
import ServiceContainer from "../../components/home/ServiceContainer/ServiceContainer"

function Home() {
	return (
		<BaseLayout title="Página de Inicio">
			<HomeHero />
			<ServiceContainer />
		</BaseLayout>
	)
}

export default Home
