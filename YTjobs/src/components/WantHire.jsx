import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "../css/wantHire.css"
import { Button, Progress, useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const WantHire = ({setChannelInfo,setHireEmail}) => {
  const toast = useToast()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [channelLink, setChannelLink] = useState('')
  const [disable,setDisable] = useState(true)
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if(email.includes('@gmail.com') && channelLink !== ''){
      setDisable(false)
    }
    else{
      setDisable(true)
    }
  },[email,channelLink])
  
  const handelSubmit = async (e)=>{
    e.preventDefault()
    setLoading(true)
    try {
      const {data} = await axios.post("http://localhost:8000/api/auth/channel",{
      email,channelLink
    },{
      headers : {
        "Content-Type" : "Application/json",
      }
    })
    setChannelInfo(data)
    setLoading(false);
    if(data){
      setHireEmail(email)
      navigate("/channel")
    }
    else{
      toast({
        title: "Something Went Wrong!!!",
        description: "",
        status:"error",
        duration: 5000,
        isClosable: true,
      });
    }
    } catch (error) {
      setLoading(false)
      navigate("/login")
      toast({
        title: "Email Already Exist. Please try to Login",
        description: "",
        status:"error",
        duration: 5000,
        isClosable: true,
      });
    }
    
  }
  
  return (
    <>   
    <div className='hire' id='hire'>
      <form onSubmit={handelSubmit}>
     <Progress colorScheme="red" size='sm' value={50} />
        <div className="hire__heading">
        Find the best talent for <br /> your channel!
        </div>
        <p>Sign up as a channel</p>
        <div className="hire__input">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" placeholder='e.g. example@gmail.com' onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="hire__input">
          <label htmlFor="email">Channel Link</label>
          <input type="text" name="text" id="channelName" placeholder='e.g. https://youtube.com/channelid' onChange={(e)=>setChannelLink(e.target.value)}/>
        </div>
        <div className="hire__btn">
          <Button type="submit" isDisabled ={disable} >{loading ? "Loading..." :"Next"}</Button>
        </div>
      </form>
    </div>
    </>
  )
}

export default WantHire