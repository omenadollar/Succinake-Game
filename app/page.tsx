'use client'

import GameBoard from '@/components/GameBoard'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="grid gap-y-8 h-screen bg-black text-white">
      <div className="h-5 !bg-white flex items-center gap-x-1 px-1">
        <div className="h-3 w-3 bg-green-500 rounded-full"></div>
        <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
        <div className="h-3 w-3 bg-red-500 rounded-full"></div>
      </div>
      <div className="!relative flex flex-col items-center justify-center">
        <div className="relative mb-2">
          <Image
            src="/succint_logo.png"
            alt="logo"
            height={100}
            width={100}
            className="absolute -left-16 z-10 -top-10"
          />
          <h1 className="text-4xl font-bold">uccinake Game</h1>
        </div>
        <GameBoard />
        <p className='font-bold'>Use PC for best experience</p>
      </div>
      <div className=" h-5 !bg-white grid items-center">
        <div className="flex items-center gap-x-1 pr-3 w-fit ml-auto">
          <div className="h-3 w-3 bg-green-500 rounded-full"></div>
          <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
          <div className="h-3 w-3 bg-red-500 rounded-full"></div>
        </div>
      </div>
    </main>
  )
}
