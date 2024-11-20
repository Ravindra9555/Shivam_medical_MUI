
import HomeNavbar from "../landing/HomeNavbar";
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  Typography,
  Box,
  Alert
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import loginimg from "../../assets/login.svg";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../loader/Loader";
import { useAdmin } from "../../context/AdminContext";

const AdminLogin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAdmin } = useAdmin();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BASEURL}/v1/api/admin/login`,
        formData
      );
      if (res.status === 200 && res.data.statusCode === 200) {
        const data = res.data.data.admin;
        setAdmin({
          id: data._id,
          name: data.name,
          email: data.email,
          role: data.role,
          isActive: data.isActive,
          profilePic: data.profilePic,
        });
        sessionStorage.setItem("adminToken", res.data.data.accessToken);
        Swal.fire({
          icon: "success",
          title: "Success",
          showConfirmButton: false,
          timer: 1500,
          text: res.data.message,
        });
        setIsLoginSuccessful(true);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoginSuccessful) {
      navigate("/appointments");
    }
  }, [isLoginSuccessful, navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <HomeNavbar />
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={10} lg={8}>
            <Card sx={{ display: "flex", boxShadow: 3 }}>
              <Grid container>
                {/* Image Section */}
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "secondary.light",
                    borderRadius: "4px 0 0 4px",
                  }}
                >
                  <Box
                    component="img"
                    src={loginimg}
                    alt="Login"
                    sx={{
                      width: "100%",
                      maxWidth: "400px",
                      p: 2,
                      objectFit: "contain",
                    }}
                  />
                </Grid>

                {/* Login Form Section */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 4 }}>
                    <Typography variant="h6" gutterBottom>
                      Admin Login
                    </Typography>
                    <form onSubmit={handleLogin}>
                      <TextField
                        label="Email Address"
                        type="email"
                        name="email"
                        size="small"
                        fullWidth
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        margin="normal"
                      />

                      <Box sx={{ position: "relative" }}>
                        <TextField
                          label="Password"
                          type={passwordVisible ? "text" : "password"}
                          name="password"
                          fullWidth
                          size="small"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          margin="normal"
                          helperText="Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                        />
                        <IconButton
                          onClick={handlePasswordVisibility}
                          sx={{
                            position: "absolute",
                            right: "10px",
                            top: "25%",
                            transform: "translateY(-50%)",
                          }}
                        >
                          {passwordVisible ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </Box>

                      <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={loading}
                      >
                        {loading ? "Logging in..." : "Login"}
                      </Button>
                    </form>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AdminLogin;

