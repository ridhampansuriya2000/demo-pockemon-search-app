"use server"

import type { Pokemon, PokemonDetail } from "./types"

const API_BASE_URL = "https://pokeapi.co/api/v2"

export async function getPokemonTypes(): Promise<string[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/type`)
        const data = await response.json()

        return data.results.map((type: { name: string }) => type.name)
    } catch (error) {
        console.error("Error fetching Pokémon types:", error)
        return []
    }
}

export async function searchPokemon(type: string, query: string): Promise<Pokemon[]> {
    try {
        const url = `${API_BASE_URL}/pokemon?limit=100`

        if (type) {
            const typeResponse = await fetch(`${API_BASE_URL}/type/${type}`)
            const typeData = await typeResponse.json()

            const pokemonOfType = typeData.pokemon.map((p: { pokemon: { name: string; url: string } }) => {
                const urlParts = p.pokemon.url.split("/")
                const id = urlParts[urlParts.length - 2]

                return {
                    id: Number.parseInt(id),
                    name: p.pokemon.name,
                    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
                    types: [type],
                }
            })

            const filteredPokemon = query
                ? pokemonOfType.filter((p: Pokemon) => p.name.toLowerCase().includes(query.toLowerCase()))
                : pokemonOfType

            return filteredPokemon
        } else {
            const response = await fetch(url)
            const data = await response.json()

            const pokemonList = await Promise.all(
                data.results
                    .filter((pokemon: { name: string }) => !query || pokemon.name.toLowerCase().includes(query.toLowerCase()))
                    // .slice(0, 20)
                    .map(async (pokemon: { name: string; url: string }) => {
                        const urlParts = pokemon.url.split("/")
                        const id = urlParts[urlParts.length - 2]

                        const detailResponse = await fetch(`${API_BASE_URL}/pokemon/${id}`)
                        const detailData = await detailResponse.json()

                        return {
                            id: Number.parseInt(id),
                            name: pokemon.name,
                            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
                            types: detailData.types.map((t: { type: { name: string } }) => t.type.name),
                        }
                    }),
            )

            return pokemonList
        }
    } catch (error) {
        console.error("Error searching Pokémon:", error)
        return []
    }
}

export async function getPokemonByName(name: string): Promise<PokemonDetail> {
    try {
        const response = await fetch(`${API_BASE_URL}/pokemon/${name.toLowerCase()}`)

        if (!response.ok) {
            throw new Error(`Pokémon not found: ${name}`)
        }

        return await response.json()
    } catch (error) {
        console.error(`Error fetching Pokémon ${name}:`, error)
        throw error
    }
}