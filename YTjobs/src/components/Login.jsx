import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/login.css";
import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const Login = () => {
  const naviagte = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [color, setColor] = useState("#ff999a");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (email.includes("@gmail.com")) {
      setColor("#f54e50");
    } else {
      setColor("#ff999a");
    }
  }, [email]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      naviagte("/emailsent");
      toast({
        title: "Mail sent successfully. Check your Inbox",
        description: "",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "This email does not exist. Please try to Signup",
        description: "",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handelSubmit}>
        <div className="login">
          <div className="login__heading">Login</div>

          <div className="login__email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="e.g. example@gmail.com"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button
            className="login__mainBtn"
            style={{ backgroundColor: color }}
            type="submit"
          >
            {loading ? "Loading..." : "Get Express Login Link"}
          </Button>
          <div className="signup">
            <p className="signup__heading">Not a member ? </p>
            <div className="signup__main">
              <Link
                to="/wantjob"
                style={{ textDecoration: "none", color: "#f54e50" }}
              >
                <span
                  style={{
                    paddingRight: "10px",
                    marginRight: "10px",
                    borderRight: "1px solid lightgrey",
                  }}
                >
                  I want a job
                </span>
              </Link>
              <Link
                to="/hire"
                style={{ textDecoration: "none", color: "#f54e50" }}
              >
                <span>I want to hire</span>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
