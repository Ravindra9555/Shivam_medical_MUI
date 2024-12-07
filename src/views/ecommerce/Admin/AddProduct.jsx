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
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import adminService from "../../../api/adminService";
import Swal from "sweetalert2";
import Spinner from "../../../components/Spinner/Spinner";

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
    productMRP: "",
    productDiscount: "",
    productPriceAfterDiscount: "",
    productImage: null,
    productQuantity: "",
    productCategory: "",
    productType: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    // Handle file input separately
    if (type === "file") {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Helper function to get image URL or placeholder
  const getImageUrl = () => {
    return formData.productImage
      ? URL.createObjectURL(formData.productImage)
      : "https://via.placeholder.com/140";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const finalData = new FormData();
      finalData.append("name", formData.productName);
      finalData.append("description", formData.productDescription);
      finalData.append("mrp", formData.productMRP);
      finalData.append("discount", formData.productDiscount);
      finalData.append(
        "priceAfterDiscount",
        formData.productMRP -
          ((formData.productMRP * formData.productDiscount) / 100).toFixed(2)
      );
      finalData.append(
        "price",
        formData.productMRP -
          ((formData.productMRP * formData.productDiscount) / 100).toFixed(2)
      );
      finalData.append("quantity", formData.productQuantity);
      finalData.append("category", formData.productCategory);
      finalData.append("type", formData.productType);
      finalData.append("image", formData.productImage);
      // Send the data to the server
      const res = await adminService.addproduct(finalData);
      if (res.status == 201) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.data?.message || "Product added successfully",
          timer: 1500,
          showConfirmButton: false,
        });
        setFormData({
          productImage: null,
          productName: "",
          productDescription: "",
          productMRP: "",
          productDiscount: "",
          productPriceAfterDiscount: "",
          productPrice: "",
          productQuantity: "",
          productCategory: "",
          productType: "",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Error While adding product",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Box mt={2} boxShadow={2} borderRadius={2}>
        <Container>
          {loading ? (
            <Spinner />
          ) : (
            <>
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
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
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
                  <form onSubmit={handleSubmit}>
                    <Grid
                      container
                      spacing={2}
                      p={2}
                      boxShadow={2}
                      borderRadius={2}
                    >
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
                        <Button type="submit" variant="contained">
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </>
          )}
        </Container>
      </Box>
    </div>
  );
};

export default AddProduct;
