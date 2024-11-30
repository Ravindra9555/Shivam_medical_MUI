
import React from "react";
import { Container, Grid, Box, Typography, Button, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PhoneIcon from "@mui/icons-material/Phone";
import appoint from "../../assets/appointment.svg";

function Appointment() {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate("/login"); // Navigate to the login page on button click
  };

  return (
    <Container sx={{ padding: "50px 0" }} id="appointment"  data-aos="fade-up" data-aos-duration="1000">
      {/* Book an Appointment Section */}
      <Grid container spacing={4} alignItems="center" sx={{ mb: 5 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            <CalendarTodayIcon fontSize="large" color="primary" sx={{ verticalAlign: "middle", mr: 1 }} />
            Book an Appointment
          </Typography>
          <Typography paragraph>
            Schedule your visit online with our convenient booking system. Choose your preferred date and time, and complete the necessary details.
          </Typography>
          <Typography variant="h5" sx={{ mt: 3 }}>
            <PhoneIcon fontSize="large" color="primary" sx={{ verticalAlign: "middle", mr: 1 }} />
            Booking Information
          </Typography>
          <Typography paragraph>
            <strong>Phone Appointments:</strong> Call +91 6394323760 to schedule by phone.
          </Typography>
          <Button variant="outlined" size="large" onClick={handleBookAppointment}>
            Book an Appointment
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={appoint}
            alt="Book an Appointment"
            sx={{ width: "100%", height: "auto" }}
          />
        </Grid>
      </Grid>

      {/* FAQs Section */}
      <Grid container spacing={2}>
        <Grid item xs={12} data-aos="fade-up">
          <Typography variant="h5" sx={{ mb: 3 }}>
            Frequently Asked Questions
          </Typography>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>How do I book an appointment?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                You can use our online booking system or call us directly at +91 6394323760.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>What should I bring to my appointment?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Please bring your insurance information and any relevant medical records.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Appointment;
