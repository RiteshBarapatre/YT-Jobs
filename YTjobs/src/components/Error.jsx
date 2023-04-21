import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Error = () => {
    const navigate = useNavigate()


    useEffect(()=>{
        setTimeout(() => {
            navigate("/")
        }, 3000);
    },[])
    
  return (
    <img src="/error.jpg" alt="error" style={{width : "100vw",height : "90vh"}}/>
  )
}

export default Error