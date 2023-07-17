import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../logo.svg";
import "./navbarr.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbarr = () => {
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
        <div className="gpt3__navbar-sign">
          <Link to={`/registrasilist`}>
            <p>List Registrasi</p>
          </Link>
          <Link to={`/userlist`}>
            <p>List User</p>
          </Link>
          <Link to={`/registrasilist`}>
            <p>List Registrasi BPFK</p>
          </Link>
          <Link to={`/userlist`}>
            <p>List BPFK Validated</p>
          </Link>
        </div>
      </div>
    </div>
    
  );
};

export default Navbarr;
