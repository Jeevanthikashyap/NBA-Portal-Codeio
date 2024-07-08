import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { MDBRadio, MDBBtnGroup, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as XLSX from 'xlsx';
import readXlsxFile from 'read-excel-file'
import {
  faFileUpload,
  faFileDownload,
} from "@fortawesome/free-solid-svg-icons";

// import Header from "../../components/Header";
import "./CollegeEvaluatorsList.css";
import { useLogout } from "../../hooks/useLogout";
import Header from "../../components/Header";

const PendingApprovalTable = () => {
  const all_data = [
    {
      name: "Chirag Manjeshwar",
      email: "chirag.cs20@bmsce.ac.in",
      id: "1",
    },
    {
      name: "Chirag Manjeshwar",
      email: "chirag.cs20@bmsce.ac.in",
      id: "1",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const Popup = (props) => {
    return (
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={props.handleClose}>
            x
          </span>
          {props.content}
        </div>
      </div>
    );
  };

  const [data, setData] = useState(all_data);
  const [isManual, setIsManual] = useState(true);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    const filteredData = all_data.filter((row) => {
      return row.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setData(filteredData);
  };

  const inputTrigger = () => {
    document.getElementById("upload").click();
  };

  const [fileName, setFileName] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

  const uploadReport = async (event) => {
    setIsSelected(true);
    setFileName(event.target.files[0].name);
    setSelectedFile(event.target.files[0]);
    readXlsxFile(event.target.files[0]).then((rows) => {
      for (let index = 1; index < rows.length; index++) {
        const element = rows[index][1];
        console.log(element)
        
      }
    })
  };

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Pending Approval
      </h1>
      <div class="tableWrap">
        <table className="mytable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      width: "150px",
                      overflow: "scroll",
                    }}
                  >
                    {row.name}
                  </div>
                </td>
                <td>
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      width: "150px",
                      overflow: "scroll",
                    }}
                  >
                    {row.email}
                  </div>
                </td>
                <td>
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      width: "150px",
                      overflow: "scroll",
                    }}
                  >
                    <button style={{ backgroundColor: "#6AC6FF" }}>View</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th colspan="3">
                <div className="w-100 d-flex justify-content-around">
                  <input
                    type="text"
                    id="search"
                    placeholder="Search..."
                    onKeyUp={handleSearch}
                  />
                  <button
                    style={{
                      whiteSpace: "nowrap",
                      marginLeft: "10px",
                      backgroundColor: "#6AC6FF",
                    }}
                    onClick={togglePopup}
                  >
                    Add Evaluator(s)
                  </button>
                </div>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
      {isOpen && (
        <div style={{ zIndex: 1, color: "black" }}>
          <Popup
            content={
              <div>
                <div class="btn-group">
                  <input
                    type="radio"
                    class="btn-check"
                    name="options"
                    id="option1"
                    autocomplete="off"
                    onChange={() => setIsManual(true)}
                  />
                  <label class="btn btn-secondary" for="option1">
                    Manual Entry
                  </label>

                  <input
                    type="radio"
                    class="btn-check"
                    name="options"
                    id="option2"
                    autocomplete="off"
                    onChange={() => setIsManual(false)}
                  />
                  <label class="btn btn-secondary" for="option2">
                    Upload Excel Sheet
                  </label>
                </div>
                {isManual && (
                  <div>
                    <br />

                    <MDBInput
                      label="Name of the professor"
                      id="formControlLg"
                      type="text"
                      size="lg"
                    />
                    <MDBInput
                      label="Email of the professor"
                      id="formControlLg"
                      type="text"
                      size="lg"
                    />
                    <MDBInput
                      label="Department of the professor"
                      id="formControlLg"
                      type="text"
                      size="lg"
                    />
                    <MDBInput
                      label="Designation of the professor"
                      id="formControlLg"
                      type="text"
                      size="lg"
                    />
                    <br />
                    <MDBBtn>Add Evaluator</MDBBtn>
                  </div>
                )}

                {!isManual && (
                  <div>
                    <input
                      type="file"
                      id="upload"
                      style={{ display: "none" }}
                      onChange={uploadReport}
                      multiple
                    ></input>
                    <br />
                    <br />
                    <MDBBtn onClick={inputTrigger}>
                      <FontAwesomeIcon icon={faFileUpload} /> Upload Sheet
                    </MDBBtn>
                  </div>
                )}
              </div>
            }
            handleClose={togglePopup}
          />
        </div>
      )}
    </div>
  );
};

