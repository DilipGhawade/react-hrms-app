import Header from "./Header";
import DashBoardCard from "./DashBoardCard";
import { useNavigate } from "react-router-dom";
function HrHomeComponent() {
  const navigate = useNavigate();
  const handleAddEmployee = () => {
    navigate("/addemployee");
  };
  const hanldeGetAllEmployee = () => {
    console.log("handle clicked");
    navigate("/allemployee");
  };
  const handleManageLeave = () => {
    navigate("/manageleave");
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
              title="ALL Employee"
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
              title="Manage Leave"
              onClick={handleManageLeave}
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

export default HrHomeComponent;
