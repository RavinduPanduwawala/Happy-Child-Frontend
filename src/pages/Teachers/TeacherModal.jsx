import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalHeader, Spinner, Form, Input } from "reactstrap";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { validateEmail } from "../../helpers/Validators/validateEmail";

const TeacherModal = (props) => {
  const { isOpen, toggle, selectedTeacher, onCreateButtonClick, isLoading } = props;

  const [selectedTeacherInfo, setSelectedTeacherInfo] = useState({
    _id: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  useEffect(() => {
    if (selectedTeacher) {
      setSelectedTeacherInfo(selectedTeacher);
    } else {
      setSelectedTeacherInfo({
        _id: '',
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
      });
    }

    return () => {
      setSelectedTeacherInfo({
        _id: '',
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
      });
    };
  }, [selectedTeacher]);

  const handleCreateButtonClick = () => {
    if (!selectedTeacherInfo?.fullName?.length) {
      return toast.error('Empty Full Name!', {
        autoClose: 9000,
      })
    } else if (!selectedTeacherInfo?.email?.length) {
      return toast.error('Empty Email Address!', {
        autoClose: 9000,
      })
    } else if (!validateEmail(selectedTeacherInfo?.email)) {
      return toast.error('Invalid Email Address!', {
        autoClose: 9000,
      })
    } else if (!selectedTeacherInfo?.phone) {
      return toast.error('Empty Phone Number!', {
        autoClose: 9000,
      })
    } else if (selectedTeacherInfo?.phone?.length !== 10) {
      return toast.error('Invalid Phone Number!', {
        autoClose: 9000,
      })
    } else if (!selectedTeacherInfo?.grade) {
      return toast.error('Empty Grade!', {
        autoClose: 9000,
      })
    } else if (!selectedTeacherInfo?.password && !selectedTeacherInfo?._id?.length) {
      return toast.error('Empty Password!', {
        autoClose: 9000,
      })
    } else if (!selectedTeacherInfo?.confirmPassword && !selectedTeacherInfo?._id?.length) {
      return toast.error('Empty Confirm Password!', {
        autoClose: 9000,
      })
    } else if (selectedTeacherInfo?.password !== selectedTeacherInfo?.confirmPassword && !selectedTeacherInfo?._id?.length) {
      return toast.error('Password and Confirm Password didnt match!', {
        autoClose: 9000,
      })
    }
    onCreateButtonClick(selectedTeacherInfo)
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
          {selectedTeacher?.fullName ? "Edit" : "Add New"} Teacher
        </ModalHeader>
        <ModalBody>
          <Form
            className="form-horizontal"
          >
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <Input
                name="fullName"
                className="form-control"
                placeholder="Full Name"
                type="text"
                required
                value={selectedTeacherInfo.fullName}
                onChange={(e) => setSelectedTeacherInfo((prevState) => ({
                  ...prevState,
                  fullName: e.target.value
                }))}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <Input
                name="email"
                label="Email Address"
                className="form-control"
                placeholder="Email Address"
                type="email"
                required
                // disabled={selectedTeacherInfo?._id}
                value={selectedTeacherInfo.email}
                onChange={(e) => setSelectedTeacherInfo((prevState) => ({
                  ...prevState,
                  email: e.target.value
                }))}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <Input
                name="phone"
                label="Phone"
                className="form-control"
                placeholder="Phone"
                type="tel"
                required
                value={selectedTeacherInfo.phone}
                onChange={(e) => setSelectedTeacherInfo((prevState) => ({
                  ...prevState,
                  phone: e.target.value
                }))}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Grade</label>
              <select
                name="grade"
                className="form-control"
                placeholder="Select grade"
                required
                value={selectedTeacherInfo.grade}
                onChange={(e) => setSelectedTeacherInfo((prevState) => ({
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
            {!selectedTeacherInfo?._id &&
              <div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <Input
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    type="password"
                    required
                    value={selectedTeacherInfo.password}
                    onChange={(e) => setSelectedTeacherInfo((prevState) => ({
                      ...prevState,
                      password: e.target.value
                    }))}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <Input
                    name="confirm-password"
                    className="form-control"
                    placeholder="Confirm Password"
                    type="password"
                    required
                    value={selectedTeacherInfo.confirmPassword}
                    onChange={(e) => setSelectedTeacherInfo((prevState) => ({
                      ...prevState,
                      confirmPassword: e.target.value
                    }))}
                  />
                </div>
              </div>
            }
            <div className="d-flex">
              <Button
                className="btn-rounded-full w-50"
                type="button"
                color="secondary"
                style={{ marginRight: 10 }}
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
                {isLoading ? <Spinner size="sm" color="light" /> : selectedTeacher?.fullName ? "Update" : "Create"}
              </Button>
            </div>
          </Form>
        </ModalBody>
      </div>
    </Modal>
  );
};

export default TeacherModal;
