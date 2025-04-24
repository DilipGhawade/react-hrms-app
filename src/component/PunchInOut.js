import React from "react";
import Header from "./Header";
import DashBoardCard from "./DashBoardCard";
import { useState } from "react";
import PunchInOutModel from "./PunchInOutModel";
import { useNavigate } from "react-router-dom";

const PunchInOut = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showLeaveModel, setShowLeaveMOdel] = useState(false);

  const handlePunchIn = () => {
    // console.log("handle puch in called");

    setShowModal(true);
  };

  const handleLeave = () => {
    setShowLeaveMOdel(true);
  };
  const handleViewLeave = () => {
    navigate("/viewleave");
  };
  const handleViewAttendance = () => {
    navigate("/viewattendance");
  };
  return (
    <>
      <Header />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3 mb-4">
            <DashBoardCard title="Punch In/Out" onClick={handlePunchIn} />
          </div>
          <div className="col-md-3 mb-4">
            <DashBoardCard title="Apply Leave" onClick={handleLeave} />
          </div>
          <div className="col-md-3 mb-4">
            <DashBoardCard title="View Leave" onClick={handleViewLeave} />
          </div>
          <div className="col-md-3 mb-4">
            <DashBoardCard
              title="View Attendance"
              onClick={handleViewAttendance}
            />
          </div>
        </div>

        <PunchInOutModel
          show={showModal}
          onClose={() => setShowModal(false)}
          punchText="In/Out"
          isForLeave={false}
        />
        <PunchInOutModel
          show={showLeaveModel}
          onClose={() => setShowLeaveMOdel(false)}
          punchText="Applye Leave"
          isForLeave={true}
        />
      </div>
    </>
  );
};

export default PunchInOut;
