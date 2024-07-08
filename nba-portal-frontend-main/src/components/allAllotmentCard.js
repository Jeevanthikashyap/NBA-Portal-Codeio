import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { useReactToPrint } from "react-to-print";
import AllotmentPDF from "./allotmentPDF";

const AllAllotment = (allotment) => {
  const all = allotment.allotment;
  const roles = allotment.role;
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  const componentRef = useRef();


  const reportSubmission = (id) => {
    navigate(`/professor/submit/${id}&${roles}`);
  };


  const downloadAlloc = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "data",
    onAfterPrint: () => alert("download success"),
  });

  const navigate = useNavigate();

  return (
    <div className="flex-grow-1 d-flex flex-row align-items-center justify-content-center">
      <div>
        <div className="mycard" style={{ width: 400 + "px" }}>
          <div className="p-2 card-title">Status: Allocated </div>
          <div className="p-4 card-text">
            <div style={{ textAlign: "left" }}>
              You have been allocated to a visting team for <strong>{all['collegeName']}</strong> . Kindly
              download the details. Please submit the report within the deadline
              mentioned.
              <br></br>
              <br></br>
            </div>
            <div className="d-flex flex-column flex-row align-items-center justify-content-center">
              <button
                style={{ width: 300 + "px" }}
                className="m-2 card-button"
                onClick={() => {
                    reportSubmission(all['_id'])
                }}
              >
                Report Submission Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllAllotment;
