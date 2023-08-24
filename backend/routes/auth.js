const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "harryisgoodb$oy"
const fetchuser = require("../middleware/fetchuser")

///api/auth/createuser
router.post('/createuser',[
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 character').isLength({ min: 5 }),
    
    ],async(req,res)=>{
    // console.log(req.body)
    // res.send("hello shrey")
    // const user = User(req.body)
    // user.save()
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //check the email is already exists
      try{
      let user = await User.findOne({success,email:req.body.email})
      if(user){
        return res.status(400).json({success,error:"sorry this email already exists"})
      }
      const salt = await bcrypt.genSalt(10);
       const secPass =await  bcrypt.hash( req.body.password,salt)

       user = await
       User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
      })
      const data ={
        user:{
          id:user.id
        }
      }
      const authtoken = jwt.sign( data , JWT_SECRET );
      // console.log(jwtData)
      // .then(User => res.json(User)).catch(err=>{console.log(err)
      //   res.json({error:'please enter valid value',message:err.message})})
    // res.json(user)
    success = true;
       res.json({success,authtoken})
      }catch(error){
         console.error(error.message);
         res.status(500).send("some Error occured")
      }
})
router.post('/login',[
  
  body('email','incorrect email').isEmail(),
  body('password','Password doesnot blank').exists()
  
  ],async(req,res)=>{
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {email,password}= req.body

      try{
         let user = await User.findOne({email})
         if(!user){
          return res.status(400).json({success,error:"please try to login with correct credentials"})
         }
         const passwordCompare = await bcrypt.compare(password,user.password)
         if(!passwordCompare){
          
          return res.status(400).json({success,error:"plase try to login with correct credentials"})
         }
         const data ={
          user:{
            id:user.id
          }
        }
        const authtoken = jwt.sign( data , JWT_SECRET );
        success=true;
        res.json({success,authtoken})
         }catch(error){
         console.error(error.message);
         res.status(500).send("Internal server error")
      

      

      }

})
router.post('/getuser',fetchuser,async(req,res)=>{
  try {
    const userId = req.user.id
    const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (error) {

    console.error(error.message);
         res.status(500).send("getuser error")
  }
  })
module.exports = router  