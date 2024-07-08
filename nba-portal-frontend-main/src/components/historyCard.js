import download from "downloadjs";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import "../pages/professor/professorHomeOld.css";
import { useAuthContext } from "../hooks/useAuthContext";

const HistoryCard = (allotment) => {
    const all = allotment.allotment
  return (
    <div className="current-allotment-card">
      <div className="top-header">
        <h4>College Name: {all["collegeName"]}</h4>
      </div>
      <div className="allotment-content">
        <h6>Department: {all["department"]}</h6>
        <h6>Address: {all["address"]}</h6>
        <h6>Date: //here</h6>
      </div>
    </div>
  );
};

export default HistoryCard;
