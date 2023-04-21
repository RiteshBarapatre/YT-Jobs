const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const port = process.env.PORT || 8000
const dotenv = require("dotenv")
dotenv.config({})
const db = require("../functions/src/db/connect")
db()
const auth = require("../functions/src/routes/authentication")
app.use(express.json())


app.use("/api/auth",auth)

app.get("/",(req,res)=>{
    res.status(200).send("Hello I am bot")
})

app.listen(port,()=>{
    console.log(`Listening to port ${port}`)
})
