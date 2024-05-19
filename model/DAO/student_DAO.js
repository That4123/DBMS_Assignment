var connect_DB = require('./connect_db');
function calculatePrintCount(input) {
    const ranges = input.split(',');
    let totalCount = 0;
    ranges.forEach(range => {
        const [start, end] = range.split('-').map(Number);
        const rangeCount = end ? end - start + 1 : 1;
        totalCount += rangeCount;
    });
    return totalCount;
}
function checkValidNumberToPrint(req, callback) {
    let sql = "SELECT `page_num_left` FROM `student` WHERE `student_id`=?";
    connect_DB.all(sql, [
        parseInt(req.cur_member.user_id),
    ], function (err, result, field) {
        if (err) {
            console.log(err);
            callback({ code: 500, message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" }, null);
            return;
        }
        else {
            const num_of_page_to_print = calculatePrintCount(req.body.completeState.pages_to_print) * req.body.completeState.number_of_copies;
            const pageLeft = result[0].page_num_left - num_of_page_to_print;
            if (pageLeft < 0) {
                callback({ code: 500, message: "Số giấy trong tài khoản không đủ" }, null);
                return;
            }
            else {
                callback(null, num_of_page_to_print);
            }
        }
    })
}
function makeChangePageLeft(student_id, amount, callback) {
    let sql = "UPDATE `student` SET `page_num_left` = `page_num_left`-? WHERE `student_id` = ?";
    connect_DB.run(sql, [
        parseInt(amount),
        parseInt(student_id),
    ], function (err, result, field) {
        if (err) {
            console.log(err);
            callback(err);
            return;
        }
        else {
            callback(null);
            return;
        }
    })
}
function makeChangePageUp(student_id, amount, callback) {
    let sql = "UPDATE `student` SET `page_num_left` = `page_num_left`+? WHERE `student_id` = ?";
    connect_DB.run(sql, [
        parseInt(amount),
        parseInt(student_id),
    ], function (err, result, field) {
        if (err) {
            console.log(err);
            callback(err);
            return;
        }
        else {
            callback(null);
            return;
        }
    })
}

function makePrintRequest(req, res) {
    console.log('/////////makeprintrequest////////');
    makeRequest(req.body.completeState, res, function (print_request_id) {
        let sql = "INSERT INTO printing_log (student_id, printer_id, print_request_id, num_of_page_to_print, printing_status) VALUES (?, ?, ?, ?, ?)";
        connect_DB.run(sql, [
            parseInt(req.cur_member.user_id),
            parseInt(req.body.completeState.printer_id),
            parseInt(print_request_id),
            parseInt(req.body.completeState.num_of_page_to_print),
            "Pending"
        ], function (err, result, field) {
            if (err) {
                console.log(err);
                res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            }
            else {
                makeChangePageLeft(parseInt(req.cur_member.user_id), req.body.completeState.num_of_page_to_print, function (err) {
                    if (err) {
                        callback(err, null);
                    }
                    else {
                        res.status(200).json({ message: "Bạn thành công gửi yêu cầu in" });
                    }
                });

            }
        })
    })


}
function makeRequest(req, res, next) {
    let sql = "INSERT INTO print_request (file_name, file_path, chosen_printer, paper_size, pages_to_print, is_double_side, number_of_copies, print_type) VALUES (?,?, ?, ?, ?, ?, ?, ?)"
    connect_DB.run(sql, [
        req.file_name,
        req.file_path,
        parseInt(req.printer_id),
        req.paper_size,
        req.pages_to_print,
        req.is_double_side?1:0,
        parseInt(req.number_of_copies),
        req.print_type,
    ], function (err, result, field) {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
        }
        else {
            next(result.lastInsertRowid);
        }
    })
}
// async function getPrintReqStatusList(student_id, res) {
//     getPrintReqStatusListId(student_id, function (err, listId) {
//         if (err) {
//             res({ code: err.code || 500, message: err.message || "Có lỗi đã xảy ra khi truy vấn dữ liệu. Vui lòng thử lại sau" }, null);
//             return;
//         }
//         connect_DB.all("SELECT * FROM printing_log WHERE print_request_id IN (" + listId.map(id => "?").join(", ") + ")", listId, function (err, allRowsResult) {
//             if (err) {
//                 res({ code: err.code || 500, message: err.message || "Có lỗi đã xảy ra khi truy vấn dữ liệu. Vui lòng thử lại sau" }, null);
//                 return;
//             } else if (allRowsResult.length === 0) {
//                 res({ code: 400, message: "Bạn không có yêu cầu in nào" }, null);
//                 return;
//             } else {
//                 res(null, allRowsResult);
//             }
//         });
//     });
// }

async function getPrintReqStatusList(student_id, res) {
        connect_DB.all("SELECT * FROM printing_log WHERE print_request_id IN (SELECT `print_request_id` FROM `printing_log` WHERE student_id=?)", parseInt(student_id), function (err, allRowsResult) {
            if (err) {
                res({ code: err.code || 500, message: err.message || "Có lỗi đã xảy ra khi truy vấn dữ liệu. Vui lòng thử lại sau" }, null);
                return;
            } else if (allRowsResult.length === 0) {
                res({ code: 400, message: "Bạn không có yêu cầu in nào" }, null);
                return;
            } else {
                res(null, allRowsResult);
            }
        });
}

async function getPrintReqStatusListId(student_id, callback) {
    let sql = "SELECT `print_request_id` FROM `printing_log` WHERE student_id=?";
    connect_DB.all(sql, [
        parseInt(student_id)
    ], function (err, result) {
        if (err) {
            callback({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
        }
        else if (result.length == 0) {
            callback({ code: 400, message: "Bạn không có yêu cầu in nào" }, null);
        }
        else {
            const listId = result.map(row => parseInt(row.print_request_id));
            callback(null, listId);
        }
    });
}
function getConfigDetail(print_request_id, callback) {
    let sql = "SELECT * FROM `print_request` WHERE request_id=?";
    connect_DB.all(sql, [
        print_request_id
    ], function (err, result) {
        if (err) {
            callback({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
        }
        else if (result.length == 0) {
            callback({ code: 400, message: "Bạn không có" }, null);
        }
        else {
            callback(null, result);
        }
    });
}
function convertKeyToString(key) {
    switch (key) {
        case 'printer_id':
            return "bấm \'Chọn máy in\' để chọn máy in";
        case 'file_path':
            return "bấm \'Tải file lên\' để chọn tải file in";
        case 'file_name':
            return "bấm \'Tải file lên\' để chọn tải file in";
        case 'paper_size':
            return "chọn khổ giấy ở mục \'Cấu hình in\'";
        case 'is_double_side':
            return "chọn \'In một mặt\' hoặc \'In hai mặt\' ở mục \'Cấu hình in\'";
        case 'number_of_copies':
            return "điền số bản in muốn in ở mục \'Cấu hình in\'";
        case 'print_type':
            return "chọn loại in ở mục \'Cấu hình in\'";
        case 'pages_to_print':
            return "điền trang in ở mục \'Cấu hình in\'";
        default:
            return key;
    }
  }
function checkNoEmpty(obj,res) {
    console.log(obj);
    for (let key in obj) {
        if (obj[key] === undefined || obj[key] === null || obj[key] === "") {
            console.log(key);
            res.status(400).json({message:"Bạn vui lòng "+convertKeyToString(key)});
            return false;
        }
    }
    return true;
}
function checkValidNumberOfCopies(obj) {
    if (/^\d+$/.test(obj.number_of_copies)) return true;
    return false;
}
function checkValidPagesToPrint(obj) {
    if (/^(\d+(-\d+)?)(,\d+(-\d+)?)*$/.test(obj.pages_to_print)) return true;
    return false;
}
function getPaperNumber(student_id, callback) {
    let sql = "SELECT `page_num_left` FROM `student` WHERE student_id=?";
    connect_DB.all(sql, [
        student_id
    ], function (err, result) {
        if (err) {
            callback({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
        }
        else {
            callback(null, result);
        }
    });
}
function loadPurchaseLog(student_id, callback) {
    let sql = "SELECT * FROM `paper_purchase_log` WHERE student_id=?";
    connect_DB.all(sql, [
        student_id
    ], function (err, result) {
        if (err) {
            callback({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
        }
        else {
            callback(null, result);
        }
    });
}
function registerPurchase(purchase_log, callback) {
    let sql = "INSERT INTO paper_purchase_log (student_id, register_date, number_of_page, amount, status) VALUES (?, CURRENT_TIMESTAMP;, ?, ?, ?)";
    connect_DB.run(sql, [
        purchase_log.student_id,
        purchase_log.number_of_page,
        purchase_log.number_of_page * 400,
        "Chưa thanh toán"
    ], function (err, result) {
        if (err) {
            callback({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
        }
        else {
            callback(null, result);
        }
    })
}
function confirmPurchase(purchase_log_id, student_id, callback) {
    connect_DB.all("SELECT * FROM paper_purchase_log WHERE purchase_log_id = ? AND student_id = ?", [purchase_log_id, student_id], function (err, result) {
        if (err) {
            callback({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
        } else if (result.length === 0) {
            callback({ code: 400, message: "Yêu cầu thanh toán không tồn tại. Vui lòng kiểm tra!" }, null);
        } else {
            let number_of_page = result[0].number_of_page;
            connect_DB.run("UPDATE paper_purchase_log SET `purchase_date` = CURRENT_TIMESTAMP, status = 'Đã thanh toán' WHERE purchase_log_id = ?", [purchase_log_id], function (err) {
                if (err) {
                    callback({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
                } else {
                    connect_DB.run('UPDATE student SET page_num_left = page_num_left + ? WHERE student_id = ?', [number_of_page, student_id], function (err) {
                        if (err) {
                            callback({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
                        } else {
                            callback(null, { message: "Xác nhận mua hàng thành công" });
                        }
                    });
                }
            });
        }
    });
}
module.exports = {
    makePrintRequest,
    checkNoEmpty,
    checkValidNumberOfCopies,
    checkValidPagesToPrint,
    getPrintReqStatusList,
    getConfigDetail,
    getPaperNumber,
    checkValidNumberToPrint,
    loadPurchaseLog,
    registerPurchase,
    confirmPurchase
}