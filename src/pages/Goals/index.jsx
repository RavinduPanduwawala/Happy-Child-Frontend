import React, { useState, useEffect } from "react";
import { Card, Button } from "reactstrap";
import { Trash2, Edit } from "react-feather";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DataTable from "react-data-table-component";
import GoalModal from "./GoalModal";
import DeleteConfirmationModal from "../../components/modals/DeleteConfirmationModal";
import ColorBlindnessTestGame from "../../components/games/ColorPuzzleGame";

// Api helpers
import { get, post, put, del } from "../../helpers/apiHelper";

const Goals = () => {
  const [modal, setModal] = useState(false);
  const [goalsList, setGoalsList] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState({});
  const [showDeleteConfirmAlert, setShowDeleteConfirmAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteButtonLoading, setDeleteButtonLoading] = useState(false);
  const [viewDeleteConfirmationModal, setViewDeleteConfirmationModal] =
    useState(false);

  useEffect(() => {
    fetchGoalsList();
  }, []);

  const tableHeadStyle = {
    backgroundColor: "#f9f9f9", // Background color for table header cells
    fontWeight: 700,
    fontSize: 14,
  };

  const handleUserPermissions = async () => {
    const storedUser = JSON.parse(localStorage.getItem("USER"));
    const currentUser = storedUser
      ? {
          userType: storedUser.type,
          grade: storedUser.grade ? storedUser.grade : null,
          userId: storedUser._id,
        }
      : null;

    return currentUser;
  };

  const fetchGoalsList = async () => {
    try {
      const user = await handleUserPermissions();

      const res = await get(`/goal/${user.userId}`);

      if (res.error) {
        return toast.error("Something went wrong", {
          autoClose: 3000,
        });
      }

      setGoalsList(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const toggleModal = (row) => {
    if (modal) setSelectedGoal({});

    setModal(!modal);
  };

  const handleGoalEditClick = (row) => {
    setSelectedGoal(row);
    setModal(true);
  };

  const handleGoalAddClick = () => {
    setModal(true);
  };

  const handleGoalModalSubmit = async (goalInfo) => {
    setIsLoading(true);

    try {
      if (goalInfo?._id?.length) {
        const res = await put(`/goal/${goalInfo?._id}`, goalInfo);

        if (res.error) {
          setIsLoading(false);

          return toast.error("Something went wrong", {
            autoClose: 3000,
          });
        }

        toast.success("Goal edited successfully!", {
          autoClose: 3000,
        });

        setModal(false);
        setIsLoading(false);

        await fetchGoalsList();

        setSelectedGoal({});
      } else {
        const user = await handleUserPermissions();

        let payload = {
          ...goalInfo,
          userId: user.userId,
        };

        const res = await post("/goal", payload);

        if (res.error) {
          setIsLoading(false);

          return toast.error("Something went wrong", {
            autoClose: 3000,
          });
        }

        toast.success("New Goal added successfully!", {
          autoClose: 3000,
        });

        setModal(false);
        setIsLoading(false);

        await fetchGoalsList();

        setSelectedGoal({});
      }
    } catch (error) {
      console.error("An error occurred while creating a Goal", error);
      toast.error("An error occurred while creating a Goal!", {
        autoClose: 1000,
      });

      setIsLoading(false);
    }
  };

  const handleGoalDeleteEvent = async () => {
    setDeleteButtonLoading(true);
    try {
      const res = await del(`/goal/${selectedGoal?._id}`);

      if (res.error) {
        setDeleteButtonLoading(false);

        return toast.error("Something went wrong", {
          autoClose: 3000,
        });
      }

      setViewDeleteConfirmationModal(false);
      setSelectedGoal({});
      setDeleteButtonLoading(false);

      toast.success("Goal deleted successfully!", {
        autoClose: 3000,
      });

      await fetchGoalsList();
    } catch (e) {
      setDeleteButtonLoading(false);
      console.log(e);
    }
  };

  const handleGoalDeleteClick = (row) => {
    setSelectedGoal(row);
    setViewDeleteConfirmationModal(true);
  };

  const toggleDeleteConfimationModal = (row) => {
    if (viewDeleteConfirmationModal) setSelectedGoal({});

    setViewDeleteConfirmationModal(!viewDeleteConfirmationModal);
  };

  const columns = [
    {
      name: "Title",
      selector: "title",
      cell: (row) => row.title,
    },
    {
      name: "Description",
      selector: "description",
      cell: (row) => row.description,
    },
    {
      name: "Category",
      selector: "category",
      cell: (row) => row.category,
    },
    {
      name: "Grade",
      selector: "grade",
      cell: (row) => row.grade,
    },
    {
      name: "Level",
      selector: "level",
      cell: (row) => row.level,
    },
    {
      name: "Actions",
      minWidth: "100px",
      cell: (row) => (
        <div className="d-flex">
          {/* <div><Eye size={14} className="ml-4" /></div> */}
          <div onClick={() => handleGoalEditClick(row)}>
            <Edit size={14} className="ml-4" />
          </div>
          <div
            onClick={() => handleGoalDeleteClick(row)}
            style={{ marginLeft: 16 }}
          >
            <Trash2 size={14} color="red" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="d-flex justify-between justify-content-between pb-2">
        <h3>Goals</h3>
        <div>
          <Button color="primary" onClick={handleGoalAddClick}>
            Add +
          </Button>
        </div>
      </div>
      <Card>
        <DataTable
          noHeader
          columns={columns}
          data={goalsList}
          className="react-dataTable"
          customStyles={{
            headCells: {
              style: tableHeadStyle,
            },
          }}
        />
      </Card>
      <GoalModal
        onCreateButtonClick={handleGoalModalSubmit}
        selectedGoal={selectedGoal}
        isOpen={modal}
        toggle={toggleModal}
        isLoading={isLoading}
      />
      <DeleteConfirmationModal
        onDeleteClick={handleGoalDeleteEvent}
        isOpen={viewDeleteConfirmationModal}
        toggle={toggleDeleteConfimationModal}
        isLoading={deleteButtonLoading}
      />
      <ToastContainer />
    </div>
  );
};

export default Goals;
