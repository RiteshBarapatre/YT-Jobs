import React, { useEffect, useState } from "react";
import "../css/jobs.css";
import Card from "./Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NoJob from "./NoJob";

const Jobs = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([
    "Video Editor",
    "Creative Director",
    "Thumbnail Designer",
    "Channel Manager",
    "Youtube Strategist",
    "Scriptwriter",
    "Youtube Producer",
  ]);
  const [type, setType] = useState(["Project", "Full-time", "Part-time"]);
  const [location, setLocation] = useState(["Remote", "Hybrid", "Onsite"]);
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const func = async (Fcategory, Ftype, Flocation) => {
    setLoading(true);

    try {
      const { data } = await axios.post(
        "https://yt-jobs-backend-7bhw.onrender.com/api/auth/fetchjobs",
        {
          category: Fcategory,
          type: Ftype,
          location: Flocation,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setAllJobs(data);
      setLoading(false);
    } catch (error) {
      navigate("/");
      toast({
        title: "Something is Wrong !!!",
        description: "Please try after some time",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    func(category, type, location);
  }, []);

  const changeCategory = (e) => {
    if (e.target.value === "allCategories") {
      const allCategories = [
        "Video Editor",
        "Creative Director",
        "Thumbnail Designer",
        "Channel Manager",
        "Youtube Strategist",
        "Scriptwriter",
        "Youtube Producer",
      ];
      setCategory(allCategories);
      func(allCategories, type, location);
    } else {
      setCategory([e.target.value]);
      func([e.target.value], type, location);
    }
  };

  const changeType = (e) => {
    if (e.target.value === "allType") {
      const allTypes = ["Project", "Full-time", "Part-time"];
      setCategory(allTypes);
      func(category, allTypes, location);
    } else {
      setType([e.target.value]);
      func(category, [e.target.value], location);
    }
  };

  const changeLocation = (e) => {
    if (e.target.value === "allLocation") {
      const allLocation = ["Remote", "Hybrid", "Onsite"];
      setCategory(allLocation);
      func(category, type, allLocation);
    } else {
      setLocation([e.target.value]);
      func(category, type, [e.target.value]);
    }
  };

  return (
    <div className="container">
      <div className="jobs">
        <div className="jobs__heading">Jobs</div>
        <div className="jobs__filter">
          <div className="jobs__categories">
            <select name="" id="" onChange={changeCategory}>
              <option value="allCategories">All Categories</option>
              <option value="Video Editor">Video Editor</option>
              <option value="Creative Director">Creative Director</option>
              <option value="Thumbnail Designer">Thumbnail Designer</option>
              <option value="Channel Manager">Channel Manager</option>
              <option value="Youtube Strategist">Youtube Strategist</option>
              <option value="Scriptwriter">Scriptwriter</option>
              <option value="Youtube Producer">Youtube Producer</option>
            </select>
          </div>

          <div className="jobs__categories" style={{ marginLeft: "2rem" }}>
            <select name="" id="" onChange={changeType}>
              <option value="allType">All Job Types</option>
              <option value="Project">Project/Gigs</option>
              <option value="Full-time">Full-Time</option>
              <option value="Part-time">Part-Time</option>
            </select>
          </div>

          <div className="jobs__categories" style={{ marginLeft: "2rem" }}>
            <select name="" id="" onChange={changeLocation}>
              <option value="allLocation">All Locations</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Onsite">Onsite</option>
            </select>
          </div>
        </div>
        <span className="loading">{loading ? "Loading..." : ""}</span>
        <div className="row">
          {allJobs.map((elem,index) => {
            return (
              <div className="col-md-4 col-sd-1">
                <Card
                  title={elem.jobPosition}
                  type={elem.jobType}
                  location={elem.jobLocation}
                  image={elem.userUrl}
                  money={elem.jobMoney}
                  subs={elem.userSubs}
                  key={index}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
