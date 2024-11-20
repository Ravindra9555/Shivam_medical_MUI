import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { useAdmin } from "../../../context/AdminContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";

const ContactUs = () => {
  const { admin } = useAdmin();
  const [contact, setContact] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchConatct();
  }, []);
  const fetchConatct = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASEURL}/v1/api/contact/all`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
          },
        }
      );
      if (response.status == 200 && response.data.statusCode == 200) {
        setContact(response.data.data);
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
      selector: (row) => row.firstName + " " + row.lastName,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone No ",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Message ",
      selector: (row) => (
        <div className="text-wrap text-break">{row.message}</div>
      ),
    },
    {
      name: "Contact Date",
      selector: (row) => <>{dayjs(row.created).format("DD.MM.YYYY")}</>,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => {
        if (row.status === "pending") {
          return <span className="badge text-bg-warning">Pending</span>;
        } else if (row.status === "resolved") {
          return <span className="badge text-bg-success">Resolved</span>;
        } else {
          return <span className="badge text-bg-danger">Rejected</span>;
        }
      },
      sortable: true,
    },
    {
      name: "Take Action",
      cell: (row) => (
        <div className="d-flex gap-2 " >
          {row.status === "pending" ? (
            <>
              <button
                className="btn btn-sm btn-success"
                onClick={() => solveQuery(row._id, "resolve")}
              >
                Resolve
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => solveQuery(row._id, "reject")}
              >
                Reject
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-sm btn-outline-warning"
                onClick={() => solveQuery(row._id, "pending")}
              >
                Pendin
              </button>
              <button
                className="btn btn-sm btn-success"
                onClick={() => solveQuery(row._id, "resolve")}
              >
                Resolve
              </button>
             
            </>
          )}
          
        </div>
      ),
    },
  ];


  const solveQuery = async (id, status) => {

    try {
      let url;
      if(status ==="pending"){
        url = `${import.meta.env.VITE_BASEURL}/v1/api/contact/pending`
      }
      else if(status ==="resolve"){
        url = `${import.meta.env.VITE_BASEURL}/v1/api/contact/resolve`
      }
      else {
        url = `${import.meta.env.VITE_BASEURL}/v1/api/contact/reject`
      }
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
          timer: 1500,
          text: res.data.message,
          showConfirmButton:false,
        });
        await fetchConatct(); // Ensure fetchAdmins is awaited to get the latest data
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        timer: 1500,
        showConfirmButton:false,
        text: error.response?.data?.message,
      });
    }
  };

  return (
    <div>
      <DataTable
        title="Contact us Of Shivam Medical "
        columns={columns}
        data={contact}
        pagination
      />
    </div>
  );
};
export default ContactUs;
