import { useGameStore } from '@/store/useGameStore'

const Snake = () => {
  const { snake } = useGameStore()

  return (
    <>
      {snake.map(([x, y], index) => (
        <div
          key={index}
          className="bg-pink-500 border rounded-md border-black"
          style={{
            gridColumnStart: x + 1, // Grid starts at 1, so we add 1
            gridRowStart: y + 1,
            width: '100%',
            height: '100%',
          }}
        ></div>
      ))}
    </>
  )
}

export default Snake
