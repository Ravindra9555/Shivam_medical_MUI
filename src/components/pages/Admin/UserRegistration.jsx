
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../../loader/Loader";
import {
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Avatar,
  IconButton,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

const UserRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // For image preview
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    profilePic: null,
    name: "",
    role: "user",
  });

  const { email, password, profilePic, name, role } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profilePic: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    data.append("profilePic", profilePic);
    data.append("name", name);
    data.append("role", role);

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/v1/api/users/register`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Swal.fire("Success", response.data.message, "success");
      setFormData({
        email: "",
        password: "",
        profilePic: null,
        name: "",
        role: "user",
      });
      setImagePreview(null);
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container  sx={{ mt: 4 }}>
      <Box
        sx={{
          p: 3,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          User Registration
        </Typography>
        <hr/>
        <form onSubmit={handleSubmit}>
          <Grid container  xs={12} spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                label="Email"
                variant="outlined"
                name="email"
                value={email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}md={6}>
              <TextField
                fullWidth
                size="small"

                label="Password"
                type="password"
                variant="outlined"
                name="password"
                value={password}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"

                label="Name"
                variant="outlined"
                name="name"
                value={name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6} display="flex" alignItems="center" justifyContent="space-between">
              <label htmlFor="profilePic">
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="profilePic"
                  type="file"
                  name="profilePic"
                  onChange={handleFileChange}
                />
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
              {imagePreview && (
                <Avatar
                  src={imagePreview}
                  sx={{ width: 100, height: 100 }}
                  alt="Profile Preview"
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <Button type="submit"  variant="contained" color="primary">
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default UserRegistration;
