// React related imports
import React, { useState, useEffect } from "react";

// React strap component imports
import {
  Card,
  Button
} from "reactstrap";

// Icons Import
import {
  Trash2,
  Edit,
} from "react-feather";

// Toast Component imports
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Data table Import
import DataTable from "react-data-table-component";

// Assessment adding Modal import
import AssessmentModal from "./AssessmentModal";

// Assessment Delete confirmation modal import
import DeleteConfirmationModal from "../../components/modals/DeleteConfirmationModal";

// Api helpers
import { get, post, put, del } from "../../helpers/apiHelper"

const Assessments = () => {

  const [modal, setModal] = useState(false);
  const [assessmentsList, setAssessmentsList] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState({});
  const [viewDeleteConfirmationModal, setViewDeleteConfirmationModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [deleteButtonLoading, setDeleteButtonLoading] = useState(false);
  const [passwordResetButtonLoading, setPasswordResetButtonLoading] = useState(false);


  // Get Assessments list when page initially loading
  useEffect(() => {
    fetchAssessmentsList()
  }, [])


  // Assessment fetching function
  const fetchAssessmentsList = async () => {
    try {
      const res = await get(`/assessment`); // Change to include type in the URL path

      if (res.error) {
        return toast.error('Something went wrong', {
          autoClose: 8000,
        });
      }

      setAssessmentsList(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  // Data table header color change
  const tableHeadStyle = {
    backgroundColor: "#f9f9f9", // Background color for table header cells
    fontWeight: 700,
    fontSize: 14
  };


  // Close and Open Assessment adding modal
  const toggleModal = (row) => {
    if (modal) setSelectedAssessment({});

    setModal(!modal);
  };

  // Close and open assessment delete confirmation modal
  const toggleDeleteConfimationModal = (row) => {
    if (viewDeleteConfirmationModal) setSelectedAssessment({});

    setViewDeleteConfirmationModal(!viewDeleteConfirmationModal);
  };

  // Assessment Edit Modal open function
  const handleAssessmentEditClick = (row) => {
    setSelectedAssessment(row);
    setModal(true);
  };

  // Assessment Delete Confirmation modal open function
  const handleAssessmentDeleteClick = (row) => {
    setSelectedAssessment(row);
    setViewDeleteConfirmationModal(true);
  };

  // Assessment adding Modal open function
  const handleAssessmentAddClick = () => {
    setModal(true);
  };

  // Assessment Save to backend function
  const handleAssessmentModalSubmit = async (assessment) => {
    setIsLoading(true)

    try {
      // if id has, update assessment
      if (assessment?._id?.length) {

        const res = await put(`/assessment/${assessment?._id}`, assessment)

        if (res.error) {
          setIsLoading(false)

          // Show toast message
          return toast.error('Something went wrong', {
            autoClose: 8000,
          })
        }

        toast.success('Assessment edited successfully!', {
          autoClose: 8000,
        })

        setModal(false)
        setIsLoading(false)

        // get lates assessments list from api
        await fetchAssessmentsList()

      } else {
        // Create new assessment
        const res = await post('/assessment', assessment)

        if (res.error) {
          setIsLoading(false)

          return toast.error('Something went wrong', {
            autoClose: 8000,
          })
        }
        // Show toast message
        toast.success('New Assessment added successfully!', {
          autoClose: 8000,
        })

        setModal(false)
        setIsLoading(false)

        // get lates assessments list from api
        await fetchAssessmentsList()
      }

    } catch (error) {
      console.error("An error occurred while creating a assessment", error);
      toast.error('An error occurred while creating a assessment!', {
        autoClose: 1000,
      })

      setIsLoading(false)
    }
  };

  const handleAssessmentDeleteEvent = async () => {
    setDeleteButtonLoading(true)
    try {
      const res = await del(`/assessment/${selectedAssessment?._id}`)

      if (res.error) {
        setDeleteButtonLoading(false)

        return toast.error('Something went wrong', {
          autoClose: 8000,
        })
      }

      setViewDeleteConfirmationModal(false)
      setSelectedAssessment({})
      setDeleteButtonLoading(false)

      toast.success('Assessment deleted successfully!', {
        autoClose: 8000,
      })

      await fetchAssessmentsList()
    } catch (e) {
      setDeleteButtonLoading(false)
      console.log(e)
      toast.error('Something went wrong', {
        autoClose: 8000,
      })
    }
  };

  // Data table coulmns
  const columns = [
    {
      name: "Title",
      selector: "title",
      sortable: true,
      cell: (row) => row.title,
    },
    {
      name: "Grade",
      selector: "grade",
      sortable: true,
      cell: (row) => row.grade,
    },
    {
      name: "Category",
      selector: "category",
      sortable: true,
      cell: (row) => row.category,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex">
          {/* <div><Eye size={14} className="ml-4" /></div> */}
          <div onClick={() => handleAssessmentEditClick(row)}><Edit size={14} className="ml-4" /></div>
          <div onClick={() => handleAssessmentDeleteClick(row)} style={{ marginLeft: 16 }}><Trash2 size={14} color="red" /></div>
        </div>

      ),
    },
  ];

  return (
    <div>
      <div className="d-flex justify-between justify-content-between pb-2">
        <h3>Assessments</h3>
        <div><Button color="primary" onClick={handleAssessmentAddClick}>Add +</Button></div>
      </div>
      <Card>
        <DataTable
          noHeader
          columns={columns}
          data={assessmentsList}
          className="react-dataTable"
          customStyles={{
            headCells: {
              style: tableHeadStyle,
            },
          }}
        />
      </Card>
      <AssessmentModal
        onCreateButtonClick={handleAssessmentModalSubmit}
        selectedAssessment={selectedAssessment}
        isOpen={modal}
        toggle={toggleModal}
        isLoading={isLoading}
      />
      <DeleteConfirmationModal
        onDeleteClick={handleAssessmentDeleteEvent}
        isOpen={viewDeleteConfirmationModal}
        toggle={toggleDeleteConfimationModal}
        isLoading={deleteButtonLoading}
      />
      <ToastContainer />
    </div>
  );
};

export default Assessments;
