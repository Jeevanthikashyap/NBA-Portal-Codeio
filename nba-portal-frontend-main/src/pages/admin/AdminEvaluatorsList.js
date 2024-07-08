import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

// import Header from "../../components/Header";
import './AdminEvaluatorsList.css'
import { useLogout } from "../../hooks/useLogout";



const PendingApprovalTable = () => {

  const all_data = [
    {
      name: 'Chirag Manjeshwar',
      email: 'chirag.cs20@bmsce.ac.in',
      id : '1'
    },
    {
      name: 'Chirag Manjeshwar',
      email: 'chirag.cs20@bmsce.ac.in',
      id : '1'
    },
  ];

  const [data, setData] = useState(all_data);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    const filteredData = all_data.filter((row) => {
      return row.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setData(filteredData);
  };

  return (
    <div>
    <h1 style={{
      textAlign: "center",
      fontSize: "24px",
      fontWeight: "bold",
    }}>Pending Approval</h1>
    <div class="tableWrap">
      <table className="mytable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody >
          {data.map((row) => (
            <tr key={row.id}>
              <td><div style={{whiteSpace: "nowrap", width: '150px', overflow: 'scroll'}}>{row.name}</div></td>
              <td><div style={{whiteSpace: "nowrap", width: '150px', overflow: 'scroll'}}>{row.email}</div></td>
              <td><div style={{whiteSpace: "nowrap", width: '150px', overflow: 'scroll'}}><button style={{backgroundColor: "#6AC6FF"}}>View</button></div></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
            <tr>
              <th colspan="3">
                <input type="text" id="search" placeholder="Search..." onKeyUp={handleSearch} />
              </th>
            </tr>
          </tfoot>
      </table>
    </div>
    </div>
  );
};

const ActiveEvaluatorsTable = () => {

  const all_data = [
    {
      name: 'Chirag Manjeshwar',
      email: 'chirag.cs20@bmsce.ac.in',
      id : '1'
    },
    {
      name: 'Chirag Manjeshwar',
      email: 'chirag.cs20@bmsce.ac.in',
      id : '1'
    },
    {
      name: 'Chirag Manjeshwar',
      email: 'chirag.cs20@bmsce.ac.in',
      id : '1'
    },
    {
      name: 'Chirag Manjeshwar',
      email: 'chirag.cs20@bmsce.ac.in',
      id : '1'
    },
    {
      name: 'Chirag Manjeshwar',
      email: 'chirag.cs20@bmsce.ac.in',
      id : '1'
    },
    {
      name: 'Chirag Manjeshwar',
      email: 'chirag.cs20@bmsce.ac.in',
      id : '1'
    },
    {
      name: 'Chirag Manjeshwar',
      email: 'chirag.cs20@bmsce.ac.in',
      id : '1'
    },
    {
      name: 'Chirag Manjeshwar',
      email: 'chirag.cs20@bmsce.ac.in',
      id : '1'
    },
    {
      name: 'Chirag Manjeshwar',
      email: 'chirag.cs20@bmsce.ac.in',
      id : '1'
    },
    {
      name: 'Chirag Manjeshwar',
      email: 'chirag.cs20@bmsce.ac.in',
      id : '1'
    },
    {
      name: 'Chirag Manjeshwar',
      email: 'chirag.cs20@bmsce.ac.in',
      id : '1'
    },
    {
      name: 'Chirag Manjeshwar',
      email: 'chirag.cs20@bmsce.ac.in',
      id : '1'
    },
  ];

  const [data, setData] = useState(all_data);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    const filteredData = all_data.filter((row) => {
      return row.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setData(filteredData);
  };

  return (
    <div>
    <h1 style={{
      textAlign: "center",
      fontSize: "24px",
      fontWeight: "bold",
    }}>Active Evaluators</h1>
    <div class="tableWrap">
      <table className="mytable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email ID</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody >
          {data.map((row) => (
            <tr key={row.id}>
              <td><div style={{whiteSpace: "nowrap", width: '150px', overflow: 'scroll'}}>{row.name}</div></td>
              <td><div style={{whiteSpace: "nowrap", width: '150px', overflow: 'scroll'}}>{row.email}</div></td>
              <td><div style={{whiteSpace: "nowrap", width: '150px', overflow: 'scroll'}}>allocated</div></td>
              <td><div style={{whiteSpace: "nowrap", width: '150px', overflow: 'scroll'}}><button style={{backgroundColor: "#6AC6FF"}}>View Details</button></div></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
            <tr>
              <th colspan="4">
                <input type="text" id="search" placeholder="Search..." onKeyUp={handleSearch} />
              </th>
            </tr>
          </tfoot>
      </table>
    </div>
    </div>
  );
};



const AdminEvaluatorsList = () => {
  const token = Cookies.get("token");
  const role = Cookies.get('role');
  const navigate = useNavigate();
  const [auth, setAuth] = useState(true)

  useEffect(() => {
    if (!token || role !== 'admin') {
      navigate("/login");
    }
    
  }, [auth, navigate, token]);

  const {logout, error} = useLogout();

  const handleLogout = () => {
    logout();
    setAuth(false)
    console.log(error);
  }

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

    <div className="flex-grow-1 d-flex">

      <div className="flex-grow-1 flex-column d-flex align-items-center justify-content-around">
        <div className="w-100 flex-grow-1 flex-row d-flex align-items-center justify-content-around">
          <PendingApprovalTable></PendingApprovalTable>
          <ActiveEvaluatorsTable></ActiveEvaluatorsTable>
        </div>

    
        <div className="flex-grow-1 d-flex align-items-center">
        <div className="btn-group btn-groupe_4">
          <Link to="old" style={{width: 300 + 'px'}} type="button" className="btn btn-Caribbean_Green">
            View Past Evaluators
          </Link>
          <button type="button" className="btn btn-Caribbean_Green_2">
            <span
              className="text-white fa fa-users"
              aria-hidden="true"
            />
          </button>
        </div>
        </div>
      </div>
      



    </div>

  </div>

</>

  );
};

export default AdminEvaluatorsList;