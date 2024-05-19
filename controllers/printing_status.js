const path = require("path");
const student = require('../model/DAO/student_DAO');
const authorization_model = require('../model/DAO/authorization');
module.exports = {
    getPrintReqStatusList: [authorization_model.loadCurMember, authorization_model.authorizeStudent, function (req, res) {
        student.getPrintReqStatusList(req.cur_member.user_id, function (err,result) {
            if (err) {
                res.status(err.code || 500).json({ message: err.message || 'Internal Server Error' });
            }else{
                res.json({ listPrintingLog: result });
            }
        });
    }],
    getConfigDetail:[authorization_model.loadCurMember, authorization_model.authorizeStudent, function (req, res) {
        student.getConfigDetail(req.body.print_request_id, function (err, result) {
            if (err) {
                res.status(err.code).json({ message: err.message });
            }
            else {
                res.json({ print_request: result[0] })
            }
        })
    }],
};

