const User = require('./../models/userModel')
const jwt = require('jsonwebtoken')
const cookie = require('cookie')

exports.signup = async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    });

    const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})


    res.status(201).json({
        status: 'success',
        token,
        data: {
            newUser
        }
    })

}


exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (email === 'admin@gmail.com' && password === 'admin123') {
      const token = jwt.sign({id: '-1', email: 'admin@gmail.com'}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
      const role = 'admin'
  
      console.log(req.headers.authorization);
      res.status(200).json({
          status: 'success',
          token,
          role
      })
      return;
    }
    else if (email === 'college@gmail.com' && password === 'college123') {
      const token = jwt.sign({id: '-1', email: 'college@gmail.com'}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
      const role = 'college'
  
      console.log(req.headers.authorization);
      res.status(200).json({
          status: 'success',
          token,
          role
      })
      return;
    }
    else if (email === 'professor@gmail.com' && password === 'professor123') {
      const token = jwt.sign({id: '-1', email: 'professor@gmail.com'}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
      const role = 'professor'
  
      console.log(req.headers.authorization);
      res.status(200).json({
          status: 'success',
          token,
          role
      })
      return;
    }

    const user = await User.findOne({ email}).select('password')
    const us = await User.findOne({ email })

    if(!user) {
        return res.status(401).json({
            status: 'failed',
            message: 'Incorrect email'
        })
    }

    const correct = await user.correctPassword(password, user.password)

    if(!correct) {
        return res.status(401).json({
            status: 'failed',
            message: 'Incorrect password'
        })
    }

    const token = jwt.sign({id: user._id, email: us.email}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
    const role = us.role

    console.log(req.headers.authorization)
    res.status(200).json({
        status: 'success',
        token,
        role
    })
}



