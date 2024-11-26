import React, { useState } from "react";
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
  Tooltip,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Delete, StrikethroughS } from "@mui/icons-material";
import ResponsiveAppBar from "../../components/landing/HomeNavbar";
import ClearIcon from "@mui/icons-material/Clear";
const statesOfIndia = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
  "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep",
  "Delhi", "Puducherry", "Ladakh", "Jammu and Kashmir"
];
const Cart = () => {
  const cart = useCartStore((state) => state.cart);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const total = useCartStore((state) => state.totalPrice());
  const price = useCartStore((state) => state.priceBeforeDiscount());
  const clearCart = useCartStore((state) => state.clearCart);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    street: "",
    city: "",
    houseNoAndLandmark: "",
    zip: "",
    state: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send formData to the server
    console.log("Shipping Details:", formData);
  };

  return (
    <Box>
      <ResponsiveAppBar />
      <Container sx={{ marginTop: "70px" }}>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} md={6}>
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
              <Typography variant="body" color={"error.light"}>
                MRP Total : <strike> {price}</strike>
              </Typography>
              <Typography sx={{ color: "success.light" }}>
                Discount: {(price - total).toFixed(2)}
              </Typography>
              <Typography sx={{ color: "green.light" }}>
                {" "}
                Subtotal: {(total).toFixed(2)}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Button variant="contained" color="secondary">
                  Checkout
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ padding: 2, boxShadow: 2, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Shipping Details
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            label="Full Name"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            size="small"
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Phone"
            size="small"
            variant="outlined"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel size="small" id="state-select-label">
              Select State
            </InputLabel>
            <Select
              size="small"
              labelId="state-select-label"
              name="state"
              value={formData.state}
              onChange={handleChange}
              label="Select State"
              required
            >
              {statesOfIndia.map((state, index) => (
                <MenuItem key={index} value={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            size="small"
            label="City"
            variant="outlined"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            size="small"
            label="Zip Code"
            variant="outlined"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            size="small"
            label="Street"
            variant="outlined"
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            label="Address"
            variant="outlined"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            label="Landmark & House Number"
            variant="outlined"
            name="houseNoAndLandmark"
            value={formData.houseNoAndLandmark}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Cart;
