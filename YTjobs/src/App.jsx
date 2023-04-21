import React, { useState } from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Login from './components/Login'
import WantHire from './components/WantHire'
import WantJob from './components/WantJob'
import EmailSent from './components/EmailSent'
import Footer from './components/Footer'
import Redirect from './components/Redirect'
import Channel from './components/Channel'
import VerifyVideo from './components/VerifyVideo'
import PostJob from './components/PostJob'
import Error from './components/Error'

function App() {
  const [channelInfo,setChannelInfo] = useState()
  const [hireEmail,setHireEmail] = useState()
  const [user_detail,setUser_detail] = useState()

  return (
   <>
   <Navbar setUser_detail = {setUser_detail}/>
    <Routes>
    <Route element={<Home user_detail={user_detail}/>} path = "/"></Route>
    <Route element={<Jobs/>} path = "/jobs"></Route>
    <Route element={<Login/>} path = "/login"></Route>
    <Route element={<PostJob channelInfo = {channelInfo}/>} path = "/postjob"></Route>
    <Route element={<WantHire setChannelInfo= {setChannelInfo} setHireEmail={setHireEmail}/>} path = "/hire"></Route>
    <Route element={<WantJob/>} path = "/wantjob"></Route>
    <Route element={<EmailSent />} path = "/emailsent"></Route>
    <Route element={<VerifyVideo />} path = "/verifyvideo"></Route>
    <Route element={<Redirect/>} path = "/redirect"></Route>
    <Route element={<Channel channelInfo={channelInfo} hireEmail={hireEmail}/>} path = "/channel"></Route>
    <Route element={<Error/>} path = "*"></Route>
    </Routes>
    <Footer/>
   </>
  )
}

export default App
