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
import './adminHome.css'
import { useLogout } from "../../hooks/useLogout";
import Header from "../../components/Header";

const AdminHome = () => {
  const token = Cookies.get("token");
  const role = Cookies.get('role');
  const navigate = useNavigate();
  const [auth, setAuth] = useState(true)

  useEffect(() => {
    if (!token || role !== 'admin') {
      navigate("/login");
    }
    
  }, [auth, navigate, token]);

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

  const [isManual, setIsManual] = useState(true);

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
    if(isManual){
      readXlsxFile(event.target.files[0]).then((rows) => {
        for (let index = 1; index < rows.length; index++) {
          const element = rows[index][1];
          console.log(element)
          
        }
      })
    } else {
      console.log("this is a college ranking file")
    }
  };

  return (
    <div className="html body">
  <div className="d-flex flex-column" style={{height: 100 + 'vh'}}>
  <Header></Header>
    <div className="flex-grow-1 d-flex flex-row align-items-center justify-content-center">
      <div
        style={{ width: "65%" }}
        className="d-flex flex-column align-items-center justify-content-center"
      >
        <div>
          <div className="p-5 card-body custom-card d-flex flex-column align-items-center justify-content-center">
            <div className="btn-group btn-groupe_4">
              <Link to="evaluators_list" style={{width: 300 + 'px'}} type="button" className="btn btn-Caribbean_Green">
                Evaluators List
              </Link>
              <button type="button" className="btn btn-Caribbean_Green_2">
                <span
                  className="text-white fa fa-check-circle"
                  aria-hidden="true"
                />
              </button>
            </div>
            <div className="btn-group btn-groupe_4 mt-5">
              <Link to="accreditation_visits" style={{width: 300 + 'px'}} type="button" className="btn btn-Caribbean_Green">
                Accreditation Visits
              </Link>
              <button type="button" className="btn btn-Caribbean_Green_2">
                <span
                  className="text-white fa fa-suitcase"
                  aria-hidden="true"
                />
              </button>
            </div>
            <div className="btn-group btn-groupe_4 mt-5">
              <Link  style={{width: 300 + 'px'}} type="button" className="btn btn-Caribbean_Green" onClick={togglePopup}>
                Add Users (Excel Sheet)
              </Link>
              <button type="button" className="btn btn-Caribbean_Green_2">
                <span
                  className="text-white fa fa-user-plus"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{ width: "35%" }}
        className="d-flex flex-column align-items-center justify-content-center"
      >

        <div className="card-body custom-card d-flex flex-column align-items-center justify-content-center">

          <b>(profile card)</b>
          <br></br>
          profile_image
          <br></br>
          name
          <br></br>
          <br></br>
          edit_profile_btn
        </div>
      </div>
    </div>
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
                    Upload Existing Evaluators
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
                    Upload College Rankings
                  </label>
                </div>
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
              </div>
            }
            handleClose={togglePopup}
          />
        </div>
      )}
</div>

  );
};

export default AdminHome;