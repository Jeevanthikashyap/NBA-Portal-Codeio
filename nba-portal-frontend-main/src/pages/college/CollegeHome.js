import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import './collegeHome.css'

const CollegeHome = () => {
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  const navigate = useNavigate();
  const [auth, setAuth] = useState(true)

  useEffect(() => {
    if (!token || role !== 'college') {
      navigate("/login");
    }
  }, [auth]);



  

  
  return (
    <div className ="html body">
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
              <Link to="accreditation_visits" style={{width: 300 + 'px'}} type="button" className="btn btn-Caribbean_Green">
                Accrediation Applications
              </Link>
              <button type="button" className="btn btn-Caribbean_Green_2">
                <span
                  className="text-white fa fa-envelope"
                  aria-hidden="true"
                />
              </button>
            </div>
            <div className="btn-group btn-groupe_4 mt-5">
             <Link to="evaluators_list" style={{width: 300 + 'px'}} type="button" className="btn btn-Caribbean_Green">
                Evaluators List
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
  
</div>

  );
};

export default CollegeHome;
