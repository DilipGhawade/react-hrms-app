import React, { useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { backgroundStyle } from "../customstyles";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function AddEmployee() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    phoneno: "",
    department: "",
    address: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError((prev) => ({
      ...prev,
      [name]: "", // clear field-specific error
    }));
  };

  const handleSaveEmployee = async (e) => {
    e.preventDefault();
    //  let formValid = true;
    const newErrors = {};

    for (const [key, value] of Object.entries(form)) {
      if (!value.trim()) {
        newErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required.`;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }
    try {
      const registerResponse = await api.addEmployee(form);
      if (registerResponse.success) {
        navigate("/dashborad");
        toast.success("User Register Successfully ");
      } else {
        toast.error(`Error: ${registerResponse.error}`);
      }
      console.log(`Register Response is => ${registerResponse}`);
    } catch (error) {
      // toast.error(`Error: ${error}`);
      console.error(`error ading employee ${error}`);
    }
    setForm({
      name: "",
      email: "",
      password: "",
      role: "",
      phoneno: "",
      department: "",
      address: "",
    });
    setError("");
  };
  return (
    <>
      <Header />
      <div>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card show">
                <div className="card-body">
                  <h2 className="text-center mb-4">Add New Employee</h2>

                  <form className="text-start" onSubmit={handleSaveEmployee}>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="name">
                        Name:{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={form.name}
                        placeholder="Enter Name"
                        onChange={handleChange}
                      />
                      {error && <p className="text-danger">{error.name}</p>}
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="email">
                        Email Address:
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        vlaue={form.email}
                        placeholder="Enter Email Address"
                        onChange={handleChange}
                      />
                      {error && <p className="text-danger">{error.email}</p>}
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="password">
                        Password:{" "}
                      </label>
                      <input
                        className="form-control"
                        type="password"
                        id="password"
                        value={form.password}
                        name="password"
                        placeholder="Enter Password"
                        onChange={handleChange}
                      />
                      {error && <p className="text-danger">{error.password}</p>}
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="phoneno">
                        Phone Number:
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="phoneno"
                        name="phoneno"
                        value={form.phoneno}
                        placeholder="Enter Phone Number"
                        onChange={handleChange}
                      />
                      {error && <p className="text-danger">{error.phoneno}</p>}
                    </div>
                    <div className="mb-3">
                      <label className="form-lable" htmlFor="department">
                        Department:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="department"
                        name="department"
                        value={form.department}
                        placeholder="Enter Department"
                        onChange={handleChange}
                      />
                      {error && (
                        <p className="text-danger">{error.department}</p>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="address">
                        Address:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={form.address}
                        placeholder="Enter Address"
                        onChange={handleChange}
                      />
                      {error && <p className="text-danger">{error.address}</p>}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="role" className="form-label">
                        Select Role
                      </label>
                      <select
                        className="form-select"
                        id="role"
                        name="role"
                        onChange={handleChange}
                      >
                        <option value="hr">Hr</option>
                        <option value="employee">Employee</option>
                        <option vlaue="admin">Admin</option>
                      </select>
                      {error && <p className="text-danger">{error.role}</p>}
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddEmployee;
