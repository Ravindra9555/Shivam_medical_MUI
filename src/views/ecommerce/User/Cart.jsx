import React, { useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import ResponsiveAppBar from "../../../components/landing/HomeNavbar";
import ADDAddrees from "./ADDAddrees";
import ItemInCart from "./ItemInCart";
import Bill from "./Bill";

const Cart = () => {
  return (
    <Box>
      <ResponsiveAppBar />
      <Container sx={{ marginTop: "70px" }}>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} md={6}>
            <ItemInCart />
          </Grid>
          <Grid item xs={12} md={6}>
            <Bill/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Cart;
