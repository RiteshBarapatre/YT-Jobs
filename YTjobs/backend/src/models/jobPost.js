const mongoose = require("mongoose")

const jobPost = new mongoose.Schema(
    {
        userTitle : {
            type : String,
            required : true
        },
        userUrl : {
            type : String
        },
        userSubs : {
            type : String
        },
        jobPosition : {
            type : String,
            required : true
        },
        jobStartDate : {
            type : String,
            required : true
        },
        jobType : {
            type : String,
            required : true
        },
        jobLocation : {
            type : String,
            required : true
        },
        jobMoney : {
            type : String
        }

    }
)

const jobPostDb = mongoose.model("jobpost", jobPost)

module.exports = jobPostDb