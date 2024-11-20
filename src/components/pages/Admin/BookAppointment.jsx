
import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Autocomplete,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import dayjs from "dayjs";
import axios from "axios";
import Swal from "sweetalert2";
import { useUser } from "../../../context/UserContext";

const BookAppointment = () => {
  const { user } = useUser();
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    doctorId: "",
    patientId: user.id,
    date: dayjs().format("YYYY-MM-DD"),
    time: "",
    comments: "",
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASEURL}/v1/api/doctorMaster/getAllDoctorsActive`,
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

  const fetchPatients = async (query) => {
    setLoadingPatients(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASEURL}/v1/api/users/searchuser`,
        { keyword: query },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        }
      );
      if (res.status === 200) {
        setPatients(res.data.data || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPatients(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData({ ...appointmentData, [name]: value });
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
          timer: 1500,
        });
        setAppointmentData({
          doctorId: "",
          patientId: user.id,
          date: dayjs().format("YYYY-MM-DD"),
          time: "",
          comments: "",
        });
      }
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
    <div className="container mt-3 border p-4 rounded-4 shadow-sm">
      <h5>Book Appointment</h5>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="row">
          {/* Patient Search */}
          <div className="col-md-6 mb-3">
            <Autocomplete
              options={patients}
              getOptionLabel={(option) => `${option.name} - ${option.email}`}
              loading={loadingPatients}
              onInputChange={(event, newInputValue) => {
                if (newInputValue.length > 2) {
                  fetchPatients(newInputValue);
                }
              }}
              onChange={(event, value) => {
                if (value) {
                  setAppointmentData({
                    ...appointmentData,
                    patientId: value._id,
                  });
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Patient"
                  variant="outlined"
                  size="small"
                />
              )}
            />
          </div>

          {/* Doctor Selection */}
          <div className="col-md-6 mb-3">
            <FormControl fullWidth size="small">
              <InputLabel id="doctor-select-label">Select Doctor</InputLabel>
              <Select
                labelId="doctor-select-label"
                name="doctorId"
                value={appointmentData.doctorId}
                onChange={handleChange}
                required
              >
                <MenuItem value="">
                  <em>Please select a doctor</em>
                </MenuItem>
                {doctors.map((doctor) => (
                  <MenuItem key={doctor._id} value={doctor._id}>
                    {doctor.name} / {doctor.specialization}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          {/* Date Selection */}
          <div className="col-md-6 mb-3">
            <TextField
              fullWidth
              type="date"
              label="Select Date"
              name="date"
              value={appointmentData.date}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              size="small"
            />
          </div>

          {/* Time Selection */}
          <div className="col-md-6 mb-3">
            <TextField
              fullWidth
              type="time"
              label="Select Time"
              name="time"
              value={appointmentData.time}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              size="small"
            />
          </div>

          {/* Comments */}
          <div className="col-md-12 mb-3">
            <TextField
              fullWidth
              label="Comments"
              variant="outlined"
              name="comments"
              value={appointmentData.comments}
              onChange={handleChange}
              multiline
              rows={2}
              size="small"
            />
          </div>
        </div>

        <Button variant="contained" color="primary" type="submit">
          Book Appointment
        </Button>
      </form>
    </div>
  );
};

export default BookAppointment;
