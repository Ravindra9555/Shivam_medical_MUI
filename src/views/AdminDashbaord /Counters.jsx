import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserMd,
  faUserGroup,
  faHospitalUser,
  faCalendarCheck,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { green, orange, pink, teal } from "@mui/material/colors";

const Counters = ({ data }) => {
  const cards = [
    {
      title: "Doctors Available",
      value: data.avilableDoc,
      icon: <FontAwesomeIcon icon={faUserMd} />,
      to: "/admin/doctors",
    },
    {
      title: "Total Patients",
      value: data.totalPatients,
      icon: <FontAwesomeIcon icon={faUserGroup} />,
      to: "/admin/patients",
    },
    {
      title: "Todays Order",
      value: data.todaysOrders,
      icon: <FontAwesomeIcon icon={faHospitalUser} />,
      to: "/admin/doctors",
    },
    {
      title: "Todays Appointments",
      value: data.todaysAppointments,
      icon: <FontAwesomeIcon icon={faCalendarCheck} />,
      to: "/admin/appointments",
    },
  ];

  return (
      <Grid container spacing={1} justifyContent="center">
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={3}  key={card.title}>
            <Box
             component={Link}
             to={card.to}
              sx={{
                textAlign: "center",
                p: 2,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              bgcolor={pink[50]}
            >
              <Box
               
                textDecoration="none"
              >

                <Typography variant="h6" component="div" gutterBottom>
                  {card.title}
                </Typography>
                <Box
                  sx={{
                    fontSize: "3rem",
                    mb: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ mr: 1, color: "primary.main" }}>
                    {card.icon}
                  </Box>
                  <Typography variant="h4" component="div" gutterBottom>
                    {card.value}
                  </Typography>
                </Box>
         
              
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

  );
};

export default Counters;
