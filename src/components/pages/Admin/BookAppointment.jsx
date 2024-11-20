

import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
// import {
//   LocalizationProvider,
//   DatePicker,
//   TimePicker,
// } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useUser } from "../../../context/UserContext";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const BookAppointment = () => {
  const { user } = useUser();
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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
        `${
          process.env.REACT_APP_BASEURL
        }/v1/api/doctorMaster/getAllDoctorsActive`,
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
  // Search for patients
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      // Search only if the query is longer than 2 characters
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BASEURL}/v1/api/users/searchuser`,
          {
            keyword: query,
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
            },
          }
        );
        if (res.status === 200) {
          setPatients(res.data.data); // Assuming the API returns an array of patients
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setPatients([]); // Reset patients if query is too short
    }
  };

  const handlePatientSelect = (patient) => {
    setAppointmentData({ ...appointmentData, patientId: patient._id });
    setSearchQuery(`${patient.name} - ${patient.email}`); // Update the input to show the selected patient
    setPatients([]); // Clear the suggestions
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
        `${process.env.REACT_APP_BASEURL}/v1/api/appointment/addAppointment`,
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
    // <LocalizationProvider dateAdapter={AdapterDayjs}>
    <>
      <div className="container mt-1">
        <h5>Book Appointment</h5>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="row">
            <div className="col-md-6 mb-3">
              <TextField
                fullWidth
                label="Search Patient"
                value={searchQuery}
                onChange={handleSearchChange}
                variant="outlined"
              />
              {patients.length > 0 && (
                <div className="suggestions">
                  {patients.map((patient) => (
                    <div
                      key={patient._id}
                      className="suggestion-item "
                      onClick={() => handlePatientSelect(patient)}
                      style={{
                        padding: "8px",
                        cursor: "pointer",
                        border: "1px solid #ccc",
                        marginTop: "4px",
                        borderRadius: "4px",
                      }}
                    >
                      {patient.name} - {patient.email}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="col-md-6"></div>
            <div className="mb-3 col-md-4">
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
                      {doctor.name + " / " + doctor.specialization}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="mb-3 col-md-4">
              <TextField
              fullWidth

              type="date"
                label="Select Date"
                minDate={dayjs()}
                format="DD/MM/YY"
                value={appointmentData.date}
                onChange={handleDateChange}
              />
            </div>
            <div className="mb-3 col-md-4">
              {/* <TimePicker
              fullWidth
                label="Select Time"
                value={appointmentData.time}
                onChange={handleTimeChange}
              /> */}
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
      <style jsx>{`
        .suggestions {
          position: absolute;
          z-index: 2;
          background: #96c2be;

          max-width: 50%; /* Set to 100% to match the search box */
          min-width: 40%;
          border: 1px solid #ccc;
          border-radius: 4px;
          max-height: 200px;
          overflow-y: auto;
          margin-top: 1px; /* Optional: Add a small margin for spacing */
        }
        .suggestion-item {
          padding: 8px; /* Add padding for better clickability */
          cursor: pointer; /* Change cursor to pointer on hover */
        }
        .suggestion-item:hover {
          background: #f0f0f0; /* Keep hover effect for better UX */
        }
      `}</style>
    {/* </LocalizationProvider> */}
    </>
  );
};

export default BookAppointment;
