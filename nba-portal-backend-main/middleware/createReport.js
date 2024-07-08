const reports = require('../models/uploadModel')

const createReport = async (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    const fileUrl = "/uploads/reports/"+req.file.filename


    const newReport = await reports.create({
        name: 'hii',
        email: req.email,
        fileName: fileUrl,
        appliedId: req.params.id
    })
    
    next()
}

module.exports = createReport