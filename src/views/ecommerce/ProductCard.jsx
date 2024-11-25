import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  colors,
  Box,
} from "@mui/material";
import useCartStore from "../../store/useCartStore";
const ProductCard = ({ product }) => {

   const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div>
      <Card
        variant="outlined"
        sx={{
          p: 0,
          // width: "100%",
        }}
      >
        <img src={product.image} alt="img" width="100%" />
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
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "400",
              mt: 2,
            }}
          >
            ₹{" "}
            <Box
              component="span"
              sx={{ color: "red", textDecoration: "line-through" }}
            >
              {product.mrp}
            </Box>{" "}
            {product.price}
          </Typography>
          <Typography sx={{ color: "green" }} variant="h5">
            {product.discount}% Off
          </Typography>
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: "15px",
            }}
            color={product.btncolor}
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCard;
