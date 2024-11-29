import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  Stack,
  Pagination,
} from "@mui/material";
import axios from "axios";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalOrders, setTotalOrders] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const[pageSize, setPageSize] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASEURL}/v1/api/order/getallorder`,
          {
            params: { pageNo: page },
          }
        );
        console.log("Orders Data:", response.data.data.orders); // Debugging
        setOrders(response.data.data.orders);
        setFilteredOrders(response.data.data.orders);
        setTotalOrders(response.data.data.totalCount);
        setPageSize(response.data.data.pageSize);
        setCurrentPage(response.data.data.pageNo); // Setting initial page to 0

         // Setting initial page size
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };
    fetchOrders();
  }, [page]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = orders.filter(
      (order) =>
        order._id.toLowerCase().includes(query) ||
        order.address?.fullName.toLowerCase().includes(query) ||
        order.address?.email.toLowerCase().includes(query)
    );
    console.log("Filtered Orders:", filtered); // Debugging
    setFilteredOrders(filtered);
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1); // Adjusting for API pageNo starting from 1
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Orders
      </Typography>
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Search by Order ID, Name, or Email"
        value={searchQuery}
        onChange={handleSearch}
        sx={{ mb: 2 }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Order ID</strong>
              </TableCell>
              <TableCell>
                <strong>Customer Name</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Total Price</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell>
                <strong>Payment Status</strong>
              </TableCell>
              <TableCell>
                <strong>Created At</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.address?.fullName || "N/A"}</TableCell>
                    <TableCell>{order.address?.email || "N/A"}</TableCell>
                    <TableCell>₹{order.totalPrice.toFixed(2)}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.paymentStatus}</TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2}>
     
      <Pagination count={pageSize} page={currentPage} onChange={handleChangePage} color="secondary" variant="outlined" />
    </Stack>

    </Box>
  );
};

export default OrderTable;
