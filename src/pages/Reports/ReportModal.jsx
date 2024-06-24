import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const ReportModal = (props) => {
  const { isOpen, toggle, selectedReport } = props;

  const [selectedReportInfo, setSelectedReportInfo] = useState({});

  useEffect(() => {
    if (selectedReport) {
      setSelectedReportInfo(selectedReport);
    }

    return () => {
      setSelectedReportInfo({})
    };
  }, [selectedReport]);

  console.log('modall', selectedReportInfo)

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
          {selectedReportInfo?.user?.fullName ? selectedReportInfo?.user?.fullName : ""} Report
        </ModalHeader>
        <ModalBody>
          <div className="d-flex justify-content-center align-items-center flex-column">
            {selectedReportInfo?.assessment?.questions?.map((question, index) => (
              <div className="pb-4">
                <div>{index + 1}. {question?.question}</div>
                <div className="d-flex pt-2">
                  {question?.answers?.map((answer) => (
                    <div className="mx-3 px-2 text-dark" style={{ borderRadius: 4, backgroundColor: question?.selectedAnswer === answer?.score ? "#c8c8c8" : answer?.score === 'good' ? "#7ae37a" : "" }}>
                      {answer?.answer}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <h5 className="font-bold">Total marks : {selectedReportInfo.calculatedMarks} %</h5>
          </div>
        </ModalBody>
      </div>
    </Modal>
  );
};

export default ReportModal;
