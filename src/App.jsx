import MainContainer from './components/MainContainer'
import Header from './components/Header'
import { useContext } from 'react'
import { PokemonContext } from './PokemonContext'

function App () {
  const { pokemonData } = useContext(PokemonContext)
  // Intentar poner el backgroun en un useState
  return (
    <div className='h-full' style={{ backgroundImage: pokemonData.specieColor }}>
      <Header />
      <MainContainer />
    </div>
  )
}
/* style={{ backgroundImage: `linear-gradient(10deg, rgba(22,22,46,1) 0%, ${pokemonData.specieColor} 100%)` }} */
export default App
