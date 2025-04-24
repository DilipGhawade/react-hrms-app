import React from "react";
import Header from "./Header";
import DashBoardCard from "./DashBoardCard";
import { useNavigate } from "react-router-dom";

function AdminHome() {
  const navigate = useNavigate();
  const hanldeGetAllEmployee = () => {
    console.log("handle clicked");
    navigate("/allemployee");
  };
  const handleAddEmployee = () => {
    navigate("/addemployee");
  };
  const handlePunchInOut = () => {
    navigate("/punchinout");
  };
  return (
    <>
      <Header />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3 mb-4">
            <DashBoardCard
              title="Employee"
              onClick={hanldeGetAllEmployee}
              btnText="Get All employees"
            />
          </div>
          <div className="col-md-3 mb-4">
            <DashBoardCard
              title="Add New Employee"
              onClick={handleAddEmployee}
              btnText="Add Employee"
            />
          </div>
          <div className="col-md-3 mb-4">
            <DashBoardCard
              title="Punch In/Out And Apply Leave"
              onClick={handlePunchInOut}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
