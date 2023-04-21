const mongoose = require("mongoose")

const hireSchema = new mongoose.Schema(
    {
        email : {
            type : String,
            required : true
        },
        userUrl : {
            type : String
        },
        userTitle : {
            type : String,
            required : true
        },
        userSubs : {
            type : String,
            required : true
        }

    }
)

const hireDb = mongoose.model("hireUser", hireSchema)

module.exports = hireDb