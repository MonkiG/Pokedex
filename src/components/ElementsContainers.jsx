import { FaLessThan, FaGreaterThan } from 'react-icons/fa'
import { usePokemon } from '../custom hooks/usePokemon'

export default function ElementsContainers ({ children, title, idPokemon, handlePokemon, ...props }) {
  const { pokemonData, setId } = usePokemon()
  return (
    <div className={`relative rounded-xl ${props.className}`}>
      <h4 className='p-2'>{title}</h4>
      {children}
      <div className="w-full flex justify-between items-center absolute left-0 bottom-0 p-3">
        <button onClick={() => { setId(pokemonData.id - 1) }}>
          <FaLessThan />
        </button>
        <p>{`#${idPokemon?.toString().padStart(3, '0')}`}</p>
        <button onClick={() => { console.log(pokemonData.id); setId(pokemonData.id + 1) }}>
          <FaGreaterThan />
        </button>
      </div>
    </div>
  )
}
