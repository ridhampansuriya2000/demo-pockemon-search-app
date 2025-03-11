"use client"

import { useState, useEffect } from "react"
import type { Pokemon } from "@/lib/types"
import { searchPokemon } from "@/lib/pokemon"

export function usePokemonSearch(type: string, query: string) {
    const [pokemon, setPokemon] = useState<Pokemon[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                setLoading(true)
                setError(null)

                const results = await searchPokemon(type, query)
                setPokemon(results)
            } catch (err) {
                console.error("Error fetching Pokémon:", err)
                setError("Failed to load Pokémon. Please try again.")
            } finally {
                setLoading(false)
            }
        }

        fetchPokemon()
    }, [type, query])

    return { pokemon, loading, error }
}