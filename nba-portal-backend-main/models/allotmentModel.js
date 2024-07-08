const mongoose = require('mongoose')
const validator = require('validator')

const roles = ["chair", "evaluator1", "evaluator2"]
const status = ["allotted", "cancelled", "completed"]
const program = ["UG","PG", "Diploma"]

const AllotmentSchema = new mongoose.Schema({
    collegeId: {
        type: String,
        required: [true]
    },
    department: {
        type: String,
        required: [true]
    },
    status: {
        type: String,
        enum: status
    },
    program: {
        type: String,
        enum: program
    },
    date: {
        type: Date,
        
    },
    evaluator1: {
        id: String,
        role: {
            type: String,
            enum: roles,
            required: [true]
        },
        status: {
            type: String,
            enum: status,
            required: [true]
        },
    },
    evaluator2: {
        id: String,
        role: {
            type: String,
            enum: roles,
            required: [true]
        },
        status: {
            type: String,
            enum: status,
            required: [true]
        },
    },
    evaluator3: {
        id: String,
        role: {
            type: String,
            enum: roles,
        },
        status: {
            type: String,
        }
    }
})

const Allotment = mongoose.model('allotment', AllotmentSchema)

module.exports = Allotment