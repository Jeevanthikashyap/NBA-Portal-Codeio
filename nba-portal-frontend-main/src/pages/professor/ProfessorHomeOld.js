import download from "downloadjs";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router";

import Header from "../../components/Header";
import "./professorHomeOld.css";
import AllotmentsCard from "../../components/allotmentCard";
import HistoryCard from "../../components/historyCard";
import { useLogout } from "../../hooks/useLogout";

const ProfessorHome = (props) => {
  const navigate = useNavigate();
  let { id } = useParams();
  const params = id.split("&");
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  const [allotments, setAllotments] = useState(null);
  const [history, setHistory] = useState(null);
  const [auth, setAuth] = useState(true);
  useEffect(() => {
    if (!token && role !== "professor") {
      navigate("/login");
    }
    const fetchCurrentAllotment = async () => {
      const request = await fetch(
        `http://127.0.0.1:3000/professor/get-current-one/${params[0]}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await request.json();
      console.log(json);
      setAllotments(json);
    };
    fetchCurrentAllotment();
  }, [auth]);

  const { logout, isLoading, error } = useLogout();
  const componentRef = useRef();
  const downloadAlloc = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "data",
    onAfterPrint: () => alert("download success"),
  });

  const handleLogout = () => {
    logout();
    setAuth(false);
    console.log(error);
  };

  return (
    <div ref={componentRef}>
      <Header></Header>
      <div className="custom-container-body">
        <ul>
          <li className="">
            {allotments && (
              <AllotmentsCard
                allotment={allotments}
                role={params[1]}
              ></AllotmentsCard>
            )}
            <button
              style={{ width: 300 + "px" }}
              className="m-2 card-button"
              onClick={downloadAlloc}
            >
              Download Allocation Details
            </button>
          </li>
          <li></li>
        </ul>
      </div>
    </div>
  );
};

export default ProfessorHome;
