import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import Header from "./Header";
const ManageLeave = () => {
  const [leaves, setLeave] = useState([]);

  useEffect(() => {
    async function fetchLeave() {
      const resp = await api.getAllLeaves();
      console.log(`Leave response : ${JSON.stringify(resp)}`);

      if (resp.success) {
        setLeave(resp.data);
      }
    }
    fetchLeave();
  }, []);

  const handleApprove = async (leaveData) => {
    console.log(
      `handle leave approve clicked and leave data is ${JSON.stringify(
        leaveData
      )}`
    );
    const updatedLeaveData = {
      ...leaveData,
      status: "Approved",
    };

    try {
      const resp = await api.updateLeave(leaveData.id, updatedLeaveData);
      if (resp.success) {
        toast.success("leave approved");
        setLeave((preveLeaves) =>
          preveLeaves.map((leave) =>
            leave.id === leaveData.id ? { ...leave, status: "Approved" } : leave
          )
        );
      }
    } catch (error) {
      console.error(`the error occured while approving the leave ${error}`);
    }
  };
  const handleCancel = async (leaveData) => {
    console.log(`handle leave cancled clicked ${leaveData}`);
    const updatedLeaveData = {
      ...leaveData,
      status: "Canceled",
    };

    try {
      const resp = await api.updateLeave(leaveData.id, updatedLeaveData);
      if (resp.success) {
        toast.success("leave Canceled");
        setLeave((preveLeaves) =>
          preveLeaves.map((leave) =>
            leave.id === leaveData.id ? { ...leave, status: "Canceled" } : leave
          )
        );
      }
    } catch (error) {
      console.error(`the error occured while approving the leave ${error}`);
    }
  };
  return (
    <>
      <Header />
      <div className="container mt-5">
        <h3>Manage Leave Requests</h3>
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave, index) => (
              <tr key={leave.id + index}>
                <td>{index + 1}</td>
                <td>{leave.userName}</td>
                <td>{leave.dateTime}</td>
                <td>{leave.reason}</td>
                <td>
                  <span
                    className={`badge ${
                      leave.status === "Approved"
                        ? "bg-success"
                        : leave.status === "Canceled"
                        ? "bg-danger"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {leave.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleApprove(leave)}
                    disabled={leave.status !== "Pending"}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleCancel(leave)}
                    disabled={leave.status !== "Pending"}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageLeave;
