import React, { createContext, useState } from 'react'
import { usePokemon } from './custom hooks/usePokemon'

export const PokemonContext = createContext()

export function PokemonProvider ({ children }) {
  const [id, setId] = useState(1)
  const { pokemonData } = usePokemon({ id })

  return (
    <PokemonContext.Provider value={{ id, setId, pokemonData }}>
      {children}
    </PokemonContext.Provider>
  )
}
