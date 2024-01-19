const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = express()
dotenv.config()

const adminRouter = require("./Router/admin-router")

mongoose.connect(process.env.DB_URL)
    .then( console.log('db connected'))
    .catch(err =>{
            console.log('error',err)
    })

app.use(express.json());


app.use("/admin", adminRouter )

app.listen(6000,()=>{
    console.log(`port on ${process.env.port}`)
});



