import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../logo.svg";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const navigate = useNavigate();
  const Logout = async () => {
    try {
      await axios.delete("/apibpfk/logout");
      localStorage.removeItem("name");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          <img src={logo} />
        </div>
        <div className="gpt3__navbar-sign">
          <Link to={`/registrasilist`}>
            <p>List Faskes Registered</p>
          </Link>
          <Link to={`/validatedlist`}>
            <p>List Faskes Validated</p>
          </Link>
          {/* <Link to={`/rmc`}>
            <p>List RMC Registered</p>
          </Link>
          <Link to={`/rmcvalidated`}>
            <p>List RMC Validated</p>
          </Link> */}
        </div>
      </div>
      <div className="gpt3__navbar-sign">
        <button type="button" onClick={Logout}>
          Keluar
        </button>
      </div>
    </div>
    
  );
};

export default Navbar;
