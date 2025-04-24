import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../services/authslice";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css"; // keep your custom styles if needed

function Header() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <header className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
      <div className="h5 m-0">
        Welcome, {user.name} — Role: {user.role}
      </div>
      <div className="dropdown" ref={dropdownRef}>
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {initials}
        </button>
        <ul
          className={`dropdown-menu dropdown-menu-end ${
            dropdownOpen ? "show" : ""
          }`}
        >
          <li>
            <button className="dropdown-item" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
