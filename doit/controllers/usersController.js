const Users = require('../models/userModel');
const dotenv = require('dotenv');
const {toHash, compare} = require('../services/password');
const jwt = require('jsonwebtoken');

// dotenv.config({path: '../config/config.env'});
const JWT_KEY = "mysimplejwtkey";

exports.addUser = async (req, res, next) => {
  try {
    const encrypted_pass = await toHash(req.body.password);

    const userPayload = await {
      email: req.body.email,
      password: encrypted_pass
    }

    const user = await Users.create(userPayload);

    return res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};

exports.allowUser = async (req, res, next) => {
  const {email, password} = req.body;

  const existingUser = await Users.findOne({email});

  if (!existingUser) {
    return res.status(400).json({
      success: false,
      error: "Invalid Creds"
    });
  }

  const isCorrectPassword = await compare(existingUser.password, password);

  if (!isCorrectPassword) {
    return res.status(400).json({
      success: false,
      error: "Invalid Creds"
    });
  }


  const userJWT = jwt.sign({
    id: existingUser._id,
    email: existingUser.email
  }, JWT_KEY);

  req.session = {
    jwt: userJWT
  };

  res.status(200).send({
    email: existingUser.email,
    jwt: userJWT
  });
}

exports.disAllowUser = async (req, res, next) => {
  req.session = null;

  res.send({});
}