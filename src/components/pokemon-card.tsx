import Image from "next/image"
import Link from "next/link"
import type { Pokemon } from "@/lib/types"

interface PokemonCardProps {
    pokemon: Pokemon
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
    const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 flex justify-center">
                <Image
                    src={pokemon.image || "/placeholder.svg"}
                    alt={pokemon.name}
                    width={150}
                    height={150}
                    className="object-contain"
                />
            </div>

            <div className="py-4 px-6 text-center bg-[#f3f3f382] w-full flex flex-col justify-center items-start gap-[30px]">
                <h3 className="text-lg font-semibold mb-2">{capitalizedName}</h3>

                <Link href={`/${pokemon.name}`} className="text-blue-500 hover:text-blue-700 inline-flex items-center">
                    Details →
                </Link>
            </div>
        </div>
    )
}