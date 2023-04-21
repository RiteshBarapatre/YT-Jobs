const express = require("express");
const router = express.Router();
const jobDb = require("../models/jobUser");
const hireDb = require("../models/hireUser");
const jwtGenerate = require("../config/jwt");
const transporter = require("../config/mailVerify");
const dotenv = require("dotenv");
dotenv.config({});
const jwt = require("jsonwebtoken");
const sendMailmsg = require("../controllers/sendMail");
const axios = require("axios");
const { channelId } = require("@gonetone/get-youtube-id-by-url");
const jobPostDb = require("../models/jobPost");

//Login as user or channel
router.post("/login", sendMailmsg);

//Verify the email
router.get("/verify/:token", (req, res) => {
  const { token } = req.params;

  // Verifying the JWT token
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      console.log(err);
      res.send(
        "Email verification failed,possibly the link is invalid or expired"
      );
    } else {
      res.redirect(301, `https://incomparable-pavlova-832f54.netlify.app/redirect?email=${decoded.id}`);
    }
  });
});

//Youtube channel API
router.post("/channel", async (req, res) => {
  const { email, channelLink } = req.body;

  const emailExist = await hireDb.findOne({ email });

  if (emailExist) {
    res.status(400).json({ email: true });
  } else {
    if (channelLink.includes("https://www.youtube.com/@")) {
      const channelName = channelLink.split("@")[1];
      const updatedLink = `https://www.youtube.com/c/${channelName}`;
      channelId(updatedLink)
        .then((id) => {
          const options = {
            method: "GET",
            url: "https://youtube-v31.p.rapidapi.com/channels",
            params: { part: "snippet,statistics", id: id },
            headers: {
              "X-RapidAPI-Key":
                "a48be9983fmsh7bdb1728b651e38p100a12jsn18d70a3ef351",
              "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
            },
          };

          axios
            .request(options)
            .then(function (response) {
              res.status(200).json(response.data);
            })
            .catch(function (error) {
              console.error(error);
            });
        })
        .catch((err) => {
          console.log(err);
          res.send("some error occured");
        });
    }
  }
});

//Sign up as job seeker
router.post("/job", async (req, res) => {
  const { speciality, email } = req.body;

  try {
    const emailExist = await jobDb.findOne({ email });

    if (!emailExist) {
      const token = await jwtGenerate(email);
      const mailConfigurations = {
        from: "riteshbarapatre543@gmail.com",

        to: email,

        subject: "Email Verification",

        html: `<h1 style="text-align : center">YT JOBS</h1><br/><h2 style="text-align : center">You recently try to login in our website "YTjobs.co". Press the below button to continue your verification and explore more !</h2><a href="https://yt-jobs-backend-7bhw.onrender.com/api/auth/verify/${token}"><button >Verify Now</button></a><p>Thank you ! <br> ${email} </p>`,
      };

      transporter.sendMail(mailConfigurations, async function (error, info) {
        if (error) throw Error(error);
        console.log("Email sent Successfully...");
        const newUser = await jobDb.create({
          speciality,
          email,
        });
        console.log(newUser);
        res.json({ token });
      });
    } else {
      res.status(400).json({ email: true });
    }
  } catch (error) {
    console.log(error);
  }
});

// Hire Channel Info
router.post("/channelsign", async (req, res) => {
  const { email, userUrl, userTitle, userSubs } = req.body;

  try {
    const token = await jwtGenerate(email);
    const mailConfigurations = {
      from: "riteshbarapatre543@gmail.com",

      to: email,

      subject: "Email Verification",

      html: `<h1 style="text-align : center">YT JOBS</h1><br/><h2 style="text-align : center">You recently try to login in our website "YTjobs.co". Press the below button to continue your verification and explore more !</h2><a href="https://yt-jobs-backend-7bhw.onrender.com/api/auth/verify/${token}"><button >Verify Now</button></a><p>Thank you ! <br> ${email} </p>`,
    };

    transporter.sendMail(mailConfigurations, async function (error, info) {
      if (error) throw Error(error);
      console.log("Email sent Successfully...");
      const newUser = await hireDb.create({
        email,
        userUrl,
        userTitle,
        userSubs,
      });
      console.log(newUser);
      res.json({ token });
    });
  } catch (error) {
    res.status(400).json({ email: true });
    console.log(error);
  }
});

router.post("/navchange", async (req, res) => {
  const { email } = req.body;

  const JobemailExist = await jobDb.findOne({ email });
  const HireemailExist = await hireDb.findOne({ email });

  if (JobemailExist) {
    res.status(200).json(JobemailExist);
  } else if (HireemailExist) {
    res.status(200).json(HireemailExist);
  } else {
  }
});

router.post("/jobpost", async (req, res) => {
  const {
    userTitle,
    userUrl,
    userSubs,
    jobPosition,
    jobStartDate,
    jobType,
    jobLocation,
    jobMoney,
  } = req.body;
  const newJob = await jobPostDb.create({
    userTitle,
    userUrl,
    userSubs,
    jobPosition,
    jobStartDate,
    jobType,
    jobLocation,
    jobMoney,
  });
  console.log(newJob);
  res.status(200).json(newJob);
});

router.post("/fetchjobs", async (req, res) => {
  const { category, type, location } = req.body;
  const jobs = await jobPostDb.find({
    jobPosition: { $in: category },
    jobType: { $in: type },
    jobLocation: { $in: location },
  });
  res.send(jobs);
});

module.exports = router;