import logo1 from "../assets/nba_logo.png";
import logo2 from "../assets/eNBA_logo.png";
import { useEffect, useState } from "react";
import { useLogout } from "../hooks/useLogout";
import Cookies from "js-cookie";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  const { logout, error } = useLogout();

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    window.location.reload(true)
  };

  return (
    <div className="flex-container align-items-center">
      <div style={{ flexGrow: 1 }}>
        <img src="/assets/nba_logo.png" alt="" />
      </div>
      <div style={{ flexGrow: 1 }}>
        <img src="/assets/eNBA_logo.png" alt="" />
      </div>
      {isLoggedIn && (
        <div className="m-4" style={{ flexGrow: 0 }}>
          <button
            onClick={handleLogout}
            type="button"
            className="btn btn-custom-blue"
          >
            <i className="fa fa-sign-out" /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
