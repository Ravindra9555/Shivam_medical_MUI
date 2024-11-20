import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { useAdmin } from "../../../context/AdminContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";

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
        `${import.meta.env.VITE_BASEURL}/v1/api/admin/all`,
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
            <button
              className="btn btn-sm btn-outline-danger "
              onClick={() => deactive(row._id, row.isActive)}
            >
              {row.isActive ? (
                <span className="text-danger">Inactivate</span>
              ) : (
                <span className="text-success">Activate</span>
              )}
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => deleteAdmin(row._id)}
            >
              Delete
            </button>
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
            `${import.meta.env.VITE_BASEURL}/v1/api/admin/delete`,
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
        ? `${import.meta.env.VITE_BASEURL}/v1/api/admin/makeinactive`
        : `${import.meta.env.VITE_BASEURL}/v1/api/admin/makeactive`;

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
        `${import.meta.env.VITE_BASEURL}/v1/api/admin/register`,
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
        <div className="d-flex justify-content-end">
          <Button variant="primary" className="ms-auto" onClick={handleShow}>
            Register New Admin
          </Button>
        </div>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Admin Registration </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formProfilePic">
                <Form.Label>Profile Pic</Form.Label>
                <Form.Control
                  type="file"
                  name="profilePic"
                  onChange={handleChange}
                />
              </Form.Group>

              <div className="selectedFile">
                {formData.profilePic && (
                  <img
                    src={URL.createObjectURL(formData.profilePic)}
                    alt={formData.profilePic.name}
                    className="rounded"
               
                    width="100"
                    height="100"
                  />
                )}
              </div>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-2">
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <DataTable
        title="Admins of Shivam Medical "
        columns={columns}
        data={admins}
        pagination
      />
    </div>
  );
};

export default AllAdmins;
