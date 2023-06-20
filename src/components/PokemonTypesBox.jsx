export default function PokemonTypesBox ({ type, ...props }) {
  return (
        <p className={`border-solid border-2 border-black rounded-lg px-1 m-2 text-center ${props.className}`}>{type}</p>
  )
}
