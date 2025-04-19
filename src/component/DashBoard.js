import { useSelector } from "react-redux";

function DashBoard() {
  const user = useSelector((state) => state.auth.user);
  return (
    <h2>
      DashBoard: {user.name} and role is: {user.role}
    </h2>
  );
}

export default DashBoard;
