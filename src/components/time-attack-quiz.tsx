import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Zap, Divide } from 'lucide-react'

const questions = [
  {
    question: "What is the capital of Japan?",
    options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
    correctAnswer: "Tokyo"
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "Mark Twain", "John Steinbeck", "F. Scott Fitzgerald"],
    correctAnswer: "Harper Lee"
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Mars", "Jupiter", "Saturn", "Neptune"],
    correctAnswer: "Jupiter"
  },
  {
    question: "In what year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correctAnswer: "1945"
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: "Au"
  }
]

export function TimeAttackQuizComponent() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [timeLeft, setTimeLeft] = useState(10)
  const [gameOver, setGameOver] = useState(false)
  const [highScore, setHighScore] = useState(0)
  const [powerUps, setPowerUps] = useState({ timeFreeze: 1, fiftyFifty: 1 })
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [eliminatedOptions, setEliminatedOptions] = useState<string[]>([])

  useEffect(() => {
    const storedHighScore = localStorage.getItem("'quizHighScore'")
    if (storedHighScore) setHighScore(parseInt(storedHighScore))

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer)
          handleIncorrectAnswer()
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [currentQuestion])

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer)
    if (answer === questions[currentQuestion].correctAnswer) {
      const timeBonus = Math.floor(timeLeft * 10)
      setScore(score + 100 + timeBonus)
      handleNextQuestion()
    } else {
      handleIncorrectAnswer()
    }
  }

  const handleNextQuestion = () => {
    setSelectedAnswer(null)
    setEliminatedOptions([])
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setTimeLeft(10)
    } else {
      endGame()
    }
  }

  const handleIncorrectAnswer = () => {
    setLives(lives - 1)
    if (lives - 1 <= 0) {
      endGame()
    } else {
      handleNextQuestion()
    }
  }

  const endGame = () => {
    setGameOver(true)
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem("'quizHighScore'", score.toString())
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setLives(3)
    setTimeLeft(10)
    setGameOver(false)
    setPowerUps({ timeFreeze: 1, fiftyFifty: 1 })
    setSelectedAnswer(null)
    setEliminatedOptions([])
  }

  const usePowerUp = (type: "timeFreeze" | "fiftyFifty") => {
    if (powerUps[type] > 0) {
      setPowerUps({ ...powerUps, [type]: powerUps[type] - 1 })
      if (type === "timeFreeze") {
        setTimeLeft(timeLeft + 5)
      } else if (type === "fiftyFifty") {
        const incorrectOptions = questions[currentQuestion].options.filter(
          option => option !== questions[currentQuestion].correctAnswer
        )
        const eliminatedOptions = incorrectOptions.slice(0, 2)
        setEliminatedOptions(eliminatedOptions)
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <Card className="w-[350px] sm:w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Time Attack Quiz!</CardTitle>
        </CardHeader>
        <CardContent>
          {!gameOver ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <Clock className="mr-2" />
                  <Progress value={timeLeft * 10} className="w-20" />
                </div>
                <div className="flex items-center">
                  {Array.from({ length: lives }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-red-500 mr-1"
                    >
                      ❤️
                    </motion.div>
                  ))}
                </div>
              </div>
              <p className="text-lg font-semibold mb-4">Question {currentQuestion + 1} of {questions.length}</p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-bold mb-4">{questions[currentQuestion].question}</h2>
                  <div className="space-y-2">
                    {questions[currentQuestion].options.map((option, index) => (
                      <Button
                        key={index}
                        variant={selectedAnswer === option ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => handleAnswer(option)}
                        disabled={eliminatedOptions.includes(option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-center">Game Over!</h2>
              <p className="text-xl text-center mb-4">Your Score: {score}</p>
              <p className="text-center mb-4">High Score: {highScore}</p>
            </motion.div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => usePowerUp("timeFreeze")}
              disabled={powerUps.timeFreeze === 0 || gameOver}
            >
              <Zap className="mr-1" /> {powerUps.timeFreeze}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => usePowerUp("fiftyFifty")}
              disabled={powerUps.fiftyFifty === 0 || gameOver}
            >
              <Divide className="mr-1" /> {powerUps.fiftyFifty}
            </Button>
          </div>
          {gameOver && <Button onClick={resetQuiz}>Play Again</Button>}
        </CardFooter>
      </Card>
    </div>
  )
}