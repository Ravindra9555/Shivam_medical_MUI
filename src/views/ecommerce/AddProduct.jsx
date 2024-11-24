import {
  Box,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

const medicineTypes = [
  "Tablet",
  "Capsule",
  "Syrup",
  "Injection",
  "Cream",
  "Medical Device",
  "Medical equipment",
];
const categories = ["Allopathy", "Unani", "Ayurveda", "Homeopathy", "Herbal"];
const AddProduct = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productMRP: "100",
    productDiscount: "9.6",
    productPriceAfterDiscount: "",
    productImage: "",
    productQuantity: "",
    productCategory: "",
    productType: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Helper function to get image URL or placeholder
  const getImageUrl = () => {
    return formData.productImage
      ? URL.createObjectURL(formData.productImage)
      : "https://via.placeholder.com/140";
  };
  return (
    <div>
      <Box mt={2} boxShadow={2} borderRadius={2}>
        <Container>
          <Typography variant="h5" p={2} sx={{ textAlign: "center" }}>
            ADD PRODUCT{" "}
          </Typography>
          <Divider />
          <Grid container spacing={2} mt={2} pb={2}>
            <Grid item md={6} xs={12}>
              {/*  Produt Details  */}
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  
                  image={getImageUrl()}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {formData.productName} ( {formData.productType})
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {formData.productDescription}
                  </Typography>
                  <Divider />
                  <Typography size="small">
                    MRP : ₹ {formData.productMRP}
                  </Typography>
                  <Typography size="small">
                    Discount : {formData.productDiscount}%
                  </Typography>
                  <Typography size="small">
                    Price After Discount : ₹{" "}
                    {formData.productMRP -
                      (
                        (formData.productMRP * formData.productDiscount) /
                        100
                      ).toFixed(2)}
                  </Typography>
                </CardContent>
                <Box></Box>
              </Card>
            </Grid>
            <Grid item md={6} xs={12}>
              <form>
                <Grid container spacing={2} p={2} boxShadow={2} borderRadius={2}>
                  <Grid item xs={12} md={6}>
                    {/* Product Image */}
                    <Button variant="outlined" component="label">
                      Upload Product Image
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            productImage: e.target.files[0],
                          })
                        }
                      />
                    </Button>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      placeholder="Product Name"
                      label="Product Name"
                      name="productName"
                      value={formData.productName}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <TextField
                      fullWidth
                      size="small"
                      multiline
                      rows={3}
                      type="text"
                      placeholder="Product Description"
                      label="Product Description"
                      name="productDescription"
                      value={formData.productDescription}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      placeholder="Product MRP"
                      label="Product MRP"
                      name="productMRP"
                      value={formData.productMRP}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      placeholder="Product Discount %"
                      label="Product Discount"
                      name="productDiscount"
                      value={formData.productDiscount}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel size="small" id="medicine-type-label">
                        Medicine Type
                      </InputLabel>
                      <Select
                        labelId="medicine-type-label"
                        size="small"
                        id="medicine-type"
                        label="Medicine Type"
                        name="productType"
                        value={formData.productType}
                        onChange={handleInputChange}
                      >
                        {medicineTypes.map((type, index) => (
                          <MenuItem key={index} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel size="small" id="category-label">
                        Category
                      </InputLabel>
                      <Select
                        labelId="category-label"
                        id="category"
                        label="Category"
                        size="small"
                        name="productCategory"
                        value={formData.productCategory}
                        onChange={handleInputChange}
                      >
                        {categories.map((category, index) => (
                          <MenuItem key={index} value={category}>
                            {category}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      size="small"
                      type="number"
                      label="Product Quantity"
                      placeholder="Product Quantity"
                      onChange={handleInputChange}
                      value={formData.productQuantity}
                      name="productQuantity"
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Button type="submit" variant="contained" >Submit</Button>
                  </Grid>
                </Grid>

              </form>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default AddProduct;
