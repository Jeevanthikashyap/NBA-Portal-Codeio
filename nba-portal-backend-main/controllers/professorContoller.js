const fs = require("fs");
const PDFDocument = require('pdfkit')
var html_to_pdf = require('html-pdf-node');

const reports = require("../models/uploadModel");
const allotment = require("../models/allotmentModel");
const users = require('../models/userModel')

exports.uploadReport = async (req, res, next) => {
  const role = req.role;
  var attr = `evaluator${role}.id`;
  var status = `evaluator${role}.status`;
  var query1 = {};
  query1[status] = "completed";
  var query2 = {};
  query2[attr] = req.userId;
  query2["_id"] = req.params.id;

  const cl = await allotment.updateOne(
    {
      $and: [query2],
    },
    { $set: query1 }, 
    { new: true, upsert: true }
  );
  console.log(cl);
  res.status(200).json({
    status: "success",
  });
};

exports.downloadFormat = (req, res, next) => {
  const part = req.params.part;
  const program = req.params.program;
  const role = req.params.role
  const file = `./uploads/downloads/${program}/${role}/Part${part}.pdf`;
  res.setHeader("Content-disposition", "attachment; filename=Accuracies.pdf");
  res.setHeader("Content-Type", "application/pdf")
  res.download(file);
};

exports.getHistory = async (req, res, next) => {
  const role = req.role;
  var attr = `evaluator${role}.id`;
  var query = {}
  console.log(attr)
  query[attr] = req.userId
  const items = await allotment.find(query);
  res.status(200).json({
    items
  });
};

exports.getSingleHistory = async (req, res, next) => {
  const item = await allotment.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      item,
    },
  });
};

exports.getSingleCurrent = async (req, res, next) => {
  const item = await allotment.findById(req.params.id);

  res.status(200).json({
    item
  });
};

exports.readReport = async (req, res, next) => {
  const report = await reports.findById(req.params.id);
  const content = await fs.readFileSync(
    `${__dirname}/..` + report.fileName,
    "utf-8"
  );

  res.status(200).json({
    status: "success",
    data: {
      content,
    },
  });
};

exports.getCurrent = async (req, res, next) => {
  var query = {}
  query["status"] = 'allotted'
  const role = req.role;
  if (role == -1) {
    return res.status(500).json({
      message: 'no query'
    })
  }
  var attr = `evaluator${role}.id`;
  var roles;
  if(role==1){
    roles="Chairman"
  } else {
    roles="Evaluator"
  }
  query[attr] = req.userId;
  const allotments = await allotment.find({$and: [query]})
  res.status(200).json({
    allotments,
    role: roles
  })
}

exports.downloadAllocationReport = async (req, res, next) => {
  let options = { format: 'A4', path: './uploads/downloads/allocation-report/report.pdf' };
  let file = { content: "../templates/allocation-report.html" };
  html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
    console.log("PDF Buffer:-", pdfBuffer);
  })
  res.status(200).json({
    status: 'success'
  });
}
