import React from "react";
import "../css/card.css";
import {
  AiOutlineArrowRight,
  AiFillClockCircle,
  AiFillPushpin,
  AiOutlineDollarCircle,
} from "react-icons/ai";
import aveta from "aveta";

const Card = (props) => {
  return (
    <div className="card">
      <div className="card__info">
        <div className="card__logo">
          <img src="/video.svg" alt="" />
        </div>
        <div className="card__title">{props.title}</div>
        <div className="card__arrow">
          <AiOutlineArrowRight />
        </div>
      </div>
      <div className="card__projectInfo">
        <div className="card__projectDetails">
          <div className="time">
            <AiFillClockCircle style={{ marginRight: "10px" }} />
            {props.type}
          </div>
          <div className="time">
            <AiFillPushpin style={{ marginRight: "10px" }} />
            {props.location}
          </div>
          <div className="time">
            <AiOutlineDollarCircle style={{ marginRight: "10px" }} />
            {props.money}
          </div>
        </div>
        <div className="card__hire">
          <div className="posted">Posted By</div>
          <div className="card__hireAvatar">
            <div className="hire__img">
              <img src={props.image} alt="hireUser Image" />
            </div>
            <div className="hire__sub">
              {aveta(~~props.subs, {
                precision: 2,
                lowercase: false,
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
