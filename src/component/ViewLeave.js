import React from "react";
import { useState, useEffect } from "react";
import { api } from "../services/api";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";

const ViewLeave = () => {
  const [leaves, setLeave] = useState([]);
  const user = useSelector((state) => state.auth.user);
  console.log(`the loggin userd data is ${JSON.stringify(user)}`);

  useEffect(() => {
    async function fetchLeave(userId) {
      const resp = await api.getLeaveByUserId(userId);
      if (resp.success) {
        setLeave(resp.data);
      }
    }
    fetchLeave(user.id);
  }, [user]);

  return (
    <>
      <Header />
      <h3 className="mt-2 mx-5">Leave Data </h3>

      <ul className="list-group list-group-flush">
        {leaves.map((leave) => (
          <li key={leave.id} className="list-group-item">
            <strong>Leave Date Time: </strong>
            {leave.dateTime}
            <strong> Leave Type </strong>
            {leave.type}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ViewLeave;
