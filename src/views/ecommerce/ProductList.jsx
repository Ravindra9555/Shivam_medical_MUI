import React from "react";

import user1 from "../../assets/images/products/med1.jpg";
import user2 from "../../assets/images/products/med3.jpg";
import user3 from "../../assets/images/products/med2.jpg";
import user4 from "../../assets/images/products/med4.jpg";
import ProductCard from "./ProductCard";
import { Box, Container, Grid } from "@mui/material";
import ResponsiveAppBar from "../../components/landing/HomeNavbar";
import ProductSearchAndFilter from "./ProductSearchAndFilter";
import Cart from "./Cart";


const products = [
  {
    id: "1",
    img: user1,
    title: "Paracetamol ",
    subtitle:
      "10 Tablet ",
    btncolor: "error",
    mrp:"200",
    discount:'10',
    price:"180"
  },
  {
    id: "2",
    img: user2,
    title: "RD Tablet",
    subtitle:
      " 15 tablets",
    btncolor: "warning",
    mrp:"300",
    discount:'10',
    price:"187"
  },
  {
    id: "3",
    img: user3,
    title: "RX Plus Capsule",
    subtitle:
      "15 capsule per strip",
    btncolor: "primary",
    mrp:"200",
    discount:'10',
    price:"180"
  },
  {
    id: "4",
    img: user4,
    title: "RX Plus Capsule",
    subtitle:
      "15 capsule per strip",
    btncolor: "primary",
    mrp:"200",
    discount:'10',
    price:"180"
  },
];

const ProductList = () => {
  return (
    <div>
      <ResponsiveAppBar />
      <Box sx={{ paddingTop: "70px" }}>
        <Container>
          <Grid container spacing={3} justifyContent="center" p={2}>
            <Grid item xs={12} sm={12} md={12}>
              <ProductSearchAndFilter />
            </Grid>
          </Grid>
          <Grid container spacing={3} display={"flex"} justifyContent="center">
            {products.map((product, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
          <Cart/>

        </Container>
      </Box>
    </div>
  );
};

export default ProductList;
