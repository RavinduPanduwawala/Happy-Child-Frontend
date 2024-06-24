import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Col,
  Form,
  Input,
  Spinner,
} from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssessmentModal = (props) => {
  const { isOpen, toggle, selectedAssessment, onCreateButtonClick, isLoading } =
    props;

  const [selectedAssessmentInfo, setSelectedAssessmentInfo] = useState({
    _id: "",
    title: "",
    grade: "",
    category: "",
    game: "",
    questions: [], // Initialize questions as an empty array
  });

  const [singleQuestion, setSingleQuestion] = useState({
    question: "",
    questionNo: "",
    answers: [
      {
        answer: "",
        score: "",
      },
      {
        answer: "",
        score: "",
      },
      {
        answer: "",
        score: "",
      },
    ],
  });

  useEffect(() => {
    if (selectedAssessment) {
      setSelectedAssessmentInfo(selectedAssessment);
    } else {
      setSelectedAssessmentInfo({
        _id: "",
        title: "",
        grade: "",
        category: "",
        game: "",
        questions: [],
      });
    }

    return () => {
      setSelectedAssessmentInfo({
        _id: "",
        title: "",
        grade: "",
        category: "",
        game: "",
        questions: [],
      });
    };
  }, [selectedAssessment]);

  const handleAddQuestion = () => {
    // Create a new array containing the previous questions and the new question
    const updatedQuestions = [
      ...(selectedAssessmentInfo?.questions || []),
      singleQuestion,
    ];

    // Update selectedAssessmentInfo with the new array of questions
    setSelectedAssessmentInfo((prevState) => ({
      ...prevState,
      questions: updatedQuestions,
    }));

    // Reset singleQuestion state to its initial state
    setSingleQuestion({
      question: "",
      questionNo: "",
      answers: [
        {
          answer: "",
          score: "",
        },
        {
          answer: "",
          score: "",
        },
        {
          answer: "",
          score: "",
        },
      ],
    });
  };

  const handleQuestionRemove = (index) => {
    // Create a new array without the question at the specified index
    const updatedQuestions = selectedAssessmentInfo.questions.filter(
      (_, i) => i !== index
    );

    // Update selectedAssessmentInfo with the new array of questions
    setSelectedAssessmentInfo((prevState) => ({
      ...prevState,
      questions: updatedQuestions,
    }));
  };

  const handleCreateAssessment = () => {
    if (!selectedAssessmentInfo?.title?.length) {
      return toast.error("Empty Assessment Title!", {
        autoClose: 1000,
      });
    } else if (!selectedAssessmentInfo?.game) {
      return toast.error("Empty Assessment Game!", {
        autoClose: 1000,
      });
    } else if (!selectedAssessmentInfo?.category) {
      return toast.error("Empty Assessment Category!", {
        autoClose: 1000,
      });
    } else if (!selectedAssessmentInfo?.grade) {
      return toast.error("Empty Assessment Grade!", {
        autoClose: 1000,
      });
    } else if (selectedAssessmentInfo?.questions?.length < 10) {
      return toast.error("Please add 10 questions!", {
        autoClose: 1000,
      });
    }

    onCreateButtonClick(selectedAssessmentInfo);
  };

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      size="lg"
      toggle={toggle}
    >
      <div className="modal-content">
        <ModalHeader toggle={toggle}>
          {selectedAssessment?.title ? "Edit" : "Add New"} Assessment
        </ModalHeader>
        <ModalBody>
          <Form className="form-horizontal">
            <Row className="mb-3">
              <Col className="col-6">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <Input
                    name="title"
                    className="form-control"
                    placeholder="Enter Assessment Title"
                    type="text"
                    required
                    value={selectedAssessmentInfo.title}
                    onChange={(e) =>
                      setSelectedAssessmentInfo((prevState) => ({
                        ...prevState,
                        title: e.target.value,
                      }))
                    }
                  />
                </div>
              </Col>
              <Col className="col-6">
                <div className="mb-3">
                  <label className="form-label">Game</label>
                  <select
                    name="game"
                    className="form-control"
                    placeholder="Select Assessment"
                    required
                    value={selectedAssessmentInfo.game}
                    onChange={(e) =>
                      setSelectedAssessmentInfo((prevState) => ({
                        ...prevState,
                        game: e.target.value,
                      }))
                    }
                  >
                    {/* Add options for different grades */}
                    <option value="">Select Game</option>
                    <option value="Color_Puzzel">Color Puzzel</option>
                    <option value="Sample2">Sample2</option>
                    <option value="Sample3">Sample3</option>
                  </select>
                </div>
              </Col>
              <Col className="col-6">
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    name="category"
                    className="form-control"
                    placeholder="Select category"
                    required
                    value={selectedAssessmentInfo.category}
                    onChange={(e) =>
                      setSelectedAssessmentInfo((prevState) => ({
                        ...prevState,
                        category: e.target.value,
                      }))
                    }
                  >
                    {/* Add options for different grades */}
                    <option value="">Select Category</option>
                    <option value="Color_Blindness">Color Blindness</option>
                    <option value="Mental_Health">Mental Health</option>
                    <option value="Physical_Health">Physical Health</option>
                    <option value="Cognitive_Health">Cognitive Health</option>
                  </select>
                </div>
              </Col>
              <div className="mb-3 col-6">
                <label className="form-label">Grade</label>
                <select
                  name="grade"
                  className="form-control"
                  placeholder="Select grade"
                  required
                  value={selectedAssessmentInfo.grade}
                  onChange={(e) =>
                    setSelectedAssessmentInfo((prevState) => ({
                      ...prevState,
                      grade: e.target.value,
                    }))
                  }
                >
                  {/* Add options for different grades */}
                  <option value="">Select Grade</option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                </select>
              </div>
            </Row>

            <hr />
            {selectedAssessmentInfo?.questions?.length === 10 ? null : (
              <Row>
                <Col>
                  <div className="my-2">
                    <label>Question</label>
                    <Input
                      className="form-control"
                      placeholder="Question"
                      type="text"
                      value={singleQuestion.question}
                      onChange={(e) =>
                        setSingleQuestion((prevState) => ({
                          ...prevState,
                          question: e.target.value,
                          questionNo: Math.random().toString(36).slice(2),
                        }))
                      }
                    />
                    <Row className="mt-2">
                      <Col className="col-4">
                        <div className="text-success">Good</div>
                        <Input
                          className="form-control"
                          placeholder="Answer 01"
                          type="text"
                          value={singleQuestion?.answers[0]?.answer}
                          onChange={(e) =>
                            setSingleQuestion((prevState) => ({
                              ...prevState,
                              answers: prevState.answers.map((answer, index) =>
                                index === 0
                                  ? {
                                      ...answer,
                                      answer: e.target.value,
                                      score: "good",
                                    }
                                  : answer
                              ),
                            }))
                          }
                        />
                      </Col>
                      <Col className="col-4">
                        <div className="text-warning">Middle</div>
                        <Input
                          className="form-control"
                          placeholder="Answer 02"
                          type="text"
                          value={singleQuestion?.answers[1]?.answer}
                          onChange={(e) =>
                            setSingleQuestion((prevState) => ({
                              ...prevState,
                              answers: prevState.answers.map((answer, index) =>
                                index === 1
                                  ? {
                                      ...answer,
                                      answer: e.target.value,
                                      score: "middle",
                                    }
                                  : answer
                              ),
                            }))
                          }
                        />
                      </Col>
                      <Col className="col-4">
                        <div className="text-danger">Poor</div>
                        <Input
                          className="form-control"
                          placeholder="Answer 03"
                          type="text"
                          value={singleQuestion?.answers[2]?.answer}
                          onChange={(e) =>
                            setSingleQuestion((prevState) => ({
                              ...prevState,
                              answers: prevState.answers.map((answer, index) =>
                                index === 2
                                  ? {
                                      ...answer,
                                      answer: e.target.value,
                                      score: "poor",
                                    }
                                  : answer
                              ),
                            }))
                          }
                        />
                      </Col>
                      <div className="text-center mt-2">
                        <Button
                          className="btn btn-base btn-rounded-full w-25 waves-effect waves-light"
                          style={{ marginRight: 10 }}
                          color="success"
                          onClick={handleAddQuestion}
                        >
                          Add
                        </Button>
                      </div>
                    </Row>
                  </div>
                </Col>
              </Row>
            )}
            <Row>
              <div>
                {selectedAssessmentInfo?.questions?.length && (
                  <h5 className="font-bold">Questions List</h5>
                )}
                {selectedAssessmentInfo?.questions?.map((question, index) => (
                  <div className="py-3" key={index}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        {`(${index + 1})`} {question.question}
                      </div>
                      <div>
                        <Button
                          onClick={() => handleQuestionRemove(index)}
                          color="danger"
                        >
                          X
                        </Button>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                      {question.answers.map((a, i) => (
                        <div key={i}>{a.answer}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Row>
            <div className="d-flex mt-3">
              <Button
                className="btn-rounded-full w-50"
                type="button"
                color="secondary"
                onClick={toggle}
                style={{ marginRight: 10 }}
                disabled={isLoading}
              >
                Close
              </Button>
              <Button
                className="btn btn-base btn-rounded-full w-50 waves-effect waves-light"
                color="primary"
                onClick={handleCreateAssessment}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner size="sm" color="light" />
                ) : selectedAssessmentInfo?._id ? (
                  "Update"
                ) : (
                  "Create"
                )}
              </Button>
            </div>
          </Form>
        </ModalBody>
      </div>
    </Modal>
  );
};

export default AssessmentModal;
