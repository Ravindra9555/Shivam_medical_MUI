
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Box, TextField, Typography, Modal } from "@mui/material";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

const Doctor = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [doctorData, setDoctorData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    profilePic: null,
  });

  const columns = [
    {
      name: "Profile",
      selector: (row) => (
        <img
          src={row.profilePic || "https://via.placeholder.com/100"}
          alt=""
          height={50}
          width={50}
          className="rounded-circle"
        />
      ),
      width: "100px",
    },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Phone", selector: (row) => row.phone, sortable: true },
    { name: "Specialization", selector: (row) => row.specialization, sortable: true },
    {
      name: "Status",
      selector: (row) => (
        <span className={`badge ${row.isActive ? "bg-success" : "bg-danger"}`}>
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <Button
          variant="outlined"
          color={row.isActive ? "warning" : "primary"}
          onClick={() => EnableDisable(row._id)}
        >
          {row.isActive ? "Deactivate" : "Activate"}
        </Button>
      ),
    },
    {
      name: "Delete",
      cell: (row) => (
        <Button
          variant="outlined"
          color="error"
          onClick={() => deleteDoctor(row._id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASEURL}/v1/api/doctorMaster/getAllDoctors`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDoctorData(response.data.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic") {
      setFormData({ ...formData, profilePic: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalData = new FormData();
    finalData.append("name", formData.name);
    finalData.append("email", formData.email);
    finalData.append("phone", formData.phone);
    finalData.append("specialization", formData.specialization);
    finalData.append("profilePic", formData.profilePic);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASEURL}/v1/api/doctorMaster/addDoctor`,
        finalData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 201) {
        handleClose();
        Swal.fire("Success", res.data.message, "success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          specialization: "",
          profilePic: null,
        });
        await fetchDoctors();
      }
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Error submitting form", "error");
    }
  };

 
  const EnableDisable = async (doctorId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/v1/api/doctorMaster/makeDoctorActive`,
        {id: doctorId},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      if (response.data.statusCode == 200 && response.data.success==true) {

        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        await fetchDoctors();
      }
    } catch (error) {
      console.error("Error enabling/")
    }
  }
  const deleteDoctor = async (doctorId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/v1/api/doctorMaster/deleteDoctor`,
        {id: doctorId},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      if (response.data.statusCode == 200 && response.data.success==true) {

        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        await fetchDoctors();
      }
    } catch (error) {
      console.error("Error enabling/")
    }
  }
  return (
    <Box>
      <Button variant="contained" onClick={handleOpen}>
        Doctor Registration
      </Button>
      <DataTable
        columns={columns}
        data={doctorData}
        pagination
        highlightOnHover
        title="Doctors"
        noDataComponent="No Doctor Found"
      />
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            Doctor Registration
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              margin="normal"
              required
            />
            <Button
              variant="contained"
              component="label"
              sx={{ mt: 2 }}
            >
              Upload Profile Pic
              <input
                type="file"
                name="profilePic"
                onChange={handleChange}
                hidden
              />
            </Button>
            {formData.profilePic && (
              <Box mt={2}>
                <img
                  src={URL.createObjectURL(formData.profilePic)}
                  alt="Profile Preview"
                  height={100}
                  width={100}
                />
              </Box>
            )}
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3 }}
              fullWidth
            >
              Register
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default Doctor;
