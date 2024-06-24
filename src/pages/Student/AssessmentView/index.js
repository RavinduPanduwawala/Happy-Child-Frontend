import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import queryString from "query-string";
import { useParams, useLocation } from "react-router-dom";

import ColorBlindnessTestGame from "../../../components/games/ColorPuzzleGame";
import HappyChildImage from "../../../assets/images/happy_children.avif"

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Api helpers
import { get, post } from "../../../helpers/apiHelper"

const AssessmentView = () => {

    const [currentStep, setCurrentStep] = useState(0)
    const [assessment, setAssessment] = useState({});
    const [answeredQuestionNumbers, setAnsweredQuestionNumbers] = useState([]);
    const [goal, setGoal] = useState({});
    const [marks, setMarks] = useState("");
    const [gameScore, setGameScore] = useState(0);

    const { search } = useLocation();
    const { assessmentId } = useParams();

    useEffect(() => {
        getAssessment();
    }, [assessmentId]);

    const getAssessment = async () => {
        const values = queryString.parse(search);
        let res = await get(
            `assessment/public/${assessmentId}?email=${values.email}`
        );

        setAssessment(res.data.assessment);
    };

    const handleNextButtonClick = () => {
        setCurrentStep((prev) => prev + 1); // Add 'return' statement before 'prev + 1'

        if (currentStep === 1) {
            handleAssessmentFinishClick()
        }
    }

    const handleSelectAnswer = (qNo, a) => {

        let questions = []

        let existingAnsweredQuestion = [...answeredQuestionNumbers].filter((q) => (q.questionNo !== qNo))

        if (!existingAnsweredQuestion.length) {
            questions.push(...existingAnsweredQuestion, { questionNo: qNo, answeredScore: a.score })

            setAnsweredQuestionNumbers(questions)
        } else {

            let updatedQuestions = [...existingAnsweredQuestion]

            updatedQuestions.push({ questionNo: qNo, answeredScore: a.score })

            setAnsweredQuestionNumbers(updatedQuestions)
        }

        let _assessment = { ...assessment };

        let updatedQuestions = _assessment.questions.map((question) => {
            if (question.questionNo === qNo) {
                question.selectedAnswer = a.score;
            }

            return question;
        });

        setAssessment({ ..._assessment, questions: updatedQuestions });
    };

    const handleAssessmentFinishClick = async () => {
        const values = queryString.parse(search);

        const payload = {
            email: values.email,
            assessment,
            gameScore
        };

        let res = await post(`user-assessment/public/${assessmentId}`, payload);

        if (!res.error) {
            if (res?.data?.goal) {
                setGoal(res.data.goal)
            }

            if (res?.data?.calculatedMarks) {
                setMarks(res.data.calculatedMarks)
            }
        }

        return toast.error('Something went wrong', {
            autoClose: 3000,
        });
    };

    const handleGameScore = (score) => {
        console.log('Game Score', score)
        setGameScore(score)
    }


    const handlePreviewLevel = (marks) => {
        if (marks >= 80) {
            return "Excellent";
        } else if (marks >= 60 && marks < 80) {
            return "Good";
        } else {
            return "Average";
        }
    };


    return (
        <div style={{ backgroundColor: "#FFFFFF", opacity: 0.9 }} className="container text-center p-4">
            {currentStep === 0 &&
                <div>
                    <h2>{assessment.name}</h2>
                    <h5>Please select the correct answer</h5>
                    <div className='pt-2'>
                        {assessment.questions && assessment.questions.map((question, questionIndex) => (
                            <div key={questionIndex} className="my-4">
                                <h4>{questionIndex + 1}. {question.question}</h4>
                                <div className='py-4 d-flex justify-content-center align-items-center'>
                                    {question.answers.map((answer, answerIndex) => (
                                        <div className='mx-4 d-flex align-items-center' name={question.questionNo}>
                                            <input
                                                name={question.questionNo}
                                                onChange={() => handleSelectAnswer(question.questionNo, answer)}
                                                type="radio"
                                            />
                                            <span className='ms-2'>{answer.answer}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
            {currentStep === 1 &&
                <div>
                    <ColorBlindnessTestGame onGameOver={handleGameScore} />
                </div>
            }
            {currentStep === 2 &&
                <div>
                    <img style={{ borderRadius: 20 }} src={HappyChildImage} />
                    <div className='mt-3'>
                        <h4>Your Results : {marks} %</h4>
                        <h4>Level :  {handlePreviewLevel(marks)}</h4>
                    </div>
                </div>
            }
            {currentStep === 3 &&
                <div>
                    <h3>For Parent Attention</h3>
                    <div className='mt-3'>
                        <h3>{goal?.title}</h3>
                        <p className='text-start mt-4'>Dear Parent,</p>
                        <p className='mt-1 text-start'>
                            {goal?.description}
                        </p>
                        <p className='text-start'>Best Regards,<br />Kids Care Learning Center</p>
                    </div>
                </div>
            }
            {currentStep !== 3 &&
                <div className='mt-4 text-end'>
                    <Button onClick={handleNextButtonClick} color='primary' size='lg'>
                        Next
                    </Button>
                </div>
            }
        </div>
    );
};

export default AssessmentView;
