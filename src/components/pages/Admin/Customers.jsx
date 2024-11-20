import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
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
    let url;
    if (!isActive) {
      url = `${process.env.REACT_APP_BASEURL}/v1/api/users/useractive`;
    } else {
      url = `${process.env.REACT_APP_BASEURL}/v1/api/users/userinactive`;
    }
    try {
      const response = await axios.post(
        url,
        {
          id: userId,
        },
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
      fetchUsers(); // Re-fetch the users after update
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
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
            {
              id: userId,
            },
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
              },
            }
          );
          Swal.fire("Deleted!", response.data.message, "success");
          fetchUsers(); // Re-fetch the users after deletion
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response.data.message,
          });
        }
      }
    });
  };

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
      name: "Status",
      selector: (row) =>
        row.isActive ? (
          <span className="badge text-bg-success">Active</span>
        ) : (
          <span className="badge text-bg-danger">Inactive</span>
        ),
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <button
            onClick={() => handleToggleActive(row._id, row.isActive)}
            className={`btn ${
              row.isActive ? "btn-outline-warning" : "btn-outline-success"
            } mx-1`}
          >
            {row.isActive ? "Deactivate" : "Activate"}
          </button>
          <button
            onClick={() => handleDeleteUser(row._id)}
            className="btn btn-outline-danger mx-1"
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between bg-white p-2 rouned shadow">

      <h5>User Management</h5>
      <Button type="button"  variant="contained" onClick={()=> navigate("/userregister")}>User Registration</Button>
      </div>
      <DataTable
        columns={columns}
        data={users}
        progressPending={loading}
        pagination
        highlightOnHover
      />
    </div>
  );
};

export default Customers;
