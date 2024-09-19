import { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

type Question = {
  question: string
  options: string[]
  correctAnswer: string
}

const questions: Question[] = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
    correctAnswer: "Leonardo da Vinci"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean"
  },
  {
    question: "Which country is home to the kangaroo?",
    options: ["New Zealand", "South Africa", "Australia", "Brazil"],
    correctAnswer: "Australia"
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: "Au"
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: "William Shakespeare"
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Jupiter"
  },
  {
    question: "Which element is the most abundant in Earth's atmosphere?",
    options: ["Oxygen", "Carbon", "Nitrogen", "Hydrogen"],
    correctAnswer: "Nitrogen"
  },
  {
    question: "What is the capital of Japan?",
    options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
    correctAnswer: "Tokyo"
  }
]

const CANVAS_SIZE = 400
const SNAKE_START = [
  [8, 7],
  [8, 8]
]
const APPLE_START = [8, 3]
const SCALE = 20
const SPEED = 300
const DIRECTIONS = {
  38: [0, -1], // up
  40: [0, 1], // down
  37: [-1, 0], // left
  39: [1, 0] // right
}

export default function SnakeQuizGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [snake, setSnake] = useState(SNAKE_START)
  const [apple, setApple] = useState(APPLE_START)
  const [dir, setDir] = useState([0, -1])
  const [speed, setSpeed] = useState<number | null>(null)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [questionsAnswered, setQuestionsAnswered] = useState(0)

  const moveSnake = useCallback(() => {
    const newSnake = [...snake]
    const newHead = [
      (newSnake[0][0] + dir[0] + CANVAS_SIZE / SCALE) % (CANVAS_SIZE / SCALE),
      (newSnake[0][1] + dir[1] + CANVAS_SIZE / SCALE) % (CANVAS_SIZE / SCALE)
    ]
    newSnake.unshift(newHead as [number, number])
    if (newHead[0] === apple[0] && newHead[1] === apple[1]) {
      setScore(score + 1)
      setApple(createApple())
      setCurrentQuestion(questions[questionsAnswered])
      setSpeed(null)
    } else {
      newSnake.pop()
    }
    setSnake(newSnake)
  }, [snake, dir, apple])

  const createApple = useCallback(() => {
    return [
      Math.floor(Math.random() * (CANVAS_SIZE / SCALE)),
      Math.floor(Math.random() * (CANVAS_SIZE / SCALE))
    ] as [number, number]
  }, [])

  const checkCollision = useCallback((piece: number[], snk = snake) => {
    if (
      piece[0] * SCALE >= CANVAS_SIZE ||
      piece[0] < 0 ||
      piece[1] * SCALE >= CANVAS_SIZE ||
      piece[1] < 0
    )
      return true
    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) return true
    }
    return false
  }, [snake])

  const gameLoop = useCallback(() => {
    const snakeCopy = [...snake]
    const newHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]]
    if (checkCollision(newHead as number[])) {
      setGameOver(true)
      setSpeed(null)
    }
    moveSnake()
  }, [snake, dir, moveSnake, checkCollision])

  const changeDirection = useCallback((e: KeyboardEvent) => {
    const key = e.keyCode
    if (key === 37 && dir[0] !== 1) setDir(DIRECTIONS[37])
    if (key === 38 && dir[1] !== 1) setDir(DIRECTIONS[38])
    if (key === 39 && dir[0] !== -1) setDir(DIRECTIONS[39])
    if (key === 40 && dir[1] !== -1) setDir(DIRECTIONS[40])
  }, [dir])

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d')
    if (context) {
      context.setTransform(SCALE, 0, 0, SCALE, 0, 0)
      context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
      context.fillStyle = '#4FD1C5'
      snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1))
      context.fillStyle = '#F56565'
      context.fillRect(apple[0], apple[1], 1, 1)
    }
  }, [snake, apple, gameOver])

  useEffect(() => {
    if (questionsAnswered === 10) {
      setGameOver(true)
      setSpeed(null)
    }
  }, [questionsAnswered])

  useEffect(() => {
    if (speed !== null) {
      const intervalId = setInterval(gameLoop, speed)
      return () => clearInterval(intervalId)
    }
  }, [speed, gameLoop])

  useEffect(() => {
    document.addEventListener('keydown', changeDirection)
    return () => document.removeEventListener('keydown', changeDirection)
  }, [changeDirection])

  const startGame = () => {
    setSnake(SNAKE_START)
    setApple(APPLE_START)
    setDir([0, -1])
    setSpeed(SPEED)
    setGameOver(false)
    setScore(0)
    setCurrentQuestion(null)
    setQuestionsAnswered(0)
  }

  const handleAnswer = () => {
    if (currentQuestion && selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1)
    }
    setQuestionsAnswered(questionsAnswered + 1)
    setCurrentQuestion(null)
    setSelectedAnswer("")
    setSpeed(SPEED)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
      <Card className="w-[500px] bg-white shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-primary">Snake Quiz Game</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold text-center mb-4">Score: {score}</div>
          {gameOver ? (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 text-red-600">Game Over!</h2>
              <p className="text-xl mb-4">Your final score is: {score}</p>
              <Button onClick={startGame} className="w-full">Restart Game</Button>
            </div>
          ) : currentQuestion ? (
            <div>
              <h3 className="text-xl font-semibold mb-4">{currentQuestion.question}</h3>
              <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} className="space-y-2">
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
              <Button onClick={handleAnswer} disabled={!selectedAnswer} className="w-full mt-6">
                Submit Answer
              </Button>
            </div>
          ) : (
            <div className="flex justify-center">
              <canvas
                ref={canvasRef}
                width={`${CANVAS_SIZE}px`}
                height={`${CANVAS_SIZE}px`}
                className="border-2 border-gray-300 rounded-md"
              />
            </div>
          )}
          {!gameOver && !currentQuestion && speed === null && (
            <Button onClick={() => setSpeed(SPEED)} className="w-full mt-4">Start Game</Button>
          )}
        </CardContent>
      </Card>
      {!gameOver && !currentQuestion && speed !== null && (
        <div className="mt-4 text-center text-gray-600">
          <p>Use arrow keys to control the snake.</p>
          <p>Catch the red apple to answer questions!</p>
        </div>
      )}
    </div>
  )
}