const ActiveEvaluatorsTable = () => {
  const all_data = [
    {
      name: "Chirag Manjeshwar",
      email: "chirag.cs20@bmsce.ac.in",
      id: "1",
    },
    {
      name: "Chirag Manjeshwar",
      email: "chirag.cs20@bmsce.ac.in",
      id: "1",
    },
    {
      name: "Chirag Manjeshwar",
      email: "chirag.cs20@bmsce.ac.in",
      id: "1",
    },
    {
      name: "Chirag Manjeshwar",
      email: "chirag.cs20@bmsce.ac.in",
      id: "1",
    },
    {
      name: "Chirag Manjeshwar",
      email: "chirag.cs20@bmsce.ac.in",
      id: "1",
    },
    {
      name: "Chirag Manjeshwar",
      email: "chirag.cs20@bmsce.ac.in",
      id: "1",
    },
    {
      name: "Chirag Manjeshwar",
      email: "chirag.cs20@bmsce.ac.in",
      id: "1",
    },
    {
      name: "Chirag Manjeshwar",
      email: "chirag.cs20@bmsce.ac.in",
      id: "1",
    },
    {
      name: "Chirag Manjeshwar",
      email: "chirag.cs20@bmsce.ac.in",
      id: "1",
    },
    {
      name: "Chirag Manjeshwar",
      email: "chirag.cs20@bmsce.ac.in",
      id: "1",
    },
    {
      name: "Chirag Manjeshwar",
      email: "chirag.cs20@bmsce.ac.in",
      id: "1",
    },
    {
      name: "Chirag Manjeshwar",
      email: "chirag.cs20@bmsce.ac.in",
      id: "1",
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
      <h1
        style={{
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Active Evaluators
      </h1>
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
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      width: "150px",
                      overflow: "scroll",
                    }}
                  >
                    {row.name}
                  </div>
                </td>
                <td>
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      width: "150px",
                      overflow: "scroll",
                    }}
                  >
                    {row.email}
                  </div>
                </td>
                <td>
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      width: "150px",
                      overflow: "scroll",
                    }}
                  >
                    allocated
                  </div>
                </td>
                <td>
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      width: "150px",
                      overflow: "scroll",
                    }}
                  >
                    <button style={{ backgroundColor: "#6AC6FF" }}>
                      View Details
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th colspan="4">
                <input
                  type="text"
                  id="search"
                  placeholder="Search..."
                  onKeyUp={handleSearch}
                />
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

const CollegeEvaluatorsList = () => {
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  const navigate = useNavigate();
  const [auth, setAuth] = useState(true);

  useEffect(() => {
    if (!token || role !== "college") {
      navigate("/login");
    }
  }, [auth, navigate, token]);

  const { logout, error } = useLogout();

  const handleLogout = () => {
    logout();
    setAuth(false);
    console.log(error);
  };

  return (
    <>
      <div className="d-flex flex-column" style={{ height: 100 + "vh" }}>
        <Header></Header>

        <div className="flex-grow-1 d-flex">
          <div className="flex-grow-1 flex-column d-flex align-items-center justify-content-around">
            <div className="w-100 flex-grow-1 flex-row d-flex align-items-center justify-content-around">
              <PendingApprovalTable></PendingApprovalTable>
              <ActiveEvaluatorsTable></ActiveEvaluatorsTable>
            </div>

            <div className="flex-grow-1 d-flex align-items-center">
              <div className="btn-group btn-groupe_4">
                <Link
                  to="old"
                  style={{ width: 300 + "px" }}
                  type="button"
                  className="btn btn-Caribbean_Green"
                >
                  View Past Evaluators
                </Link>
                <button type="button" className="btn btn-Caribbean_Green_2">
                  <span className="text-white fa fa-users" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollegeEvaluatorsList;
