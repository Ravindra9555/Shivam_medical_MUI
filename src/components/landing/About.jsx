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
        twitter: "https://twitter.com/",
        linkedin: "https://linkedin.com/in/",
      },
    },
    {
      name: "Dr. IT Khan",
      title: "Chief Medical Officer",
      description:
        "A dedicated physician overseeing our clinical operations and patient care.",
      image: "https://via.placeholder.com/150",
      social: {
        twitter: "https://twitter.com/",
        linkedin: "https://linkedin.com/",
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
    
    <Container id="about"  sx={{mt:4}} data-aos="fade-up" data-aos-duration="1000">
      <Grid container spacing={4} justifyContent="center">
      
        {/* Leadership Team Section */}
        <Grid item xs={12}>
          <Typography variant="h5" component="h3" gutterBottom>
            Leadership Team
          </Typography>
        </Grid>
        <Grid container item xs={12} spacing={4}>
          {leadershipTeam.map((leader, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card sx={{bgcolor:"white"}}>
                <Box display="flex" justifyContent="center" mt={2}>
                  <Avatar
                    src={leader.image}
                    alt={leader.name}
                    sx={{ width: 100, height: 100 }}
                  />
                </Box>{" "}
                <CardContent>
                  <Typography variant="h6" textAlign={"center"}>
                    {leader.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    textAlign={"center"}
                    color="text.secondary"
                  >
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
        <Grid container item xs={12} >
          {generalServices.map((service, index) => (
            <Grid item xs={12} md={6} key={index} sx={{display:"flex", alignItems:"stretch" ,bgcolor:"white", p:2, borderRadius:2}} >
             
                <Box >
                  <Box mb={2} display={"flex"} gap={1} alignItems={"center"}>{service.icon} <Typography variant="h5">{service.title}</Typography> </Box>
                  
                  <Typography>{service.description}</Typography>
                </Box>

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
