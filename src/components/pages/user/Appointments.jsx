import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { useUser } from "../../../context/UserContext";

// This component displays all appointments for the logged-in user
const Appointments = () => {
  const [date, setDate] = useState(dayjs()); // Initialize as a dayjs object
  const [data, setData] = useState([]);
  const { user } = useUser();

  const columns = [
    {
      name: "Date/ Time",
      selector: (row) =>
        dayjs(row.date).format("DD/MM/YYYY") + " - " + row.time,
      sortable: true,
    },
    {
      name: "Patient Name",
      selector: (row) => row.patientId?.name,
      sortable: true,
    },
    {
      name: "Doctor Name",
      selector: (row) => row.doctorId?.name,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => {
        if (row.status == "pending") {
          return <span className="badge bg-warning text-white">Pending</span>;
        } else if (row.status == "completed") {
          return <span className="badge bg-success text-white">Completed</span>;
        } else {
          return <span className="badge bg-danger text-white">Cancelled</span>;
        }
      },
      sortable: true,
    },
    {
      name: "Message",
      selector: (row) => row.comments,
      sortable: true,
    },
    {
      name: "Action",
      width: "200px",
      cell: (row) => (
        <div>
          {row.status === "pending" && (
            <>
              <button
                className="btn btn-sm btn-outline-warning"
                onClick={() => RescheduleAppointment(row._id)}
              >
                Re-schedule
              </button>
              <button
                className="btn btn-sm btn-outline-danger ms-2"
                onClick={() => cancelAppointment(row._id)}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      ),
      sortable: false,
    },
    {
      name: "Delete",
      selector: (row) => (
        <button
          className="btn btn-sm btn-danger ms-2"
          onClick={() => deleteAppointment(row._id)} // Attach delete function
        >
          Delete
        </button>
      ),
      sortable: false,
    },
  ];

  useEffect(() => {
    getAllAppointments(); // Fetch all appointments initially
  }, []);

  const getAllAppointments = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASEURL}/v1/api/appointment/getAllAppointmentsById`,
        {
          id: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        }
      );
      setData(res.data.data.reverse());
    } catch (error) {
      console.log("Error fetching all appointments:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
        timer: 1500,
      });
    }
  };
  const cancelAppointment = async (appointmentId) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASEURL}/v1/api/appointment/rejectAppointment`,
        {
          id: appointmentId,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
          },
        }
      );
      Swal.fire({
        icon: "success",

        text: res.data.message || " Something went wrong",
        timer: 1500,
      });
      // Refetch appointments after deletion
      // fetchAppointments();
    } catch (error) {
      console.log("Error deleting appointment:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
        timer: 1500,
      });
    }
  };

  const RescheduleAppointment = async (appointmentId) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASEURL}/v1/api/appointment/changeAppointmentStatusactive`,
        {
          id: appointmentId,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
          },
        }
      );
      Swal.fire({
        icon: "success",

        text: res.data.message || " Something went wrong",
        timer: 1500,
      }).then(getAllAppointments());
      // Refetch appointments after deletion
      // fetchAppointments();
    } catch (error) {
      console.log("Error deleting appointment:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
        timer: 1500,
      });
    }
  };

  // Delete Appointment Function
  const deleteAppointment = async (appointmentId) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASEURL}/v1/api/appointment/deleteAppointment`,
        {
          id: appointmentId,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Appointment has been deleted",
        timer: 1500,
      }).then(getAllAppointments());
      // Refetch appointments after deletion
      // fetchAppointments();
    } catch (error) {
      console.log("Error deleting appointment:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
        timer: 1500,
      });
    }
  };
  return (
    <>
      <div className="pt-1">
        <div className=" rounded-4 shadow-sm  p-4 border">
          <DataTable
            title="Appointments"
            columns={columns}
            data={data} // Use fetched appointment data
            pagination
            highlightOnHover
          />
        </div>
      </div>
    </>
  );
};

export default Appointments;
