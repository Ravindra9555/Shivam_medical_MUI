
import React from 'react';
import { Box, Container, Grid, Typography, Avatar, Link, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { BsFacebook, BsTwitter, BsInstagram, BsLinkedin, BsGithub, BsPersonCircle } from 'react-icons/bs';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#f8f9fa', py: 5 }}>
      <Container>
        <Grid container spacing={4} justifyContent="center" data-aos="fade-up">
          {/* Developer Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>Developer</Typography>
            <Box display="flex" alignItems="center" mt={2}>
              <Avatar
                src="https://avatars.githubusercontent.com/u/69795113?v=4" // Replace with actual image URL
                alt="Developer"
                sx={{ width: 100, height: 100, mr: 2 }}
              />
              <Box>
                <Typography variant="body1" fontWeight="bold">Ravindra Kumar</Typography>
                <Typography variant="body2">Full Stack Developer ( MERN )</Typography>
              </Box>
            </Box>
            <Box display="flex" mt={2}>
              <IconButton component="a" href="https://ravindra.vercel.app/" target="_blank" rel="noopener noreferrer">
                <BsPersonCircle />
              </IconButton>
              <IconButton component="a" href="https://www.github.com/ravindra9555" target="_blank" rel="noopener noreferrer">
                <BsGithub />
              </IconButton>
              <IconButton component="a" href="https://linkedin.com/in/ravindra-kumar-99a1301b2/" target="_blank" rel="noopener noreferrer">
                <BsLinkedin />
              </IconButton>
              <IconButton component="a" href="https://www.facebook.com/RavindraPrajapati9648/" target="_blank" rel="noopener noreferrer">
                <BsFacebook />
              </IconButton>
              <IconButton component="a" href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <BsTwitter />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>Quick Links</Typography>
            <List>
              {['Home', 'About Us', 'Services', 'Appointment', 'Contact Us'].map((text) => (
                <ListItem key={text} disablePadding>
                  <ListItemText primary={<Link href={`#${text.toLowerCase().replace(' ', '')}`} color="inherit" underline="hover">{text}</Link>} />
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Contact Information Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>Contact Information</Typography>
            <Typography variant="body2"><strong>Address:</strong> Kakrahwa Bazar (Sabji Mandi), Uttar Pradesh (272206)</Typography>
            <Typography variant="body2"><strong>Phone:</strong> +91 7379429626</Typography>
            <Typography variant="body2"><strong>Email:</strong> contact@shivammedical.com</Typography>
            <Box display="flex" mt={2}>
              <IconButton component="a" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <BsFacebook />
              </IconButton>
              <IconButton component="a" href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <BsTwitter />
              </IconButton>
              <IconButton component="a" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <BsInstagram />
              </IconButton>
              <IconButton component="a" href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <BsLinkedin />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Box textAlign="center" mt={3}>
          <Typography variant="body2">© 2024 Shivam Medical. All rights reserved.</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
