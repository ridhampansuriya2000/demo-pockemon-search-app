import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface BreadcrumbItem {
    label: string
    href: string
}

interface BreadcrumbProps {
    items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav className="flex mb-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                {items.map((item, index) => (
                    <li key={item.href} className="inline-flex items-center">
                        {index > 0 && <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />}
                        <Link
                            href={item.href}
                            className={`inline-flex items-center text-sm font-medium ${
                                index === items.length - 1 ? "text-gray-700 pointer-events-none" : "text-blue-600 hover:text-blue-800"
                            }`}
                            aria-current={index === items.length - 1 ? "page" : undefined}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ol>
        </nav>
    )
}

