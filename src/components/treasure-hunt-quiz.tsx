import { useState } from 'react'
import { motion } from 'framer-motion'
import { Compass, Map as MapIcon, X, Check, Flag, Trophy } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const treasures = [
  {
    id: 1,
    question: "What's the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    answer: "Paris",
    x: 20,
    y: 70
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
    x: 40,
    y: 40
  },
  {
    id: 3,
    question: "What's the largest mammal?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    answer: "Blue Whale",
    x: 60,
    y: 60
  },
  {
    id: 4,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    answer: "Leonardo da Vinci",
    x: 75,
    y: 30
  },
  {
    id: 5,
    question: "What's the chemical symbol for gold?",
    options: ["Ag", "Au", "Fe", "Cu"],
    answer: "Au",
    x: 85,
    y: 80
  },
]

export function TreasureHuntQuizComponent() {
  const [currentTreasure, setCurrentTreasure] = useState(0)
  const [userAnswer, setUserAnswer] = useState("''")
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [revealedTreasures, setRevealedTreasures] = useState<number[]>([])
  const [isCompleted, setIsCompleted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const correct = userAnswer === treasures[currentTreasure].answer
    setIsCorrect(correct)
    setShowFeedback(true)
    if (correct) {
      setScore(score + 1)
      setRevealedTreasures([...revealedTreasures, currentTreasure])
    }
    setTimeout(() => {
      setShowFeedback(false)
      setUserAnswer("''")
      if (currentTreasure < treasures.length - 1) {
        setCurrentTreasure(currentTreasure + 1)
      } else {
        setIsCompleted(true)
      }
    }, 2000)
  }

  const handlePlayAgain = () => {
    setCurrentTreasure(0)
    setScore(0)
    setRevealedTreasures([])
    setIsCompleted(false)
  }

  const handleGoBack = () => {
    // This function would typically navigate back to a main menu or previous page
    // For this example, we'll just reset the quiz
    handlePlayAgain()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-amber-300 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-amber-800">Treasure Hunt Quiz</h1>
            <Compass className="text-amber-600 w-8 h-8 animate-spin-slow" />
          </div>
          <Progress value={(currentTreasure / treasures.length) * 100} className="w-full" />
          <div className="flex gap-6">
            <div className="flex-1 bg-amber-50 rounded-lg p-4 shadow-inner">
              <motion.div
                key={currentTreasure}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <MapIcon className="w-12 h-12 text-amber-600 mx-auto" />
                <h2 className="text-lg font-semibold text-center text-amber-800">
                  Treasure #{currentTreasure + 1}
                </h2>
                <p className="text-center text-amber-700">{treasures[currentTreasure].question}</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <RadioGroup value={userAnswer} onValueChange={setUserAnswer}>
                    {treasures[currentTreasure].options.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700" disabled={!userAnswer}>
                    Dig for Treasure!
                  </Button>
                </form>
              </motion.div>
            </div>
            <div className="flex-1 relative">
              <img src="/map2.webp?height=300&width=300" alt="Treasure Island Map" className="w-full h-auto" />
              {treasures.map((treasure, index) => (
                <motion.div
                  key={treasure.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: revealedTreasures.includes(index) ? 1 : 0 }}
                  className="absolute"
                  style={{ left: `${treasure.x}%`, top: `${treasure.y}%`, transform: "'translate(-50%, -50%)'" }}
                >
                  {index === treasures.length - 1 ? (
                    <Flag className="w-6 h-6 text-red-500" />
                  ) : (
                    <div className="w-4 h-4 bg-amber-600 rounded-full" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-4 rounded-lg text-center ${
                isCorrect ? "'bg-green-100 text-green-800'" : "'bg-red-100 text-red-800'"
              }`}
            >
              {isCorrect ? (
                <Check className="w-8 h-8 mx-auto mb-2 text-green-600" />
              ) : (
                <X className="w-8 h-8 mx-auto mb-2 text-red-600" />
              )}
              <p className="font-semibold">
                {isCorrect ? "'You found the treasure!'" : "'Keep searching!'"}
              </p>
            </motion.div>
          )}
        </div>
        <div className="bg-amber-100 p-4">
          <p className="text-center text-amber-800 font-semibold">
            Score: {score} / {treasures.length}
          </p>
        </div>
      </div>

      <Dialog open={isCompleted} onOpenChange={setIsCompleted}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Congratulations, Treasure Hunter!</DialogTitle>
            <DialogDescription>
              You've completed the Treasure Hunt Quiz!
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <div className="relative w-32 h-32">
              <Trophy className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-yellow-500" />
            </div>
          </div>
          <p className="text-center text-lg font-semibold">
            Your final score: {score} / {treasures.length}
          </p>
          <DialogFooter className="sm:justify-center">
            <Button onClick={handlePlayAgain} className="bg-amber-600 hover:bg-amber-700">
              Play Again
            </Button>
            <Button onClick={handleGoBack} variant="outline">
              Go Back
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}