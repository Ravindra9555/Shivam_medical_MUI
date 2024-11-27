import React, { useState } from "react";
import useCartStore from "../../store/useCartStore";
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
const ItemInCart = () => {
  const cart = useCartStore((state) => state.cart);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const total = useCartStore((state) => state.totalPrice());
  const price = useCartStore((state) => state.priceBeforeDiscount());
  const clearCart = useCartStore((state) => state.clearCart);

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
                    Discounted Price : ₹ {item.price}
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
      </Box>
    </div>
  );
};

export default ItemInCart;
