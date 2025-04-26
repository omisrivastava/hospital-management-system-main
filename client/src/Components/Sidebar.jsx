import React, { useContext, useState } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../context/AuthContext";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

const Sidebar = () => {
  const [show, setShow] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const location = useLocation();

  const handleLogout = async () => {
    await axios
      .get("http://localhost:5003/api/v1/user/admin/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();

  const gotoHomePage = () => {
    navigateTo("/");
    setShow(!show);
  };
  const gotoDoctorsPage = () => {
    navigateTo("/doctors");
    setShow(!show);
  };
  const gotoMessagesPage = () => {
    navigateTo("/messages");
    setShow(!show);
  };
  const gotoAddNewDoctor = () => {
    navigateTo("/doctor/addnew");
    setShow(!show);
  };
  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addnew");
    setShow(!show);
  };

  return (
    <div style={{ display: "flex", backgroundColor: "#f0f0f0", }}>
      <div
        style={{ display: location.pathname === "/login" ? "none" : "flex",
          backgroundColor: "#fff", zIndex: 100213, width: "130px", paddingTop: "2rem", paddingBottom: "2rem", alignSelf: "flex-start", height: "100vh"
         }}
        className={show ? "show" : ""}
      >
        <div style={{ display: "flex", width:"100%", flexDirection: "column", gap: "2rem", alignItems: "center", paddingTop: "3rem" }}>
          <TiHome style={{cursor:"pointer"}} size={32} onClick={gotoHomePage} />
          <FaUserDoctor style={{cursor:"pointer"}} size={32} onClick={gotoDoctorsPage} />
          <MdAddModerator style={{cursor:"pointer"}} size={32} onClick={gotoAddNewAdmin} />
          <IoPersonAddSharp style={{cursor:"pointer"}} size={32} onClick={gotoAddNewDoctor} />
          <AiFillMessage style={{cursor:"pointer"}} size={32} onClick={gotoMessagesPage} />
          <RiLogoutBoxFill style={{cursor:"pointer"}} size={32} onClick={handleLogout} />
        </div>
      </div>
      <div
        className="wrapper"
        style={!isAuthenticated ? { display: "none", zIndex: 100213 } : { display: "flex", zIndex: 100213 }}
      >
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </div>
      <div style={{
        paddingTop: "7rem",
        paddingLeft: "2rem",
        paddingRight: "2rem",
        paddingBottom: "2rem",
      }}>
        <Outlet style={{ flex:"1"}}/>
      </div>
    </div>
  );
};

export default Sidebar;
