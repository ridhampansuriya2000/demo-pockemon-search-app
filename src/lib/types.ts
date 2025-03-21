export interface Pokemon {
    id: number
    name: string
    image: string
    types: string[]
}

export interface PokemonDetail {
    id: number
    name: string
    sprites: {
        front_default: string
        other: {
            "official-artwork": {
                front_default: string
            }
        }
    }
    types: {
        type: {
            name: string
        }
    }[]
    stats: {
        base_stat: number
        stat: {
            name: string
        }
    }[]
    abilities: {
        ability: {
            name: string
        }
    }[]
    moves: {
        move: {
            name: string
        }
    }[]
}