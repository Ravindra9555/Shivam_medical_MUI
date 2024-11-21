import React from "react";

import user1 from "../../assets/images/backgrounds/u2.jpg";
import user2 from "../../assets/images/backgrounds/u3.jpg";
import user3 from "../../assets/images/backgrounds/u4.jpg";
import ProductCard from "./ProductCard";
import { Box, Container, Grid } from "@mui/material";
import ResponsiveAppBar from "../../components/landing/HomeNavbar";
import ProductSearchAndFilter from "./ProductSearchAndFilter";
const products = [
  {
    img: user1,
    title: "Super awesome, Angular 12 is coming soon!",
    subtitle:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
    btncolor: "error",
  },
  {
    img: user2,
    title: "Super awesome, Angular 12 is coming soon!",
    subtitle:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
    btncolor: "warning",
  },
  {
    img: user3,
    title: "Super awesome, Angular 12 is coming soon!",
    subtitle:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
    btncolor: "primary",
  },
  {
    img: user1,
    title: "Super awesome, Angular 12 is coming soon!",
    subtitle:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
    btncolor: "error",
  },
  {
    img: user2,
    title: "Super awesome, Angular 12 is coming soon!",
    subtitle:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
    btncolor: "warning",
  },
  {
    img: user3,
    title: "Super awesome, Angular 12 is coming soon!",
    subtitle:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
    btncolor: "primary",
  },
  {
    img: user1,
    title: "Super awesome, Angular 12 is coming soon!",
    subtitle:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
    btncolor: "error",
  },
  {
    img: user2,
    title: "Super awesome, Angular 12 is coming soon!",
    subtitle:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
    btncolor: "warning",
  },
];

const ProductList = () => {
  return (
    <div>
      <ResponsiveAppBar />
      <Box sx={{ paddingTop: "70px", overflowX: "hidden" }}>
        <Container>
          <Grid container spacing={3} justifyContent="center" p={2}>
            <Grid item xs={12} sm={12} md={12}>
              <ProductSearchAndFilter />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            {products.map((product, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default ProductList;
