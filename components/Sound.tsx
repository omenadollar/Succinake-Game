import { Howl } from 'howler'

const bgMusic = new Howl({
  src: ['/Prove_Your_Love(256k)_instrumental.mp3'],
  loop: true,
  volume: 1.0,
})
const eatSound = new Howl({ src: ['/eating-food-sound.wav'], volume: 1.0 })
const gameOverSound = new Howl({ src: ['/game-over.mp3'], volume: 1.0 })

export { bgMusic, eatSound, gameOverSound }
