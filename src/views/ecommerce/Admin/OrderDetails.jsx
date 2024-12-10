import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Divider,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

const OrderDetails = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASEURL}/v1/api/order/getOrderbyOrderId`,
          {
            orderId: id,
          }
        );
        setOrder(response.data.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!order) {
    return (
      <Typography variant="h6" color="error">
        Failed to load order details
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Order Details
      </Typography>
      {/* Products Table */}
      <Card sx={{bgcolor:"grey.100"}}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Products
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>MRP</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <Avatar
                      src={product.image}
                      alt={product.name}
                      variant="rounded"
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.type}</TableCell>
                  <TableCell>₹ {product.mrp}</TableCell>
                  <TableCell>{product.discount}%</TableCell>
                  <TableCell>₹ {product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {/* Address and User Info */}
      <Grid container spacing={4} mb={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{bgcolor:"warning.light"}}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Shipping Address
              </Typography>
              <Divider sx={{bgcolor:"purple"}}/>
              <Typography>Name: {order.address.fullName}</Typography>
              <Typography>Email: {order.address.email}</Typography>
              <Typography>Phone: {order.address.phone}</Typography>
              <Typography>Street: {order.address.streetAddress}</Typography>
              <Typography>
                City: {order.address.city}, {order.address.state}
              </Typography>
              <Typography>Zip Code: {order.address.zipCode}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{bgcolor:"success.light"}}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Info
              </Typography>
              <Divider sx={{bgcolor:"purple"}}/>
              <Typography>Status: {order.status}</Typography>
              <Typography>Payment Status: {order.paymentStatus}</Typography>
              <Typography>Total Price: ₹{order.totalPrice}</Typography>
              <Typography>
                Created At: {new Date(order.createdAt).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderDetails;
