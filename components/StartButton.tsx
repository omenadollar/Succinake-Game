import { useGameStore } from "@/store/useGameStore";

const StartButton = () => {
  const { startGame } = useGameStore();

  return <button onClick={startGame} className="bg-pink-500 text-black font-bold px-4 py-2 rounded">Start Game</button>;
};

export default StartButton;
