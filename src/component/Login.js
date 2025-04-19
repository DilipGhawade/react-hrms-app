import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { backgroundStyle } from "../customstyles";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../services/authslice";

const Login = () => {
  // the below are used to set the backgrund style
  const dispatch = useDispatch();
  const carouselImageSyle = {
    height: "400px",
    objectFit: "cover",
    borderRadius: "10px",
  };

  const carouselCaptionStyle = {
    background: "rgba(0,0,0,0.5)",
    borderRadius: "10px",
    padding: "20px",
  };
  // the style is ended here
  const navigate = useNavigate();
  const [form, setForm] = useState({ userEmail: "", password: "" });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await api.getAllEmployee();

    if (resp.success) {
      console.log("Full Response:", resp);
      const users = resp.data;
      const matchedUser = users.find(
        (user) =>
          user.email === form.userEmail && user.password === form.password
      );
      if (matchedUser) {
        dispatch(login(matchedUser));
        toast.success("User login successfully");
        console.log(`Logged in as: ${matchedUser.name}`);
        // Redirect or do something after successful login
        navigate("/dashborad");
      } else {
        toast.error("Failed to login: Invalid credentials");
      }
      // toast.success("User fetched successfully ", resp.data);
    } else {
      console.error(`Error Response ${resp.error}`);
      toast.error("Failed to fetch users");
    }

    // for (const user of resp.data) {
    //   if (form.userEmail === user.email && form.password === user.password) {
    //     toast.success("User login successfully");
    //     return;
    //   } else {
    //     toast.error("Failed  to login invalid credentails");
    //   }
    //   console.log(`the user data is ${user.name}`);
    // }
  };

  return (
    <div style={backgroundStyle}>
      <div className="container">
        <div className="row justify-content-center g-4">
          <div className="col-md-8">
            <div
              id="loginCarousel"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#loginCarousel"
                  data-bs-slide-to="0"
                  className="active"
                />
                <button
                  type="button"
                  data-bs-target="#loginCarousel"
                  data-bs-slide-to="1"
                />
                <button
                  type="button"
                  data-bs-target="#loginCarousel"
                  data-bs-slide-to="2"
                />
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="d-block w-100"
                    alt="HRMS"
                    style={carouselImageSyle}
                  />
                  <div
                    className="carousel-caption"
                    style={carouselCaptionStyle}
                  >
                    <h3>Welcome To HRMS</h3>
                    <p>
                      streamline your hr operation with our comprenhensive
                      solution
                    </p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="d-block w-100"
                    alt="Team Management"
                    style={carouselImageSyle}
                  />
                  <div className="carousel-caption">
                    <h3>Employee Management</h3>
                    <p>Efficiently manage your workforce</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img
                    src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="d-block w-100"
                    alt="Performance Analysis"
                    style={carouselImageSyle}
                  />
                  <div
                    className="carousel-caption"
                    style={{
                      background: "rgba(0,0,0,0.5)",
                      borderRadius: "10px",
                      padding: "20px",
                    }}
                  >
                    <h3>Performance Tracking</h3>
                    <p>Monitor and improve employee performance</p>
                  </div>
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#loginCarousel"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#loginCarousel"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card show h-100">
              <div className="card-body p-4">
                <h2 className="text-center mb-4">Login</h2>
                {error && <p className="text-danger">{error}</p>}
                <form className="text-start" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="userEmail"
                      name="userEmail"
                      value={form.userEmail}
                      placeholder="Enter Email address"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={form.password}
                      placeholder="Enter Password"
                      onChange={handleInputChange}
                    />
                  </div>
                  {/* <div className="mb-3">
                    <label htmlFor="role" className="form-label">
                      Login As
                    </label>
                    <select
                      className="form-select"
                      id="role"
                      name="role"
                      onChange={handleInputChange}
                    >
                      <option value="hr">Hr</option>
                      <option value="employee">Employee</option>
                      <option vlaue="admin">Admin</option>
                    </select>
                  </div> */}

                  <label
                    className="text-primary mb-4"
                    onClick={handleRegisterClick}
                  >
                    Yet not register click here to register!!
                  </label>
                  <button type="submit" className="btn btn-primary w-100">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
