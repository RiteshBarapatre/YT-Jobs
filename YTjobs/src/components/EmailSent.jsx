import React, { useEffect } from 'react'
import { FcComments } from "react-icons/fc";
import "../css/emailSent.css"

const EmailSent = () => {
  return (
    <div className='sent'>
      <div className="sent__logo">
        <FcComments style={{fontSize : "60px"}}/>
      </div>
      <div className="sent__heading">
        Check Your Email
      </div>
      <div className="sent__desc1">
      An express link has been sent, just check your email and click on it.
      </div>
      <div className="sent__desc2">
      Please check the Spam and Promotion folder if you don't find the email <br /> in your Inbox.
      </div>
    </div>
  )
}

export default EmailSent