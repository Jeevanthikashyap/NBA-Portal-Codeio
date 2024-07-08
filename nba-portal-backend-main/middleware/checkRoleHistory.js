const allotment = require("../models/allotmentModel");

const checkRoleHistory = async (req, res, next) => {
  var querya = {};
  var queryb = {};
  var queryc = {};
  querya["evaluator1.status"] = "completed";
  queryb["evaluator2.status"] = "completed";
  queryc["evaluator3.status"] = "completed";
  querya["evaluator1.id"] = req.userId;
  queryb["evaluator2.id"] = req.userId;
  queryc["evaluator3.id"] = req.userId;

  const ca = await allotment.findOne({$and: [querya]});
  const cb = await allotment.findOne({$and: [queryb]});
  const cc = await allotment.findOne({$and: [queryc]});
  if(ca != null) {
    req.role = 1
  } else if(cb != null) {
    req.role = 2
  } else if(cc != null) {
    req.role = 3
  }


  next()
};

module.exports = checkRoleHistory
