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
      setOrders(response.data.data.reverse());
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Failed to fetch orders",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };
  const handelpay = async (id) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASEURL}/v1/api/order/setlePayment`,
        { orderId: id }
      );
      const { razorpayOrder, order } = res.data.data;
      const orderId = order._id; // Save order ID for later use

      // Step 2: Open Razorpay Checkout
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEYID, // Razorpay Key ID
        amount: razorpayOrder.amount, // Amount in subunits (e.g., paise)
        currency: razorpayOrder.currency,
        name: "SHIVAM MEDICAL STORE",
        description: "Order Payment",
        image: "https://avatars.githubusercontent.com/u/69795113?v=4", // Your logo
        order_id: razorpayOrder.id, // Razorpay order ID
        handler: async (response) => {
          // Step 3: Verify payment
          try {
            const verifyRes = await axios.post(
              `${process.env.REACT_APP_BASEURL}/v1/api/order/verifyPayment`,
              {
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                orderId: orderId, // Use stored MongoDB order ID
              }
            );

            if (verifyRes.status === 200) {
              Swal.fire({
                icon: "success",
                title: "Payment Successful",
                text: "Your order has been confirmed",
                timer: 1500,
              });
              getAllOrders();
            } else {
              throw new Error("Payment verification failed");
            }
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Payment Failed",
              text: "Failed to confirm payment",
              timer: 1500,
            });
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone,
        },
        notes: {
          address: "Delivery Address",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razor = new window.Razorpay(options);

      razor.on("payment.failed", (response) => {
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: response.error.description,
          timer: 1500,
        });
      });

      razor.open();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Failed to place order",
        timer: 1500,
      });
    }
  };
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
                    <Typography variant="h6" sx={{ color: "red" }}>
                      Total Price :{order.totalPrice.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      p: 1,
                      px: 2,
                      borderRadius: 3,
                      bgcolor:
                        order.paymentStatus === "success"
                          ? "success.light"
                          : "warning.light",
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
                    {order.paymentStatus == "pending" ? (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handelpay(order._id)}
                      >
                        Pay Now
                      </Button>
                    ) : (
                      <Button variant="contained" color="warning">
                        <LocationCityOutlined />
                        Track
                      </Button>
                    )}
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
                          width: "50px",
                          height: "60px",
                          borderRadius: 1,
                        }}
                      />
                      <Box ml={2} display={"flex"} alignItems={"center"}>
                        <Box>
                          <Typography variant="subtitle2">
                            Product: {product.name} ({product.type})
                          </Typography>
                          <Typography variant="body2">
                            Quantity: {product.quantity}
                          </Typography>
                          <Typography variant="body2">
                            MRP: {product.mrp} , Discount : {product.discount}%{" "}
                          </Typography>
                          <Typography variant="body2">
                            Price: {product.price.toFixed(2)}
                          </Typography>
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
