'use client'
import { useEffect } from 'react'
import { useGameStore } from '@/store/useGameStore'
import Snake from './Snake'
import Food from './Food'
import Image from 'next/image'
import StartButton from "@/components/StartButton";

const GameBoard = () => {
  const { isRunning, moveSnake, gameOver, setDirection, score, highScore } =
    useGameStore()

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => moveSnake(), 200)
      return () => clearInterval(interval)
    }
  }, [isRunning, moveSnake])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') setDirection('UP')
      if (e.key === 'ArrowDown') setDirection('DOWN')
      if (e.key === 'ArrowLeft') setDirection('LEFT')
      if (e.key === 'ArrowRight') setDirection('RIGHT')
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setDirection])

  return (
    <>
      {!isRunning ? (
        <div className="relative w-[400px] h-[400px] bg-pink-200 border-4 border-pink-500 rounded-2xl text-black">
          <div className=''>
            <div className="relative w-[300px] h-[300px] mx-auto">
              <Image src="/snake-game-ai-gen.png" alt="snake logo" fill />
            </div>
            {!gameOver ? (
              <div className="w-fit mx-auto">
                <StartButton />
              </div>
            ) : (
              <div className="absolute bottom-5 left-13">
                <p className=" w-fit mx-auto text-center text-black text-2xl font-bold">
                  Game Over!
                </p>
                <div className=" flex items-center justify-center gap-x-3 text-center mb-2 text-black text-xl font-bold">
                  <p>Your Score: {score}</p>
                  <p>High Score: {highScore}</p>
                </div>

                <div className="w-fit mx-auto">
                  <StartButton />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col items-center">
          {/* Score Display */}
          <div className="flex justify-between w-[400px] text-white text-lg font-bold mb-2">
            <span>Score: {score}</span>
            <span>High Score: {highScore}</span>
          </div>

          {/* Game Board with Grid Lines */}
          <div className="relative w-[400px] h-[400px] bg-pink-200 border-20 border-pink-500 grid grid-cols-20 grid-rows-20 rounded-2xl p-2">
            {/* Grid Lines */}
            {Array.from({ length: 20 * 20 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-full border rounded-md border-black/50"
              ></div>
            ))}

            {/* Snake and Food */}
            <Snake />
            <Food />
          </div>
        </div>
      )}
    </>
  )
}

export default GameBoard
