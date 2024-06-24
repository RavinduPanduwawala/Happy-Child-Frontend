import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AssessmentSendModal = (props) => {
  const { isOpen, toggle, onAssessmentSendButtonClick, assessments } = props;

  const [assessmentsList, setAssessmentsList] = useState([]);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState('');

  useEffect(() => {
    if (assessments) {
      setAssessmentsList(assessments);
    }

    return () => {
      setAssessmentsList([])
    };
  }, [assessments]);

  const handleAssessmentSendButtonClick = () => {
    if (!selectedAssessmentId) {
      return toast.error('Please Select Assessment!', {
        autoClose: 1000,
      })
    }
    onAssessmentSendButtonClick(selectedAssessmentId)
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
          Send Assessment
        </ModalHeader>
        <ModalBody>
          <div className="mb-3">
            <select
              name="grade"
              className="form-control"
              placeholder="Select Assessment"
              required
              value={selectedAssessmentId}
              onChange={(e) => setSelectedAssessmentId(e.target.value)}
            >
              {/* Add options for different grades */}
              <option value="">Select Assessment</option>
              {assessmentsList.map((assessment) => (
                < option value={assessment._id} >{assessment.title}</option>
              ))}
            </select>
          </div>
          <div className="d-flex">
            <Button
              className="btn btn-base btn-rounded-full w-50 waves-effect waves-light"
              style={{ marginRight: 10 }}
              color="success"
              onClick={() => handleAssessmentSendButtonClick()}
            >
              Send
            </Button>
            <Button
              className="btn-rounded-full w-50"
              type="button"
              color="secondary"
              onClick={toggle}
            >
              Close{" "}
            </Button>
          </div>
        </ModalBody>
      </div >
    </Modal >
  );
};

export default AssessmentSendModal;
