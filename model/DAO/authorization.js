var connect_DB = require('./connect_db');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

async function loadCurMember(req, res, next) {
    try {
        const token = await req.headers.authorization.split(" ")[1];
        const decodeToken = await jwt.verify(token, "RANDOM-TOKEN");
        const cur_member = await decodeToken;
        req.cur_member = cur_member;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Người dùng chưa đăng nhập hoặc phiên đã hết hạn" });
    }
}

async function authorizeStudent(req, res, next) {
    if (req.cur_member) {
        let sql = "SELECT * FROM user WHERE user_id = CAST(? AS INTEGER) AND email = ? AND state = ? AND role = ?";
        connect_DB.all(sql, [
            parseInt(req.cur_member.user_id),
            req.cur_member.email,
            req.cur_member.state,
            req.cur_member.role
        ], function (err, result, field) {
            if (err) {
                res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            }
            else if (result.length == 0) {
                res.status(400).json({ message: "Người dùng không tồn tại. Vui lòng kiểm tra" });
            }
            else {
                if (result[0].state != "Đang hoạt động") {
                    res.status(403).json({ message: "Người dùng đang bị khoá!" });
                }
                else if (result[0].role != "Sinh viên") {
                    res.status(403).json({ message: "Người dùng không có quyền truy cập trang hay tác vụ này!" });
                }
                else {
                    next();
                }
            }
        })
    }
    else {
        res.status(401).json({ message: "Người dùng không xác định. Vui lòng kiểm tra" });
    }
}

async function authorizeSPSO(req, res, next) {
    if (req.cur_member) {
        let sql = "SELECT * FROM user WHERE user_id = CAST(? AS INTEGER) AND email = ? AND state = ? AND role = ?";
        connect_DB.all(sql, [
            parseInt(req.cur_member.user_id),
            req.cur_member.email,
            req.cur_member.state,
            req.cur_member.role
        ], function (err, result, field) {
            if (err) {
                res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            }
            else if (result.length == 0) {
                res.status(400).json({ message: "Người dùng không tồn tại. Vui lòng kiểm tra" });
            }
            else {
                if (result[0].state != "Đang hoạt động") {
                    res.status(403).json({ message: "Người dùng đang bị khoá!" });
                }
                else if (result[0].role != "Nhân viên SPSO") {
                    res.status(403).json({ message: "Người dùng không có quyền truy cập trang hay tác vụ này!" });
                }
                else {
                    next();
                }
            }
        })
    }
    else {
        res.status(401).json({ message: "Người dùng không xác định. Vui lòng kiểm tra" });
    }
}

async function authorizeFinancialOfficer(req, res, next) {
    if (req.cur_member) {
        let sql = "SELECT * FROM user WHERE user_id = CAST(? AS INTEGER) AND email = ? AND state = ? AND role = ?";
        connect_DB.all(sql, [
            parseInt(req.cur_member.user_id),
            req.cur_member.email,
            req.cur_member.state,
            req.cur_member.role
        ], function (err, result, field) {
            if (err) {
                res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            }
            else if (result.length == 0) {
                res.status(400).json({ message: "Người dùng không tồn tại. Vui lòng kiểm tra" });
            }
            else {
                if (result[0].state != "Đang hoạt động") {
                    res.status(403).json({ message: "Người dùng đang bị khoá!" });
                }
                else if (result[0].role != "Nhân viên văn phòng tài chính") {
                    res.status(403).json({ message: "Người dùng không có quyền truy cập trang hay tác vụ này!" });
                }
                else {
                    next();
                }
            }
        })
    }
    else {
        res.status(401).json({ message: "Người dùng không xác định. Vui lòng kiểm tra" });
    }
}

async function authorizeAdmin(req, res, next) {
    if (req.cur_member) {
        let sql = "SELECT * FROM user WHERE user_id = CAST(? AS INTEGER) AND email = ? AND state = ? AND role = ?";
        connect_DB.all(sql, [
            parseInt(req.cur_member.user_id),
            req.cur_member.email,
            req.cur_member.state,
            req.cur_member.role
        ], function (err, result, field) {
            if (err) {
                res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            }
            else if (result.length == 0) {
                res.status(400).json({ message: "Người dùng không tồn tại. Vui lòng kiểm tra" });
            }
            else {
                if (result[0].state != "Đang hoạt động") {
                    res.status(403).json({ message: "Người dùng đang bị khoá!" });
                }
                else if (result[0].role != "Quản trị viên") {
                    res.status(403).json({ message: "Người dùng không có quyền truy cập trang hay tác vụ này!" });
                }
                else {
                    next();
                }
            }
        })
    }
    else {
        res.status(401).json({ message: "Người dùng không xác định. Vui lòng kiểm tra" });
    }
}

module.exports = {
    loadCurMember,
    authorizeStudent,
    authorizeSPSO,
    authorizeFinancialOfficer,
    authorizeAdmin
}