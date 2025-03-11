"use client"

import type React from "react"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"
import { Search } from "lucide-react"

interface SearchFormProps {
    types: string[]
}

export default function SearchForm({ types }: SearchFormProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()

    const [type, setType] = useState(searchParams.get("type") || "")
    const [query, setQuery] = useState(searchParams.get("query") || "")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        startTransition(() => {
            const params = new URLSearchParams()
            if (type) params.set("type", type)
            if (query) params.set("query", query)

            router.push(`/?${params.toString()}`)
        })
    }

    const handleChangePokemon = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        setType(e.target.value)
        startTransition(() => {
            const params = new URLSearchParams()
            if (type) params.set("type", type)

            router.push(`/?${params.toString()}`)
        })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-0 md:flex md:gap-4">
            <div className="w-full md:w-1/3">
                <select
                    value={type}
                    onChange={(e) => handleChangePokemon(e)}
                    disabled={isPending}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Select Pokémon type"
                >
                    <option value="">All Types</option>
                    {types.map((type) => (
                        <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            <div className="relative w-full md:w-2/3 flex">
                <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search..."
                        className="w-full p-2 pl-10 border border-gray-300 rounded-tl-md rounded-bl-md focus:outline-none"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="px-4 py-2 bg-blue-900 text-white rounded-tr-md rounded-br-md hover:bg-blue-800 focus:outline-none disabled:opacity-75"
                >
                    Search
                </button>
            </div>
        </form>
    )
}