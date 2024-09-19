import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Quiz data (replace with your own questions if needed)
const quizData = [
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
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale"
  }
]

export function GamifiedQuizComponent() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(10)
  const [gameOver, setGameOver] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !gameOver) {
      handleNextQuestion()
    }
  }, [timeLeft, gameOver])

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer)
    if (answer === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    setSelectedAnswer(null)
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setTimeLeft(10)
    } else {
      setGameOver(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setTimeLeft(10)
    setGameOver(false)
    setSelectedAnswer(null)
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Gamified Quiz</CardTitle>
      </CardHeader>
      <CardContent>
        {!gameOver ? (
          <>
            <div className="mb-4">
              <Progress value={(currentQuestion + 1) / quizData.length * 100} className="w-full" />
            </div>
            <h2 className="text-xl font-semibold mb-4">{quizData[currentQuestion].question}</h2>
            <div className="grid grid-cols-2 gap-4">
              {quizData[currentQuestion].options.map((option, index) => (
                <motion.div 
                  key={index} 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }} 
                >
                  <Button
                    variant={selectedAnswer === option ? "default" : "outline"}
                    className="w-full"
                    onClick={() => handleAnswerClick(option)}
                    disabled={selectedAnswer !== null}
                  >
                    {option}
                  </Button>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
            <p className="text-xl">Your score: {score} / {quizData.length}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-lg font-semibold">Score: {score}</div>
        {!gameOver ? (
          <>
            <div className="text-lg font-semibold">Time left: {timeLeft}s</div>
            <Button onClick={handleNextQuestion} disabled={selectedAnswer === null}>
              Next Question
            </Button>
          </>
        ) : (
          <Button onClick={resetQuiz}>Play Again</Button>
        )}
      </CardFooter>
    </Card>
  )
}
