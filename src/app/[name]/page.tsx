import { getPokemonByName } from "@/lib/pokemon"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import Breadcrumb from "@/components/breadcrumb"

export async function generateMetadata({ params }: { params: { name: string } }) {
    const pokemon = await getPokemonByName(params.name)
    return {
        title: `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} | Pokémon App`,
    }
}

export default async function PokemonDetail({ params }: { params: { name: string } }) {
    const pokemon = await getPokemonByName(params.name)

    const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)

    return (
        <main className="container mx-auto px-4 py-8">
            <Breadcrumb
                items={[
                    { label: "Home", href: "/" },
                    { label: capitalizedName, href: `/${params.name}` },
                ]}
            />

            <Link href="/" className="inline-flex items-center text-teal-500 hover:text-teal-700 mb-6">
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back
            </Link>

            <div className="max-w-2xl mx-auto">
                <div className="bg-teal-300 rounded-t-lg p-8 flex justify-center">
                    <Image
                        src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
                        alt={pokemon.name}
                        width={300}
                        height={300}
                        priority
                        className="object-contain"
                    />
                </div>

                <div className="bg-amber-200 rounded-b-lg p-6">
                    <div className="space-y-2">
                        <p>
                            <span className="font-bold">Name:</span> {capitalizedName}
                        </p>

                        <p>
                            <span className="font-bold">Type:</span> {pokemon.types.map((t) => t.type.name).join(", ")}
                        </p>

                        <p>
                            <span
                                className="font-bold">Stats:</span> {pokemon.stats.map((s) => `${s.stat.name.replace("-", " ")}`).join(", ")}
                        </p>

                        <p>
                            <span
                                className="font-bold">Abilities:</span> {pokemon.abilities.map((a) => a.ability.name.replace("-", " ")).join(", ")}
                        </p>

                        <p>
                            <span className="font-bold">Some Moves:</span>{" "}
                            {pokemon.moves.slice(0, 5).map((m) => m.move.name.replace("-", " ")).join(", ")}
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}