import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

// import Header from "../../components/Header";
import "./evaluatorsList.css";
import { useLogout } from "../../hooks/useLogout";
import Header from "../../components/Header";

const EvaluatorsList = () => {
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  const navigate = useNavigate();
  const [auth, setAuth] = useState(true);

  useEffect(() => {
    if (!token || role !== "college") {
      navigate("/login");
    }
  }, [auth]);

  const { logout, isLoading, error } = useLogout();

  const handleLogout = () => {
    logout();
    setAuth(false);
    console.log(error);
  };

  return (
    <>
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
  <div className="d-flex flex-column" style={{height: 100 + 'vh'}}>
  <table class="table-fill">
<thead>
<tr>
<th class="text-left">Name</th>
<th class="text-left">Email</th>
<th class="text-left">Profile</th>
<th class="text-left">Action</th>
</tr>
</thead>
<tbody class="table-hover">
<tr>
<td class="text-left">Chirag Manjeshwar</td>
<td class="text-left">chirag.cs20@bmsce.ac.in</td>
<td>
  <button onClick={handleLogout} type="button" className="btn btn-custom-blue">
  View Profile
  </button>
</td>
<td>
  <button onClick={handleLogout} type="button" className="btn btn-custom-blue">
  Terminate
  </button>
</td>
</tr>
<tr>
<td class="text-left">Nisha Purushotham</td>
<td class="text-left">nisha.cs20@bmsce.ac.in</td>
<td>
  <button onClick={handleLogout} type="button" className="btn btn-custom-blue">
  View Profile
  </button>
</td>
<td>
  <button onClick={handleLogout} type="button" className="btn btn-custom-blue">
  Terminate
  </button>
</td>
</tr>
<tr>
<td colspan="2"  >
  <button onClick={handleLogout} type="button" className="btn btn-custom-blue">
  Add Evaluator
  </button>
</td>
<td colspan="2">
  <button onClick={handleLogout} type="button" className="btn btn-custom-blue">
  View Evaluator Application Status
  </button>
</td>
</tr>
</tbody>
</table>
  
  </div>
  </div>
</>

  );
};

export default EvaluatorsList;
