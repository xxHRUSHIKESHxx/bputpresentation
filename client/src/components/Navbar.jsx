import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";
import newLogo from "../img/blog.png";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
          <img src={newLogo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=education">
            <h6>EDUCATION</h6>
          </Link>
          <Link className="link" to="/?cat=poverty">
            <h6>POVERTY</h6>
          </Link>
          <Link className="link" to="/?cat=animal">
            <h6>ANIMAL</h6>
          </Link>
          <Link className="link" to="/?cat=disaster">
            <h6>DISASTER</h6>
          </Link>
          <Link className="link" to="/?cat=empowerment">
            <h6>EMPOWERMENT</h6>
          </Link>
          <Link className="link" to="/?cat=healthcare">
            <h6>HEALTHCARE</h6>
          </Link>
          <span style={{color:"white"}}>user({currentUser?.username})</span>
          {currentUser ? (
            <span onClick={logout} id="y11" >Logout</span>
          ) : (
            <Link className="link" to="/login">
              <h5 style={{color:"white"}}>Login</h5>
            </Link>
          )}
          <span className="write">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
