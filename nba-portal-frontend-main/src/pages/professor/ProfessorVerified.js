import download from "downloadjs";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import "./professorVerified.css";
import { useLogout } from "../../hooks/useLogout";
import Header from "../../components/Header";

const ProfessorUnverified = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const role = Cookies.get("role");

  const [auth, setAuth] = useState(true)
  useEffect(() => {
    if(!token && role !== "professor"){
      navigate("/login")
    }
  }, [auth, navigate, role, token]);

  const {logout, error} = useLogout();

  const handleLogout = () => {
    logout();
    setAuth(false)
    console.log(error);
  }

  return (
    <div className="d-flex flex-column" style={{height: 100 + 'vh'}}>
        <div className="banner flex-container align-items-center" style={{
          backgroundColor: "#17415f",
        }}>
        <div style={{ flexGrow: 1 }}>
          <img src="/assets/nba_logo.png" alt="" />
        </div>
        <div style={{ flexGrow: 1 }}>
          <img src="/assets/eNBA_logo.png" alt="" />
        </div>
        <div className="m-4" style={{ flexGrow: 0 }}>
          <button onClick={handleLogout} type="button" className="btn btn-custom-blue">
            <i className="fa fa-sign-out" /> Logout
          </button>
        </div>
      </div>

      <div className="flex-grow-1 d-flex flex-row align-items-center justify-content-center">
        <div>
        <div className="mycard" style={{width: 400 + 'px', overflow: 'hidden'}}>
            <div className="p-2 card-title">Status: Active (Unallocated)</div>
            <div className="p-4 card-text">
              <div style={{textAlign: "center"}}>You are an active evaluator. You may be allocated as a visiting evaluator for NBA Accreditation.<br></br><br></br></div>
              <div className="d-flex flex-row">
                <button class="card-button">Opt Out</button>
                <button class="card-button">View Profile</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessorUnverified;