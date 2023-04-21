import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Home = ({ user_detail }) => {
  const [cookie, setCookie] = useState();

  useEffect(() => {
    setCookie(cookies.get("email"));
  });
  return (
    <div className="home">
      <div className="container">
        <div className="home__main">
          <div className="home__title">
            <div className="home__mainTitle">
              <h1>
                Discover the best <br />
                <span
                  style={{
                    backgroundColor: "#f54e50",
                    color: "white",
                    marginRight: "7px",
                  }}
                >
                  YouTube
                </span>
                professionals
              </h1>
            </div>
            <div className="home__description">
              <Typewriter
                words={[
                  "Whether a talented YouTube professional or creator, here you can find your dream job or next ideal teammate. Let's create!",
                ]}
                cursor
                cursorStyle="|"
                typeSpeed={40}
              />
            </div>
            <div className="home__buttons">
              {cookie ? (
                user_detail?.speciality ? (
                  <Link to="/jobs">
                    <button className="join_btn">Search for Job</button>
                  </Link>
                ) : (
                  <Link to="/postjob">
                    <button className="post_btn">Post a Job</button>
                  </Link>
                )
              ) : (
                <>
                  <Link to="/wantjob">
                    <button className="join_btn">Join as Talent</button>
                  </Link>
                  <Link to="/hire">
                    <button className="post_btn">Post a Job</button>
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="home__image">
            <img src="mainImage.png" alt="hero photo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
