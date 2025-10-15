"use client"

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    RadioGroup,
    RadioGroupItem,
    Label
} from "@ui";

import { 
    ArrowLeft, 
    Trophy, 
    Clock, 
    User, 
    CheckCircle, 
    XCircle, 
    ArrowRight, 
    ExternalLink, 
    Award 
} from "lucide-react";
import { developerQuestions } from "@data";
//developerQuestions   developerQuestions
// Sample questions data - replace with your actual JSON

const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
}

export default function PreparationPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [timeSpent, setTimeSpent] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [incorrectAnswers, setIncorrectAnswers] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [finalTime, setFinalTime] = useState(0)
  const [questions] = useState<typeof developerQuestions.questions>(() => shuffleArray(developerQuestions.questions))

  const userName = searchParams.get("name") || "Student"
  const certification = searchParams.get("cert")

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + (showResult ? 1 : 0)) / questions.length) * 100

  useEffect(() => {
    if (quizCompleted) return

    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [quizCompleted])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }

  const checkAnswer = () => {
    if (!selectedAnswer) return

    const correct = selectedAnswer === currentQuestion.answer
    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      setCorrectAnswers((prev) => prev + 1)
    } else {
      setIncorrectAnswers((prev) => prev + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedAnswer("")
      setShowResult(false)
      setIsCorrect(false)
    } else {
      setFinalTime(timeSpent)
      setQuizCompleted(true)
    }
  }

  const getOptionLetter = (index: number) => {
    return String.fromCharCode(97 + index) // 'a', 'b', 'c', 'd', 'e'
  }

  const getAvailableOptions = () => {
    const options = [
      { key: "a", text: currentQuestion["option-a"] },
      { key: "b", text: currentQuestion["option-b"] },
      { key: "c", text: currentQuestion["option-c"] },
      { key: "d", text: currentQuestion["option-d"] },
    ]

    if (currentQuestion["option-e"] && currentQuestion["option-e"].trim() !== "") {
      options.push({ key: "e", text: currentQuestion["option-e"] })
    }

    return options
  }

  const calculateScore = () => {
    return Math.round((correctAnswers / questions.length) * 100)
  }

  const isPassed = () => {
    return calculateScore() >= 85
  }

  if (!certification) {
    router.push("/register")
    return null
  }

  if (quizCompleted) {
    const score = calculateScore()
    const passed = isPassed()

    return (
      <div className="min-h-screen bg-background">
        {/* Header with user name */}
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link
                  href="/register"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span>Back to Registration</span>
                </Link>
                <div className="flex items-center space-x-2">
                  <Trophy className="h-6 w-6 text-primary" />
                  <h1 className="text-xl font-bold text-foreground">CertPrep</h1>
                </div>
              </div>

              <div className="flex items-center space-x-2 bg-muted/50 px-4 py-2 rounded-lg">
                <User className="h-5 w-5 text-primary" />
                <span className="font-medium text-foreground">Welcome, {userName}!</span>
              </div>
            </div>
          </div>
        </header>

        {/* Final Results */}
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="border-border bg-card">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Award className={`h-16 w-16 ${passed ? "text-green-500" : "text-orange-500"}`} />
                </div>
                <CardTitle className="text-3xl text-card-foreground">
                  {passed ? "Congratulations!" : "Quiz Complete"}
                </CardTitle>
                <p className="text-muted-foreground">
                  {passed ? "You have successfully passed the quiz!" : "You have completed the quiz."}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Score Display */}
                <div className="text-center space-y-4">
                  <div className={`text-6xl font-bold ${passed ? "text-green-500" : "text-orange-500"}`}>{score}%</div>
                  <div className={`text-lg font-semibold ${passed ? "text-green-700" : "text-orange-700"}`}>
                    {passed ? "PASSED" : "NEEDS IMPROVEMENT"}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {passed ? "Score of 80% or higher required to pass" : "You need 80% or higher to pass"}
                  </p>
                </div>

                {/* Results Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-muted/30">
                    <CardContent className="p-4 text-center">
                      <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-foreground">{formatTime(finalTime)}</div>
                      <div className="text-sm text-muted-foreground">Total Time</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-4 text-center">
                      <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-700">{correctAnswers}</div>
                      <div className="text-sm text-green-600">Correct Answers</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-red-50 border-red-200">
                    <CardContent className="p-4 text-center">
                      <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-red-700">{incorrectAnswers}</div>
                      <div className="text-sm text-red-600">Incorrect Answers</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => window.location.reload()}
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <ArrowRight className="h-4 w-4" />
                    <span>Retake Quiz</span>
                  </Button>
                  <Link href="/register">
                    <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                      Back to Registration
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with user name */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/register"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Registration</span>
              </Link>
              <div className="flex items-center space-x-2">
                <Trophy className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-foreground">CertPrep</h1>
              </div>
            </div>

            {/* User name display */}
            <div className="flex items-center space-x-2 bg-muted/50 px-4 py-2 rounded-lg">
              <User className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">Welcome, {userName}!</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Progress and Timer Section */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-xl text-card-foreground flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Your Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Quiz Progress</span>
                  <span className="text-primary font-medium">
                    {Math.round(progress)}% ({currentQuestionIndex + (showResult ? 1 : 0)}/{questions.length})
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-primary h-3 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Timer and Score */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Time:</span>
                  </div>
                  <div className="text-xl font-mono font-bold text-primary">{formatTime(timeSpent)}</div>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-green-700">Correct:</span>
                  </div>
                  <div className="text-xl font-bold text-green-700">{correctAnswers}</div>
                </div>

                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center space-x-2">
                    <XCircle className="h-5 w-5 text-red-600" />
                    <span className="text-sm text-red-700">Incorrect:</span>
                  </div>
                  <div className="text-xl font-bold text-red-700">{incorrectAnswers}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                </div>
                <CardTitle className="text-lg text-primary">{currentQuestion.subject}</CardTitle>
                <p className="text-sm text-muted-foreground">{currentQuestion.subtopic}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-card-foreground">{currentQuestion.question}</h3>

                {!showResult ? (
                  <div className="space-y-4">
                    <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                      {getAvailableOptions().map((option) => (
                        <div key={option.key} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.key} id={option.key} />
                          <Label htmlFor={option.key} className="flex-1 cursor-pointer">
                            <span className="font-medium">{option.key.toUpperCase()}.</span> {option.text}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>

                    <Button
                      onClick={checkAnswer}
                      disabled={!selectedAnswer}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Check Answer
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <RadioGroup value={selectedAnswer} disabled>
                      {getAvailableOptions().map((option) => (
                        <div key={option.key} className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={option.key}
                            id={option.key}
                            className={`${
                              option.key === currentQuestion.answer
                                ? "border-green-500 bg-green-100"
                                : option.key === selectedAnswer && !isCorrect
                                  ? "border-red-500 bg-red-100"
                                  : ""
                            }`}
                          />
                          <Label htmlFor={option.key} className="flex-1">
                            <span
                              className={`font-medium ${
                                option.key === currentQuestion.answer
                                  ? "text-green-700"
                                  : option.key === selectedAnswer && !isCorrect
                                    ? "text-red-700"
                                    : ""
                              }`}
                            >
                              {option.key.toUpperCase()}.
                            </span>
                            <span
                              className={
                                option.key === currentQuestion.answer
                                  ? "text-green-700"
                                  : option.key === selectedAnswer && !isCorrect
                                    ? "text-red-700"
                                    : ""
                              }
                            >
                              {option.text}
                            </span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>

                    <div
                      className={`p-4 rounded-lg border ${isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                        <span className={`font-semibold ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                          {isCorrect
                            ? "Correct! Well done!"
                            : `Incorrect. The correct answer is ${currentQuestion.answer.toUpperCase()}.`}
                        </span>
                      </div>

                      <p className="text-sm text-gray-700 mb-3">{currentQuestion.justification}</p>

                      <a
                        href={currentQuestion.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>Learn more</span>
                      </a>
                    </div>

                    {currentQuestionIndex < questions.length - 1 ? (
                      <Button
                        onClick={nextQuestion}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        Next Question <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    ) : (
                      <Button onClick={nextQuestion} className="w-full bg-green-600 hover:bg-green-700 text-white">
                        Finish Quiz <Trophy className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
