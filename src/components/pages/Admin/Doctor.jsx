import axios from "axios";
import React, { useEffect, useState } from "react";
import {Button} from "@mui/material";
import Modal from "react-bootstrap/Modal";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

const Doctor = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [doctorData, setDoctorData] = useState([]);

  const columns = [
    {
      name: "Profile",
        selector: (row) =>(<>
          <img src={row.profilePic ||"https://via.placeholder.com/100"} alt="" height={50} width={50} className="rounded-circle m-1" />
        </>),
      width:"100px"
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
      width:"150px"
    },
    {
      name: "Specialization",
      selector: (row) => row.specialization,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (<span className={`badge ${row.isActive ? `bg-success` :"bg-danger" }`}>{row.isActive ?'Active':"Inactive"}</span>),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
        
          { row.isActive ?<Button variant="outline-warning" onClick={() => EnableDisable(row._id)}>
            Deactivate
          </Button>: <Button variant="outline-primary" onClick={() => EnableDisable(row._id)}>
            Active
          </Button> }

      
        </div>
      ),
      
    },
    {
      name: "Delete",
      cell: (row) => (
        <Button variant="outline-danger" onClick={() => deleteDoctor(row._id)}>
          Delete
        </Button>
      ),
      sortable: false,
    }
  ];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    profilePic: null,
  });

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
    // Check if the file input is being changed
    if (name === "profilePic") {
      setFormData({ ...formData, profilePic: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from submitting the default way

    // Prepare form data for submission
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
            "Content-Type": "multipart/form-data", // Set content type for form data
          },
        }
      );
      if (res.status === 201) {
        setShow(false); // Close modal on success

        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
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
      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Error submitting form",
        timer: 1500,
      });
      console.error(error);
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
    <div>
      {/* Modal for doctor registration */}
      <Modal
        show={show}
        size="xl"
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Doctor Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Name field */}
              <div className="mb-3 col-md-4">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Email field */}
              <div className="mb-3 col-md-4">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Phone field */}
              <div className="mb-3 col-md-4">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Specialization field */}
              <div className="mb-3 col-md-4">
                <label htmlFor="specialization">Specialization</label>
                <input
                  type="text"
                  className="form-control"
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Profile Pic upload field */}
              <div className="col-md-4">
                <label htmlFor="profilePic" className="form-label">
                  Profile Pic
                </label>
                <input
                  type="file"
                  id="profilePic"
                  name="profilePic"
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Profile Pic preview */}
              <div className="col-md-4">
                {formData.profilePic && (
                  <img
                    src={URL.createObjectURL(formData.profilePic)}
                    alt="Profile Preview"
                    height={100}
                    width={100}
                    className="rounded"
                  />
                )}
              </div>
            </div>
            <div className="mt-2">
              <Button variant="primary" type="submit">
                Register
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <div className="mt-2 ">
        <Button variant="contained" onClick={handleShow}>
          Doctor Registration
        </Button>
        <div className="mt-2">
          <DataTable
            columns={columns}
            data={doctorData}
            pagination
            highlightOnHover
            title="Doctors"
            noDataComponent="No Doctor Found"
            noRecordsFoundText="No Doctor Found"
            responsive
            striped
            hover
          />
        </div>
      </div>
    </div>
  );
};

export default Doctor;
