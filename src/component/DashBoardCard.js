import React from "react";
import { cardstyle } from "../styles/card";
const DashBoardCard = ({ title = "Hrms", onClick, btnText = "" }) => {
  return (
    <div className="card" style={cardstyle} onClick={onClick}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
      </div>
    </div>
  );
};

export default DashBoardCard;
