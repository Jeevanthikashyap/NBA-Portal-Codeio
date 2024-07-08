const express = require('express')

const uploadMiddleware = require('../middleware/formidableMiddleware')
const checkRole = require('../middleware/checkRole')
const professorController = require('../controllers/professorContoller');
const checkAuth = require('../middleware/check-auth');
const checkRoleOnly = require('../middleware/checkRoleOnly');
const createReport = require('../middleware/createReport');
const checkRoleHistory = require('../middleware/checkRoleHistory')

const router = express.Router();

router.use(checkAuth)

router
    .post('/upload/:id',checkRole, uploadMiddleware, createReport, professorController.uploadReport)
    .get('/download-format/:role&:part&:program', professorController.downloadFormat)
    .get('/reports/:id', professorController.readReport)
    .get('/get-all',checkRoleHistory, professorController.getHistory)
    .get('/get-single/:id', professorController.getSingleHistory)
    .get('/get-current',checkRoleOnly, professorController.getCurrent)
    .get('/get-allocation-report/:id', professorController.downloadAllocationReport)
    .get('/get-current-one/:id', professorController.getSingleCurrent)

module.exports = router