const jobDb = require("../models/jobUser")
const jwtGenerate = require("../config/jwt")
const transporter = require("../config/mailVerify");
const hireDb = require("../models/hireUser");


const sendMailmsg = async (req,res)=>{
    const { email } = req.body;

  try {
    const emailExist = await jobDb.findOne({ email });
    const emailExistHire = await hireDb.findOne({ email });

    if (emailExist || emailExistHire) {
      const token = await jwtGenerate(email);
      const mailConfigurations = {
        from: "riteshbarapatre543@gmail.com",

        to: email,

        subject: "Email Verification",

        html: `<h1 style="text-align : center">YT JOBS</h1><br/><h2 style="text-align : center">You recently try to login in our website "YTjobs.co". Press the below button to continue your verification and explore more !</h2><a href="https://yt-jobs-backend-7bhw.onrender.com/api/auth/verify/${token}"><button >Verify Now</button></a><p>Thank you ! <br> ${email} </p>`,
      };

      transporter.sendMail(mailConfigurations, function (error, info) {
        if (error) throw Error(error);
        res.json({token});
      });
    } else {
      res.status(400).json({ email: false });
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = sendMailmsg