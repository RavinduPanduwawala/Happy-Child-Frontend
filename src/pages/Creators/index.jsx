import React, { useState, useEffect } from "react";
import {
  Card,
  Button
} from "reactstrap";
import {
  Trash2,
  Edit,
  Lock
} from "react-feather";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import DataTable from "react-data-table-component";
import TeacherModal from "./CreatorModal";
import DeleteConfirmationModal from "../../components/modals/DeleteConfirmationModal";
import ResetPasswordModal from "../../components/modals/ResetPasswordModal";

// Api helpers
import { get, post, put, del } from "../../helpers/apiHelper"
const Creators = () => {

  const [modal, setModal] = useState(false);
  const [creatorsList, setCreatorsList] = useState([]);
  const [selectedCreator, setSelectedCreator] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordResetButtonLoading, setPasswordResetButtonLoading] = useState(false);

  const [deleteButtonLoading, setDeleteButtonLoading] = useState(false);
  const [viewDeleteConfirmationModal, setViewDeleteConfirmationModal] = useState(false);
  const [viewResetPasswordModal, setViewResetPasswordModal] = useState(false);


  useEffect(() => {
    fetchCreatorsList()
  }, [])

  const fetchCreatorsList = async () => {
    try {
      const res = await get(`/user/CREATOR`); // Change to include type in the URL path

      if (res.error) {
        return toast.error('Something went wrong', {
          autoClose: 3000,
        });
      }

      setCreatorsList(res.data);
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
    if (modal) setSelectedCreator({});

    setModal(!modal);
  };

  const toggleDeleteConfimationModal = (row) => {
    if (viewDeleteConfirmationModal) setSelectedCreator({});

    setViewDeleteConfirmationModal(!viewDeleteConfirmationModal);
  };

  const toggleResetPasswordModal = (row) => {
    if (viewResetPasswordModal) setSelectedCreator({});

    setViewResetPasswordModal(!viewResetPasswordModal);
  };

  const handleCreatorEditClick = (row) => {
    setSelectedCreator(row);
    setModal(true);
  };

  const handleCreatorDeleteClick = (row) => {
    setSelectedCreator(row);
    setViewDeleteConfirmationModal(true);
  };

  const handleCreatorResetPasswordClick = (row) => {
    setSelectedCreator(row);
    setViewResetPasswordModal(true);
  };

  const handleCreatorAddClick = () => {
    setModal(true);
  };

  const handleCreateCreatorEvent = async (creatorInfo) => {
    setIsLoading(true)

    try {
      if (creatorInfo?._id?.length) {

        const { confirmPassword, email, ...payloadWithoutConfirmPassword } = creatorInfo;

        let payload = {
          ...payloadWithoutConfirmPassword,
          type: "CREATOR"
        }

        const res = await put(`/user/${creatorInfo?._id}`, payload)

        if (res.error) {
          setIsLoading(false)

          return toast.error('Something went wrong', {
            autoClose: 3000,
          })
        }

        toast.success('Creator edited successfully!', {
          autoClose: 3000,
        })

        setModal(false)
        setSelectedCreator({})
        setIsLoading(false)

        await fetchCreatorsList()

      } else {
        const { confirmPassword, ...payloadWithoutConfirmPassword } = creatorInfo;

        let payload = {
          ...payloadWithoutConfirmPassword,
          type: "CREATOR"
        }

        const res = await post('/user/signup', payload)

        if (res.error) {
          setIsLoading(false)

          return toast.error('Something went wrong', {
            autoClose: 3000,
          })
        }

        toast.success('New Creator added successfully!', {
          autoClose: 3000,
        })

        setModal(false)
        setSelectedCreator({})
        setIsLoading(false)

        await fetchCreatorsList()
      }

    } catch (error) {
      console.error("An error occurred while creating a creator", error);
      toast.error('An error occurred while creating a creator!', {
        autoClose: 1000,
      })

      setIsLoading(false)
    }
  }

  const handleCreatorDeleteEvent = async () => {

    setDeleteButtonLoading(true)
    try {
      const res = await del(`/user/${selectedCreator?._id}`)

      if (res.error) {
        setDeleteButtonLoading(false)

        return toast.error('Something went wrong', {
          autoClose: 3000,
        })
      }

      setViewDeleteConfirmationModal(false)
      setSelectedCreator({})
      setDeleteButtonLoading(false)

      toast.success('Creator deleted successfully!', {
        autoClose: 3000,
      })

      await fetchCreatorsList()
    } catch (e) {
      setDeleteButtonLoading(false)
      console.log(e)
      toast.error('Something went wrong', {
        autoClose: 3000,
      })
    }
  };

  const handleCreatorPasswordResetEvent = async (password) => {
    setPasswordResetButtonLoading(true)
    try {
      const res = await post(`/user/reset-pw`, {
        email: selectedCreator?.email,
        password
      })

      if (res.error) {
        setPasswordResetButtonLoading(false)

        return toast.error('Something went wrong', {
          autoClose: 3000,
        })
      }

      setViewResetPasswordModal(false)
      setSelectedCreator({})
      setPasswordResetButtonLoading(false)

      toast.success('Password reset successfully!', {
        autoClose: 3000,
      })

      await fetchCreatorsList()
    } catch (e) {
      setPasswordResetButtonLoading(false)
      console.log(e)
    }
  };

  const columns = [
    {
      name: "Full Name",
      selector: "name",
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
      name: "Category",
      selector: "category",
      sortable: true,
      cell: (row) => row.category,
    },
    {
      name: "Actions",
      minWidth: "100px",
      cell: (row) => (
        <div className="d-flex">
          {/* <div><Eye size={14} className="ml-4" /></div> */}
          <div onClick={() => handleCreatorEditClick(row)}><Edit size={14} className="ml-4" /></div>
          <div onClick={() => handleCreatorDeleteClick(row)} style={{ marginLeft: 16 }}><Trash2 size={14} color="red" /></div>
          <div onClick={() => handleCreatorResetPasswordClick(row)} style={{ marginLeft: 16 }}><Lock size={14} color="blue" /></div>
        </div>

      ),
    },
  ];

  return (
    <div>
      <div className="d-flex justify-between justify-content-between pb-2">
        <h3>Creators</h3>
        <div><Button color="primary" onClick={handleCreatorAddClick}>Add +</Button></div>
      </div>
      <Card>
        <DataTable
          noHeader
          columns={columns}
          data={creatorsList}
          className="react-dataTable"
          customStyles={{
            headCells: {
              style: tableHeadStyle,
            },
          }}
        />
      </Card>
      <TeacherModal
        selectedCreator={selectedCreator}
        isOpen={modal}
        toggle={toggleModal}
        onCreateButtonClick={handleCreateCreatorEvent}
        isLoading={isLoading}

      />
      <DeleteConfirmationModal
        onDeleteClick={handleCreatorDeleteEvent}
        isOpen={viewDeleteConfirmationModal}
        toggle={toggleDeleteConfimationModal}
        isLoading={deleteButtonLoading}
      />
      <ResetPasswordModal
        onRestClick={handleCreatorPasswordResetEvent}
        isOpen={viewResetPasswordModal}
        toggle={toggleResetPasswordModal}
        isLoading={passwordResetButtonLoading}
      />
      <ToastContainer />
    </div>
  );
};

export default Creators;
