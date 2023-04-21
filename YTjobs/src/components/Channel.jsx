import React, { useEffect, useState } from "react";
import { Avatar, Progress, useToast } from "@chakra-ui/react";
import "../css/wantHire.css";
import { Link,useNavigate } from "react-router-dom";
import "../css/channel.css";
import axios from "axios";


const Channel = ({ channelInfo, hireEmail }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const toast = useToast();

  useEffect(() => {
    if(channelInfo){
      toast({
        title: "Channel is Verified !",
        description: "",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }else{
      navigate("/login")
      toast({
        title: "Something is Wrong please try later !!!",
        description: "",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }, []);

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/auth/channelsign",
        {
          email: hireEmail,
          userUrl: channelInfo?.items[0].snippet.thumbnails.default.url,
          userTitle: channelInfo?.items[0].snippet.title,
          userSubs: channelInfo?.items[0].statistics.subscriberCount,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      navigate("/emailsent");
      toast({
        title: "Mail sent successfully. Check your Inbox",
        description: "",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "This email does not exist. Please try to Signup",
        description: "",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <div className="channel" id="channel">
        <Progress colorScheme="red" size="sm" value={50} />
        <div className="channel__main">
          <div className="channel__heading">Is this your Channel ?</div>
          <div className="channel__info">
            <Avatar
              src={channelInfo?.items[0].snippet.thumbnails.default.url}
              size="lg"
            />
            <div className="channel__name">
              <div className="name">{channelInfo?.items[0].snippet.title}</div>
              <div className="subs">
                {channelInfo?.items[0].statistics.subscriberCount} subscribers
              </div>
            </div>
          </div>
          <div className="buttons">
            <Link to="/verifyvideo" style={{ textDecoration: "underline" }}>
              No
            </Link>
            <form onSubmit={handelSubmit}>
              <button
                type="submit"
                className="btn__proceed"
                style={{ cursor: loading ? "not-allowed" : "pointer" }}
              >
                {loading ? "Loading..." : "Proceed"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Channel;
