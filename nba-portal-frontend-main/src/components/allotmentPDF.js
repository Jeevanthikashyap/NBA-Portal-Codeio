import ReactToPrint from "react-to-print";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

import Header from "./Header";

const AllotmentPDF = ({ id }) => {
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  const [allotment, setAllotment] = useState();
  useEffect(() => {
    const fetchReq = async () => {
      const request = await fetch(
        `http://127.0.0.1:3000/professor/get-current-one/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await request.json();
      setAllotment(json.item);
    };
    fetchReq();
  }, []);
  const componentRef = useRef();
  return (
    <div ref={componentRef}>
      <Header></Header>
      {allotment && (
        <div className="container py-2">
          <article className="postcard light blue">
            <div className="postcard__text t-dark">
              <h1 className="postcard__title blue">
                <a href="#">{allotment["collegeName"]}</a>
              </h1>
              <div className="postcard__subtitle small">
                <time dateTime="2020-05-25 12:00:00">
                  <FontAwesomeIcon icon={faCalendar} /> {allotment["date"]}
                </time>
              </div>
              <div className="postcard__bar"></div>
              <div className="postcard__preview-txt">
                Department: {allotment["department"]}
              </div>
              <div className="postcard__preview-txt">
                Program: {allotment["program"]}
              </div>
              <div className="postcard__preview-txt">
                Address: {allotment["address"]}
              </div>
            </div>
          </article>
        </div>
      )}
    </div>
  );
};

export default AllotmentPDF;
