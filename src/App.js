import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import { ToastContainer } from "react-toastify";
import DashBoard from "./component/DashBoard";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="dashborad" element={<DashBoard />} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose="3000"></ToastContainer>
    </>
  );
}

export default App;
