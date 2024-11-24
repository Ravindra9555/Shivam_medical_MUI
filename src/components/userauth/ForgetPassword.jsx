
import React, { useState } from "react";
import { TextField, Button, Card, Container, Grid, Alert, Typography } from "@mui/material";
import Loader from "../loader/Loader";
import axios from "axios";
import Swal from "sweetalert2";
import userService from "../../api/userService";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      // Make a POST request to the backend to send the reset password link
      // const response = await axios.post(`${process.env.REACT_APP_BASEURL}/v1/api/users/resetlink`, { email });
      const response = await userService.resetLink({email})
      if (response.status === 200) {
        setMessage(response.data.message);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: message,
        });
      } else {
        throw new Error("Failed to send reset link. Please try again.");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Card sx={{ padding: 3, boxShadow: 3 }}>
            <Typography variant="h6" gutterBottom>
              Forgot Password
            </Typography>

            {message && <Alert severity="success">{message}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}

            <form onSubmit={handleSubmit}>
              <TextField
                label="Email Address"
                type="email"
                size="small"
                fullWidth
                margin="normal"
                variant="outlined"
                value={email}
                onChange={handleInputChange}
                required
                helperText="Please enter your registered email address."
              />

              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{ marginTop: 2 }}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ForgetPassword;
