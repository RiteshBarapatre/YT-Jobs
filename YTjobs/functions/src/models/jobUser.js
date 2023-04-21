const mongoose = require("mongoose")

const jobModel = new mongoose.Schema({
    speciality : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    }
})

const jobDb = mongoose.model("jobUser",jobModel)

module.exports = jobDb