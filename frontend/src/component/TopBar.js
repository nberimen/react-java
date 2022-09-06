import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../redux/authActions";

const TopBar = () => {
  const { isLoggedIn } = useSelector((store) => store);
  const dispatch = useDispatch();

  const onLogoutSuccess = () => {
    dispatch(logoutSuccess());
  };

  let links = (
    <ul className="navbar-nav ms-auto">
        <li>
            <Link className="nav-link" to="/login">
                Login
            </Link>
        </li>
        <li>
            <Link className="nav-link" to="/signup">
                Sign Up
            </Link>
        </li>
    </ul>
);

if (isLoggedIn) {
  links = (
      <ul className="navbar-nav ms-auto">
        <Link to="/" className="nav-link">
          <span
            onClick={onLogoutSuccess}
            style={{ cursor: "pointer" }}
          >
            Logout
          </span>
          {
            //<span className="material-icons text-light ms-2">logout</span>
          }
        </Link>
      </ul>
  );
}
  return (
    <div className="shadow-sm bg-light mb-2">
      <nav className="navbar navbar-light container navbar-expand">
        <Link className="navbar-brand" to="/">
          {/* <img src="" width="60" alt="icon.png" /> */}Home Page 
        </Link>
        {links}
      </nav>
    </div>
  );
};

export default TopBar;
