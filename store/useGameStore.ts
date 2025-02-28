import { create } from "zustand";
import { bgMusic, eatSound, gameOverSound } from "@/components/Sound";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

interface GameState {
  snake: number[][];
  food: number[];
  direction: Direction;
  isRunning: boolean;
  gameOver: boolean;
  score: number;
  highScore: number;
  setDirection: (dir: Direction) => void;
  startGame: () => void;
  moveSnake: () => void;
  checkCollision: () => boolean;
}

export const useGameStore = create<GameState>((set, get) => ({
  snake: [[5, 5]],
  food: [10, 10],
  direction: "RIGHT",
  isRunning: false,
  gameOver: false,
  score: 0,
  highScore: typeof window !== "undefined" ? Number(localStorage.getItem("highScore")) || 0 : 0,

  setDirection: (dir) => {
    const currentDirection = get().direction;
    if (
      (currentDirection === "UP" && dir === "DOWN") ||
      (currentDirection === "DOWN" && dir === "UP") ||
      (currentDirection === "LEFT" && dir === "RIGHT") ||
      (currentDirection === "RIGHT" && dir === "LEFT")
    ) {
      return;
    }
    set({ direction: dir });
  },

  startGame: () => {
    bgMusic.play();
    set({
      snake: [[5, 5]],
      food: [10, 10],
      isRunning: true,
      gameOver: false,
      direction: "RIGHT",
      score: 0, // Reset score
    });
  },

  moveSnake: () => {
    const { snake, food, direction, score, highScore } = get();
    const head = [...snake[0]];

    if (direction === "UP") head[1]--;
    if (direction === "DOWN") head[1]++;
    if (direction === "LEFT") head[0]--;
    if (direction === "RIGHT") head[0]++;

    if (head[0] < 0 || head[0] >= 20 || head[1] < 0 || head[1] >= 20) {
      bgMusic.stop();
      gameOverSound.play();
      set({ gameOver: true, isRunning: false });

      // **Update High Score in localStorage**
      if (score > highScore) {
        localStorage.setItem("highScore", String(score));
        set({ highScore: score });
      }
      return;
    }

    if (head[0] === food[0] && head[1] === food[1]) {
      eatSound.play();
      let newFood: number[];
      do {
        newFood = [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)];
      } while (snake.some(([x, y]) => x === newFood[0] && y === newFood[1]));

      set({ food: newFood, snake: [head, ...snake], score: score + 1 }); // Increase score by 1
    } else {
      set({ snake: [head, ...snake.slice(0, -1)] });
    }

    if (get().checkCollision()) {
      bgMusic.stop();
      set({ gameOver: true, isRunning: false });

      // **Update High Score**
      if (score > highScore) {
        localStorage.setItem("highScore", String(score));
        set({ highScore: score });
      }
    }
  },

  checkCollision: () => {
    const { snake } = get();
    const [headX, headY] = snake[0];
    return snake.slice(1).some(([x, y]) => x === headX && y === headY);
  },
}));
