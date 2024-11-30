import React from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import {
  BsFillTelephoneFill,
  BsFillGeoAltFill,
  BsFillEnvelopeFill,
} from "react-icons/bs";
import Swal from "sweetalert2";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/v1/api/contact/contact`,
        formData
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Message sent successfully.",
        });
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to send message. Please try again.",
      });
      console.log(error);
    }
  };

  return (
    <Container sx={{ py: 5 }} id="contactus" data-aos="fade-up" data-aos-duration="1000" >
      {/* Contact Form Section */}
      <Grid container spacing={4} alignItems="center" sx={{bgcolor:"white" ,p:2 ,boxShadow:2, borderRadius:2}}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Get in Touch
          </Typography>
          <Typography variant="body1" paragraph>
            Have questions or need more information? Fill out the form below,
            and we will get back to you as soon as possible.
          </Typography>
          <form onSubmit={submitHandler}>
            <Grid
              container
              spacing={2}
              sx={{ p: 2, borderRadius: 2, mt: 2 }}
              // bgcolor={"white"}
            
            >
              <Grid item xs={6}>
                <TextField
                  size="small"
                  fullWidth
                  label="First Name"
                  variant="outlined"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  size="small"
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  fullWidth
                  label="Phone"
                  variant="outlined"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  fullWidth
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  fullWidth
                  label="Message"
                  variant="outlined"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" sx={{ mt: 3 }}>
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>

        {/* Map and Contact Info Section */}
        <Grid item xs={12} md={6}>
          <Box sx={{bgcolor:"white" , borderRadius:2, }}>
            <CardContent>
              <Typography variant="h6">
                <BsFillGeoAltFill /> Address
              </Typography>
              <Typography>Kakrahwa Bazar, Uttar Pradesh (272206)</Typography>
              <div className="map-iframe" style={{ marginTop: "16px" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d221.3697493601068!2d83.2157607823993!3d27.409550258007208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3996eaf2de2aa921%3A0x559bf3044fb8d454!2sShivam%20medical%20store!5e0!3m2!1sen!2sin!4v1726341585620!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Hospital Location"
                ></iframe>
              </div>
            </CardContent>
          </Box>
        </Grid>
      </Grid>

      {/* Contact Information Section */}
      <Grid container  sx={{ mt: 5 }}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Contact Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Card sx={{ textAlign: "center" }}>
                <CardContent>
                  <BsFillTelephoneFill
                    className="icon"
                    size={24}
                    color="primary"
                  />
                  <Typography variant="h6">General Inquiries</Typography>
                  <a href="tel:6394323760">+91 6394323760</a>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ textAlign: "center" }}>
                <CardContent>
                  <BsFillTelephoneFill
                    className="icon"
                    size={24}
                    color="primary"
                  />
                  <Typography variant="h6">Emergency Contact</Typography>
                  <a href="tel :+91 7379429626 ">+91 7379429626</a>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ textAlign: "center" }}>
                <CardContent>
                  <BsFillEnvelopeFill
                    className="icon"
                    size={24}
                    color="primary"
                  />
                  <Typography variant="h6">Email</Typography>
                  <a href="mailto: ravindraietbu@gmail.com">contact@shivammedical.com</a>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
