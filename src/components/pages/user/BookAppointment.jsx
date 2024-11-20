import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
// import {
//   LocalizationProvider,
//   DatePicker,
//   TimePicker,
// } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // Importing the adapter
import dayjs from "dayjs"; // Import dayjs for date handling
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useUser } from "../../../context/UserContext";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Appointments from "./Appointments";
const BookAppointment = () => {
  const { user } = useUser();

  const [doctors, setDoctors] = useState([]);
  const [appointmentData, setAppointmentData] = useState({
    doctorId: "",
    patientId: user.id,
    date: dayjs(),
    time: dayjs(),
    comments: "",
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/v1/api/doctorMaster/getAllDoctorsActive`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        }
      );
      if (res.status === 200) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData({ ...appointmentData, [name]: value });
  };

  const handleDateChange = (newValue) => {
    setAppointmentData({ ...appointmentData, date: newValue });
  };

  const handleTimeChange = (newValue) => {
    setAppointmentData({ ...appointmentData, time: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASEURL}/v1/api/appointment/addAppointment`,
        appointmentData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        }
      );
      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setAppointmentData({
        doctorId: "",
        patientId: user.id,
        date: dayjs(),
        time: dayjs(),
        comments: "",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
    
    {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
      <div className="container mt-1">
        <h5>Book Appointment</h5>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="row">
            <div className="col-md-4 mb-3">
              <FormControl fullWidth>
                <InputLabel id="doctor-select-label">Select Doctor</InputLabel>
                <Select
                  labelId="doctor-select-label"
                  name="doctorId"
                  value={appointmentData.doctorId}
                  onChange={handleChange}
                  required
                       label="Select Doctor"
                >
                  <MenuItem value="">
                    <em>Please select a doctor</em>
                  </MenuItem>
                  {doctors.map((doctor) => (
                    <MenuItem key={doctor._id} value={doctor._id}>
                      {doctor.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="mb-3 col-md-4">
              <TextField
                label="Select Date"
                type="date"
                minDate={dayjs()}
                format="DD/MM/YY"
                value={appointmentData.date}
                onChange={handleDateChange}
                // renderInput={(params) => (
                //   <TextField {...params} fullWidth required />
                // )}
              />
            </div>
            <div className="mb-3 col-md-4">
              <TextField
              type="time"
                label="Select Time"
                value={appointmentData.time}
                onChange={handleTimeChange}
                // renderInput={(params) => (
                //   <TextField {...params} fullWidth required />
                // )}
              />
            </div>
          </div>
          <div className="mb-3">
            <TextField
              fullWidth
              label="Comments"
              variant="outlined"
              name="comments"
              onChange={handleChange}
              multiline
              rows={2}
            />
          </div>
          <Button variant="contained" color="primary" type="submit">
            Book Appointment
          </Button>
        </form>
      </div>
    {/* </LocalizationProvider> */}
    <hr/>
    <div className="mt-5">

    <Appointments/>
    </div>
    </>
  );
};

export default BookAppointment;
