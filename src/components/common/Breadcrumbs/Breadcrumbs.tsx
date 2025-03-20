import { Link } from "react-router-dom"

interface BreadcrumbItem {
	text: string
	url: string
}

interface BreadcrumbsProps {
	items: BreadcrumbItem[]
}

function Breadcrumbs({ items }: BreadcrumbsProps) {
	return (
		<nav className="bg-gray-100 py-2 px-4">
			<ol className="flex flex-wrap text-sm">
				<li className="flex items-center">
					<Link to="/" className="text-gray-600 hover:text-govco-primary">
						Inicio
					</Link>
					<span className="mx-2 text-gray-500">/</span>
				</li>
				{items.map((item, index) => (
					<li key={index} className="flex items-center">
						{index === items.length - 1 ? (
							<span className="text-govco-primary font-medium">
								{item.text}
							</span>
						) : (
							<>
								<Link
									to={item.url}
									className="text-gray-600 hover:text-govco-primary"
								>
									{item.text}
								</Link>
								<span className="mx-2 text-gray-500">/</span>
							</>
						)}
					</li>
				))}
			</ol>
		</nav>
	)
}

export default Breadcrumbs
