import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Spinner,
  Form,
  Input,
} from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { validateEmail } from "../../helpers/Validators/validateEmail";

const CreatorModal = (props) => {
  const {
    isOpen,
    toggle,
    onSubmitClick,
    selectedCreator,
    onCreateButtonClick,
    isLoading,
  } = props;

  const [selectedCreatorInfo, setSelectedCreatorInfo] = useState({
    _id: "",
    fullName: "",
    email: "",
    phone: "",
    category: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (selectedCreator) {
      setSelectedCreatorInfo(selectedCreator);
    } else {
      setSelectedCreatorInfo({
        _id: "",
        fullName: "",
        email: "",
        phone: "",
        category: "",
        password: "",
        confirmPassword: "",
      });
    }

    return () => {
      setSelectedCreatorInfo({
        _id: "",
        fullName: "",
        email: "",
        phone: "",
        category: "",
        password: "",
        confirmPassword: "",
      });
    };
  }, [selectedCreator]);

  function handleValidSubmit(event) {
    event.preventDefault();
    onSubmitClick(selectedCreatorInfo);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setSelectedCreatorInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleCreateButtonClick = () => {
    if (!selectedCreatorInfo?.fullName?.length) {
      return toast.error("Empty Full Name!", {
        autoClose: 1000,
      });
    } else if (!selectedCreatorInfo?.email?.length) {
      return toast.error("Empty Email Address!", {
        autoClose: 1000,
      });
    } else if (!validateEmail(selectedCreatorInfo?.email)) {
      return toast.error("Invalid Email Address!", {
        autoClose: 1000,
      });
    } else if (!selectedCreatorInfo?.phone) {
      return toast.error("Empty Phone Number!", {
        autoClose: 1000,
      });
    } else if (selectedCreatorInfo?.phone?.length !== 10) {
      return toast.error("Invalid Phone Number!", {
        autoClose: 1000,
      });
    } else if (!selectedCreatorInfo?.category) {
      return toast.error("Empty Category!", {
        autoClose: 1000,
      });
    } else if (
      !selectedCreatorInfo?.password &&
      !selectedCreatorInfo?._id?.length
    ) {
      return toast.error("Empty Password!", {
        autoClose: 1000,
      });
    } else if (
      !selectedCreatorInfo?.confirmPassword &&
      !selectedCreatorInfo?._id?.length
    ) {
      return toast.error("Empty Confirm Password!", {
        autoClose: 1000,
      });
    } else if (
      selectedCreatorInfo?.password !== selectedCreatorInfo?.confirmPassword &&
      !selectedCreatorInfo?._id?.length
    ) {
      return toast.error("Password and Confirm Password didnt match!", {
        autoClose: 1000,
      });
    }
    onCreateButtonClick(selectedCreatorInfo);
  };

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
          {selectedCreator?.fullName ? "Edit" : "Add New"} Creator
        </ModalHeader>
        <ModalBody>
          <Form className="form-horizontal">
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <Input
                name="name"
                className="form-control"
                placeholder="Enter creator Full Name"
                type="text"
                required
                value={selectedCreatorInfo.fullName}
                onChange={(e) =>
                  setSelectedCreatorInfo((prevState) => ({
                    ...prevState,
                    fullName: e.target.value,
                  }))
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <Input
                name="email"
                label="Email Address"
                className="form-control"
                placeholder="Enter email address"
                type="email"
                required
                value={selectedCreatorInfo.email}
                onChange={(e) =>
                  setSelectedCreatorInfo((prevState) => ({
                    ...prevState,
                    email: e.target.value,
                  }))
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <Input
                name="phone"
                className="form-control"
                placeholder="Enter phone number"
                type="tel"
                required
                value={selectedCreatorInfo.phone}
                onChange={(e) =>
                  setSelectedCreatorInfo((prevState) => ({
                    ...prevState,
                    phone: e.target.value,
                  }))
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <select
                name="grade"
                className="form-control"
                placeholder="Select category"
                required
                value={selectedCreatorInfo.category}
                onChange={(e) =>
                  setSelectedCreatorInfo((prevState) => ({
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
            {!selectedCreatorInfo?._id && (
              <div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <Input
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    type="password"
                    required
                    value={selectedCreatorInfo.password}
                    onChange={(e) =>
                      setSelectedCreatorInfo((prevState) => ({
                        ...prevState,
                        password: e.target.value,
                      }))
                    }
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
                    value={selectedCreatorInfo.confirmPassword}
                    onChange={(e) =>
                      setSelectedCreatorInfo((prevState) => ({
                        ...prevState,
                        confirmPassword: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            )}
            <div className="d-flex">
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
                disabled={isLoading}
                onClick={handleCreateButtonClick}
              >
                {isLoading ? (
                  <Spinner size="sm" color="light" />
                ) : selectedCreatorInfo?._id ? (
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

export default CreatorModal;
