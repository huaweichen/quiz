import React from 'react'
import {UserAnswer} from '../App'
import {Wrapper, ButtonWrapper} from "./QuestionCard.styles"

type Props = {
    question: string
    answers: string[]
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void,
    userAnswer: UserAnswer | undefined
    questionNumber: number
    totalNumberQuestions: number
}

const QuestionCard: React.FC<Props> = ({
   question,
   answers,
   callback,
   userAnswer,
   questionNumber,
   totalNumberQuestions
}) => (
    <div>
        <p className="number">Question: {questionNumber} / {totalNumberQuestions}</p>
        <p dangerouslySetInnerHTML={{ __html: question }}/>
        <div>
            {answers.map(answer => (
                <ButtonWrapper
                    key={answer}
                    correct={userAnswer?.correctAnswer === answer}
                    userClicked={userAnswer?.answer === answer}
                >
                    <button
                        disabled={!!userAnswer}
                        value={answer}
                        onClick={callback}
                    >
                        <span dangerouslySetInnerHTML={{ __html: answer }}/>
                    </button>
                </ButtonWrapper>
            ))}
        </div>
    </div>
)

export default QuestionCard