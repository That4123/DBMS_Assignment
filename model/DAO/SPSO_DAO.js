var connect_DB = require('./connect_db');
// var mysql = require("mysql2");

function checkNoEmpty(obj) {
    if (obj == null || typeof obj !== 'object' || JSON.stringify(obj) === '{}') return false;
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] == undefined || obj[key] == null || obj[key] == "") {
                return false;
            }
        }
    }
    return true;
}

function searchPrinter(printer, controller) {
    let validSearch = false;
    let sql = "SELECT * FROM printer WHERE ";
    const params = [];

    if (printer.printer_id) {
        sql += "printer_id = ? ";
        params.push(parseInt(printer.printer_id));
        validSearch = true;
    }
    if (printer.campusName) {
        if (validSearch) {
            sql += "AND ";
        }
        sql += "campusName = ? ";
        params.push(printer.campusName);
        validSearch = true;
    }
    if (printer.buildingName) {
        if (validSearch) {
            sql += "AND ";
        }
        sql += "buildingName = ? ";
        params.push(printer.buildingName);
        validSearch = true;
    }
    if (printer.roomNumber) {
        if (validSearch) {
            sql += "AND ";
        }
        sql += "roomNumber = ? ";
        params.push(printer.roomNumber);
        validSearch = true;
    }
    if (printer.printer_status) {
        if (validSearch) {
            sql += "AND ";
        }
        sql += "printer_status = ? ";
        params.push(printer.printer_status);
        validSearch = true;
    }

    if (validSearch) {
        connect_DB.all(sql, params, function(err, result) {
            if (err) {
                controller({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
            }
            else if (result.length === 0) {
                controller({ code: 400, message: "Máy in cần tìm không tồn tại!" }, null);
            }
            else {
                controller(null, result);
            }
        })
    }
    else {
        controller({ code: 400, message: "Vui lòng nhập đầy đủ thông tin máy in cần tìm!" }, null)
    }
}


function addNewPrinter(printer, controller) {
    if (!checkNoEmpty(printer)) {
        controller({ code: 400, message: "Vui lòng nhập đầy đủ thông tin máy in cần thêm!" }, null);
        return;
    };
    let sql = "INSERT INTO printer (brand, model, description, campusName, roomNumber, buildingName, printer_status) VALUES (?, ?, ?, ?, ?, ?, ?)";
    connect_DB.run(sql, [
        printer.brand,
        printer.model,
        printer.description,
        printer.campusName,
        printer.roomNumber,
        printer.buildingName,
        printer.printer_status
    ], function (err, result) {
        if (err) {
            controller({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
        }
        else {
            controller(null, result);
        }
    });
}

function editPrinter(printer, controller) {
    if (!checkNoEmpty(printer)) {
        controller({ code: 400, message: "Vui lòng nhập đầy đủ thông tin cần cập nhật cho máy in!" }, null);
        return;
    };
    connect_DB.all("SELECT * FROM printer WHERE printer_id = ?", [parseInt(printer.printer_id)], function (err, result) {
        if (err) {
            controller({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
        }
        else if (result.length == 0) {
            controller({ code: 400, message: "Máy in cần kích hoạt không tồn tại!" }, null);
        }
        else {
            let sql = "UPDATE printer SET brand = ?, model = ?, description = ?, campusName = ?, roomNumber = ?, buildingName = ? WHERE printer_id = ?";
            connect_DB.run(sql, [
                printer.brand,
                printer.model,
                printer.description,
                printer.campusName,
                printer.roomNumber,
                printer.buildingName,
                printer.printer_id
            ], function (err, result) {
                if (err) {
                    controller({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
                }
                else {
                    controller(null, result);
                }
            })

        }
    });
}

function enablePrinter(printer_id, controller) {
    if (printer_id == undefined || printer_id == null || printer_id == "") {
        controller({ code: 400, message: "Vui lòng chọn id máy in cần kích hoạt!" }, null);
        return;
    }
    connect_DB.all("SELECT * FROM printer WHERE printer_id = ?", [parseInt(printer_id)], function (err, result) {
        if (err) {
            controller({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
        }
        else if (result.length == 0) {
            controller({ code: 400, message: "Máy in cần kích hoạt không tồn tại!" }, null);
        }
        else if (result[0].printer_status == "Active") {
            controller({ code: 400, message: "Máy in đã ở trạng thái kích hoạt trước khi cập nhật!" }, null);
        }
        else {
            connect_DB.run("UPDATE printer SET printer_status = ? WHERE printer_id = ?", ["Đang hoạt động", printer_id], function (err, result) {
                if (err) {
                    controller({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
                }
                else {
                    controller(null, result);
                }
            })
        }
    });
}

function disablePrinter(printer_id, controller) {
    if (printer_id == undefined || printer_id == null || printer_id == "") {
        controller({ code: 400, message: "Vui lòng chọn id máy in cần vô hiệu hoá!" }, null);
        return;
    }
    connect_DB.all("SELECT * FROM printer WHERE printer_id = ?", [parseInt(printer_id)], function (err, result) {
        if (err) {
            controller({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
        }
        else if (result.length == 0) {
            controller({ code: 400, message: "Máy in cần kích hoạt không tồn tại!" }, null);
        }
        else if (result[0].printer_status == "Disable") {
            controller({ code: 400, message: "Máy in đã ở trạng thái vô hiệu hoá trước khi cập nhật!" }, null);
        }
        else {
            connect_DB.run("UPDATE printer SET printer_status = ? WHERE printer_id = ?", ["Không hoạt động", parseInt(printer_id)], function (err, result) {
                if (err) {
                    controller({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
                }
                else {
                    controller(null, result);
                }
            })
        }
    });
}

function removePrinter(printer_id, controller) {
    if (printer_id == undefined || printer_id == null || printer_id == "") {
        controller({ code: 400, message: "Vui lòng chọn id máy in cần xoá!" }, null);
        return;
    }
    connect_DB.all("SELECT * FROM printer WHERE printer_id = ?", [parseInt(printer_id)], function (err, result) {
        if (err) {
            controller({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
        }
        else if (result.length == 0) {
            controller({ code: 400, message: "Máy in cần xoá không tồn tại!" }, null);
        }
        else {
            connect_DB.run("DELETE FROM printer WHERE printer_id = ?", parseInt([printer_id]), function (err, result) {
                if (err) {
                    controller({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
                }
                else {
                    controller(null, result);
                }
            })
        }
    });
}

function addNewPermittedFileType(permittedFileType, controller) {
    if (!checkNoEmpty(permittedFileType)) {
        controller({ code: 400, message: "Vui lòng nhập đủ thông tin loại file cần thêm!" }, null);
        return;
    };
    let sql = "INSERT INTO permitted_file_type (file_type, max_file_size) VALUES (?, ?)";
    connect_DB.run(sql, [
        permittedFileType.file_type,
        permittedFileType.max_file_size
    ], function (err, result) {
        if (err) {
            controller({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
        }
        else {
            controller(null, result);
        }
    });
}

function editPermittedFileType(permittedFileType, controller) {
    if (!checkNoEmpty(permittedFileType)) {
        controller({ code: 400, message: "Vui lòng nhập đầy đủ thông tin cần cập nhật cho loại file được phép in!" }, null);
        return;
    };
    connect_DB.all("SELECT * FROM permitted_file_type WHERE permitted_id = ?", [permittedFileType.permitted_id], function (err, result) {
        if (err) {
            controller({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
        }
        else if (result.length == 0) {
            controller({ code: 400, message: "Loại file được phép in cần cập nhật không tồn tại!" }, null);
        }
        else {
            let sql = "UPDATE permitted_file_type SET file_type = ?, max_file_size = ? WHERE permitted_id = ?";
            connect_DB.run(sql, [
                permittedFileType.file_type,
                permittedFileType.max_file_size,
                permittedFileType.permitted_id
            ], function (err, result) {
                if (err) {
                    controller({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
                }
                else {
                    controller(null, result);
                }
            });
        }
    })
}

function removePermittedFileType(permitted_id, controller) {
    if (permitted_id == undefined || permitted_id == null || permitted_id == "") {
        controller({ code: 400, message: "Vui lòng chọn id loại file được phép in cần xoá!" }, null);
    }
    connect_DB.all("SELECT * FROM permitted_file_type WHERE permitted_id = ?", [permitted_id], function (err, result) {
        if (err) {
            controller({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
        }
        else if (result.length == 0) {
            controller({ code: 400, message: "Loại file được phép in cần xoá không tồn tại!" }, null);
        }
        else {
            connect_DB.run("DELETE FROM permitted_file_type WHERE permitted_id = ?", [permitted_id], function (err, result) {
                if (err) {
                    controller({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
                }
                else {
                    controller(null, result);
                }
            })
        }
    })
}

const getPrintingLog = (callback) => {
    const sql = "SELECT * FROM printing_log INNER JOIN user ON printing_log.student_id=user.user_id";
    connect_DB.all(sql, null,function (err, result) {
        if (err) {
            console.log(err)
            callback(err, null)
        }
        else if (result.length === 0) {
            callback({ code: 400, message: "Không có dữ liệu để báo cáo" }, null);
        }
        else {
            callback(null, result);
        }
    })
}

module.exports = {
    searchPrinter,
    addNewPrinter,
    editPrinter,
    enablePrinter,
    disablePrinter,
    removePrinter,
    addNewPermittedFileType,
    editPermittedFileType,
    removePermittedFileType,
    getPrintingLog
}
