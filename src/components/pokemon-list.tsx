"use client"

import { useSearchParams } from "next/navigation"
import PokemonCard from "./pokemon-card"
import { usePokemonSearch } from "@/hooks/use-pokemon-search"

export default function PokemonList() {
    const searchParams = useSearchParams()
    const type = searchParams.get("type") || ""
    const query = searchParams.get("query") || ""

    const { pokemon, loading, error } = usePokemonSearch(type, query)

    if (loading) {
        return (
            <div className="mt-8 grid place-items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (error) {
        return <div className="mt-8 text-center text-red-500">Error loading Pokémon: {error}</div>
    }

    if (pokemon.length === 0) {
        return <div className="mt-8 text-center text-gray-500">No Pokémon found. Try a different search.</div>
    }

    return (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pokemon.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
        </div>
    )
}