import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { listStyle } from "../customstyles";
import Header from "./Header";
const AllEmpolyee = () => {
  const [users, setAllUsers] = useState([]);

  useEffect(() => {
    async function fetchEmployee() {
      const resp = await api.getAllEmployee();
      console.log(`the user resp form All Employee ${resp.data}`);
      if (resp.success) {
        setAllUsers(resp.data);
      }
    }
    fetchEmployee();
  }, []);

  return (
    <>
      <Header />
      <h3>All Employee</h3>
      <ul className="list-group list-group-flush" style={listStyle}>
        {users.map((user) => (
          <li key={user.id} className="list-group-item">
            {user.name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default AllEmpolyee;
