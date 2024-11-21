import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";

const ProductCard = ({ product }) => {
  return (
    <div>
      <Card
        variant="outlined"
        sx={{
          p: 0,
          width: "100%",
        }}
      >
        <img src={product.img} alt="img" width="100%" />
        <CardContent
          sx={{
            paddingLeft: "30px",
            paddingRight: "30px",
          }}
        >
          <Typography
            sx={{
              fontSize: "h4.fontSize",
              fontWeight: "500",
            }}
          >
            {product.title}
          </Typography>
          <Typography
            color="textSecondary"
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              mt: 1,
            }}
          >
            {product.subtitle}
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: "15px",
            }}
            color={product.btncolor}
          >
            Learn More
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCard;
