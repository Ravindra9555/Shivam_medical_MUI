import React from "react";
import { useAdmin } from "../../../context/AdminContext";
const AdminProfile = () => {
  const { admin } = useAdmin();
  console.log(admin);
  return (
    <div>
     
      <div
        className="mt-2 d-flex justify-content-center "
        style={{ minHeight: "" }}
      >
        <div className="col-md-5 rounded secondary-background p-4">
          <h5 className="text-center"> Admin Profile </h5>
          <div className="p-4">
            <div className="d-flex justify-content-center">

            <img
              src={admin?.profilePic || "https://via.placeholder.com/150"}
              alt="Admin"
              height={150}
              width={150}
              className="rounded-circle  mb-3"
            />
            </div>
            <h6 className="text-center">{admin.name}</h6>
            <p className="text-center">{admin.email}</p>
          </div>
          <div className="text-center">
            <button className="btn btn-primary">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
