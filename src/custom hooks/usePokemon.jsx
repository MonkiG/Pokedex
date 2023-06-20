import { useEffect, useState } from 'react'

export function usePokemon ({ id }) {
  const [pokemonData, setPokemonData] = useState({})
  const api = `https://pokeapi.co/api/v2/pokemon/${id}`
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api)
        const data = await response.json()

        const pokemonResData = {
          id: data.id,
          name: data.name,
          img: data.sprites.other['official-artwork'].front_default,
          stats: data.stats,
          types: data.types,
          evolutionChain: []
        }

        const speciesResponse = await fetch(data.species?.url)
        const speciesData = await speciesResponse.json()

        const evolutionChainResponse = await fetch(speciesData.evolution_chain.url)
        const evolutionChainData = await evolutionChainResponse.json()

        const evolutionChainBase = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionChainData.chain.species.name}`)).json()

        pokemonResData.evolutionChain.push({ name: evolutionChainBase.name, img: evolutionChainBase.sprites.other['official-artwork'].front_default })

        if (evolutionChainData.chain.evolves_to.length > 0 && evolutionChainData.chain.evolves_to[0].evolves_to.length <= 0) {
          const evolutionChainFirstEvolve = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionChainData.chain.evolves_to[0].species?.name}`)).json()
          pokemonResData.evolutionChain.push({ name: evolutionChainFirstEvolve.name, img: evolutionChainFirstEvolve.sprites.other['official-artwork'].front_default })
        }

        if (evolutionChainData.chain.evolves_to.length > 0 && evolutionChainData.chain.evolves_to[0].evolves_to.length > 0) {
          const evolutionChainFirstEvolve = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionChainData.chain.evolves_to[0].species?.name}`)).json()
          const evolutionChainLastEvolve = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionChainData.chain.evolves_to[0].evolves_to[0]?.species.name}`)).json()

          pokemonResData.evolutionChain.push({ name: evolutionChainFirstEvolve.name, img: evolutionChainFirstEvolve.sprites.other['official-artwork'].front_default })
          pokemonResData.evolutionChain.push({ name: evolutionChainLastEvolve.name, img: evolutionChainLastEvolve.sprites.other['official-artwork'].front_default })
        }

        setPokemonData(pokemonResData)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [id])

  return { pokemonData }
}
