var authentication_model = require("../model/DAO/authentication")

module.exports = {
    signin: function (req, res) {
        let obj = {
            email: req.body.email,
            password: req.body.password
        };
        if (authentication_model.checkNoEmpty(obj)) {
            authentication_model.signin(res, obj);
        }
        else {
            res.status(400).json({ message: "Không bỏ trống bất kỳ trường thông tin đăng nhập nào!" });
        }
    }
}