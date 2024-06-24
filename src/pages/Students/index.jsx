import React, { useState, useEffect } from "react";
import {
  Card,
  Button
} from "reactstrap";
import {
  Trash2,
  Edit,
  Send,
  Lock
} from "react-feather";

import DataTable from "react-data-table-component";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Modals
import StudentModal from "./StudentModal";
import AssessmentSendModal from "./AssessmentSendModal";
import DeleteConfirmationModal from "../../components/modals/DeleteConfirmationModal";

// Api helpers
import { get, post, put, del } from "../../helpers/apiHelper"
import ResetPasswordModal from "./ResetPasswordModal";

const Teachers = () => {

  const [modal, setModal] = useState(false);
  const [showAssessmentSendModal, setShowAssessmentSendModal] = useState(false);
  const [studentsList, setStudentsList] = useState([]);
  const [assessmentsList, setAssessmentsList] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState({});
  const [showDeleteConfirmAlert, setShowDeleteConfirmAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteButtonLoading, setDeleteButtonLoading] = useState(false);
  const [passwordResetButtonLoading, setPasswordResetButtonLoading] = useState(false);

  const [viewDeleteConfirmationModal, setViewDeleteConfirmationModal] = useState(false);
  const [viewResetPasswordModal, setViewResetPasswordModal] = useState(false);


  useEffect(() => {
    fetchStudentsList()
    fetchAssessmentsList()
  }, [])


  const handleUserPermissions = async () => {
    const storedUser = JSON.parse(localStorage.getItem('USER'));
    const currentUser = storedUser ? { userType: storedUser.type, grade: storedUser.grade ? storedUser.grade : null } : null;

    return currentUser;
  }

  const fetchStudentsList = async () => {
    try {

      const user = await handleUserPermissions()

      const res = await get(`/user/STUDENT/${user.userType === 'ADMIN' ? 'ALL' : user.grade}`);

      if (res.error) {
        return toast.error('Something went wrong', {
          autoClose: 3000,
        });
      }

      setStudentsList(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchAssessmentsList = async () => {
    try {

      const user = await handleUserPermissions()

      const res = await get(`/assessment/${user.userType === 'ADMIN' ? 'ALL' : user.grade}`);

      if (res.error) {
        return toast.error('Something went wrong', {
          autoClose: 3000,
        });
      }

      setAssessmentsList(res.data);
    } catch (e) {
      console.log(e);
    }
  };


  const tableHeadStyle = {
    backgroundColor: "#f9f9f9", // Background color for table header cells
    fontWeight: 700,
    fontSize: 14
  };

  const toggleModal = (row) => {
    if (modal) setSelectedStudent({});

    setModal(!modal);
  };

  const toggleAssessmentSendModal = (row) => {
    if (showAssessmentSendModal) {
      setShowAssessmentSendModal(false)
    }
    setShowAssessmentSendModal(!showAssessmentSendModal);
  };

  const handleStudentDeleteEvent = async () => {
    setDeleteButtonLoading(true)
    try {
      const res = await del(`/user/${selectedStudent?._id}`)

      if (res.error) {
        setDeleteButtonLoading(false)

        return toast.error('Something went wrong', {
          autoClose: 3000,
        })
      }

      setViewDeleteConfirmationModal(false)
      setSelectedStudent({})
      setDeleteButtonLoading(false)

      toast.success('Student deleted successfully!', {
        autoClose: 3000,
      })

      await fetchStudentsList()
    } catch (e) {
      setDeleteButtonLoading(false)
      console.log(e)
    }
  };

  const handleStudentPasswordResetEvent = async (password) => {
    setPasswordResetButtonLoading(true)
    try {
      const res = await post(`/user/reset-pw`, {
        email: selectedStudent?.email,
        password
      })

      if (res.error) {
        setPasswordResetButtonLoading(false)

        return toast.error('Something went wrong', {
          autoClose: 3000,
        })
      }

      setViewResetPasswordModal(false)
      setSelectedStudent({})
      setPasswordResetButtonLoading(false)

      toast.success('Password reset successfully!', {
        autoClose: 3000,
      })

      await fetchStudentsList()
    } catch (e) {
      setPasswordResetButtonLoading(false)
      console.log(e)
    }
  };

  const toggleDeleteConfimationModal = (row) => {
    if (viewDeleteConfirmationModal) setSelectedStudent({});

    setViewDeleteConfirmationModal(!viewDeleteConfirmationModal);
  };

  const toggleResetPasswordModal = (row) => {
    if (viewResetPasswordModal) setSelectedStudent({});

    setViewResetPasswordModal(!viewResetPasswordModal);
  };

  const handleStudentEditClick = (row) => {
    setSelectedStudent(row);
    setModal(true);
  };

  const handleStudentDeleteClick = (row) => {
    setSelectedStudent(row);
    setViewDeleteConfirmationModal(true);
  };

  const handleStudentResetPasswordClick = (row) => {
    setSelectedStudent(row);
    setViewResetPasswordModal(true);
  };


  const handleSendAssessmentButtonClick = (row) => {
    setSelectedStudent(row);
    setShowAssessmentSendModal(true);
  };

  const handleStudentAddClick = () => {
    setModal(true);
  };


  const handleStudentModalSubmit = async (studentsInfo) => {
    setIsLoading(true)

    try {
      if (studentsInfo?._id?.length) {

        const { confirmPassword, email, ...payloadWithoutConfirmPassword } = studentsInfo;

        let payload = {
          ...payloadWithoutConfirmPassword,
          type: "STUDENT"
        }


        const res = await put(`/user/${studentsInfo?._id}`, payload)

        if (res.error) {
          setIsLoading(false)

          return toast.error('Something went wrong', {
            autoClose: 3000,
          })
        }

        toast.success('Student edited successfully!', {
          autoClose: 3000,
        })

        setModal(false)
        setSelectedStudent({})
        setIsLoading(false)

        await fetchStudentsList()

      } else {
        const { confirmPassword, ...payloadWithoutConfirmPassword } = studentsInfo;

        let payload = {
          ...payloadWithoutConfirmPassword,
          type: "STUDENT"
        }


        const res = await post('/user/signup', payload)

        if (res.error) {
          setIsLoading(false)

          return toast.error('Something went wrong', {
            autoClose: 3000,
          })
        }

        toast.success('New Student added successfully!', {
          autoClose: 3000,
        })

        setModal(false)
        setSelectedStudent({})
        setIsLoading(false)

        await fetchStudentsList()
      }

    } catch (error) {
      console.error("An error occurred while creating a student", error);
      toast.error('An error occurred while creating a student!', {
        autoClose: 1000,
      })

      setIsLoading(false)
    }
  };

  const handleAssessmentSendButtonClick = async (assessmentId) => {
    setShowAssessmentSendModal(false)

    try {
      let payload = {
        userId: selectedStudent._id,
        assessment: assessmentId
      }

      const res = await post(`/user-assessment/assign`, payload)

      if (res.error) {
        setIsLoading(false)

        return toast.error('Something went wrong', {
          autoClose: 3000,
        })
      }

      toast.success('Assessment Sent successfully!', {
        autoClose: 3000,
      })

      setIsLoading(false)

    } catch (error) {
      toast.error('An error occurred while Sending Assessment!', {
        autoClose: 1000,
      })

      setIsLoading(false)
    }
  }

  const columns = [
    {
      name: "Full Name",
      selector: "fullName",
      sortable: true,
      cell: (row) => row.fullName,
    },
    {
      name: "Parent Email",
      selector: "email",
      minWidth: "250px",
      sortable: true,
      cell: (row) => row.email,
    },
    {
      name: "Parent Phone",
      selector: "phone",
      sortable: true,
      cell: (row) => row.phone,
    },
    {
      name: "Age",
      selector: "age",
      sortable: true,
      cell: (row) => row.age,
    },
    {
      name: "Birthday",
      selector: "birthday",
      sortable: true,
      cell: (row) => {
        if (row.birthday) {
          return new Date(row.birthday).toISOString().split('T')[0];
        } else {
          return '';
        }
      }
    },
    {
      name: "Grade",
      selector: "grade",
      sortable: true,
      cell: (row) => row.grade,
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex">
          <div onClick={() => handleSendAssessmentButtonClick(row)} style={{ marginRight: 16 }}><Send size={14} color="Green" /></div>
          <div onClick={() => handleStudentEditClick(row)}><Edit size={14} className="ml-4" /></div>
          <div onClick={() => handleStudentDeleteClick(row)} style={{ marginLeft: 16 }}><Trash2 size={14} color="red" /></div>
          <div onClick={() => handleStudentResetPasswordClick(row)} style={{ marginLeft: 16 }}><Lock size={14} color="blue" /></div>
        </div>

      ),
    },
  ];

  return (
    <div>
      <div className="d-flex justify-between justify-content-between pb-2">
        <h3>Students</h3>
        <div><Button color="primary" onClick={handleStudentAddClick}>Add +</Button></div>
      </div>
      <Card>
        <DataTable
          noHeader
          columns={columns}
          data={studentsList}
          className="react-dataTable"
          customStyles={{
            headCells: {
              style: tableHeadStyle,
            },
          }}
        />
      </Card>
      <StudentModal
        onCreateButtonClick={handleStudentModalSubmit}
        selectedStudent={selectedStudent}
        isOpen={modal}
        toggle={toggleModal}
        isLoading={isLoading}
      />
      <AssessmentSendModal
        onAssessmentSendButtonClick={handleAssessmentSendButtonClick}
        isOpen={showAssessmentSendModal}
        toggle={toggleAssessmentSendModal}
        assessments={assessmentsList}
      />
      <DeleteConfirmationModal
        onDeleteClick={handleStudentDeleteEvent}
        isOpen={viewDeleteConfirmationModal}
        toggle={toggleDeleteConfimationModal}
        isLoading={deleteButtonLoading}
      />
      <ResetPasswordModal
        onRestClick={handleStudentPasswordResetEvent}
        isOpen={viewResetPasswordModal}
        toggle={toggleResetPasswordModal}
        isLoading={passwordResetButtonLoading}
      />
      <ToastContainer />
    </div>
  );
};

export default Teachers;
