import React from "react";
import useCartStore from "../../store/useCartStore";
import {
  Box,
  Button,
  Card,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const Bill = () => {
  const cart = useCartStore((state) => state.cart);
  const total = useCartStore((state) => state.totalPrice());
  const price = useCartStore((state) => state.priceBeforeDiscount());
   const navigate = useNavigate();
  const handleCheckout=()=>{
    const token = localStorage.getItem("userToken");
     if(token){
       navigate("/user/cart")
     }
     else{
       navigate("/login")
     }

  }
  return (
    <Box sx={{ borderRadius: 2, boxShadow: 3, bgcolor: "#f4f1b9", p: 3 }}>
      <Box sx={{ bgcolor:"white", p:3,borderRadius:2}}>
        <Typography variant="h4"> Total Bill</Typography>
        <Divider />

        {cart.map((item) => (
          <Box key={item._id}>
            <Typography variant="h6">
              {item.name} : MRP : {item.mrp} X Quantity: {item.quantity} ={" "}
              {item.mrp * item.quantity}{" "}
            </Typography>
            <Typography variant="body" color="green">
              Discounted Price : ₹ {(item.price * item.quantity).toFixed(2)}
            </Typography>
            <Divider />
          </Box>
        ))}
        <Divider />
        <p>Total Price Before Discount : {price.toFixed(2)}</p>
        <p>Total Price After Discount : {total.toFixed(2)}</p>
        <Divider />
        <p>Payable Amount : Rs: {total.toFixed(2)}</p>

        <Button onClick={handleCheckout} variant="contained" color="secondary">
          
          Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default Bill;
