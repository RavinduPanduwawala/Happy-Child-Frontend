import { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalHeader, Row, Input, Spinner } from "reactstrap";

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ResetPasswordModal = (props) => {
    const { isOpen, toggle, onRestClick, isLoading } = props;

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    useEffect(() => {
        if (!isOpen) {
            // Clear password fields and reset state when the modal is closed
            setPassword('');
            setConfirmPassword('');
        }
    }, [isOpen]);

    const HandleResetClick = () => {
        if (!password?.length) {
            return toast.error('Empty Password!', {
                autoClose: 1000,
            })
        } else if (!confirmPassword?.length) {
            return toast.error('Empty Confirm Password!', {
                autoClose: 1000,
            })
        } else if (password !== confirmPassword) {
            return toast.error('Passwords didnt match!', {
                autoClose: 1000,
            })
        }

        onRestClick(password)
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
                <ModalHeader toggle={toggle} >Reset Password</ModalHeader>
                <ModalBody>
                    <Row>
                        <div className="mb-3 col-12">
                            <label className="form-label">Password</label>
                            <Input
                                name="password"
                                className="form-control"
                                placeholder="Enter Password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 col-12">
                            <label className="form-label">Confirm Password</label>
                            <Input
                                name="confirm-password"
                                className="form-control"
                                placeholder="Enter Confirm Password"
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </Row>
                    <div className="text-right d-flex">
                        <Button
                            className="btn-rounded-full w-50"
                            type="button"
                            style={{ marginRight: 10 }}
                            color="secondary"
                            onClick={toggle}
                            disabled={isLoading}
                        >
                            Close
                        </Button>
                        <Button
                            className="btn btn-base btn-rounded-full w-50 waves-effect waves-light"
                            color="success"
                            onClick={HandleResetClick}
                            disabled={isLoading}
                        >
                            {isLoading ? <Spinner size="sm" color="light" /> : 'Reset'}
                        </Button>
                    </div>
                </ModalBody>
            </div>
        </Modal>
    )
}

export default ResetPasswordModal