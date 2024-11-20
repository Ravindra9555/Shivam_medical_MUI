import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
 import { useUser } from "../../../context/UserContext";
 import UserCompleteProfile from "./UserCompleteProfile";
 import { DailyActivities } from "../../../views/dashboards/dashboard1-components";
 import {SalesOverview } from "../../../views/dashboards/dashboard1-components";
const UserDashboard = () => {
   const { user } = useUser();

  return (

    <div className="row">
      {user && !user.name &&(

      <UserCompleteProfile />
      )}
      <div className="col-md-6 ">
        <div className="p-4 m-3 rounded-4 border shadow-sm  d-flex align-items-center">
          <img
            src={user.profilePic}
            alt="User Avatar"
            className="rounded"
            height={120}
            width={120}
          />
          <div className="ms-4">
            <h5>
              Hi! 👋 <span className="text-capitalize">{user.name}</span>, Welcome
              back to <span className="text-success">Shivam Medical</span>!
            </h5>
          </div>

        </div>
        <SalesOverview/>

      </div>
      <div className="col-md-6  ">
        
         <DailyActivities/>
       
      </div>
    </div>
  );
};

export default UserDashboard;
