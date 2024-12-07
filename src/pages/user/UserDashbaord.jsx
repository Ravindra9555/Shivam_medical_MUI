import React from "react";
import { useUser } from "../../context/UserContext";
import UserCompleteProfile from "./UserCompleteProfile";
import {
  BlogCard,
  DailyActivities,
  ProductPerformance,
} from "../../views/dashboards/dashboard1-components";
import { SalesOverview } from "../../views/dashboards/dashboard1-components";
import { Box, Grid } from "@mui/material";
const UserDashboard = () => {
  const { user } = useUser();
  

  return (
    <>
      {user && !user.name && <UserCompleteProfile />}
      <Box>
        <Grid container spacing={0}>
          {/* ------------------------- row 2 ------------------------- */}
          <Grid item xs={12} lg={12}>
            <div className="p-2 m-3 rounded-4 border shadow-sm  d-flex align-items-center">
              <img
                src={user.profilePic}
                alt="User Avatar"
                className="rounded-circle"
                height={80}
                width={80}
              />
              <div className="ms-4">
                <h5>
                  Hi! 👋 <span className="text-capitalize">{user.name}</span>,
                  Welcome back to{" "}
                  <span className="text-success">Shivam Medical</span>!
                </h5>
              </div>
            </div>
          </Grid>
          {/* ------------------------- row 2 ------------------------- */}
          <Grid item xs={12} lg={4}>
            <DailyActivities />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
          {/* ------------------------- row 1 ------------------------- */}
          <Grid item xs={12} lg={12}>
            <SalesOverview />
          </Grid>
          {/* ------------------------- row 3 ------------------------- */}
          <BlogCard />
        </Grid>
      </Box>
    </>
  );
};

export default UserDashboard;
