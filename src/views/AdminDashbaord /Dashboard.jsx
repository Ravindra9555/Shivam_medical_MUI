import React from 'react'
import Counters from './Counters'
import AppointmentTabel from './AppointmentTabel'
import DailyOrders from './DailyOrders'
 import NewContacts from './NewContacts'
import { Grid, Container } from '@mui/material'

const Dashboard = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        {/* <Grid item xs={12} sm={6} md={4} lg={3}>
          <Counters />
        </Grid> */}
        <Grid item xs={12} sm={6} md={4} >
        <DailyOrders />
        </Grid>
        <Grid item xs={12} sm={6} md={4} >
          {/* <AppointmentTabel /> */}
        </Grid>
        <Grid item xs={12} lg={12}>
          <NewContacts/>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Dashboard
