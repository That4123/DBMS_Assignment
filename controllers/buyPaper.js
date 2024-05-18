const studentModel = require('../model/DAO/student_DAO');
const authorization_model = require('../model/DAO/authorization');
const path = require("path");
const loadPaperNumber = [authorization_model.loadCurMember, authorization_model.authorizeStudent, (req, res) => {
  studentModel.getPaperNumber(req.cur_member.user_id, function (err, result) {
    if (err) {
      res.status(err.code).json({ message: err.message });
    } else {
      res.json(result);
    }
  });
}]
const loadPurchaseLog = [authorization_model.loadCurMember, authorization_model.authorizeStudent, (req, res) => {
  studentModel.loadPurchaseLog(req.cur_member.user_id, function (err, result) {
    if (err) {
      res.status(err.code).json({ message: err.message });
    } else {
      res.json(result);
    }
  });
}]
const registerPurchase = [authorization_model.loadCurMember, authorization_model.authorizeStudent, (req, res) => {
  let purchase_log = {
    student_id: req.cur_member.user_id,
    number_of_page: req.body.number_of_page
  }
  studentModel.registerPurchase(purchase_log, function (err, result) {
    if (err) {
      res.status(err.code).json({ message: err.message });
    } else {
      res.json({ message: "Đăng ký mua thành công!" });
    }
  })
}]
const confirmPurchase = [authorization_model.loadCurMember, authorization_model.authorizeStudent, (req, res) => {
  studentModel.confirmPurchase(req.body.purchase_log_id, req.cur_member.user_id, function (err, result) {
    if (err) {
      res.status(err.code).json({ message: err.message });
    } else {
      res.json({ message: "Xác nhận mua thành công! Vui lòng thanh toán đúng hạn trên BKPay!" });
    }
  })
}]
module.exports = {
  loadPaperNumber,
  loadPurchaseLog,
  registerPurchase,
  confirmPurchase
}