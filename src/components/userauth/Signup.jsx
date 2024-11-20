import HomeNavbar from "../landing/HomeNavbar";
import React, { useState, useEffect } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs"; // Eye icons
import Aos from "aos";
import { Link, useNavigate } from "react-router-dom";
 import signupimg  from  "../../assets/signup.svg"
 import Loader from "../loader/Loader"
import axios from "axios";
import { Grid, Box, TextField, IconButton, Button, Typography, Card, CircularProgress } from "@mui/material";
import Swal from "sweetalert2";
const Signup = () => {
  const  navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "", role:"user"});
  const [loading, setLoading] = useState(false);
  // AOS initialization
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post (`${import.meta.env.VITE_BASEURL}/v1/api/users/register`,formData);
      if(res.status == 200 && res.data.statusCode==201){
         Swal.fire({
          icon:'success',
          title: 'Success',
          text:  res.data.message,
          
         })
         setFormData({
           email: "",
           password: "",
           confirmPassword: "",
           role:"user"
         })
      } 
      navigate("/login")          ;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response.data.message,
      }) 
      
    }
    finally{
      setLoading(false);
    }
  };

   if(loading)
{
  return <Loader/>
}  return (
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
                backgroundImage: `url(${signupimg})`,
                backgroundSize: "cover",
                borderRadius: 2,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* <Card sx={{ padding: 3 }}> */}
              <Typography variant="h6" align="left" gutterBottom>
               Sign Up 
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
                <Box sx={{ position: "relative" }}>
                  <TextField
                    fullWidth
                     size="small"
                    label="Confirm Password"
                    variant="outlined"
                    type={passwordVisible ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
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

              {/* <Box sx={{ marginTop: 2 }}>
                <Link to="/forgot-password" variant="body2" color="primary">
                  Forgot password?
                </Link>
              </Box> */}

              <Box sx={{ textAlign: "center", marginTop: 2 }}>
               Already have an account?{" "}
                <Link to="/login" variant="body2" color="primary">
                  Login
                </Link>
              </Box>
            {/* </Card> */}
          </Grid>
        </Grid>
      </Box>

    </>
  );
};

export default Signup;
