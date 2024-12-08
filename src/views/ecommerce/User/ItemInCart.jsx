import React, { useEffect, useState } from "react";
import useCartStore from "../../../store/useCartStore";
import {
  List,
  ListItem,
  Button,
  Typography,
  Box,
  IconButton,
  Divider,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Delete, StrikethroughS } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext";
import userService from "../../../api/userService";
import Swal from "sweetalert2";
import axios from "axios";
const ItemInCart = () => {
  const cart = useCartStore((state) => state.cart);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const total = useCartStore((state) => state.totalPrice());
  const price = useCartStore((state) => state.priceBeforeDiscount());
  const clearCart = useCartStore((state) => state.clearCart);
  const navigate = useNavigate();
  const { user } = useUser();
  const location = useLocation();
  const loginCart = location.pathname == "user/cart";
  const [addressId, setAddressId] = useState({});

  const handleCheckout = () => {
    const token = localStorage.getItem("userToken");
    console.log("clicked");
    if (token && user.id) {
      navigate("/user/cart");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchAddress();
    }
  }, []);

  const fetchAddress = async () => {
    // console.log("fetch")
    try {
      const res = await userService.getUserAddress({ userId: user.id });
      if (res.status == 200) {
        console.log(res.data.data[0]);
        setAddressId(res.data?.data[0]?._id);
      } else {
        navigate("/user/cart");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      Swal.fire(
        "error",
        error?.data?.response?.message,
        "Error fetching address"
      );
    }
  };

  const handlePay = async () => {
    try {
      const itemArray = cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      }));

      const finalData = {
        addressId: addressId,
        userId: user.id,
        products: itemArray,
      };

      // Step 1: Place order
      const res = await userService.placeorder(finalData);
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
              clearCart();
              navigate("/user/cart");
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
    <div>
      <Box sx={{ padding: 2, boxShadow: 2, borderRadius: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" gutterBottom>
            Your Cart
          </Typography>
          <Tooltip title="Clear cart">
            <IconButton onClick={clearCart} color="error">
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Divider />
        {cart.length === 0 && (
          <Typography variant="body1" color="textSecondary">
            Your cart is empty.
          </Typography>
        )}
        <List>
          {cart.map((item) => (
            <React.Fragment key={item._id}>
              <ListItem
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRadius: 2,
                  boxShadow: 2,
                  mb: 1,
                }}
              >
                <Box>
                  <img height={50} width={50} src={item.image} />
                </Box>
                <Box>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2" color="red">
                    MRP : ₹ <strike>{item.mrp}</strike>
                  </Typography>
                  <Typography variant="body2" color="green">
                    Discounted Price : ₹ {item.price.toFixed(2)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  {item.quantity > 1 && (
                    <Tooltip title="Remove one from cart ">
                      <IconButton
                        color="secondary"
                        onClick={() => decrementQuantity(item._id)}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Typography variant="body2" color="textSecondary">
                    Quantity: {item.quantity}
                  </Typography>

                  <Tooltip title="Add one in cart ">
                    <IconButton
                      color="primary"
                      onClick={() => incrementQuantity(item._id)}
                    >
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Remove item from cart ">
                    <IconButton
                      color="error"
                      onClick={() => removeFromCart(item._id)}
                      sx={{ marginLeft: 1 }} // Adjusted spacing for consistency
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Box>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
        <Divider />
        {cart.length != 0 && (
          <>
            <Typography variant="body" color={"error.light"}>
              MRP Total : <strike> {price}</strike>
            </Typography>
            <Typography sx={{ color: "success.light" }}>
              Discount: {(price - total).toFixed(2)}
            </Typography>
            <Typography sx={{ color: "green.light" }}>
              {" "}
              Subtotal: {total.toFixed(2)}
            </Typography>
          </>
        )}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          {location.pathname === "/user/cart" && cart.length > 0 ? (
            <Button onClick={handlePay} variant="contained" color="primary">
              Pay
            </Button>
          ) : (
            <></>
          )}
          {cart.length > 0 && location.pathname === "/cart" && (
            <Button
              onClick={handleCheckout}
              variant="contained"
              color="primary"
            >
              Proceed to checkout
            </Button>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default ItemInCart;
