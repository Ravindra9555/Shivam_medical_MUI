import React, { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import UserCompleteProfile from "./UserCompleteProfile";
import {
  DailyActivities,
  ProductPerformance,
} from "../../views/dashboards/dashboard1-components";
import { SalesOverview } from "../../views/dashboards/dashboard1-components";
import { Box, Grid } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import dayjs from "dayjs";
const UserDashboard = () => {
  const { user } = useUser();
  // const [orders, setOrders] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    getAllOrders();
  }, []);

   const [graphData, setGraphData] = useState({
    date:[],
    price:[]
   });
  // Get all orders
  const getAllOrders = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/v1/api/order/getorderbyid`,
        { userId: user.id }
      );
      const orders = response.data.data.reverse().slice(0, 5);
      const graph = response.data.data.reverse().slice(0, 10);

      // Format the graph data
      const time = graph.map((item) => dayjs(item.createdAt).format("DD/MM/YY"));
      const price = graph.map((item) => parseFloat(item.totalPrice.toFixed(2)));
  
      setGraphData({
        date: time,
        price: price,
      });
  
      // Format data for DailyActivities
      const formated = orders.map((item) => ({
        time: dayjs(item.createdAt).format("DD/MM/YY"),
        text:
          item.products.map((product) => product.name).join(", ") +
          `, for total Price Rs.${item.totalPrice.toFixed(2)}₹`,
      }));
  
      setData(formated);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Failed to fetch orders",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

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
            <DailyActivities data={data} />
          </Grid>
          <Grid item xs={12} lg={8}>
          <SalesOverview  data={graphData}/>
          
          </Grid>
          {/* ------------------------- row 1 ------------------------- */}
          <Grid item xs={12} lg={12}>
          {/* <ProductPerformance /> */}
          </Grid>
          {/* ------------------------- row 3 ------------------------- */}
          {/* <BlogCard /> */}
        </Grid>
      </Box>
    </>
  );
};

export default UserDashboard;
