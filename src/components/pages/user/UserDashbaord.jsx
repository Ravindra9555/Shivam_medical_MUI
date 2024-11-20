import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
 import { useUser } from "../../../context/UserContext";
 import UserCompleteProfile from "./UserCompleteProfile";
const UserDashboard = () => {
   const { user } = useUser();

  const data = [
    {
      id: "1",
      time: "10:00 AM",
      description: "Regular check-up with Dr. Smith",
      date: "2024-02-01",
      status: "Completed",
    },
    {
      id: "2",
      time: "12:30 PM",
      description: "Follow-up for cold symptoms",
      date: "2024-02-02",
      status: "Upcoming",
    },
    {
      id: "3",
      time: "02:00 PM",
      description: "Blood test results consultation",
      date: "2024-02-03",
      status: "Missed",
    },
    {
      id: "4",
      time: "03:15 PM",
      description: "X-ray for wrist pain",
      date: "2024-02-04",
      status: "Upcoming",
    },
    {
      id: "5",
      time: "04:30 PM",
      description: "Vaccination appointment",
      date: "2024-02-05",
      status: "Completed",
    },
  ];

  return (

    <div className="row">
      {user && !user.name &&(

      <UserCompleteProfile />
      )}
      <div className="col-md-6">
        <div className="p-2 rounded bg-light d-flex align-items-center">
          <img
            src={user.profilePic}
            alt="User Avatar"
            className="rounded"
            height={120}
            width={120}
          />
          <div className="ms-4">
            <h3>
              Hi! 👋 <span className="text-capitalize">{user.name}</span>, Welcome
              back to <span className="text-success">Shivam Medical</span>!
            </h3>
          </div>

        </div>
           <div className="rounded p-2 shadow"> 
            <div className="d-flex">
              <div>
                
              </div>
              <div></div>
            </div>


           </div>

      </div>
      <div className="col-md-6 p-2 ">
        <div className="p-2 bg-light  shadow-sm rounded ">
          <VerticalTimeline layout={"1-column-left"} lineColor="green">
            {data.map((item) => (
              <VerticalTimelineElement
                key={item.id}
                className=" "
                iconStyle={{
                  background:
                    item.status === "Completed"
                      ? "rgb(33, 150, 243)"
                      : "rgb(233, 30, 99)",
                  color: "#fff",
                  width: "10px", // Smaller circle
                  height: "10px", // Smaller circle
                  margin: "0 auto", // Center the circle
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                contentStyle={{
                  padding: "5px",

                  backgroundColor: "#f4f4f4",
                  borderRadius: "10px",
                  marginTop: "0px",
                  marginBottom: "0px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }} // Hide card styling
                iconClassName="timeline-dot" // Optionally add a custom class to style the dot
              >
                <p className="m-0">{item.description}</p>
                <p className="text-muted m-0">
                  Time: {item.time} | Status:
                  {item.status === "Completed" ? (
                    <span className="badge bg-success">{item.status}</span>
                  ) : item.status === "Upcoming" ? (
                    <span className="badge bg-warning text-dark">
                      {item.status}
                    </span>
                  ) : (
                    <span className="badge bg-danger">Missed</span>
                  )}
                </p>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
