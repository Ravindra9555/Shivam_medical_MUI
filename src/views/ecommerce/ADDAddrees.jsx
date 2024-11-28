import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import userService from "../../api/userService";
import { useUser } from "../../context/UserContext";
import Swal from "sweetalert2";

const statesOfIndia = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
  "Delhi",
  "Puducherry",
  "Ladakh",
  "Jammu and Kashmir",
];

const ADDAddress = () => {
  const { user } = useUser();
  const [isLoading, setLoading] = useState(false);
  const [isAddress, setAddress] = useState(true);
  const [addressData, setAddressData] = useState({});
  const [editClicked, setClicked] = useState(false);
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

  useEffect(() => {
    fetchAddress();
  }, []);

  const fetchAddress = async () => {
    try {
      const response = await userService.getUserAddress({ userId: user.id });
      if (response.status === 200) {
        setAddressData(response.data.data.shippingAddress);
        setFormData({
          name: response.data.data.shippingAddress.fullName,
          email: response.data.data.shippingAddress.email,
          phone: response.data.data.shippingAddress.phone,
          address: response.data.data.shippingAddress.address,
          street: response.data.data.shippingAddress.streetAddress,
          houseNoAndLandmark: response.data.data.shippingAddress.landmarksAndApartments,
          city: response.data.data.shippingAddress.city,
          state: response.data.data.shippingAddress.state,
          zip: response.data.data.shippingAddress.zipCode,
        });
      }
      setAddress(true);
    } catch (error) {
      console.error("Error fetching address:", error);
      if(error.response.statusCode ===404 && error.response.message=="No address found for this user"){
        setAddress(false)
      }
      setAddress(false)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.id) {
      console.error("User not found");
      return;
    }
    try {
      const finalData = {
        userId: user.id,
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        streetAddress: formData.street,
        landmarksAndApartments: formData.houseNoAndLandmark,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zip,
      };

      const res = await userService.AddAddress(finalData);
      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.data?.message || "Address added successfully",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error submitting address:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to add address",
        timer: 1500,
      });
    }
  };

  const handleEdit = () => {
    setClicked(true); // Mark edit mode as true
    setAddress(false); // Switch to the form view
  };

  const EditAddress = async () => {
    if (!user?.id) {
      console.error("User not found");
      return;
    }
    try {
      const finalData = {
        userId: user.id,
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        streetAddress: formData.street,
        landmarksAndApartments: formData.houseNoAndLandmark,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zip,
      };

      const res = await userService.editAddress(finalData);
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.data?.message || "Address edited successfully",
          timer: 1500,
        });
        fetchAddress();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to edit address",
        timer: 1500,
      });
    }
  };
  const deleteAddress = async()=>{
    if (!user?.id) {
      console.error("User not found");
      return;
    }
    try {
      const res = await userService.deleteAddress({userId: user.id});
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.data?.message || "Address deleted successfully",
          timer: 1500,
        });
        fetchAddress();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to delete address",
        timer: 1500,
      });
    }
  }

  return (
    <div>
      <Box sx={{ padding: 2, boxShadow: 2, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Shipping Details
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {isAddress  ? (
          <Box>
            <Typography variant="h6">
              Full Name: {addressData.fullName}
            </Typography>
            <Typography> Email : {addressData.email}</Typography>
            <Typography> Phone : {addressData.phone}</Typography>
            <Typography variant="h6">
              Address: {addressData.address},{" "}
              {addressData.landmarksAndApartments}, {addressData.city},{" "}
              {addressData.state}, {addressData.zipCode}
            </Typography>
            <Divider />
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button variant="contained" color="primary" onClick={handleEdit}>
                Edit Address
              </Button>
              <Button variant="contained"  onClick ={deleteAddress}color="error">
                Delete Address
              </Button>
            </Box>
          </Box>
        ) : (
          <Box>
            <form>
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
                    size="small"
                    label="Phone"
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
                  {editClicked ? (
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={EditAddress}
                    >
                      Edit Address
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  )}
                </Grid>
              </Grid>
            </form>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default ADDAddress;
