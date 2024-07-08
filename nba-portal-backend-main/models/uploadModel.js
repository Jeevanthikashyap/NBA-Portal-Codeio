const mongoose = require('mongoose')
const validator = require('validator')

const uploadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    fileName: {
        type: String,
        required: [true, 'File required']
    },
    appliedId: String
})

const Reports = mongoose.model('reports', uploadSchema)

module.exports = Reports