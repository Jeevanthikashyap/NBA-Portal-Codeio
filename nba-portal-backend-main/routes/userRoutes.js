const express = require('express')
const authController = require('./../controllers/authContoller')

const router = express.Router();

//middleware
const confirmPassword = require('../middleware/confirmPassword')

router
    .post('/signup', confirmPassword, authController.signup)
    .post('/login', authController.login)

module.exports = router