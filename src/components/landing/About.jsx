import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Avatar,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import HeartIcon from "@mui/icons-material/Favorite";
import BullseyeIcon from "@mui/icons-material/CenterFocusStrong";
import AmbulanceIcon from "@mui/icons-material/LocalHospital";
import HealthIcon from "@mui/icons-material/HealthAndSafety";
import jp from "../../assets/jp.jpg";

const About = () => {
  const leadershipTeam = [
    {
      name: "Mr. Jagdish",
      title: "CEO",
      description:
        "An experienced leader with a passion for improving healthcare systems.",
      image: jp,
      social: {
        twitter: "https://twitter.com/johndoe",
        linkedin: "https://linkedin.com/in/johndoe",
      },
    },
    {
      name: "Dr. IT Khan",
      title: "Chief Medical Officer",
      description:
        "A dedicated physician overseeing our clinical operations and patient care.",
      image: "https://via.placeholder.com/150",
      social: {
        twitter: "https://twitter.com/janesmith",
        linkedin: "https://linkedin.com/in/janesmith",
      },
    },
  ];

  const generalServices = [
    {
      title: "Emergency Care",
      description: "Immediate care for urgent medical conditions.",
      icon: <AmbulanceIcon fontSize="large" color="primary" />,
    },
    {
      title: "Outpatient Services",
      description:
        "Consultations and treatments that don’t require an overnight stay.",
      icon: <HealthIcon fontSize="large" color="primary" />,
    },
  ];

  return (
    <Container sx={{ py: 5 }} id="about">
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h4" component="h2" gutterBottom>
            About Shivam Medical
          </Typography>
          <Typography>
            Founded with a mission to provide exceptional healthcare, Shivam
            Medical has been serving the community for over [X] years. Our
            commitment to excellence in patient care and medical innovation sets
            us apart.
          </Typography>
        </Grid>
        {/* Mission and Vision Section */}

        <Grid
          container
          xs={12}
          columnSpacing={{ xs: 2, md: 4 }}
          rowSpacing={4}
          mt={4}
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              padding: "20px",
            }}
          >
            <Box
              sx={{
                backgroundColor: "grey.100",
                p: 3,
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <HeartIcon color="primary" fontSize="large" />
                <Typography variant="h5">Our Mission</Typography>
              </Box>
              <Typography>
                To deliver compassionate, high-quality medical care with a focus
                on patient well-being and advanced treatments.
              </Typography>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              padding: "20px",
            }}
          >
            <Box
              sx={{
                backgroundColor: "grey.100",
                p: 3,
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <BullseyeIcon color="primary" fontSize="large" />
                <Typography variant="h5">Our Vision</Typography>
              </Box>
              <Typography>
                To be a leader in healthcare excellence, continuously improving
                to meet the evolving needs of our patients.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Leadership Team Section */}
        <Grid item xs={12}>
          <Typography variant="h5" component="h3" gutterBottom>
            Leadership Team
          </Typography>
        </Grid>
        <Grid container item xs={12} spacing={4}>
          {leadershipTeam.map((leader, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card sx={{ boxShadow: 3 }}>
                <Box display="flex" justifyContent="center" mt={2}>
                  <Avatar
                    src={leader.image}
                    alt={leader.name}
                    sx={{ width: 100, height: 100 }}
                  />
                </Box>{" "}
                <CardContent>
                  <Typography variant="h6" textAlign={"center"}>{leader.name}</Typography>
                  <Typography variant="subtitle1" textAlign={"center"} color="text.secondary">
                    {leader.title}
                  </Typography>
                  <Typography>{leader.description}</Typography>
                  <Box mt={2} display="flex" gap={1}>
                    {leader.social.twitter && (
                      <IconButton
                        component="a"
                        href={leader.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="primary"
                      >
                        <TwitterIcon />
                      </IconButton>
                    )}
                    {leader.social.linkedin && (
                      <IconButton
                        component="a"
                        href={leader.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="primary"
                      >
                        <LinkedInIcon />
                      </IconButton>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Our Services Section */}
        <Grid id="services" item xs={12}>
          <Typography variant="h5" component="h3" gutterBottom>
            Our Services
          </Typography>
          <Typography>
            At Shivam Medical, we offer a wide range of services to meet your
            healthcare needs, including:
          </Typography>
        </Grid>
        <Grid container item xs={12} spacing={4}>
          {generalServices.map((service, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Box mb={2}>{service.icon}</Box>
                  <Typography variant="h6">{service.title}</Typography>
                  <Typography>{service.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Patient Care Standards */}
        <Grid item xs={12}>
          <Typography variant="h5" component="h3" gutterBottom>
            Patient Care Standards
          </Typography>
          <Typography>
            We are dedicated to providing personalized care with a focus on
            comfort, respect, and effective treatment.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
