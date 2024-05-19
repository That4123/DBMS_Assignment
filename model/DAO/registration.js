var connect_DB = require('./connect_db');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

function checkNoEmpty(res, obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] == undefined || obj[key] == null || obj[key] == "") {
                res.status(400).json({ message: "Vui lòng không để trống bất kỳ trường nào!" });
                return false;
            }
        }
    }
    return true;
}

function checkNoDuplicate(res, user_id, email, valid) {
    connect_DB.all("SELECT * FROM user WHERE user_id = ?", [parseInt(user_id)], function (err, result, field) {
        if (err) {
            res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            valid(false);
        }
        else if (result.length > 0) {
            res.status(400).json({ message: "Thông tin bị trùng. Vui lòng kiểm tra xem bạn đã từng đăng ký với thông tin này chưa" });
            valid(false);
        }
        else {
            connect_DB.all("SELECT * FROM user WHERE email = ?", [email], function (err, result, field) {
                if (err) {
                    res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
                    valid(false);
                }
                else if (result.length > 0) {
                    res.status(400).json({ message: "Thông tin bị trùng. Vui lòng kiểm tra xem bạn đã từng đăng ký với thông tin này chưa" });
                    valid(false);
                }
                else {
                    valid(true);
                }
            })

        }
    })
}

function validate(res, obj, register) {
    if (checkNoEmpty(res, obj)) {
        checkNoDuplicate(res, obj.student_id, obj.email, function (valid) {
            register(valid);
        });
    }
    else
        register(false);
}

function register(res, obj) {
    validate(res, obj, function (valid) {
        if (valid) {
            let sql = "INSERT INTO user (user_id, user_name, email, password, role, state) VALUES (?, ?, ?, ?, ?, ?)"
            connect_DB.run(sql, [
                parseInt(obj.user_id),
                obj.user_name,
                obj.email,
                obj.password,
                "Sinh viên",
                "Đang hoạt động"
            ], function (err, result) {
                if (err)
                    res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
                else {
                    connect_DB.run("INSERT INTO student (student_id, page_num_left) VALUES (?, ?)", [
                        parseInt(obj.user_id),
                        10,
                    ], function (err, result) {
                        if (err) {
                            // Handle error in user_details insert
                            res.status(500).json({ message: "Hệ thống gặp vấn đề khi thêm thông tin chi tiết người dùng. Vui lòng thử lại sau" });
                        } else {
                            // Both inserts successful
                            let member = {
                                user_id: obj.user_id,
                                email: obj.email,
                                state: "Đang hoạt động",
                                role: "Sinh viên"
                            };
                            const token = jwt.sign(member, "RANDOM-TOKEN", { expiresIn: "15m" });
                            res.json({ member: member, token });
                        }
                    });
                }
            })
        }
    })
}

module.exports = { register }