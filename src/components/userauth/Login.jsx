
import React, { useState } from "react";
import { Grid, Box, TextField, IconButton, Button, Typography, Card, CircularProgress } from "@mui/material";
import { BsEye, BsEyeSlash } from "react-icons/bs"; // Eye icons
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useUser } from "../../context/UserContext";
import HomeNavbar from "../landing/HomeNavbar";
import loginimg from "../../assets/login.svg";
import Loader from "../loader/Loader";
 import { Link } from "react-router-dom";
 import userService from "../../api/userService";
const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // const res = await axios.post(`${process.env.REACT_APP_BASEURL}/v1/api/users/login`, formData);
       const res = await userService.userLogin(formData);
      if (res.status === 200 && res.data.statusCode === 200) {
        setUser({
          id: res.data.data.user._id,
          email: res.data.data.user.email,
          password: res.data.data.user.password,
          profilePic: res.data.data.user.profilePic,
          name: res.data.data.user.name,
          role: res.data.data.user.role,
        });
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.data.message,
          showConfirmButton: false,
          timer: 800,
        });
        localStorage.setItem("userToken", res.data.access_token);
        navigate("/user");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <HomeNavbar />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100vh", backgroundColor: "#f4f6f8" }}
      >
        
        <Grid container spacing={2} sx={{ maxWidth: "md", padding: 2, backgroundColor:"white", borderRadius:"5px" }} bgcolor={"paper"}>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                backgroundImage: `url(${loginimg})`,
                backgroundSize: "cover",
                borderRadius: 2,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* <Card sx={{ padding: 3 }}> */}
              <Typography variant="h4" align="left" gutterBottom>
                Login
              </Typography>
              <form onSubmit={handleLogin}>
                <TextField
                size="small"
                  fullWidth
                  label="Email address"
                  variant="outlined"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  sx={{ marginBottom: 2 }}
                  required
                />
                <Box sx={{ position: "relative" }}>
                  <TextField
                    fullWidth
                     size="small"
                    label="Password"
                    variant="outlined"
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    sx={{ marginBottom: 2 }}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      right: 8,
                      top: "35%",
                      transform: "translateY(-50%)",
                    }}
                    onClick={handlePasswordVisibility}
                  >
                    {passwordVisible ? <BsEyeSlash /> : <BsEye />}
                  </IconButton>
                </Box>

                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{ marginTop: 2 }}
                  color="primary"
                >
                  Login
                </Button>
              </form>

              <Box sx={{ marginTop: 2 }}>
                <Link to="/forgot-password" variant="body2" color="primary">
                  Forgot password?
                </Link>
              </Box>

              <Box sx={{ textAlign: "center", marginTop: 2 }}>
                Don't have an account?{" "}
                <Link to="/signup" variant="body2" color="primary">
                  Sign up
                </Link>
              </Box>
            {/* </Card> */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Login;
