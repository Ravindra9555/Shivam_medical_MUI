import React, { useState } from "react";
import useCartStore from "../../store/useCartStore";
import { Box, Container, Grid } from "@mui/material";

import ADDAddrees from "./ADDAddrees";
import ItemInCart from "./ItemInCart";
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
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductAndShippingAddress;
