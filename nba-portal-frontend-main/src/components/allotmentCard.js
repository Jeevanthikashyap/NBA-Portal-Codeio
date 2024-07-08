import download from "downloadjs";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileUpload,
  faFileDownload,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import "./allotmentCard.css";
import { useAuthContext } from "../hooks/useAuthContext";

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

const AllotmentsCard = (props) => {
  console.log(props)
  const all = props.allotment.item;
  const roles = props.role;
  const [fileName, setFileName] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const token = Cookies.get("token");
  const downlaodFormat = async (part) => {
    const response = await fetch(
      `http://127.0.0.1:3000/professor/download-format/${roles}&${part}&${all["program"]}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);

    if (response.ok) {
      const data = await response.blob();
      download(
        data,
        `report-format-${all["program"]}-${roles}-PART${part}.pdf`
      );
    }
  };

  const inputTrigger = () => {
    document.getElementById("upload").click();
  };
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }; 

  const formData = new FormData();
  const submitReport = async () => {
    if (token) {
      formData.append("first file", selectedFile);
      console.log(formData.get("first file"));
      const response = await fetch(
        `http://127.0.0.1:3000/professor/upload/${all["_id"]}`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(await response.json());
    }
  };
  const uploadReport = async (event) => {
    setIsSelected(true);
    setFileName(event.target.files[0].name);
    setSelectedFile(event.target.files[0]);
  };
  const deleteReport = () => {
    setIsSelected(false);
    setFileName("");
    setSelectedFile("");
  };
  return (
    <div className="">
      <div className="container py-2">
        <article className="postcard light blue">
          <div className="postcard__text t-dark">
            <h1 className="postcard__title blue">
              <a href="#">{all["collegeName"]}</a>
            </h1>
            <div className="postcard__subtitle small">
              <time dateTime="2020-05-25 12:00:00">
                <FontAwesomeIcon icon={faCalendar} /> {all["date"]}
              </time>
            </div>
            <div className="postcard__bar"></div>
            <div className="postcard__preview-txt">
              Department: {all["department"]}
            </div>
            <div className="postcard__preview-txt">
              Program: {all["program"]}
            </div>
            <div className="postcard__preview-txt">
              Address: {all["address"]}
            </div>
            <ul className="postcard__tagbox">
              <li
                className="tag__item play blue"
                style={{ padding: 1 + "%" }}
                onClick={togglePopup}
              >
                <h4>
                  <FontAwesomeIcon icon={faFileDownload} /> Download Report
                  Format
                </h4>
              </li>
              <li
                className="tag__item play blue"
                style={{ padding: 1 + "%" }}
                onClick={inputTrigger}
              >
                <h4>
                  <FontAwesomeIcon icon={faFileUpload} /> Upload Report
                </h4>
              </li>
              {isSelected && (
                <li
                  className="tag__item play blue"
                  style={{ backgroundColor: "transparent", padding: 1 + "%" }}
                >
                  {fileName}{" "}
                  <FontAwesomeIcon icon={faTimes} onClick={deleteReport} />
                </li>
              )}
            </ul>
            <br></br>
            {isSelected && (
              <button
                type="button"
                className="btn btn-info"
                style={{ width: 30 + "%", color: "white" }}
                onClick={submitReport}
              >
                <h4>Submit</h4>
              </button>
            )}
          </div>
          <input
            type="file"
            id="upload"
            style={{ display: "none" }}
            onChange={uploadReport}
            multiple
          ></input>
        </article>
      </div>
      {isOpen && (
        <Popup
          content={
            <div className="popup">
              <div className="top">
                <h4>UG TIER-I EVALUATION REPORT (JAN, 2016)</h4>
              </div>
              <div className="list-content">
                <ul class="header">
                  {roles == "Chairman" && (
                    <li>
                      <h5>Chairperson's Visit Report</h5>{" "}
                      <ul>
                        <li
                          className="hover"
                          onClick={() => downlaodFormat("A")}
                        >
                          PART-A
                        </li>
                        <li
                          className="hover"
                          onClick={() => downlaodFormat("B")}
                        >
                          PART-B
                        </li>
                        <li
                          className="hover"
                          onClick={() => downlaodFormat("C")}
                        >
                          PART-C
                        </li>
                      </ul>
                    </li>
                  )}
                  {roles == "Evaluator" && (
                    <li>
                      <h5>Evaluator's Visit Report</h5>{" "}
                      <ul>
                        <li
                          className="hover"
                          onClick={() => downlaodFormat("A")}
                        >
                          PART-A
                        </li>
                        <li
                          className="hover"
                          onClick={() => downlaodFormat("B")}
                        >
                          PART-B
                        </li>
                        <li
                          className="hover"
                          onClick={() => downlaodFormat("C")}
                        >
                          PART-C
                        </li>
                      </ul>
                    </li>
                  )}
                </ul>
                <div class="alert alert-primary" role="alert">
                  Consolidate the reports into one file and then upload.
                </div>
              </div>
            </div>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  );
};

export default AllotmentsCard;
