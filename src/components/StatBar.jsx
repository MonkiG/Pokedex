export default function StatBar ({ statValue }) {
  return (
        <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500 transition-all ease-linear duration-500" style={{ width: statValue >= 100 ? '100%' : `${statValue}%` }}></div>
        </div>
  )
}
