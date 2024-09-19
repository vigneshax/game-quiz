import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ArrowLeft, Lightbulb } from 'lucide-react'

interface Question {
  question: string;
  answer: string;
  letters: string;
}

export default function QuizGame() {
  const [score, setScore] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedLetters, setSelectedLetters] = useState<string[]>([])
  const [hintUsed, setHintUsed] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [shuffledLetters, setShuffledLetters] = useState<string[]>([])

  const questions: Question[] = [
    {
      question: "Capital of France",
      answer: "PARIS",
      letters: "PARISLONDON"
    },
    {
      question: "Largest planet in our solar system",
      answer: "JUPITER",
      letters: "JUPITERURANUS"
    },
    {
      question: "Element with chemical symbol 'O'",
      answer: "OXYGEN",
      letters: "OXYGENCARBON"
    },
    {
      question: "Author of 'Romeo and Juliet'",
      answer: "SHAKESPEARE",
      letters: "SHAKESPEAREMILTON"
    },
    {
      question: "Continent where the Amazon rainforest is located",
      answer: "SOUTHAMERICA",
      letters: "SOUTHAMERICAAFRICA"
    }
  ]

  const currentQuestion = questions[currentQuestionIndex]

  useEffect(() => {
    shuffleLetters()
  }, [currentQuestionIndex])

  useEffect(() => {
    if (selectedLetters.join('') === currentQuestion.answer) {
      setScore((prevScore) => prevScore + 100)
      setCorrectAnswers((prev) => prev + 1)
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1)
        setSelectedLetters([])
        setHintUsed(false)
      } else {
        setQuizCompleted(true)
      }
    }
  }, [selectedLetters, currentQuestion, currentQuestionIndex, questions.length])

  const shuffleLetters = () => {
    const letters = currentQuestion.letters.split('')
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]]
    }
    setShuffledLetters(letters)
  }

  const handleLetterClick = (letter: string) => {
    if (selectedLetters.length < currentQuestion.answer.length) {
      setSelectedLetters([...selectedLetters, letter])
    }
  }

  const handleHint = () => {
    if (!hintUsed) {
      setHintUsed(true)
      setScore((prevScore) => prevScore - 25)
    }
  }

  const handleSkip = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedLetters([])
      setHintUsed(false)
      setScore((prevScore) => prevScore - 50)
    } else {
      setQuizCompleted(true)
    }
  }

  const handleRestart = () => {
    setScore(0)
    setCurrentQuestionIndex(0)
    setSelectedLetters([])
    setHintUsed(false)
    setQuizCompleted(false)
    setCorrectAnswers(0)
    shuffleLetters()
  }

  if (quizCompleted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
          <p className="mb-2">Your final score: {score}</p>
          <p className="mb-4">Correct answers: {correctAnswers} out of {questions.length}</p>
          <Button onClick={handleRestart}>Restart Quiz</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">🪙</span>
            <span className="font-bold">{score}</span>
          </div>
        </div>
        
        <div className="flex justify-between mb-4">
          <Button 
            variant="destructive" 
            size="sm"
            onClick={handleHint}
            disabled={hintUsed}
          >
            <Lightbulb className="h-4 w-4 mr-2" />
            HINT
          </Button>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={handleSkip}
          >
            SKIP
          </Button>
        </div>

        <p className="text-center mb-4">{currentQuestion.question}</p>

        <div className="flex justify-center mb-4">
          {currentQuestion.answer.split('').map((_, index) => (
            <div 
              key={index} 
              className="w-8 h-8 border-b-2 border-gray-300 mx-1 text-center text-xl font-bold"
            >
              {selectedLetters[index] || ''}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {shuffledLetters.map((letter, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full h-12 text-xl font-bold"
              onClick={() => handleLetterClick(letter)}
            >
              {letter}
            </Button>
          ))}
        </div>

        <div className="mt-4 text-center">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
      </div>
    </div>
  )
}