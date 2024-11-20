import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { useAdmin } from "../../../context/AdminContext";
// import {Button }from "@mui/material";
// import Modal from "react-bootstrap/Modal";
// import { Form } from "react-bootstrap";
import {
  Button,
  Modal,
  Box,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AllAdmins = () => {
  const { admin } = useAdmin();
  const [admins, setAdmins] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchAdmins();
  }, []);
  const fetchAdmins = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASEURL}/v1/api/admin/all`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
          },
        }
      );
      if (response.status == 200 && response.data.statusCode == 200) {
        setAdmins(response.data.data);
      }
    } catch (error) {
      console.log(error); // Handle error here. For example, display an error message to the user.  //  }
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
      });
    }
  };
  const columns = [
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
      name: "Profile Photo",
      selector: (row) => (
        <>
          <img
            className="p-1 rounded-circle"
            src={row.profilePic || "https://via.placeholder.com/100"}
            alt=""
            width="80"
            height={80}
          />
        </>
      ),
      sortable: true,
    },
    {
      name: "Created Date",
      selector: (row) => <>{dayjs(row.created).format("DD.MM.YYYY")}</>,
      sortable: true,
    },
    {
      name: "Is Active",
      selector: (row) => (
        <>
          {row.isActive ? (
            <span class="badge text-bg-success">Active</span>
          ) : (
            <span class="badge text-bg-danger">Disabled</span>
          )}
        </>
      ),
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <div className="d-flex gap-2">
            <Button
              // className="btn btn-sm btn-outline-danger "
              
              variant="contained"
              color="warning"
              onClick={() => deactive(row._id, row.isActive)}
            >
              {row.isActive ? (
                <span color="red" >Inactivate</span>
              ) : (
                <span color="green" >Activate</span>
              )}
            </Button>
            <Button
              // className="btn btn-sm btn-danger"
              variant="contained"
              color="error"
              onClick={() => deleteAdmin(row._id)}
            >
              Delete
            </Button>
          </div>
        </>
      ),
    },
  ];

  const deleteAdmin = async (id) => {
    if (id === admin.id) {
      Swal.fire({
        title: "Cannot deactivate or delete yourself",
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "Okay",
      });
      return;
    }

    // Confirm that the user really wants to delete
    Swal.fire({
      title: "Are you sure you want to delete this admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      // Make sure to mark this as async
      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BASEURL}/v1/api/admin/delete`,
            { id: id },
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
              },
            }
          );
          if (response.status == 200 && response.data.statusCode == 200) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: response.data.message,
            });
            await fetchAdmins(); // Ensure fetchAdmins is awaited to get the latest data
          }
        } catch (error) {
          console.log(error); // Handle error here
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response?.data?.message || "An error occurred",
          });
        }
      }
    });
  };

  const deactive = async (id, active) => {
    if (id === admin.id) {
      Swal.fire({
        title: "Cannot deactivate or delete yourself",
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "Okay",
      });
      return;
    }
    try {
      let url = active
        ? `${process.env.REACT_APP_BASEURL}/v1/api/admin/makeinactive`
        : `${process.env.REACT_APP_BASEURL}/v1/api/admin/makeactive`;

      const res = await axios.post(
        url,
        { id: id },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
          },
        }
      );

      if (res.status == 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.data.message,
        });
        await fetchAdmins(); // Ensure fetchAdmins is awaited to get the latest data
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message,
      });
    }
  };

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    role: "admin",
    password: "",
    profilePic: null,
  });

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

    // Prepare form data for submission
    const submissionData = new FormData();
    submissionData.append("email", formData.email);
    submissionData.append("name", formData.name);
    submissionData.append("role", formData.role);
    submissionData.append("password", formData.password);
    if (formData.profilePic) {
      submissionData.append("profilePic", formData.profilePic);
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/v1/api/admin/register`,
        submissionData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
          },
        }
      );
      if (response.status === 200 && response.data.statusCode === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.message,
        });
        await fetchAdmins(); // Ensure fetchAdmins is awaited to get the latest data
      }
      handleClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "An error occurred",
      });
    }
  };

  return (
    <div>
      <>
        <div className="d-flex justify-content-end m-2">
          <Button variant="contained" className="ms-auto" onClick={handleShow}>
            Register New Admin
          </Button>
        </div>
        <Modal
          open={show}
          onClose={handleClose}
          aria-labelledby="admin-registration-title"
          aria-describedby="admin-registration-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              width: 500,
              borderRadius: 2,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography id="admin-registration-title" variant="h6">
                Admin Registration
              </Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <form onSubmit={handleSubmit}>
              <Box mb={2}>
                <TextField
                  fullWidth
                  size="small"
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Box>
              <Box mb={2}>
                <TextField
                  fullWidth
                  size="small"
                  label="Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Box>
              <Box mb={2}>
                <TextField
                  fullWidth
                  size="small"
                  type="file"
                  name="profilePic"
                  inputProps={{ accept: "image/*" }}
                  onChange={handleChange}
                />
              </Box>
              <Box mb={2}>
                {formData.profilePic && (
                  <img
                    src={URL.createObjectURL(formData.profilePic)}
                    alt={formData.profilePic.name}
                    className="rounded"
                    width="100"
                    height="100"
                  />
                )}
              </Box>
              <Box mb={2}>
                <TextField
                  fullWidth
                  size="small"
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Box>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
            </form>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleClose}
            >
              Close
            </Button>
          </Box>
        </Modal>
      </>
      <div className="p-4 rounded-4 shadow-sm border">
        <DataTable
          title="Admins of Shivam Medical "
          columns={columns}
          data={admins}
          pagination
        />
      </div>
    </div>
  );
};

export default AllAdmins;
