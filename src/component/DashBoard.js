import { useSelector } from "react-redux";
import AdminHome from "./AdminHome";
import HrHomeComponent from "./HrHomeComponent";
import EmployeeHome from "./EmployeeHome";

function DashBoard() {
  const user = useSelector((state) => state.auth.user);
  if (!user) return <div>Please log in</div>;
  const role = user.role?.toLowerCase();

  switch (role) {
    case "admin":
      return <AdminHome />;
    case "hr":
      return <HrHomeComponent />;
    case "employee":
      return <EmployeeHome />;

    default:
      return <div>Role not recognized</div>;
  }
}

export default DashBoard;
