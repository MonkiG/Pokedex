import { FaLessThan, FaGreaterThan } from 'react-icons/fa'
import { useContext } from 'react'
import { PokemonContext } from '../PokemonContext'

export default function ElementsContainers ({ children, title, idPokemon, handlePokemon, ...props }) {
  const { id, setId } = useContext(PokemonContext)
  return (
    <div className={`relative rounded-xl bg-[#e2e8f084] ${props.className}`}>
      <h4 className='p-2'>{title}</h4>
      {children}
      <div className="w-full flex justify-between items-center absolute left-0 bottom-0 p-3">
        <button onClick={() => { setId(id - 1) }}>
          <FaLessThan />
        </button>
        <p>{`#${idPokemon?.toString().padStart(3, '0')}`}</p>
        <button onClick={() => { setId(id + 1) }}>
          <FaGreaterThan />
        </button>
      </div>
    </div>
  )
}
