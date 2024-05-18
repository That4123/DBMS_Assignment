var connect_DB = require('./connect_db');
function checkFileType(req, res) {
    return new Promise((resolve, reject) => {
        let sql = "SELECT file_type FROM permitted_file_type";
        connect_DB.all(sql, null,function (err, result, field) {
            if (err) {
                res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
                reject(err);
            } else {
                for (let i = 0; i < result.length; i++) {
                    if (result[i].file_type === req) {
                        resolve(true);
                        return;
                    }
                }
                resolve(false);
            }
        });
    });
}
function checkFileSize(req) {
    return new Promise((resolve, reject) => {
        let sql = "SELECT max_file_size FROM permitted_file_type WHERE file_type = ?";
        connect_DB.get(sql, [req.file_type], function (err, result) {
            if (err) {
                reject(err);
            } else {
                
                if (req&&req.file_size <= result.max_file_size * 1048576) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        });
    });
}
function getPermittedFileType(res) {
    let sql = "SELECT file_type, max_file_size FROM permitted_file_type";
    connect_DB.all(sql, null,function (err, result, field) {
            if (err) {
                res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            }
            else if (result.length == 0) {
                res.status(400).json({ message: "Không có file đươc phép in" });
            }
            else {
                
                list = []
                for (let i = 0; i < result.length; i++){
                    list.push(result[i])
                }
                res.json({list: list})
                
            }
        })
}
const getPermittedFileTypes = (callback) => {
    const query = "SELECT * FROM permitted_file_type";
    connect_DB.all(query,null, (err, result) => {
        if (err) {
            console.error(err);
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}
module.exports = {
    checkFileSize,
    checkFileType,
    getPermittedFileType,
    getPermittedFileTypes
}
