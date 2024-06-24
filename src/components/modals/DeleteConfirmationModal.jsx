// Import react strap elements
import { Button, Modal, ModalBody, ModalHeader, Row, Col, Spinner } from "reactstrap";

const DeleteConfirmationModal = (props) => {
  const { isOpen, toggle, onDeleteClick, isLoading } = props;

  const HandleDeleteClick = () => {
    onDeleteClick()
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
        <ModalHeader toggle={toggle} />
        <ModalBody>
          <Row>
            <Col className="text-center">
              <h5>Are you sure want to delete ?</h5>
            </Col>
          </Row>
          <div className="text-right d-flex mt-3">
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
              className="btn btn-base btn-rounded-full w-md waves-effect waves-light w-50"
              color="danger"
              onClick={HandleDeleteClick}
              disabled={isLoading}
            >
              {isLoading ? <Spinner size="sm" color="light" /> : "Delete"}
            </Button>
          </div>
        </ModalBody>
      </div>
    </Modal>
  )
}

export default DeleteConfirmationModal