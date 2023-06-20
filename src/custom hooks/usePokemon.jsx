import { useEffect, useState } from 'react'

export function usePokemon ({ id }) {
  const [pokemonData, setPokemonData] = useState({})
  const api = `https://pokeapi.co/api/v2/pokemon/${id}`
  useEffect(() => {
    (async () => {
      const initialData = await fetchData(api)
      const pokemonResData = {
        id: initialData.id,
        name: initialData.name,
        img: initialData.sprites.other['official-artwork'].front_default,
        stats: initialData.stats,
        types: initialData.types,
        evolutionChain: [],
        specieColor: '',
        weaknesses: []
      }

      await weaknessesData(pokemonResData)
      const speciesData = await fetchData(initialData.species?.url)
      pokemonResData.specieColor = parsePokemonColor(speciesData.color.name)
      await evolutionChainData(speciesData, pokemonResData)

      setPokemonData(pokemonResData)
    })()
  }, [id])

  return { pokemonData }
}

const fetchData = async (apiUrl) => {
  try {
    const response = await fetch(apiUrl)
    const data = await response.json()

    return data
  } catch (error) {
    console.error(error)
  }
}

const weaknessesData = async (pokemonResData) => {
  const typesUrls = pokemonResData.types.map(typo => {
    return typo.type.url
  })

  const promises = typesUrls.map(async (url) => {
    const typesData = await fetchData(url)
    const typesDoubleDamageNamesArray = typesData.damage_relations.double_damage_from.map(type => type.name)
    return typesDoubleDamageNamesArray
  })

  const arrayWeaknesses = await Promise.all(promises)

  pokemonResData.weaknesses = [].concat(...arrayWeaknesses)
}

const evolutionChainData = async (speciesData, { evolutionChain }) => {
  const evolutionChainData = await fetchData(speciesData.evolution_chain.url)

  const evolutionChainBase = await fetchData(`https://pokeapi.co/api/v2/pokemon/${evolutionChainData.chain.species.name}`)

  evolutionChain.push({ name: evolutionChainBase.name, img: evolutionChainBase.sprites.other['official-artwork'].front_default })

  if (evolutionChainData.chain.evolves_to.length > 0 && evolutionChainData.chain.evolves_to[0].evolves_to.length <= 0) {
    const evolutionChainFirstEvolve = await fetchData(`https://pokeapi.co/api/v2/pokemon/${evolutionChainData.chain.evolves_to[0].species?.name}`)
    evolutionChain.push({ name: evolutionChainFirstEvolve.name, img: evolutionChainFirstEvolve.sprites.other['official-artwork'].front_default })
  }

  if (evolutionChainData.chain.evolves_to.length > 0 && evolutionChainData.chain.evolves_to[0].evolves_to.length > 0) {
    const evolutionChainFirstEvolve = await fetchData(`https://pokeapi.co/api/v2/pokemon/${evolutionChainData.chain.evolves_to[0].species?.name}`)
    const evolutionChainLastEvolve = await fetchData(`https://pokeapi.co/api/v2/pokemon/${evolutionChainData.chain.evolves_to[0].evolves_to[0]?.species.name}`)

    evolutionChain.push({ name: evolutionChainFirstEvolve.name, img: evolutionChainFirstEvolve.sprites.other['official-artwork'].front_default })
    evolutionChain.push({ name: evolutionChainLastEvolve.name, img: evolutionChainLastEvolve.sprites.other['official-artwork'].front_default })
  }
}

const parsePokemonColor = (color) => {
  switch (color) {
    case 'black':
      return 'linear-gradient(35deg, rgba(0,0,0,.675682773109243) 31%, rgba(0,0,0,0.4) 100%)'
    case 'blue':
      return 'linear-gradient(35deg, rgba(7,0,255,.675682773109243) 31%, rgba(0,0,255,0.4) 100%)'
    case 'brown':
      return 'linear-gradient(35deg, rgba(165,42,42,.675682773109243) 31%, rgba(165,42,42,0.4) 100%)'
    case 'gray':
      return 'linear-gradient(35deg, rgba(128,128,128,.675682773109243) 31%, rgba(128,128,128,0.4) 100%)'
    case 'green':
      return 'linear-gradient(35deg, rgba(0,189,7,.675682773109243) 31%, rgba(0,255,0,0.4) 100%)'
    case 'pink':
      return 'linear-gradient(35deg, rgba(255,192,203,.675682773109243) 31%, rgba(255,192,203,0.4) 100%)'
    case 'purple':
      return 'linear-gradient(35deg, rgba(128,0,128,.675682773109243) 31%, rgba(128,0,128,0.4) 100%)'
    case 'red':
      return 'linear-gradient(35deg, rgba(189,7,0,.675682773109243) 31%, rgba(255,0,0,0.4) 100%)'
    case 'white':
      return 'linear-gradient(35deg, rgba(255,255,255,.675682773109243) 31%, rgba(255,255,255,0.4) 100%)'
    case 'yellow':
      return 'linear-gradient(35deg, rgba(126,126,0,.675682773109243) 31%, rgba(255,255,0,0.4) 100%)'
    default:
      return 'linear-gradient(35deg, rgba(0,0,0,.675682773109243) 31%, rgba(0,0,0,0.4) 100%)'
  }
}
