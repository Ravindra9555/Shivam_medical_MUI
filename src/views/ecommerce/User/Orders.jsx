
import { LocationCityOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useUser } from "../../../context/UserContext";
import dayjs from "dayjs";

// Orders page to display all the orders
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    getAllOrders();
  }, []);

  // Get all orders
  const getAllOrders = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/v1/api/order/getorderbyid`,
        { userId: user.id }
      );
      setOrders(response.data.data);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Failed to fetch orders",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  const dummyData = [
    {
      id: 1,
      orderNo: "1234567890",
      customerName: "John Doe",
      totalAmount: 1000,
      status: "In-transit",
      date: "2023-01-01",
      img: "https://via.placeholder.com/100",
      products: [
        {
          id: 1,
          productId: 1,
          productName: "Product 1",
          quantity: 2,
          price: 500,
          total: 1000,
        },
        {
          id: 2,
          productId: 2,
          productName: "Product 2",
          quantity: 3,
          price: 700,
          total: 2100,
        },
        {
          id: 3,
          productId: 3,
          productName: "Product 3",
          quantity: 1,
          price: 1000,
          total: 1000,
        },
      ],
    },
    {
      id: 2,
      orderNo: "1234567890",
      customerName: "John Doe",
      totalAmount: 1000,
      status: "In-transit",
      date: "2023-01-01",
      img: "https://via.placeholder.com/100",
      products: [
        {
          id: 1,
          productId: 1,
          productName: "Product 1",
          quantity: 2,
          price: 500,
          total: 1000,
        },
        {
          id: 2,
          productId: 2,
          productName: "Product 2",
          quantity: 3,
          price: 700,
          total: 2100,
        },
      ],
    },
  ];

  return (
    <Container>
      <Box sx={{ borderRadius: 2, boxShadow: 2, mt: 2, p: 3 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h4">My Orders</Typography>
          <Typography variant="body1">
            Track all Your Orders: In-transit, Shipped & Delivered
          </Typography>
        </Box>
        <Divider sx={{ bgcolor: "purple", mb: 2 }} />

        {/* Order Cards */}
        <Grid container spacing={2}>
          {orders.map((order) => (
            <Grid item xs={12} key={order._id} mb={1}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 1,
                  bgcolor: "grey.100",
                }}
              >
                {/* Order Header */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      p: 1,
                      px: 2,
                      borderRadius: 3,
                      bgcolor: "warning.light",
                    }}
                  >
                    <Typography variant="h6">Order No: {order._id}</Typography>
                  </Box>
                  <Box
                    sx={{ p: 1, px: 2, borderRadius: 3, bgcolor: "grey.50" }}
                  >
                    <Typography variant="h6">
                      {" "}
                      Order Placed Date:{" "}
                      {dayjs(order.createdAt).format("DD-MMM-YYYY")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      p: 1,
                      px: 2,
                      borderRadius: 3,
                      bgcolor: "grey.50",
                    }}
                  >
                    <Typography variant="h6" sx={{ color: "red" }} >
                      Total Price :{order.totalPrice}
                    </Typography>
                   
                  </Box>
                  <Box
                    sx={{
                      p: 1,
                      px: 2,
                      borderRadius: 3,
                      bgcolor: "secondary.light",
                    }}
                  >
                     <Typography variant="h6">
                      Payment Status : {order.paymentStatus}
                    </Typography>
                  </Box>
                  <Box
                  // sx={{
                  //   p: 1,
                  //   px: 2,
                  //   borderRadius: 3,
                  //   bgcolor: "warning.light",
                  // }}
                  >
                    <Button variant="contained" color="warning">
                      <LocationCityOutlined />
                      Track
                    </Button>
                  </Box>
                </Box>
                <Divider sx={{ mb: 2 }} />

                {/* Product Details */}
                {order.products.map((product) => (
                  <Grid
                    container
                    key={product.productId}
                    spacing={2}
                    mt={2}
                    p={1}
                    sx={{ bgcolor: "white", borderRadius: 2 }}
                  >
                    <Grid
                      item
                      xs={12}
                      md={4}
                      sx={{ display: "flex" }}
                      spacing={2}
                    >
                      <Box
                        component="img"
                        src={product.image || "https://via.placeholder.com/100"}
                        alt={product.name}
                        sx={{
                          width: "100px",
                          height: "120px",
                          borderRadius: 1,
                        }}
                      />
                      <Box ml={2} display={"flex"} alignItems={"center"}>
                        <Box>
                          <Typography variant="h6">
                            Product: {product.name} ({product.type})
                          </Typography>
                          <Typography>Quantity: {product.quantity}</Typography>
                          <Typography>MRP Rs: {product.mrp} , Discount : {product.discount}% </Typography>
                          <Typography>Price: {product.price}</Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={8}
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Box display={"flex"} alignItems={"center"}>
                        <Box>
                          <Typography variant="body2">Status</Typography>
                          <Typography sx={{ color: "red" }} fontWeight={500}>
                            {order.status}
                          </Typography>
                        </Box>
                      </Box>
                      <Box display={"flex"} alignItems={"center"}>
                        <Box>
                          <Typography variant="body2">
                            Expected Dilivery Date
                          </Typography>
                          <Typography sx={{ color: "green" }}>
                            {dayjs(order.createdAt).format("DD-MMM-YYYY")}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Orders;
