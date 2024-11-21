import React from "react";
import useCartStore from "../../store/useCartStore";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  Box,
  IconButton,
  Divider,
  Container,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Delete } from "@mui/icons-material";
import ResponsiveAppBar from "../../components/landing/HomeNavbar";
const Cart = () => {
  const cart = useCartStore((state) => state.cart);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <Box>
<ResponsiveAppBar/>
    <Container sx={{marginTop:"70px"}}>

    <Box sx={{ padding: 2, maxWidth: 600, margin: "0 auto" }}>
      <List>
        {cart.map((item) => (
          <React.Fragment key={item.id}>
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
                <img height={50} width={50} src={item.img} />
              </Box>
              <Box>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Price: ₹{item.price}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Quantity: {item.quantity}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <IconButton
                  color="primary"
                  onClick={() => incrementQuantity(item.id)}
                  sx={{
                    borderRadius: "100%",
                    bgcolor: "success.light",
                    marginRight: 1, // Adjusted to a numeric value for proper spacing
                  }}
                >
                  <AddIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => decrementQuantity(item.id)}
                  sx={{
                    bgcolor: "error.light",
                  }}
                >
                  <RemoveIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => removeFromCart(item.id)}
                  sx={{ marginLeft: 1 }} // Adjusted spacing for consistency
                >
                  <Delete />
                </IconButton>
              </Box>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      {cart.length === 0 && (
        <Typography variant="body1" color="textSecondary">
          Your cart is empty.
        </Typography>
      )}
    </Box>
    </Container>
    </Box>
  );
};

export default Cart;
