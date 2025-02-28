import { useGameStore } from '@/store/useGameStore'

const Food = () => {
  const { food } = useGameStore()

  return (
    <div
      className="bg-black rounded-md border border-black"
      style={{
        gridColumnStart: food[0] + 1, // Grid starts at 1
        gridRowStart: food[1] + 1,
        width: '100%',
        height: '100%',
      }}
    ></div>
  )
}

export default Food
