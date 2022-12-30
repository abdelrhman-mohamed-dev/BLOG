import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";
const PF = "http://localhost:5000/images/";


export default function Navbar() {
  const { user, dispatch } = useContext(Context);
  const handelLogout = (e) => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="nav">
      <div className="navbar-left">
        <i className="navbar-icons fa-brands fa-square-facebook"></i>
        <i className="navbar-icons fa-brands fa-instagram"></i>
        <i className="navbar-icons fa-brands fa-twitter"></i>
        <i className="navbar-icons fa-brands fa-pinterest"></i>
      </div>
      <div className="navbar-center">
        <ul className="navbar-list">
          <li className="navbar-list-item">
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li className="navbar-list-item">
            <Link className="link" to="/">
              About
            </Link>
          </li>
          <li className="navbar-list-item">
            <Link className="link" to="/">
              Contact
            </Link>
          </li>
          <li className="navbar-list-item">
            <Link className="link" to="/write">
              Write
            </Link>
          </li>
          <li className="navbar-list-item" onClick={handelLogout}>
            <Link className="link" to="/login">
              {user && "Logout"}
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        {user ? (
          <Link className="link" to="/Settings">
            <img className="navbar-img" src={PF+user.profilepic} alt="" />
          </Link>
        ) : (
          <>
            <Link style={{ paddingRight: "10px" }} className="link" to="/login">
              Login
            </Link>
            <Link className="link" to="/register">
              Register
            </Link>
          </>
        )}

        <i className="nav-bar-search-icon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
}
