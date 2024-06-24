import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalHeader, Row, Col, Form, Input, Spinner } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const GoalModal = (props) => {
  const { isOpen, toggle, onCreateButtonClick, selectedGoal, isLoading } = props;

  const [selectedGoalInfo, setSelectedGoalInfo] = useState({
    _id: '',
    title: '',
    description: '',
    category: '',
    userId: '',
    grade: '',
    level: ''
  });

  useEffect(() => {
    if (selectedGoal) {
      setSelectedGoalInfo(selectedGoal);
    } else {
      setSelectedGoalInfo({
        _id: '',
        title: '',
        description: '',
        category: '',
        userId: '',
        grade: '',
        level: ''
      });
    }

    return () => {
      setSelectedGoalInfo({
        _id: '',
        title: '',
        description: '',
        category: '',
        userId: '',
        grade: '',
        level: ''
      });
    };
  }, [selectedGoal]);

  const handleGoalCreateButtonClick = () => {
    if (!selectedGoalInfo?.title?.length) {
      return toast.error('Empty Goal Title!', {
        autoClose: 1000,
      })
    } else if (!selectedGoalInfo?.description?.length) {
      return toast.error('Empty Description!', {
        autoClose: 1000,
      })
    } else if (!selectedGoalInfo?.category?.length) {
      return toast.error('Empty Category!', {
        autoClose: 1000,
      })
    } else if (!selectedGoalInfo?.grade?.length) {
      return toast.error('Empty Grade!', {
        autoClose: 1000,
      })
    } else if (!selectedGoalInfo?.level?.length) {
      return toast.error('Empty Level!', {
        autoClose: 1000,
      })
    }

    onCreateButtonClick(selectedGoalInfo)
  }

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      <div className="modal-content">
        <ModalHeader toggle={toggle}>
          {selectedGoal?.title ? "Edit" : "Add New"} Goal
        </ModalHeader>
        <ModalBody>
          <Form
            className="form-horizontal">
            <div className="mb-3">
              <label className="form-label">Title</label>
              <Input
                name="title"
                className="form-control"
                placeholder="Enter Goal Title"
                type="text"
                required
                value={selectedGoalInfo.title}
                onChange={(e) => setSelectedGoalInfo((prevState) => ({
                  ...prevState,
                  title: e.target.value
                }))}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <Input
                name="description"
                className="form-control"
                placeholder="Enter Goal Description"
                type="text"
                required
                value={selectedGoalInfo.description}
                onChange={(e) => setSelectedGoalInfo((prevState) => ({
                  ...prevState,
                  description: e.target.value
                }))}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <select
                name="category"
                className="form-control"
                placeholder="Select category"
                required
                value={selectedGoalInfo.category}
                onChange={(e) => setSelectedGoalInfo((prevState) => ({
                  ...prevState,
                  category: e.target.value
                }))}
              >
                {/* Add options for different grades */}
                <option value="">Select Category</option>
                <option value="Color_Blindness">Color Blindness</option>
                <option value="Mental_Health">Mental Health</option>
                <option value="Physical_Health">Physical Health</option>
                <option value="Cognitive_Health">Cognitive Health</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Grade</label>
              <select
                name="grade"
                className="form-control"
                placeholder="Select grade"
                required
                value={selectedGoalInfo.grade}
                onChange={(e) => setSelectedGoalInfo((prevState) => ({
                  ...prevState,
                  grade: e.target.value
                }))}
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
            <div className="mb-3">
              <label className="form-label">Level</label>
              <select
                name="level"
                className="form-control"
                placeholder="Select Goal Level"
                required
                value={selectedGoalInfo.level}
                onChange={(e) => setSelectedGoalInfo((prevState) => ({
                  ...prevState,
                  level: e.target.value
                }))}
              >
                {/* Add options for different grades */}
                <option value="">Select Level</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
            <div className="text-right d-flex">
              <Button
                className="btn-rounded-full w-50"
                type="button"
                color="secondary"
                onClick={toggle}
                style={{ marginRight: 10 }}
                disabled={isLoading}
              >
                Close{" "}
              </Button>
              <Button
                className="btn btn-base btn-rounded-full w-50 waves-effect waves-light"
                color="primary"
                onClick={handleGoalCreateButtonClick}
                disabled={isLoading}
              >
                {isLoading ? <Spinner size="sm" color="light" /> : selectedGoal?.title ? "Update" : "Create"}
              </Button>

            </div>
          </Form>
        </ModalBody>
      </div>
    </Modal>
  );
};

export default GoalModal;
