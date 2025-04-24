import React, { useState } from "react";
import { useSelector } from "react-redux";
import { customModalContent, customModalOverlay } from "../customstyles";
import { api } from "../services/api";
import { toast } from "react-toastify";

const PunchInOutModel = ({ show, onClose, punchText, isForLeave = false }) => {
  const user = useSelector((state) => state.auth.user);

  const [form, setForm] = useState({
    id: "",
    userId: "",
    userName: "",
    dateTime: "",
    type: "", // punchin / punchout
    location: "",
    notes: "",
    createdAt: "",
    reason: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handlePuchInOut = async (e) => {
    e.preventDefault();

    const finalForm = {
      ...form,
      id: user?.id || "",
      userId: user?.id || "",
      userName: user?.name || "",
      createdAt: new Date().toISOString(),
    };

    const requiredFields = ["dateTime", "type"];
    const newErrors = {};

    requiredFields.forEach((key) => {
      if (!finalForm[key]?.trim()) {
        newErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // console.log("finalForm JSON:", JSON.stringify(finalForm, null, 2));

    try {
      const response = await api.punchIn(finalForm);
      console.log(`Punch Response:`, response);
      toast.success("Punch submitted successfully!");
      onClose();
    } catch (error) {
      toast.error("Error submitting punch.");
      console.error(`Punch error: ${error}`);
    }
  };

  const handleLeave = async (e) => {
    e.preventDefault();
    const finalForm = {
      ...form,
      id: user?.id || "",
      userId: user?.id || "",
      userName: user?.name || "",
      createdAt: new Date().toISOString(),
    };

    const requiredFields = ["dateTime", "type"];
    const newErrors = {};

    requiredFields.forEach((key) => {
      if (!finalForm[key]?.trim()) {
        newErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await api.applyLeave(finalForm);
      if (response.success) {
        toast.success("leave applied successfully!");
        onClose();
      }
    } catch (error) {
      toast.error(`Failed to apply leave ${error}`);
    }
  };
  if (!show) return null;

  return (
    <div style={customModalOverlay}>
      <div style={customModalContent}>
        <div className="modal-header">
          <h5 className="modal-title">
            Punch {punchText} <strong>{user.name}</strong>
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
          ></button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="dateTime">Select Date and Time:</label>
            <input
              type="datetime-local"
              className="form-control"
              id="dateTime"
              name="dateTime"
              value={form.dateTime}
              onChange={handleChange}
            />
            {errors.dateTime && (
              <p className="text-danger">{errors.dateTime}</p>
            )}

            <label htmlFor="type" className="form-label mt-3">
              {isForLeave ? "Select Leave Type: " : "Select Punch Type:"}
            </label>
            <select
              className="form-select"
              id="type"
              name="type"
              value={form.type}
              onChange={handleChange}
            >
              <option value="">
                {isForLeave ? "Select Leave Type " : "Select Punch Type"}
              </option>
              <option value={isForLeave ? "Causel Leave" : "punchin"}>
                {isForLeave ? "Causel Leave" : "Punch In"}
              </option>
              <option value={isForLeave ? "Earned Leave" : "punchout"}>
                {isForLeave ? "Earned Leave" : "Punch Out"}
              </option>
            </select>
            {errors.type && <p className="text-danger">{errors.type}</p>}

            <label
              htmlFor={isForLeave ? "reason" : "location"}
              className="mt-3"
            >
              {isForLeave ? "Enter Reason" : "Enter Location:"}
            </label>
            <input
              type="text"
              className="form-control"
              id={isForLeave ? "reason" : "location"}
              name={isForLeave ? "reason" : "location"}
              value={isForLeave ? form.reason : form.location}
              onChange={handleChange}
            />

            <label htmlFor="notes" className="mt-3">
              Enter Notes:
            </label>
            <textarea
              className="form-control"
              id="notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="modal-footer mt-4">
          <button
            className="btn btn-primary"
            onClick={isForLeave ? handleLeave : handlePuchInOut}
          >
            Apply: {form.type || punchText}
          </button>
          <button className="btn btn-secondary ml-5" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PunchInOutModel;
