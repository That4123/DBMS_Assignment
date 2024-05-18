var bcrypt = require("bcrypt");
var registration_model = require("../model/DAO/registration")

module.exports = {
    register: function (req, res) {
        if (req.body.password) {
            bcrypt.hash(req.body.password, 10)
                .then((hashedPassword) => {
                    let user = {
                        user_id: req.body.user_id,
                        user_name: req.body.user_name,
                        email: req.body.email,
                        password: hashedPassword
                    };
                    registration_model.register(res, user);
                })
                .catch((error) => {
                    res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
                })
        }
        else {
            res.status(400).json({ message: "Vui lòng không để trống trường nào!" });
        }
    }
}