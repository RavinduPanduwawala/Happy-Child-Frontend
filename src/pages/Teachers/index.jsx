import React, { useState, useEffect } from "react";
import {
  Card,
  Button
} from "reactstrap";

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  Trash2,
  Edit,
  Lock
} from "react-feather";

import DataTable from "react-data-table-component";
import TeacherModal from "./TeacherModal";
import DeleteConfirmationModal from "../../components/modals/DeleteConfirmationModal";
import ResetPasswordModal from "./ResetPasswordModal";


// Api helpers
import { get, post, put, del } from "../../helpers/apiHelper"

const Teachers = () => {

  const [modal, setModal] = useState(false);
  const [viewDeleteConfirmationModal, setViewDeleteConfirmationModal] = useState(false);
  const [teachersList, setTeachersList] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState({});
  const [showDeleteConfirmAlert, setShowDeleteConfirmAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteButtonLoading, setDeleteButtonLoading] = useState(false);
  const [passwordResetButtonLoading, setPasswordResetButtonLoading] = useState(false);

  const [viewResetPasswordModal, setViewResetPasswordModal] = useState(false);


  useEffect(() => {
    fetchTeachersList()
  }, [])

  const fetchTeachersList = async () => {
    try {
      const res = await get(`/user/TEACHER`); // Change to include type in the URL path

      if (res.error) {
        return toast.error('Something went wrong', {
          autoClose: 3000,
        });
      }

      setTeachersList(res.data);
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
    if (modal) setSelectedTeacher({});

    setModal(!modal);
  };

  const toggleDeleteConfimationModal = (row) => {
    if (viewDeleteConfirmationModal) setSelectedTeacher({});

    setViewDeleteConfirmationModal(!viewDeleteConfirmationModal);
  };

  const toggleResetPasswordModal = (row) => {
    if (viewResetPasswordModal) setSelectedTeacher({});

    setViewResetPasswordModal(!viewResetPasswordModal);
  };

  const handleTeacherEditClick = (row) => {
    setSelectedTeacher(row);
    setModal(true);
  };

  const handleTeacherDeleteClick = (row) => {
    setSelectedTeacher(row);
    setViewDeleteConfirmationModal(true);
  };

  const handleTeacherResetPasswordClick = (row) => {
    setSelectedTeacher(row);
    setViewResetPasswordModal(true);
  };

  const handleTeacherDeleteEvent = async () => {
    setDeleteButtonLoading(true)
    try {
      const res = await del(`/user/${selectedTeacher?._id}`)

      if (res.error) {
        setDeleteButtonLoading(false)

        return toast.error('Something went wrong', {
          autoClose: 8000,
        })
      }

      setViewDeleteConfirmationModal(false)
      setSelectedTeacher({})
      setDeleteButtonLoading(false)

      toast.success('Teacher deleted successfully!', {
        autoClose: 8000,
      })

      await fetchTeachersList()
    } catch (e) {
      setDeleteButtonLoading(false)
      console.log(e)
      toast.error('Something went wrong', {
        autoClose: 3000,
      })
    }
  };

  const handleTeacherAddClick = () => {
    setModal(true);
  };

  const handleCreateTeacherEvent = async (teacherInfo) => {
    setIsLoading(true)

    try {
      if (teacherInfo?._id?.length) {

        const { confirmPassword, email, ...payloadWithoutConfirmPassword } = teacherInfo;

        let payload = {
          ...payloadWithoutConfirmPassword,
          type: "TEACHER"
        }

        const res = await put(`/user/${teacherInfo?._id}`, payload)

        if (res.error) {
          setIsLoading(false)

          return toast.error('Something went wrong', {
            autoClose: 3000,
          })
        }

        toast.success('Teacher edited successfully!', {
          autoClose: 9000,
        })

        setModal(false)
        setSelectedTeacher({})
        setIsLoading(false)

        await fetchTeachersList()

      } else {
        const { confirmPassword, ...payloadWithoutConfirmPassword } = teacherInfo;

        let payload = {
          ...payloadWithoutConfirmPassword,
          type: "TEACHER"
        }

        const res = await post('/user/signup', payload)

        if (res.error) {
          setIsLoading(false)

          return toast.error('Something went wrong', {
            autoClose: 3000,
          })
        }

        toast.success('New Teacher added successfully!', {
          autoClose: 9000,
        })

        setModal(false)
        setSelectedTeacher({})
        setIsLoading(false)

        await fetchTeachersList()
      }

    } catch (error) {
      console.error("An error occurred while creating a teacher", error);
      toast.error('An error occurred while creating a teacher!', {
        autoClose: 1000,
      })

      setIsLoading(false)
    }
  }


  const handleTeacherPasswordResetEvent = async (password) => {
    setPasswordResetButtonLoading(true)
    try {
      const res = await post(`/user/reset-pw`, {
        email: selectedTeacher?.email,
        password
      })

      if (res.error) {
        setPasswordResetButtonLoading(false)

        return toast.error('Something went wrong', {
          autoClose: 8000,
        })
      }

      setViewResetPasswordModal(false)
      setSelectedTeacher({})
      setPasswordResetButtonLoading(false)

      toast.success('Password reset successfully!', {
        autoClose: 8000,
      })

      await fetchTeachersList()
    } catch (e) {
      setPasswordResetButtonLoading(false)
      console.log(e)
    }
  };

  const columns = [
    {
      name: "Full Name",
      selector: "fullName",
      sortable: true,
      cell: (row) => row.fullName,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
      cell: (row) => row.email,
    },
    {
      name: "Phone",
      selector: "phone",
      sortable: true,
      cell: (row) => row.phone,
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
          <div onClick={() => handleTeacherEditClick(row)}><Edit size={14} className="ml-4" /></div>
          <div onClick={() => handleTeacherDeleteClick(row)} style={{ marginLeft: 16 }}><Trash2 size={14} color="red" /></div>
          <div onClick={() => handleTeacherResetPasswordClick(row)} style={{ marginLeft: 16 }}><Lock size={14} color="blue" /></div>
        </div>

      ),
    },
  ];

  return (
    <div>
      <div className="d-flex justify-between justify-content-between pb-2">
        <h3>Teachers</h3>
        <div><Button color="primary" onClick={handleTeacherAddClick}>Add +</Button></div>
      </div>
      <Card>
        <DataTable
          noHeader
          columns={columns}
          responsive={true}
          data={teachersList}
          className="react-dataTable"
          customStyles={{
            headCells: {
              style: tableHeadStyle,
            },
          }}
        />
      </Card>
      <TeacherModal
        selectedTeacher={selectedTeacher}
        isOpen={modal}
        toggle={toggleModal}
        isLoading={isLoading}
        onCreateButtonClick={handleCreateTeacherEvent}
      />

      <DeleteConfirmationModal
        onDeleteClick={handleTeacherDeleteEvent}
        isOpen={viewDeleteConfirmationModal}
        toggle={toggleDeleteConfimationModal}
        isLoading={deleteButtonLoading}
      />
      <ResetPasswordModal
        onRestClick={handleTeacherPasswordResetEvent}
        isOpen={viewResetPasswordModal}
        toggle={toggleResetPasswordModal}
        isLoading={passwordResetButtonLoading}
      />
      <ToastContainer />
    </div>
  );
};

export default Teachers;
