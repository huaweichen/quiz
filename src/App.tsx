import React, {useState} from 'react'
import QuestionCard from "./components/QuestionCard";
import {Difficulty, fetchQuizData, QuestionState} from "./Api";
import {GlobalStyle, Wrapper} from './App.styles'

export type UserAnswer = {
    question: string
    answer: string
    correct: boolean
    correctAnswer: string
}

const TOTAL_QUESTIONS = 10

const App = () => {
    const [loading, setLoading] = useState(false)
    const [questions, setQuestions] = useState<QuestionState[]>([])
    const [number, setNumber] = useState(0)
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])
    const [score, setScore] = useState(0)
    const [finish, setFinish] = useState(true)

    // Fire off quiz
    const startTrivia = async () => {
        setLoading(true)
        setFinish(false)

        const newQuestions = await fetchQuizData(TOTAL_QUESTIONS, Difficulty.EASY)

        setQuestions(newQuestions)
        setScore(0)
        setUserAnswers([])
        setNumber(0)
        setLoading(false)
    }

    // Clicks an answer
    const clickAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!finish) {
            // get user's answer
            const answer = e.currentTarget.value

            // check the correct answer
            const correct = questions[number].correct_answer === answer

            // add score if correct
            if (correct) setScore(prev => prev + 1)

            // save answer in the user answer list
            const userAnswer = {
                question: questions[number].question,
                answer,
                correct,
                correctAnswer: questions[number].correct_answer
            }
            setUserAnswers(prev => [...prev, userAnswer])
        }
    }

    // Go to next question
    const nextQuestion = () => {
        const nextQuestion = number + 1

        // move to next if it is not the last
        if (nextQuestion === TOTAL_QUESTIONS) {
            setFinish(true)
        } else {
            setNumber(nextQuestion)
        }
    }

    return (
        <>
        <GlobalStyle />
        <Wrapper>
            <h1>Quiz</h1>
            {finish || userAnswers.length === TOTAL_QUESTIONS ? (
                <button
                    className="start"
                    onClick={startTrivia}
                >
                    Start
                </button>
            ) : null}
            {!finish && <p className="score">Score: {score}</p>}
            {loading && <p>Loading Questions ... </p>}
            {!loading && !finish ? (
                <QuestionCard
                    questionNumber={number + 1}
                    totalNumberQuestions={TOTAL_QUESTIONS}
                    question={questions[number].question}
                    answers={questions[number].answers}
                    userAnswer={userAnswers ? userAnswers[number] : undefined}
                    callback={clickAnswer}
                />
            ) : null}
            {!finish && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
                <button
                    className="next"
                    onClick={nextQuestion}
                >
                    Next Question
                </button>
            ) : null}
        </Wrapper>
        </>
    )
}

export default App
