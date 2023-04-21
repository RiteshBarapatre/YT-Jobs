import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/wantJob.css";
import { Progress } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'

const WantJob = () => {
  const toast = useToast()
  //Code for 1st page
  const [select, setSelect] = useState("");
  const [color, setColor] = useState("#ff999a");
  const [eColor,seteColor] = useState("#ff999a")
  const [loading,setLoading] = useState(false)
  const [value,setValue] = useState(50)

  const handelSubmit = (e) => {
    e.preventDefault();
    document.getElementById("job").style.display = 'none'
    document.getElementById("wEmail").style.display = ''
    setValue(100)
  };
  useEffect(() => {
    if (select !== "") {
      setColor("#f54e50");
    } else {
      setColor("#ff999a");
    }
  }, [select]);
  


  //code for second page
  const naviagte = useNavigate()
  const [email, setEmail] = useState('')
  const handelEditClick = ()=>{
    document.getElementById("job").style.display = ''
    document.getElementById("wEmail").style.display = 'none'
    setValue(50)
  }
  
  useEffect(()=>{
    if(email.includes('@gmail.com')){
      seteColor("#f54e50")
    }
    else{
      seteColor("#ff999a")
    }
  },[email])
  

  const handelSubmitEmail = async (e)=>{
    e.preventDefault()
    setLoading(true)
    try {
      const {data} = await axios.post("http://localhost:8000/api/auth/job",{
      speciality : select,
      email
    },{
      headers : {
        "Content-Type" : "application/json"
      }
    })
    console.log(data);
    setLoading(false)
    naviagte("/emailsent")
    toast({
      title: 'Email Sent Successfully...',
      description: "",
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    } catch (err) {
      naviagte("/login")
      toast({
        title: 'Email Already Exist please try to Login.',
        description: "This email is already exist in our servers so try to login.",
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
      setLoading(false)
    }
  }

  return (
    <>
    <Progress colorScheme="red" size='sm' value={value} />

    {/* UI for first page */}

    <div className="job" id="job">
      <div className="job__heading">
        <span className="job__headingMain">
          Which area of YouTube work do you specialize in?
        </span>
        <br />
        <span>Pick the one that best describes you</span> 
      </div>
      <form onSubmit={handelSubmit}>
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

        <div className="btn">
          <button type="submit" style={{ backgroundColor: color }} disabled = {color === "#ff999a" ? true : false}>
          Next
          </button>
        </div>
      </form>
    </div>

      {/* UI for second Page */}

      <div className='wEmail' id="wEmail" style={{display : 'none'}}>
        <div className="wEmail__back">
        Which area of YouTube work do you specialize in?
        <span id='edit' onClick={handelEditClick}>Edit</span>
        </div>
        <form onSubmit={handelSubmitEmail}>
        <div className="wEmail__main">
          <label htmlFor="email">What's your Email</label> <br />
          <input type="email" name="" id="" placeholder='emample@gmail.com' onChange={(e)=>setEmail(e.target.value)}/> <br />
          {/* <Button loading={true} text={"Sign Up"} disable={true}/> */}
          <button type='submit' className='wEmail__btn' style={{backgroundColor: eColor}} disabled = {eColor === "#ff999a" ? true : false}>{loading ? "Loading..." : "Sign Up"}</button>
        </div>
        </form>
    </div>
    </>
  );
};

export default WantJob;
