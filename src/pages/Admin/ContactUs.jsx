
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAdmin } from "../../context/AdminContext";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography, Box, Chip } from "@mui/material";

const ContactUs = () => {
  const { admin } = useAdmin();
  const [contact, setContact] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASEURL}/v1/api/contact/all`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
          },
        }
      );
      if (response.status === 200 && response.data.statusCode === 200) {
        setContact(response.data.data);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to fetch data.",
      });
    } finally {
      setLoading(false);
    }
  };

  const solveQuery = async (id, status) => {
    try {
      const url =
        status === "pending"
          ? `${process.env.REACT_APP_BASEURL}/v1/api/contact/pending`
          : status === "resolve"
          ? `${process.env.REACT_APP_BASEURL}/v1/api/contact/resolve`
          : `${process.env.REACT_APP_BASEURL}/v1/api/contact/reject`;

      const res = await axios.post(
        url,
        { id },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
          },
        }
      );

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.data.message,
          timer: 1500,
          showConfirmButton: false,
        });
        fetchContact();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to update status.",
        timer: 1500,
      });
    }
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      valueGetter: (params, row) =>
        `${row.firstName || ""} ${row.lastName || ""}`,
      flex: 1,
      sortable: true,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      sortable: true,
    },
    {
      field: "phone",
      headerName: "Phone No",
      flex: 0.8,
      sortable: true,
    },
    {
      field: "message",
      headerName: "Message",
      flex: 2,
      renderCell: (params) => (
        <Typography variant="body2" noWrap>
          {params.row.message}
        </Typography>
      ),
    },
    {
      field: "created",
      headerName: "Contact Date",
      flex: 0.8,
      sortable: true,
      renderCell: (params) => dayjs(params.row.created).format("DD.MM.YYYY"),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.8,
      renderCell: (params) => {
        const statusColor =
          params.row.status === "pending"
            ? "warning"
            : params.row.status === "resolved"
            ? "success"
            : "error";
        return <Chip label={params.row.status} color={statusColor} />;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const { row } = params;
        return (
          <Box display="flex" gap={1}>
            {row.status === "pending" ? (
              <>
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={() => solveQuery(row._id, "resolve")}
                >
                  Resolve
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => solveQuery(row._id, "reject")}
                >
                  Reject
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="small"
                  variant="outlined"
                  color="warning"
                  onClick={() => solveQuery(row._id, "pending")}
                >
                  Pending
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={() => solveQuery(row._id, "resolve")}
                >
                  Resolve
                </Button>
              </>
            )}
          </Box>
        );
      },
    },
  ];

  return (
    <Box p={4} boxShadow={3} borderRadius={2} bgcolor="white">
      <Typography variant="h5" gutterBottom>
        Contact Us of Shivam Medical
      </Typography>
      <DataGrid
        rows={contact}
        columns={columns}
        autoHeight
        disableSelectionOnClick
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        loading={loading}
        getRowId={(row) => row._id}
      />
    </Box>
  );
};

export default ContactUs;
