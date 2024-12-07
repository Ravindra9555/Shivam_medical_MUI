import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
} from "@mui/material";

const Appointment = () => {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD")); // Default to today's date
  const [data, setData] = useState([]);
  const [dateState, setDateState] = useState(true);
  const navigate = useNavigate();

  // Fetch appointments whenever the date changes
  useEffect(() => {
    fetchAppointments();
  }, [date]);

  const fetchAppointments = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASEURL}/v1/api/appointment/getAllAppointmentsByDate`,
        { date },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
          },
        }
      );
      setData(res.data.data);
      setDateState(true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
        timer: 1500,
      });
    }
  };

  const getAllAppointments = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASEURL}/v1/api/appointment/getAllAppointments`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
          },
        }
      );
      setData(res.data.data);
      setDateState(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
        timer: 1500,
      });
    }
  };

  const handleAction = async (appointmentId, action, successMessage) => {
    const endpoints = {
      delete: "/v1/api/appointment/deleteAppointment",
      cancel: "/v1/api/appointment/rejectAppointment",
      reschedule: "/v1/api/appointment/changeAppointmentStatusactive",
      complete: "/v1/api/appointment/changeAppointmentStatusComplete",
    };
    try {
      await axios.post(
        `${process.env.REACT_APP_BASEURL}${endpoints[action]}`,
        { id: appointmentId },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: successMessage,
        timer: 1500,
      }).then(getAllAppointments());
      // fetchAppointments();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
        timer: 1500,
      });
    }
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <TextField
          size="small"
          type="date"
          label="Select Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <Typography variant="h6" align="center">
          {dateState ? `Appointments for ${dayjs(date).format("DD/MM/YYYY")}` : "All Appointments"}
        </Typography>
        <Box display="flex" gap={2}>
          <Button variant="contained" onClick={getAllAppointments}>
            All Appointments
          </Button>
          <Button variant="contained" onClick={() => navigate("/admin/bookappointmentbyadmin")}>
            Book New Appointment
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date/Time</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Doctor Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id}>
                <TableCell>
                  {dayjs(row.date).format("DD/MM/YYYY")} -{" "}
                  {dayjs(row.time).format("h:mm A")}
                </TableCell>
                <TableCell>{row.patientId?.name}</TableCell>
                <TableCell>{row.doctorId?.name}</TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    color={
                      row.status === "pending"
                        ? "warning.main"
                        : row.status === "completed"
                        ? "success.main"
                        : "error.main"
                    }
                  >
                    {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                  </Typography>
                </TableCell>
                <TableCell>{row.comments}</TableCell>
                <TableCell>
                  <Box display="flex" flexDirection="column" gap={1}>
                    {row.status === "pending" && (
                      <>
                        <Button
                          variant="outlined"
                          color="success"
                          size="small"
                          onClick={() => handleAction(row._id, "complete", "Appointment Completed")}
                        >
                          Complete
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleAction(row._id, "cancel", "Appointment Cancelled")}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                    {row.status === "completed" && (
                      <>
                        <Button
                          variant="outlined"
                          color="warning"
                          size="small"
                          onClick={() =>
                            handleAction(row._id, "reschedule", "Appointment Rescheduled")
                          }
                        >
                          Reschedule
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleAction(row._id, "cancel", "Appointment Cancelled")}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleAction(row._id, "delete", "Appointment Deleted")}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Appointment;
