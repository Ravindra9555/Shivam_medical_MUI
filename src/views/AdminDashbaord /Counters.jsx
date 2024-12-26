import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd, faUserGroup, faHospitalUser, faCalendarCheck, faUserTie } from '@fortawesome/free-solid-svg-icons';

const Counters = () => {
  const cards = [
    { title: 'Doctors Available', value: 25, icon: <FontAwesomeIcon icon={faUserMd} />, to: '/admin/doctors' },
    { title: 'Total Patients', value: 150, icon: <FontAwesomeIcon icon={faUserGroup} />, to: '/admin/patients' },
    { title: 'Total Doctors', value: 25, icon: <FontAwesomeIcon icon={faHospitalUser} />, to: '/admin/doctors' },
    { title: 'Total Appointments', value: 500, icon: <FontAwesomeIcon icon={faCalendarCheck} />, to: '/admin/appointments' },
    { title: 'Total Admins', value: 5, icon: <FontAwesomeIcon icon={faUserTie} />, to: '/admin/admins' },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid item xs={12} md={4} lg={2} key={card.title}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {card.title}
                </Typography>
                <Box sx={{ fontSize: '3rem', mb: 1 }}>{card.icon}</Box>
                <Typography variant="h4" component="div" gutterBottom>
                  {card.value}
                </Typography>
                <Button variant="contained" color="primary" component={Link} to={card.to}>
                  View All
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Counters;
