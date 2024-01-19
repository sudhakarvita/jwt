const express = require("express")
const admin = require("../Model/admin-model")
const router = express.Router()
const jwt = require('jsonwebtoken')

const verifyToken = require('../jwt/verifytoken')

router.post('/create', async (req,res)=>{
    try{
        const newAdmin = await admin.create(req.body)
        res.status(200).json(newAdmin)
    }catch(err){
        res.status(500).json({err:'admin not created'})
    }
});

router.post('/login', async(req,res)=>{
    try{
        const Admin = await admin.findOne({"username":req.body.username,"mobileno":req.body.mobileno})
        if(!Admin){
            res.status(404).json('admin not found')
        }
        const secretKey = 'my-secretKey';
        const token = jwt.sign({ "username":req.body.username, "mobileno":req.body.mobileno},secretKey,{ expiresIn: '1h' })
        res.status(201).json({Admin,token})
    }catch(err){
        res.status(500).json({err:'Admin login failed'})
    }
});

router.get('/get/admins', verifyToken, async (req, res) => {
    try {
      const allAdmins = await admin.find(); 
      res.status(201).json(allAdmins);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

module.exports = router;