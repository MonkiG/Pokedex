import StatBar from './StatBar'
import ElementsContainers from './ElementsContainers'
import PokemonTypesBox from './PokemonTypesBox'
import { usePokemon } from '../custom hooks/usePokemon'

export default function MainContainer () {
  const { pokemonData: pokemon } = usePokemon()

  return (
    <main className='w-5/6 flex flex-col m-auto overflow-hidden'>
      <header className='w-full flex flex-col mb-3'>
        <div className='flex items-center justify-between'>
          <h3 className='p-1 text-xl h-1/2'>Pokemon</h3>
          <p className='justify-self-end p-1 text-xl'>{`#${pokemon && pokemon.id}`}</p>
        </div>
        <h2 className='col-span-2 p-1 text-5xl place-self-start '>{pokemon && pokemon.name?.charAt(0).toUpperCase() + pokemon.name?.slice(1)}</h2>
      </header>
      <section className='grid grid-cols-6 grid-rows-2 gap-3'>
        <ElementsContainers className='bg-blue-300 col-span-2 ' title='Picture' idPokemon={pokemon.id}>
          <img src={pokemon && pokemon.img} alt="" className='w-1/2 m-auto lg:w-2/5' />
        </ElementsContainers>
        <ElementsContainers className='col-span-4 bg-green-300 h-64' title='Stats' idPokemon={pokemon.id}>
          <ul className=''>
            {pokemon &&
              pokemon.stats?.map((stat, index) => (
              <li className='flex justify-between items-center' key={index}>
                <h5 className='px-2 py-0.5 w-52'>{stat.stat.name}</h5> <StatBar statValue={stat.base_stat}/> <p className='px-2'>{stat.base_stat}</p>
              </li>
              ))
              }
            </ul>
        </ElementsContainers>
        <ElementsContainers className='col-span-3 bg-red-300' title='Details' idPokemon={pokemon.id}>
          <h5 className='px-2'>Type</h5>
          <div className='flex items-center'>
            {pokemon && pokemon.types?.map(type => (
              <PokemonTypesBox type={type.type.name?.charAt(0).toUpperCase() + type.type.name?.slice(1)} key={type.slot}/>
            ))}
         </div>
          <h5 className='px-2'>Weaknesess</h5>
         <div className='flex items-center'>
          <PokemonTypesBox type='Electric'/>
          <PokemonTypesBox type='Grass'/>
         </div>
        </ElementsContainers>
        <ElementsContainers className='bg-purple-300 col-span-3' title='Evolution Chain' idPokemon={pokemon.id}>
          <div className={`flex h-full ${pokemon.evolutionChain?.length > 1 ? 'justify-evenly' : 'justify-center'}`}>
            {pokemon && pokemon.evolutionChain?.map((evolution, index) => (
             <figure className='h-2/3 w-1/3 text-center' key={index}>
              <figcaption className='p-2'>{evolution.name.charAt(0).toUpperCase() + evolution.name.slice(1)}</figcaption>
              <img src={pokemon && evolution.img} alt={evolution.name + ' imagen oficial'} className='w-3/4 lg:w-3/5 m-auto' />
              </figure>
            ))}
          </div>
        </ElementsContainers>
      </section>
    </main>
  )
}
