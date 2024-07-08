import download from "downloadjs";
import { useState, useEffect, Component } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import "./professorAllocated.css";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import Header from "../../components/Header";
import AllAllotment from "../../components/allAllotmentCard";

const ProfessorAllocated = () => {
  const { user } = useAuthContext();

  const navigate = useNavigate();
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  const [allotments, setAllotments] = useState(null);
  const [roles, setRoles] = useState("");
  const [history, setHistory] = useState(null);
  const [auth, setAuth] = useState(true);
  useEffect(() => {
    if (!token && role !== "professor") {
      navigate("/login");
    }
    const fetchCurrentAllotments = async () => {
      const request = await fetch(
        "http://127.0.0.1:3000/professor/get-current",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await request.json();
      setAllotments(json);
      setRoles(json["role"]);
    };
    const fetchHistoryAllotments = async () => {
      const request = await fetch("http://127.0.0.1:3000/professor/get-all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await request.json();
      setHistory(json);
    };
    const fetchAll = async () => {
      await fetchCurrentAllotments();
      await fetchHistoryAllotments();
    };
    fetchAll();
  }, [auth]);

  return (
    <div  className="d-flex flex-column" style={{ height: 100 + "vh" }}>
      <Header></Header>
      <div className="custom-container-body">
        <ul>
          <li className="">
            {allotments &&
              allotments.allotments.map((element) => (
                <AllAllotment
                  key={element._id}
                  allotment={element}
                  role={roles}
                ></AllAllotment>
              ))}
          </li>
          <li>
            {/* <div className="custom-container-content">
              <div className="drop-button">
                <h4>Previous Allotments</h4>
              </div><br></br>
              {history &&
                    history.items.map((element) => (
                      <HistoryCard key={element._id} allotment={element}></HistoryCard>
                    ))}
            </div> */}
          </li>
        </ul>
      </div>
    </div>

  );
};

export default ProfessorAllocated;
