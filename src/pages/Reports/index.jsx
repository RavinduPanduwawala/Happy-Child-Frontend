import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";

// Excel export pulgin import
import * as XLSX from "xlsx";

import { Button, Card } from "reactstrap";

// Api helpers
import { get, post, put, del } from "../../helpers/apiHelper";

// icons import
import { Eye } from "react-feather";

// Modal imports
import ReportModal from "./ReportModal";

const Reports = () => {
  const [reportList, setReportList] = useState([]);
  const [selectedReport, setSelectedReport] = useState({});
  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const handleUserPermissions = async () => {
    const storedUser = JSON.parse(localStorage.getItem("USER"));
    const currentUser = storedUser ? { userId: storedUser._id } : null;

    return currentUser;
  };

  const fetchReports = async () => {
    const user = await handleUserPermissions();

    try {
      const res = await get(`user-assessment/user/${user.userId}`);

      if (res.error) {
        return toast.error("Something went wrong", {
          autoClose: 3000,
        });
      }

      setReportList(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const tableHeadStyle = {
    backgroundColor: "#f9f9f9", // Background color for table header cells
    fontWeight: 700,
    fontSize: 14,
  };

  const handleViewReportClick = (data) => {
    setSelectedReport(data);
    setModal(true);
  };

  // Excel Export function
  const exportToExcel = () => {
    const fieldsToExport = reportList.map((report) => ({
      "Full Name": report.userId.fullName,
      "Parent Email": report.userId.email,
      "Parent Phone": report.userId.phone,
      Grade: report.userId.grade,
      "Assessment Name": report.assessment.title,
      Marks: `${report.calculatedMarks} %`,
    }));
    const ws = XLSX.utils.json_to_sheet(fieldsToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reports");
    XLSX.writeFile(wb, "reports.xlsx");
  };

  const columns = [
    {
      name: "Full Name",
      selector: "fullName",
      sortable: true,
      cell: (row) => row.userId.fullName,
    },
    {
      name: "Parent Email",
      selector: "email",
      minWidth: "200px",
      sortable: true,
      cell: (row) => row.userId.email,
    },
    {
      name: "Parent Phone",
      selector: "phone",
      sortable: true,
      cell: (row) => row.userId.phone,
    },
    {
      name: "Grade",
      selector: "grade",
      sortable: true,
      cell: (row) => row.userId.grade,
    },
    {
      name: "Assessment Name",
      selector: "title",
      sortable: true,
      cell: (row) => row.assessment.title,
    },
    {
      name: "Marks",
      selector: "calculatedMarks",
      sortable: true,
      cell: (row) => `${row.calculatedMarks} %`,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex">
          <div onClick={() => handleViewReportClick(row)}>
            <Eye size={14} className="ml-4" />
          </div>
        </div>
      ),
    },
  ];

  const toggleModal = (row) => {
    if (modal) setSelectedReport({});

    setModal(!modal);
  };

  return (
    <div>
      <div className="d-flex justify-between justify-content-between pb-2">
        <h3>Students</h3>
        <Button onClick={exportToExcel}>Export to Excel</Button>
      </div>
      <Card>
        <DataTable
          noHeader
          columns={columns}
          data={reportList}
          className="react-dataTable"
          customStyles={{
            headCells: {
              style: tableHeadStyle,
            },
          }}
        />
      </Card>
      <ReportModal
        selectedReport={selectedReport}
        isOpen={modal}
        toggle={toggleModal}
      />
    </div>
  );
};

export default Reports;
