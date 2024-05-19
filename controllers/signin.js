// const { JsonWebTokenError } = require("jsonwebtoken");
var authentication_model = require("../model/DAO/authentication")
// var jwt = require('jsonwebtoken');

module.exports = {
    signin: function (req, res) {
        let obj = {
            email: req.body.email,
            password: req.body.password
            // token for password
            // password: jwt.sign(req.body.email)
            
        };
        if (authentication_model.checkNoEmpty(obj)) {
            authentication_model.signin(res, obj);
        }
        else {
            res.status(400).json({ message: "Không bỏ trống bất kỳ trường thông tin đăng nhập nào!" });
        }
    }
}