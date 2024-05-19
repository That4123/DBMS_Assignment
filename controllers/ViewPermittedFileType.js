const permittedFileTypeModel = require('../model/DAO/permitted_file_type_DAO');
const spsoModel = require('../model/DAO/SPSO_DAO');
const path = require("path");

const getPermittedFileTypeList = (req, res) => {
    permittedFileTypeModel.getPermittedFileTypes((err, permittedFileTypes) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(permittedFileTypes);
        }
    })
};

function addNewPermittedFileType(req, res) {
    let permittedFileType = {
        file_type: req.body.file_type,
        max_file_size: req.body.max_file_size
    };
    spsoModel.addNewPermittedFileType(permittedFileType, function (err, result) {
        if (err) {
            res.status(err.code).json({ message: err.message });
        }
        else {
            res.json({ message: "Thêm loại file được phép in thành công!" });
        }
    })
}

function editPermittedFileType(req, res) {
    let permittedFileType = {
        permitted_id: req.body.permitted_id,
        file_type: req.body.file_type,
        max_file_size: req.body.max_file_size
    };
    spsoModel.editPermittedFileType(permittedFileType, function (err, result) {
        if (err) {
            res.status(err.code).json({ message: err.message });
        } else {
            res.json({ message: "Cập nhật thông tin loại file được phép in thành công!" })
        }
    })
}

function removePermittedFileType(req, res) {
    spsoModel.removePermittedFileType(req.body.permitted_id, function (err, result) {
        if (err) {
            res.status(err.code).json({ message: err.message });
        } else {
            res.json({ message: "Xóa loại file được phép in thành công!" })
        }
    })
}

module.exports = {
    getPermittedFileTypeList,
    addNewPermittedFileType,
    editPermittedFileType,
    removePermittedFileType
};
