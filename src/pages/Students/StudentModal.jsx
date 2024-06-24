import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalHeader, Row, Col, Form, Input, Spinner } from "reactstrap";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { validateEmail } from "../../helpers/Validators/validateEmail";

const StudentModal = (props) => {
  const { isOpen, toggle, selectedStudent, onCreateButtonClick, isLoading } = props;

  const [selectedStudentInfo, setSelectedStudentInfo] = useState({
    _id: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birthday: '',
    age: '',
    grade: ''
  });

  useEffect(() => {
    if (selectedStudent) {
      setSelectedStudentInfo(selectedStudent);
    } else {
      setSelectedStudentInfo({
        _id: '',
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        birthday: '',
        age: '',
        grade: ''
      });
    }

    return () => {
      setSelectedStudentInfo({
        _id: '',
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        birthday: '',
        age: '',
        grade: ''
      });
    };
  }, [selectedStudent]);

  const handleCreateButtonClick = () => {

    if (!selectedStudentInfo?.fullName?.length) {
      return toast.error('Empty Full Name!', {
        autoClose: 1000,
      })
    } else if (!selectedStudentInfo?.email?.length) {
      return toast.error('Empty Email Address!', {
        autoClose: 1000,
      })
    } else if (!validateEmail(selectedStudentInfo?.email)) {
      return toast.error('Invalid Email Address!', {
        autoClose: 1000,
      })
    } else if (!selectedStudentInfo?.phone) {
      return toast.error('Empty Phone Number!', {
        autoClose: 1000,
      })
    } else if (selectedStudentInfo?.phone?.length !== 10) {
      return toast.error('Invalid Phone Number!', {
        autoClose: 1000,
      })
    } else if (!selectedStudentInfo?.birthday) {
      return toast.error('Empty Birthday!', {
        autoClose: 1000,
      })
    } else if (!selectedStudentInfo?.age) {
      return toast.error('Empty Age!', {
        autoClose: 1000,
      })
    } else if (!selectedStudentInfo?.gender) {
      return toast.error('Empty Gender!', {
        autoClose: 1000,
      })
    }
    else if (!selectedStudentInfo?.grade) {
      return toast.error('Empty Grade!', {
        autoClose: 1000,
      })
    } else if (!selectedStudentInfo?.password && !selectedStudentInfo?._id?.length) {
      return toast.error('Empty Password!', {
        autoClose: 1000,
      })
    } else if (!selectedStudentInfo?.confirmPassword && !selectedStudentInfo?._id?.length) {
      return toast.error('Empty Confirm Password!', {
        autoClose: 1000,
      })
    } else if (selectedStudentInfo?.password !== selectedStudentInfo?.confirmPassword && !selectedStudentInfo?._id?.length) {
      return toast.error('Password and Confirm Password didnt match!', {
        autoClose: 1000,
      })
    }
    onCreateButtonClick(selectedStudentInfo)
  }

  const formattedDate = selectedStudentInfo.birthday ? selectedStudentInfo.birthday.split('T')[0] : '';

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      size="lg"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      <div className="modal-content">
        <ModalHeader toggle={toggle}>
          {selectedStudent?.fullName ? "Edit" : "Add New"} Student
        </ModalHeader>
        <ModalBody>
          <Form
            className="form-horizontal"
          >
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <Input
                name="name"
                className="form-control"
                placeholder="Enter student name"
                type="text"
                required
                value={selectedStudentInfo.fullName}
                onChange={(e) => setSelectedStudentInfo((prevState) => ({
                  ...prevState,
                  fullName: e.target.value
                }))}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Parent Email Address</label>
              <Input
                name="email"
                className="form-control"
                placeholder="Enter parent email address"
                type="email"
                required
                // disabled={selectedStudentInfo?._id}
                value={selectedStudentInfo.email}
                onChange={(e) => setSelectedStudentInfo((prevState) => ({
                  ...prevState,
                  email: e.target.value
                }))}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Parent Phone</label>
              <Input
                name="phone"
                className="form-control"
                placeholder="Enter parent phone"
                type="tel"
                required
                value={selectedStudentInfo.phone}
                onChange={(e) => setSelectedStudentInfo((prevState) => ({
                  ...prevState,
                  phone: e.target.value
                }))}
              />
            </div>
            <Row>
              <div className="mb-3 col-6">
                <label className="form-label">Birthday</label>
                <Input
                  name="birthday"
                  className="form-control"
                  placeholder="Birthday"
                  type="date"
                  required
                  value={formattedDate}
                  onChange={(e) => setSelectedStudentInfo((prevState) => ({
                    ...prevState,
                    birthday: e.target.value
                  }))}
                />
              </div>
              <div className="mb-3 col-6">
                <label className="form-label">Age</label>
                <Input
                  name="age"
                  className="form-control"
                  placeholder="Enter Age"
                  type="number"
                  required
                  value={selectedStudentInfo.age}
                  onChange={(e) => setSelectedStudentInfo((prevState) => ({
                    ...prevState,
                    age: e.target.value
                  }))}
                />
              </div>
            </Row>
            <Row>
              <div className="mb-3 col-6">
                <label className="form-label">Gender</label>
                <select
                  name="gender"
                  id="gender"
                  className="form-select"
                  required
                  value={selectedStudentInfo.gender}
                  onChange={(e) => setSelectedStudentInfo((prevState) => ({
                    ...prevState,
                    gender: e.target.value
                  }))}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="mb-3 col-6">
                <label className="form-label">Grade</label>
                <select
                  name="grade"
                  className="form-control"
                  placeholder="Select grade"
                  required
                  value={selectedStudentInfo.grade}
                  onChange={(e) => setSelectedStudentInfo((prevState) => ({
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
            </Row>
            {!selectedStudentInfo?._id &&
              <Row>
                <div className="mb-3 col-6">
                  <label className="form-label">Password</label>
                  <Input
                    name="password"
                    className="form-control"
                    placeholder="Enter Password"
                    type="password"
                    required
                    value={selectedStudentInfo?.password}
                    onChange={(e) => setSelectedStudentInfo((prevState) => ({
                      ...prevState,
                      password: e.target.value
                    }))}
                  />
                </div>
                <div className="mb-3 col-6">
                  <label className="form-label">Confirm Password</label>
                  <Input
                    name="confirm-password"
                    className="form-control"
                    placeholder="Enter Confirm Password"
                    type="password"
                    required
                    value={selectedStudentInfo?.confirmPassword}
                    onChange={(e) => setSelectedStudentInfo((prevState) => ({
                      ...prevState,
                      confirmPassword: e.target.value
                    }))}
                  />
                </div>
              </Row>
            }
            <div className="d-flex mt-3">
              <Button
                className="btn-rounded-full w-50"
                style={{ marginRight: 10 }}
                type="button"
                color="secondary"
                onClick={toggle}
                disabled={isLoading}
              >
                Close
              </Button>
              <Button
                className="btn btn-base btn-rounded-full w-50 waves-effect waves-light"
                color="primary"
                onClick={handleCreateButtonClick}
                disabled={isLoading}
              >
                {isLoading ? <Spinner size="sm" color="light" /> : selectedStudent?.fullName ? "Update" : "Create"}
              </Button>
            </div>
          </Form>
        </ModalBody>
      </div>
    </Modal>
  );
};

export default StudentModal;
