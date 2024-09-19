import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2 } from "lucide-react"

const chapters = [
  {
    title: "The Case Begins",
    introduction: "You've been called to investigate a series of ad discrepancies. A high-profile client has reported several missed deadlines, and it's your job to find out why.",
    question: "What is the SLA for a Rush Ad?",
    options: ["4 HRs", "5 HRs", "3 HRs", "1 HR"],
    correctAnswer: "4 HRs",
    clue: "You discover your first clue – the initial time miscommunication.",
  },
  {
    title: "Following the Trail",
    introduction: "Your investigation leads you to the production team, where you discover inconsistencies in the processing of urgent rush ads.",
    question: "What is the SLA for an Urgent Rush Ad?",
    options: ["2 HRs", "5 HRs", "3 HRs", "1 HR"],
    correctAnswer: "2 HRs",
    clue: "You uncover a pattern of misclassified urgent ads.",
  },
  {
    title: "The Thanksgiving Twist",
    introduction: "While reviewing production records, you come across an unusual date. It seems that the suspect was off-duty during US Thanksgiving...",
    question: "When do we celebrate US Thanksgiving?",
    options: ["3rd Thursday of November", "In March", "December", "July"],
    correctAnswer: "3rd Thursday of November",
    clue: "You realize the importance of holiday scheduling in the mix-up.",
  },
  {
    title: "Identifying the Limits",
    introduction: "Your investigation takes you to the Manila Print team, where you need to confirm what ad types they process.",
    question: "Which of the following ad types does Manila Print not process?",
    options: ["HTML", "Static", "Print Ad", "GIF"],
    correctAnswer: "HTML",
    clue: "You uncover the limitation that was overlooked by the team.",
  },
  // {
  //   title: "Accuracy in Question",
  //   introduction: "You're double-checking the team's performance and come across the accuracy target. It seems suspicious...",
  //   question: "Is the accuracy target set at 98%?",
  //   options: ["TRUE", "FALSE"],
  //   correctAnswer: "TRUE",
  //   clue: "You confirm that the accuracy standard is critical to the case.",
  // },
  // {
  //   title: "The Password Dilemma",
  //   introduction: "A security breach has been reported, and you need to find out if the suspect shared sensitive information.",
  //   question: "Can you share your password with your team lead or manager?",
  //   options: ["FALSE", "TRUE"],
  //   correctAnswer: "FALSE",
  //   clue: "You discover that unauthorized access may have occurred.",
  // },
  // {
  //   title: "The NCN Connection",
  //   introduction: "The trail leads to a Non-Conformance Note (NCN). It’s time to investigate further why ads were sent to NCN.",
  //   question: "What is a reason for sending ads to NCN?",
  //   options: ["All of the above", "Missing instruction", "Corrupted Files", "Pick-up ad # not available"],
  //   correctAnswer: "All of the above",
  //   clue: "You gather evidence of multiple NCN-related issues.",
  // },
  // {
  //   title: "The Black & White Clue",
  //   introduction: "An old archived file is labeled 'B/W.' It might hold a vital clue to solve the case.",
  //   question: "What does B/W stand for?",
  //   options: ["Black & White", "Blank & White", "Brown & White", "Big & Whole"],
  //   correctAnswer: "Black & White",
  //   clue: "The correct terminology helps you decode an old document.",
  // },
  // {
  //   title: "A Spec-Ad Mystery",
  //   introduction: "As you examine further, a special ad type comes up, labeled as 'SA.' Can you decode this acronym?",
  //   question: "What does SA stand for?",
  //   options: ["Spec ad", "Special ads", "Special Account", "Service Ads"],
  //   correctAnswer: "Spec ad",
  //   clue: "You identify a misclassification in ad types leading to further errors.",
  // },
  // {
  //   title: "The Proof Conundrum",
  //   introduction: "Proof failed, but no one knows why. It's up to you to investigate the causes.",
  //   question: "What causes Proof Failed ad status?",
  //   options: ["All of the above", "Failed to generate with ProofHQ", "Proof is not updated (NB, PWC)", "Sales rep email not found"],
  //   correctAnswer: "All of the above",
  //   clue: "You reveal multiple causes for the failed proof process.",
  // },
  // {
  //   title: "Revision Request and Status",
  //   introduction: "Your investigation takes a new turn as you look into the ad status for a Sales Rep's correction.",
  //   question: "Does a Revision Request change the Ad status for Sales Rep's Correction?",
  //   options: ["TRUE", "FALSE"],
  //   correctAnswer: "TRUE",
  //   clue: "You uncover a crucial misunderstanding in the revision process.",
  // }
];

const finalBoss = {
  title: "The Suspect's Last Stand",
  introduction: "You've gathered all the clues. Now it's time to confront suspect and solve case once for all. But first, there's one last puzzle crack.",
  question: "Does a Revision Request change the Ad status for Sales Rep's Correction?",
    options: ["TRUE", "FALSE"],
    correctAnswer: "TRUE",
}

export function DetectiveQuizComponent() {
  const [chapter, setChapter] = useState(0)
  const [score, setScore] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [feedback, setFeedback] = useState("")
  const [showClue, setShowClue] = useState(false)
  const [gameOver, setGameOver] = useState(false)

  const currentChapter = chapter < chapters.length ? chapters[chapter] : finalBoss

  const handleSubmit = () => {
    if (userAnswer === currentChapter.correctAnswer) {
      setScore(score + 1)
      setFeedback("Correct! You're one step closer to solving the case.")
      setShowClue(true)
    } else {
      setFeedback("Incorrect. Try again, detective!")
    }
  }

  const handleNextChapter = () => {
    if (chapter < chapters.length) {
      setChapter(chapter + 1)
      setUserAnswer("")
      setFeedback("")
      setShowClue(false)
    } else {
      setGameOver(true)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-[450px]">
        <CardHeader>
          <CardTitle>{currentChapter.title}</CardTitle>
          <CardDescription>{currentChapter.introduction}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="answer" className="text-lg font-semibold mb-2">{currentChapter.question}</Label>
                <RadioGroup onValueChange={setUserAnswer} value={userAnswer}>
                  {currentChapter.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </form>
          {feedback && (
            <div className={`mt-4 p-2 rounded ${feedback.includes("Correct") ? "bg-green-100" : "bg-red-100"}`}>
              {feedback.includes("Correct") ? (
                <CheckCircle2 className="inline-block mr-2 text-green-500" />
              ) : (
                <AlertCircle className="inline-block mr-2 text-red-500" />
              )}
              {feedback}
            </div>
          )}
          {showClue && chapter < chapters.length && (
            <div className="mt-4 p-2 bg-blue-100 rounded">
              <strong>Clue:</strong> {currentChapter.clue}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleSubmit}>Submit Answer</Button>
          {showClue && <Button onClick={handleNextChapter}>Next Chapter</Button>}
        </CardFooter>
      </Card>
      {gameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-[450px]">
            <CardHeader>
              <CardTitle>Case Closed!</CardTitle>
              <CardDescription>You've solved the mystery, detective!</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Your final score: {score} out of {chapters.length + 1}</p>
              <p className="mt-4">The ad discrepancies were caused by a combination of miscommunication, misclassification of urgent ads, and holiday scheduling conflicts. Your global knowledge and attention to detail were crucial in cracking the case. Great work in uncovering the truth!</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => window.location.reload()}>Start a New Case</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}