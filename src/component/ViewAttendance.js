import React from "react";
import { useState, useEffect } from "react";
import { api } from "../services/api";
import Header from "./Header";
import { listStyle } from "../customstyles";
import { useSelector, useDispatch } from "react-redux";

const ViewAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    async function fetchAttendance(userId) {
      const response = await api.getAllPunchInOutData(userId);
      if (response.success) {
        setAttendance(response.data);
      }
    }
    fetchAttendance(user.id);
  }, [user]);

  return (
    <>
      <Header />
      <h3 className="mt-2 mx-5">Attendance Data </h3>
      <ul className="list-group list-group-flush" style={listStyle}>
        {attendance.map((punchinut) => (
          <li key={punchinut.id} className="list-group-item">
            <strong>Punch DateTimeL</strong> {punchinut.dateTime}{" "}
            <strong>Punch Type: </strong>
            {punchinut.type}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ViewAttendance;
