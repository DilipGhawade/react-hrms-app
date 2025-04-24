import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import { ToastContainer } from "react-toastify";
import DashBoard from "./component/DashBoard";
import AllEmpolyee from "./component/AllEmployee";
import AddEmployee from "./component/AddEmployee";
import PunchInOut from "./component/PunchInOut";
import ViewAttendance from "./component/ViewAttendance";
import ViewLeave from "./component/ViewLeave";
import ManageLeave from "./component/ManageLeave";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashborad" element={<DashBoard />} />
          <Route path="/allemployee" element={<AllEmpolyee />} />
          <Route path="/addemployee" element={<AddEmployee />} />
          <Route path="/punchinout" element={<PunchInOut />} />
          <Route path="/viewattendance" element={<ViewAttendance />} />
          <Route path="/viewleave" element={<ViewLeave />} />
          <Route path="/manageleave" element={<ManageLeave />} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose="3000"></ToastContainer>
    </>
  );
}

export default App;
