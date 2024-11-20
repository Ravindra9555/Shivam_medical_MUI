// import React from "react";
// import { Container, Row, Col, Button } from "react-bootstrap";
// import hero from "../../assets/hero.svg";
// import { GiHospitalCross } from "react-icons/gi";
// import { GrUserExpert } from "react-icons/gr";
// import { FaPersonBreastfeeding } from "react-icons/fa6";
//  import jp from "../../assets/jp.jpg"
// function Hero() {
//   return (
//     <Container className="hero-section mt-2 container" id="home">
//       <Row className="align-items-center">
//         <Col md={6} data-aos="fade-right">
//           <h1>Welcome to Shivam Medical</h1>
//           <p>
//             At Shivam Medical, we are dedicated to providing compassionate,
//             high-quality healthcare services. Our state-of-the-art facilities
//             and expert medical staff are here to support your health and
//             well-being.
//           </p>
//           <Button href="#appointment" className="me-3 btn-primary">
//             Book an Appointment
//           </Button>
//           <Button
//             variant="outline-primary"
//             className="btn-outline-primary"
//             href="#contact"
//           >
//             Contact Us
//           </Button>
//         </Col>
//         <Col md={6} data-aos="fade-left">
//           <img
//             src={hero}
//             alt="Shivam Medical Facility"
//             className="img-fluid rounded"
//           />
//         </Col>
//       </Row>

//       <Row className="mt-5" data-aos="fade-up">
//         <Col md={4}>
//           <div className="secondary-background  p-2 rounded ">
//             <div className="d-flex align-items-center justify-content-center" gap={2}>
//               <GiHospitalCross className="fs-1 text-primary" />
//               <h3>Comprehensive Services</h3>
//             </div>

//             <p>
//               From emergency care to specialized treatments, we offer medical services to meet your needs.
//             </p>
//           </div>
//         </Col>

//         <Col md={4}>
//           <div className="secondary-background  p-2 rounded ">
//           <div className="d-flex align-items-center justify-content-center" gap={2}>
//             <GrUserExpert className="fs-1 text-primary" />
//             <h3>Expert Team</h3>
//           </div>
    
//             <p>
//               Our team of experienced doctors and healthcare professionals are
//               committed to your care.
//             </p>
//           </div>
//         </Col>

//         <Col md={4}>
//           <div className="secondary-background  p-2 rounded ">
//           <div className="d-flex align-items-center justify-content-center" gap={2}>
//             <FaPersonBreastfeeding className="fs-1 text-primary" />
//             <h3>Patient-Centered Care</h3>
//           </div>
            
//             <p>
//               We focus on personalized care to ensure the best outcomes for our
//               patients.
//             </p>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default Hero;

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
              backgroundColor: "grey.100",
              p: 3,
              borderRadius: 2,
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
              backgroundColor: "grey.100",
              p: 3,
              borderRadius: 2,
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
              backgroundColor: "grey.100",
              p: 3,
              borderRadius: 2,
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
