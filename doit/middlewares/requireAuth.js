const jwt  = require('jsonwebtoken')
const User = require('../models/userModel')

const auth = async (req,res,next) => {
  try {
    const token = req.header('Authorization').replace('Bearer', '').trim()
    
    const decoded  =  jwt.verify(token, "mysimplejwtkey")
    const user  = await User.findOne({ _id:decoded.id})

    if (!user) {
      throw new Error()
    }
    req.token = token
    req.user = user
    next();

  } catch (error) {
    console.log(error)
    res.status(401).send({error:'Please authenticate!'})
  }
}

module.exports = auth