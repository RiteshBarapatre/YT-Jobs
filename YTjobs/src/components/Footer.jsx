import React from 'react'
import "../css/footer.css"

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer__home">
            <p>Home</p>
            <li>Jobs</li>
            <li>Talent</li>
        </div>
        <div className="footer__login">
        <p>Login</p>
            <li>Post a Job</li>
            <li>Join as Talent</li>
        </div>
        <div className="footer__jobs">
        <p>Jobs</p>
            <li>Video Editor</li>
            <li>Creative Director</li>
            <li>Thumbnail Designer</li>
            <li>Channel Manager</li>
            <li>Youtube Strategist</li>
            <li>Scriptwriter</li>
            <li>Youtube Producer</li>
        </div>
        <div className="footer__talent">
        <p>Talent</p>
        <li>Video Editor</li>
            <li>Creative Director</li>
            <li>Thumbnail Designer</li>
            <li>Channel Manager</li>
            <li>Youtube Strategist</li>
            <li>Scriptwriter</li>
            <li>Youtube Producer</li>
        </div>

    <div className="footer__follow">
        <img src="/footerImage.png" alt="" />
    </div>
    </div>
  )
}

export default Footer