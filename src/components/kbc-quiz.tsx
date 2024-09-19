
import  { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle, CheckCircle, XCircle } from "lucide-react"
const questions = [
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Charles Dickens", "Jane Austen", "Harper Lee", "Mark Twain"],
    correctAnswer: "Harper Lee"
  },
  {
    question: "What is the capital of Japan?",
    options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
    correctAnswer: "Tokyo"
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Silver", "Oxygen", "Iron"],
    correctAnswer: "Oxygen"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
    correctAnswer: "Leonardo da Vinci"
  }
]

const moneyLadder = [
  "₹1,000", "₹2,000", "₹3,000", "₹5,000", "₹10,000", "₹20,000", "₹40,000",
  "₹80,000", "₹1,60,000", "₹3,20,000", "₹6,40,000", "₹12,50,000", "₹25,00,000",
  "₹50,00,000", "₹1,00,00,000", "₹7,00,00,000"
]

export function KbcQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [lifeline5050, setLifeline5050] = useState(true)
  const [disabledOptions, setDisabledOptions] = useState<number[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null)

  useEffect(() => {
    if (isAnswerCorrect !== null) {
      const timer = setTimeout(() => {
        if (isAnswerCorrect) {
          if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1)
            setScore(score + 1)
          } else {
            setShowResult(true)
          }
        } else {
          setShowResult(true)
        }
        setSelectedAnswer(null)
        setIsAnswerCorrect(null)
        setDisabledOptions([])
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isAnswerCorrect, currentQuestion, score])

  const handleAnswer = (selected: string) => {
    setSelectedAnswer(selected)
    const correct = selected === questions[currentQuestion].correctAnswer
    setIsAnswerCorrect(correct)
  }

  const use5050Lifeline = () => {
    if (lifeline5050) {
      const correctAnswer = questions[currentQuestion].correctAnswer
      const incorrectOptions = questions[currentQuestion].options.filter(option => option !== correctAnswer)
      const randomIncorrect = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)]
      const newDisabledOptions = questions[currentQuestion].options
        .map((option, index) => option !== correctAnswer && option !== randomIncorrect ? index : -1)
        .filter(index => index !== -1)
      setDisabledOptions(newDisabledOptions)
      setLifeline5050(false)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setLifeline5050(true)
    setDisabledOptions([])
    setSelectedAnswer(null)
    setIsAnswerCorrect(null)
  }

  const getButtonStyle = (option: string) => {
    if (selectedAnswer === null) return "bg-white hover:bg-gray-100"
    if (option === questions[currentQuestion].correctAnswer) return "bg-green-500 text-white"
    if (option === selectedAnswer) return "bg-red-500 text-white"
    return "bg-white"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Kaun Banega Crorepati</CardTitle>
        </CardHeader>
        <CardContent>
          {!showResult ? (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Question {currentQuestion + 1}</h2>
                <p className="text-lg">{questions[currentQuestion].question}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    disabled={disabledOptions.includes(index) || selectedAnswer !== null}
                    variant="outline"
                    className={`text-left transition-colors duration-300 ${getButtonStyle(option)}`}
                  >
                    {String.fromCharCode(65 + index)}. {option}
                  </Button>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <Button onClick={use5050Lifeline} disabled={!lifeline5050 || selectedAnswer !== null} variant="secondary">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  50:50 Lifeline
                </Button>
                <div className="text-right">
                  <p className="font-semibold">Current Prize:</p>
                  <p className="text-xl font-bold text-green-600">{moneyLadder[score]}</p>
                </div>
              </div>
              {isAnswerCorrect !== null && (
                <div className={`mt-4 p-2 rounded-md ${isAnswerCorrect ? "'bg-green-100'" : "'bg-red-100'"}`}>
                  {isAnswerCorrect ? (
                    <p className="flex items-center text-green-700">
                      <CheckCircle className="mr-2 h-5 w-5" /> Correct! Moving to the next question...
                    </p>
                  ) : (
                    <p className="flex items-center text-red-700">
                      <XCircle className="mr-2 h-5 w-5" /> Incorrect. The correct answer was {questions[currentQuestion].correctAnswer}.
                    </p>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
              <p className="text-xl mb-2">Your Score: {score} out of {questions.length}</p>
              <p className="text-2xl font-bold text-green-600 mb-6">You Won: {moneyLadder[score]}</p>
              <Button onClick={restartQuiz} className="w-full">Play Again</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}