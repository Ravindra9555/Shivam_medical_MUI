
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Button, Box, Avatar, Chip } from "@mui/material";

const Customers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASEURL}/v1/api/users/alluser`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
          },
        }
      );
      setUsers(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const handleToggleActive = async (userId, isActive) => {
    let url = isActive
      ? `${process.env.REACT_APP_BASEURL}/v1/api/users/userinactive`
      : `${process.env.REACT_APP_BASEURL}/v1/api/users/useractive`;

    try {
      const response = await axios.post(
        url,
        { id: userId },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      fetchUsers(); // Refresh users
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  const handleDeleteUser = async (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BASEURL}/v1/api/users/deleteUser`,
            { id: userId },
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
              },
            }
          );
          Swal.fire("Deleted!", response.data.message, "success");
          fetchUsers(); // Refresh users
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response?.data?.message || "Something went wrong",
          });
        }
      }
    });
  };

  const columns = [
    {
      field: "profilePic",
      headerName: "Profile",
      renderCell: (params) => (
        <Avatar
          alt={params.row.name}
          src={params.value || "https://via.placeholder.com/100"}
          sx={{ width: 50, height: 50 }}
        />
      ),
      width: 100,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "isActive",
      headerName: "Status",
      renderCell: (params) =>
        params.value ? (
          <Chip label="Active" color="success" variant="outlined" />
        ) : (
          <Chip label="Inactive" color="error" variant="outlined" />
        ),
      width: 150,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      valueGetter: (params) => new Date(params.value).toLocaleDateString(),
      width: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            color={params.row.isActive ? "warning" : "success"}
            size="small"
            onClick={() => handleToggleActive(params.row._id, params.row.isActive)}
            sx={{ mr: 1 }}
          >
            {params.row.isActive ? "Deactivate" : "Activate"}
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDeleteUser(params.row._id)}
          >
            Delete
          </Button>
        </>
      ),
      width: 300,
      sortable: false,
    },
  ];

  return (
    <Box p={3} boxShadow={3} borderRadius={2} bgcolor={"white"}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        sx={{ background: "#fff", p: 2, borderRadius: 1, boxShadow: 1 }}
      >
        <h5>User Management</h5>
        <Button variant="contained" onClick={() => navigate("/admin/userregister")}>
          User Registration
        </Button>
      </Box>
      <DataGrid
        rows={users}
        columns={columns}
        loading={loading}
        getRowId={(row) => row._id}
        autoHeight
        pagination
        pageSizeOptions={[5, 10, 20]}
        sx={{ background: "#fff" }}
      />
    </Box>
  );
};

export default Customers;
