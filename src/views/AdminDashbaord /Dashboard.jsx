import React from "react";
import Counters from "./Counters";
import AppointmentTabel from "./AppointmentTabel";
import DailyOrders from "./DailyOrders";
import NewContacts from "./NewContacts";
import { Grid, Box, Typography } from "@mui/material";
import { lightBlue } from "@mui/material/colors";
import { useLayoutEffect } from "react";
import adminService from "../../api/adminService";
import Swal from "sweetalert2";
const Dashboard = () => {
   const [data, setData] = React.useState({
     avilableDoc:0,
     totalPatients:0,
     todaysAppointments:0,
     todaysOrders:0,
     upcomingAppointments:[],
     upcomingOrders:[],
     dailyOrders:[], 
   });
  useLayoutEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const res = await adminService.adminDashbordData();
      if (res.status == 200) {
        console.log(res.data.data);
        setData({
          avilableDoc:res.data.data.availableDoctors,
          totalPatients:res.data.data.totalUsers,          
          todaysAppointments:res.data.data.todaysAppointments,
          todaysOrders:res.data.data.todaysOrders, 
          upcomingAppointments:res.data.data.lastAppointments,
          upcomingOrders:res.data.data.lastOrders,
          dailyOrders:res.data.data.last7DaysOrders

        })
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
      });
    }
  };
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} xl={12}>
          <Box sx={{ p: 1, boxShadow: 2, borderRadius: 2 }}>
            <Counters data={data} />
          </Box>
        </Grid>
        <Grid item xs={12} md={12} xl={12}>
          <Box
            sx={{
              p: 1,
              boxShadow: 2,
              borderRadius: 2,
              bgcolor: lightBlue[50],
            }}
          >
            <AppointmentTabel data={data.upcomingAppointments} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} xl={6}>
          <Box
            sx={{
              p: 1,
              boxShadow: 2,
              borderRadius: 2,
              bgcolor: lightBlue[50],
            }}
          >
            {" "}
            <Typography variant="h5" p={1} gutterBottom>
              Latest 10 Orders
            </Typography>
            <DailyOrders data={data.upcomingOrders} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} xl={6}>
          <Box
            sx={{
              p: 1,
              boxShadow: 2,
              borderRadius: 2,
              bgcolor: lightBlue[50],
            }}
          >
            <Typography variant="h5" p={1} gutterBottom>
              Daily Orders
            </Typography>
            <NewContacts data={data.dailyOrders} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
