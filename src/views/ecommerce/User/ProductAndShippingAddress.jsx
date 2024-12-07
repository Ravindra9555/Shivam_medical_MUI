import React, { useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import ADDAddrees from "./ADDAddrees";
import ItemInCart from "./ItemInCart";
import Bill from "./Bill";
const ProductAndShippingAddress = () => {
  return (
    <Box>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <ItemInCart />
          </Grid>
          <Grid item xs={12} md={6}>
            <ADDAddrees />
            <Box sx={{mt:1}}>
            <Bill />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductAndShippingAddress;
