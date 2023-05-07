import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();
import { Avatar, Button, FormControl, FormLabel, Input, useDisclosure, useToast } from "@chakra-ui/react";
import "../css/jobs.css";
import { Progress } from "@chakra-ui/react";
import "../css/postJob.css";
import axios from "axios"
import { AiFillClockCircle, AiFillPushpin, AiOutlineDollarCircle, AiFillCalendar, AiFillYoutube } from "react-icons/ai";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

const PostJob = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate();
  const toast = useToast();
  const [value, setValue] = useState(20);
  const [select, setSelect] = useState("");
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  const [selectDate, setSelectDate] = useState("");
  const [selectType, setSelectType] = useState("");
  const [selectLocation, setSelectLocation] = useState("");
  const [userDetail, setUserdetail] = useState({});

    //For Modal
    const [inMoney,setInMoney] = useState("-") 
    const [fiMoney,setFiMoney] = useState("-") 

  //For First Page
  const handelSubmitFirst = (e) => {
    e.preventDefault();
    document.getElementById("first").style.display = "none";
    document.getElementById("second").style.display = "";
    setValue(40);
  };

  useEffect(() => {
    if (cookies.get("email")) {
      const func = async () => {
        const { data } = await axios.post(
          "http://localhost:8000/hire/api/auth/navchange",
          {
            email: cookies.get("email"),
          }
        );
        if(data.userTitle){
          setUserdetail(data);
        }
        else{
          navigate("/")
          toast({
            title: "You have to Login as channel to post a job",
            description: "",
            status: "warning",
            duration: 5000,
            isClosable: true,
          });
        }
      };
      func()
    } else if (cookies.get("email")) {
    } else {
      navigate("/login");
      toast({
        title: "Please Login first to Access this page !!!",
        description: "",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  }, []);

  useEffect(() => {
    select ? setDisable(false) : setDisable(true);
  });

  //For Second Page
  const handelSubmitSecond = (e) => {
    e.preventDefault();
    document.getElementById("second").style.display = "none";
    document.getElementById("third").style.display = "";
    setValue(60);
  };

  const backTofirst = ()=>{
    document.getElementById("second").style.display = "none";
    document.getElementById("first").style.display = "";
    setValue(20);
  }


  //For Third page
  const handelSubmitThird = (e) => {
    e.preventDefault();
    document.getElementById("third").style.display = "none";
    document.getElementById("fourth").style.display = "";
    setValue(80);
  };

  const backTosecond = ()=>{
    document.getElementById("third").style.display = "none";
    document.getElementById("second").style.display = "";
    setValue(40);
  }


  //For Fourth page
  const handelSubmitFourth = (e) => {
    e.preventDefault();
    document.getElementById("fourth").style.display = "none";
    document.getElementById("fifth").style.display = "";
    setValue(100);
  };

  const backTothird = ()=>{
    document.getElementById("fourth").style.display = "none";
    document.getElementById("third").style.display = "";
    setValue(60);
  }

  //For Five page
  const backToforth = ()=>{
    document.getElementById("fifth").style.display = "none";
    document.getElementById("fourth").style.display = "";
    setValue(80);
  }

  const postJob = async ()=>{
    setLoading(true)
    try {
      const {data} = await axios.post("http://localhost:8000/api/auth/jobpost",{
      userTitle : userDetail.userTitle,
      userUrl : userDetail.userUrl,
      userSubs : userDetail.userSubs,
      jobPosition : select,
      jobStartDate : selectDate,
      jobType : selectType,
      jobLocation : selectLocation,
      jobMoney : `$${inMoney} - $${fiMoney}`,
    })
    console.log(data);
    setLoading(false)
    navigate("/")
    toast({
      title: "Your Job is Posted !!!",
      description: "We will notify you when someone applied for it",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    } catch (error) {
      navigate("/")
      toast({
        title: "Something is Wrong !!!",
        description: "Please try after some time",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    
  } 
  return (
    <div className="container">

    {/* Modal for Money  */}
    <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Initial Amount</FormLabel>
              <Input placeholder='Intitial Amount in Dollars' onChange={(e)=>setInMoney(e.target.value)}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Final Amount</FormLabel>
              <Input placeholder='Final Amount in Dollars' onChange={(e)=>setFiMoney(e.target.value)}/>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Progress colorScheme="red" size="sm" value={value} />
      <div className="postjob">
        <div className="first" id="first">
          <div className="job__heading">
            <span className="job__headingMain">
              What position are you hiring for?
            </span>
            <br />
            <span>If multiple, fill out the form individually for each</span>
          </div>
          <form onSubmit={handelSubmitFirst}>
            <div className="selectField">
              <input
                onChange={(e) => setSelect(e.target.value)}
                type="radio"
                id="videoEditor"
                name="specialize"
                value="Video Editor"
              />
              <label htmlFor="videoEditor">Video Editor</label>
            </div>

            <br />
            <div className="selectField">
              <input
                onChange={(e) => setSelect(e.target.value)}
                type="radio"
                id="thumbnailDesigner"
                name="specialize"
                value="Thumbnail Designer"
              />
              <label htmlFor="thumbnailDesigner">Thumbnail Designer</label>
            </div>

            <br />
            <div className="selectField">
              <input
                onChange={(e) => setSelect(e.target.value)}
                type="radio"
                id="creativeDirector"
                name="specialize"
                value="Creative Director"
              />
              <label htmlFor="creativeDirector">Creative Director</label>
            </div>

            <br />
            <div className="selectField">
              <input
                onChange={(e) => setSelect(e.target.value)}
                type="radio"
                id="channelManager"
                name="specialize"
                value="Channel Manager"
              />
              <label htmlFor="channelManager">Channel Manager</label>
            </div>

            <br />
            <div className="selectField">
              <input
                onChange={(e) => setSelect(e.target.value)}
                type="radio"
                id="youTubeStrategist"
                name="specialize"
                value="YouTube Strategist"
              />
              <label htmlFor="youTubeStrategist">YouTube Strategist</label>
            </div>

            <br />
            <div className="selectField">
              <input
                onChange={(e) => setSelect(e.target.value)}
                type="radio"
                id="scriptwriter"
                name="specialize"
                value="Scriptwriter"
              />
              <label htmlFor="scriptwriter">Scriptwriter</label>
            </div>
            <br />
            <div className="selectField">
              <input
                onChange={(e) => setSelect(e.target.value)}
                type="radio"
                id="youTubeProducer"
                name="specialize"
                value="YouTube Producer"
              />
              <label htmlFor="youTubeProducer">YouTube Producer</label>
            </div>
            <Button type="submit" className="sub__btn" isDisabled={disable}>
              {loading ? "Loading..." : "Next"}
            </Button>
          </form>
        </div>
        <div className="second" id="second" style={{ display: "none" }}>
          <div className="job__heading">
            <span className="job__headingMain">Start Date</span>
            <br />
          </div>
          <form onSubmit={handelSubmitSecond}>
            <div className="selectField">
              <input
                onChange={(e) => setSelectDate(e.target.value)}
                type="radio"
                id="asap"
                name="date"
                value="ASAP"
              />
              <label htmlFor="asap">ASAP</label>
            </div>

            <br />
            <div className="selectField">
              <input
                onChange={(e) => setSelectDate(e.target.value)}
                type="radio"
                id="withinamonth"
                name="date"
                value="Within a month"
              />
              <label htmlFor="withinamonth">Within a Month</label>
            </div>

            <br />
            <div className="selectField">
              <input
                onChange={(e) => setSelectDate(e.target.value)}
                type="radio"
                id="withinthreemonths"
                name="date"
                value="Within three months"
              />
              <label htmlFor="withinthreemonths">Within three months</label>
            </div>
            <br />
            <Button type="submit" className="sub__btn" isDisabled={disable}>
              {loading ? "Loading..." : "Next"}
            </Button>
            <span className="back" onClick={backTofirst}>Back</span>
          </form>
        </div>
        <div className="third" id="third" style={{ display: "none" }}>
          <div className="job__heading">
            <span className="job__headingMain">Job Type</span>
            <br />
          </div>
          <form onSubmit={handelSubmitThird}>
            <div className="selectField">
              <input
                onChange={(e) => setSelectType(e.target.value)}
                type="radio"
                id="full-time"
                name="job-type"
                value="Full-time"
              />
              <label htmlFor="full-time">Full-time</label>
            </div>

            <br />
            <div className="selectField">
              <input
                onChange={(e) => setSelectType(e.target.value)}
                type="radio"
                id="part-time"
                name="job-type"
                value="Part-time"
              />
              <label htmlFor="part-time">Part-time</label>
            </div>

            <br />
            <div className="selectField">
              <input
                onChange={(e) => setSelectType(e.target.value)}
                type="radio"
                id="per-project"
                name="job-type"
                value="Per-project"
              />
              <label htmlFor="per-project">Per-project</label>
            </div>
            <br />
            <Button type="submit" className="sub__btn" isDisabled={disable}>
              {loading ? "Loading..." : "Next"}
            </Button>
            <span className="back" onClick={backTosecond}>Back</span>
          </form>
        </div>
        <div className="fourth" id="fourth" style={{ display: "none" }}>
          <div className="job__heading">
            <span className="job__headingMain">Location</span>
            <br />
          </div>
          <form onSubmit={handelSubmitFourth}>
            <div className="selectField">
              <input
                onChange={(e) => setSelectLocation(e.target.value)}
                type="radio"
                id="remote"
                name="location"
                value="Remote"
              />
              <label htmlFor="remote">Remote</label>
            </div>

            <br />
            <div className="selectField">
              <input
                onChange={(e) => setSelectLocation(e.target.value)}
                type="radio"
                id="hybrid"
                name="location"
                value="Hybrid"
              />
              <label htmlFor="hybrid">Hybrid</label>
            </div>

            <br />
            <div className="selectField">
              <input
                onChange={(e) => setSelectLocation(e.target.value)}
                type="radio"
                id="onsite"
                name="location"
                value="Onsite"
              />
              <label htmlFor="onsite">On Site</label>
            </div>

            <br />
            <Button type="submit" className="sub__btn" isDisabled={disable}>
              {loading ? "Loading..." : "Next"}
            </Button>
            <span className="back" onClick={backTothird}>Back</span>
          </form>
        </div>
        <div className="fifth" id="fifth" style={{ display: "none" }}>
        <div className="post__channel">
        <Avatar src={userDetail.userUrl}></Avatar>
        <div className="post__title">
          <span>{userDetail.userTitle}</span>
          <span className="jobTitle">{select}</span>
        </div>
        </div>
        <div className="job__info">
        <div>
          <div className="salary">
            <AiOutlineDollarCircle/> <span style={{marginLeft : "4px"}}>${inMoney} - ${fiMoney}<span style={{marginLeft : "100px",textDecoration : "underline",cursor : "pointer"}} onClick={onOpen}>Add Money</span></span>
          </div>
          <div className="salary">
            <AiFillClockCircle/> <span style={{marginLeft : "4px"}}>{selectType}</span>
          </div>
          <div className="salary">
            <AiFillPushpin/> <span style={{marginLeft : "4px"}}>{selectLocation}</span>
          </div>
          <div className="salary">
            <AiFillCalendar/> <span style={{marginLeft : "4px"}}>{selectDate}</span>
          </div>
          <div className="salary">
            <AiFillYoutube/> <span style={{marginLeft : "4px"}}>All Formats</span>
          </div>
          </div>
          <span className="back" onClick={backToforth}>Back</span>
          <button className="postJobbtn sub__btn" onClick={postJob}>{loading ? "Posting..." : "Post Job"}</button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
