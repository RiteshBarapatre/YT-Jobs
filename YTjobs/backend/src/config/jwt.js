const jwt =  require("jsonwebtoken")

const jwtGenerate = async (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn : "10m"
    })
}

module.exports = jwtGenerate