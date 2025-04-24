import Header from "./Header";
import DashBoardCard from "./DashBoardCard";
import { useNavigate } from "react-router-dom";
function EmployeeHome() {
  const navigate = useNavigate();
  const handleApplyeeLeave = () => {};
  const handlePunchInOut = () => {
    navigate("/punchinout");
  };
  return (
    <>
      <Header />
      <div className="row mt-5">
        <DashBoardCard
          title="Punch In/Out And Apply Leave"
          onClick={handlePunchInOut}
        />
      </div>
    </>
  );
}
export default EmployeeHome;
