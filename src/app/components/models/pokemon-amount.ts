import { PokemonResult } from "./pokemon-result"

export interface PokemonAmount {
    count: number
    next: string
    previous: string
    results: Array<PokemonResult>
}
