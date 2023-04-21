import { Avatar } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Navbar = ({setUser_detail}) => {
  const [cookie, setCookie] = useState();
  const [userDetail, setUserdetail] = useState({});
  const navigate = useNavigate()

  const styles = ({ isActive }) => ({
    color: isActive ? "#d63335" : "black",
    textDecoration: "none",
  });

  const logOut = () => {
    if (window.confirm("Do you Want to Log Out ")) {
      cookies.remove("email");
      setCookie(false);
      navigate("/")
      window.location.reload(true);
    }
  };

  useEffect(() => {
    setCookie(cookies.get("email"));
    if (cookie) {
      const func = async () => {
        const { data } = await axios.post(
          "http://localhost:8000/api/auth/navchange",
          {
            email: cookie,
          }
        );
        console.log(data);
        setUserdetail(data);
        setUser_detail(data)
      };
      func();
    }
    else{
      
    }
  }, [cookie]);


  return (
    <div className="mainNavbar">
      <div className="container">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <img
                src="/ytLogo.png"
                alt="Logo"
                width="118.4"
                height="22.4"
                className="d-inline-block align-text-top"
              />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav" style={{ width: "100%" }}>
              {
                  userDetail.userTitle ? <li className="nav-item">
                  <NavLink
                    className="nav-NavLink"
                    to="/postjob"
                    style={{ color: "#d63335", textDecoration: "none" }}
                  >
                    Post a Job
                  </NavLink>
                </li> :  <li className="nav-item">
                  <NavLink
                    className="nav-NavLink"
                    to="/wantjob"
                    style={{ color: "#d63335", textDecoration: "none" }}
                  >
                    Join as Talent
                  </NavLink>
                </li>
                }
               
                <li className="nav-item">
                  <NavLink className="nav-NavLink" to="/" style={styles}>
                    Home
                  </NavLink>
                </li>
                {
                  userDetail.speciality ? " " : <li className="nav-item">
                  <NavLink className="nav-NavLink" to="/jobs" style={styles}>
                    Jobs
                  </NavLink>
                </li>
                }
                <li className="nav-item">
                  <NavLink className="nav-NavLink" to="/wantjob" style={styles}>
                    Talent
                  </NavLink>
                </li>
                {
                  userDetail.userTitle ? " " : <li className="nav-item">
                  <NavLink className="nav-NavLink" to="/postjob" style={styles}>
                    Post a Job
                  </NavLink>
                </li>
                }
                <li
                  className="nav-item"
                  style={{
                    marginLeft: "auto",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {cookie ? (
                    <>
                      <span style={{ marginRight: "10px" }}>
                        {userDetail.speciality || userDetail.userTitle}
                      </span>
                      
                        <Avatar
                          size="sm"
                          src={userDetail.userUrl}
                          title={userDetail.userTitle}
                          onClick={logOut}
                          style={{cursor : "pointer"}}
                        />
         
                    </>
                  ) : (
                    <NavLink className="nav-NavLink" to="/login" style={styles}>
                      Log in
                    </NavLink>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
