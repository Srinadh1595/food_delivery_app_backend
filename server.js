// importing all required modules after instalation
const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()
const User = require('./models/User');
const bcrypt = require('bcryptjs')

// middleware
const PORT=3028
const app = express()
app.use(express.json())

// connecting the mongodb atlas
mongoose.connect (process.env.MONGO_URL).then(
    ()=>console.log("DB connected Successfully...")
).catch(
    (err)=>console.log("DB connection failed...")
)
// API landing page
app.get('',async(req,res)=>{
    try{
       res.send("welcome to the backend") 
    }
    catch(err){
        console.log(err)
    }
})

// API registartion page
app.post('/register',async(req,res)=>{
    const{user,password,email}=req.body
    try{
        const hashPassword=await bcrypt.hash(password,10)
        const NewUser= new User({user,password:hashPassword,email})
         await newUser.save()
         console .log ("New user is registerd successfully...")
         res.json({message:'User created....'})

    }
    catch(err){
        console.log(err)
    }
})
 // API login page
 app.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try{
        const user = await User.findOne({email});
        if (!user || !(await bcrypt.compare(password, user.password))) 
        {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        res.json({ message: "Logged in successfully" ,username: user.username});


    }
    catch(err){
        console.log(err)
    }
 })


// server running and testing 
app.listen(PORT,(err)=>{
    if(err){
        console.log(err)
    }
    console.log (`Server is running on port :`+PORT)
})