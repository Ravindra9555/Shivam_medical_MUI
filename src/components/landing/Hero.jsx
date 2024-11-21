
import React from "react";
import { Container, Box, Grid, Typography, Button } from "@mui/material";
import { GiHospitalCross } from "react-icons/gi";
import { GrUserExpert } from "react-icons/gr";
import { FaPersonBreastfeeding } from "react-icons/fa6";
import hero from "../../assets/hero.svg";

function Hero() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }} id="home">
      <Grid container alignItems="center" spacing={4}>
        {/* Hero Text Section */}
        <Grid item xs={12} md={6} data-aos="fade-right">
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to Shivam Medical
          </Typography>
          <Typography variant="body1" paragraph>
            At Shivam Medical, we are dedicated to providing compassionate,
            high-quality healthcare services. Our state-of-the-art facilities
            and expert medical staff are here to support your health and
            well-being.
          </Typography>
          <Box>
            <Button
              href="#appointment"
              variant="contained"
              color="primary"
              sx={{ mr: 2 }}
            >
              Book an Appointment
            </Button>
            <Button
              href="#contact"
              variant="outlined"
              color="primary"
            >
              Contact Us
            </Button>
          </Box>
        </Grid>

        {/* Hero Image Section */}
        <Grid item xs={12} md={6} data-aos="fade-left">
          <Box
            component="img"
            src={hero}
            alt="Shivam Medical Facility"
            sx={{ width: "100%", borderRadius: 2 }}
          />
        </Grid>
      </Grid>

      {/* Feature Sections */}
      <Grid container spacing={3} sx={{ mt: 5 }} data-aos="fade-up">
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              backgroundColor: "grey.50",
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
              textAlign: "center",
            }}
          >
            <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
              <GiHospitalCross size={30} color="primary" />
              <Typography variant="h6" sx={{ ml: 2 }}>
                Comprehensive Services
              </Typography>
            </Box>
            <Typography variant="body2">
              From emergency care to specialized treatments, we offer medical
              services to meet your needs.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box
            sx={{
              backgroundColor: "grey.50",
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
              textAlign: "center",
            }}
          >
            <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
              <GrUserExpert size={30} color="primary" />
              <Typography variant="h6" sx={{ ml: 2 }}>
                Expert Team
              </Typography>
            </Box>
            <Typography variant="body2">
              Our team of experienced doctors and healthcare professionals are
              committed to your care.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box
            sx={{
              backgroundColor: "grey.50",
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
              textAlign: "center",
            }}
          >
            <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
              <FaPersonBreastfeeding size={30} color="primary" />
              <Typography variant="h6" sx={{ ml: 2 }}>
                Patient-Centered Care
              </Typography>
            </Box>
            <Typography variant="body2">
              We focus on personalized care to ensure the best outcomes for our
              patients.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;
