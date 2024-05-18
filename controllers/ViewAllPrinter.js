const printerModel = require('../model/DAO/printer_DAO');
const spsoModel = require('../model/DAO/SPSO_DAO');
const path = require("path");
const getPrinterList = (req, res) => {
printerModel.getPrinters(function (err, result) {
  if (err) {
    res.status(err.code).json({ message: err.message });
  } else {
    res.json(result);
  }
});
}

function searchPrinter(req, res) {
  let printer = {
    campusName: req.body.campusName,
    roomNumber: req.body.roomNumber,
    buildingName: req.body.buildingName,
    printer_id: req.body.printer_id,
    printer_status: req.body.printer_status
  };
  spsoModel.searchPrinter(printer, function(err, result) {
    if (err) {
      res.status(err.code).json({ message: err.message });
    }
    else {
      res.json(result);
    }
  })
}

function addNewPrinter(req, res) {
  let printer = {
    brand: req.body.brand,
    model: req.body.model,
    description: req.body.description,
    campusName: req.body.campusName,
    roomNumber: req.body.roomNumber,
    buildingName: req.body.buildingName,
    printer_status: req.body.printer_status
  };
  spsoModel.addNewPrinter(printer, function (err, result) {
    if (err) {
      res.status(err.code).json({ message: err.message });
    }
    else {
      res.json({ message: "Thêm máy in thành công!" })
    }
  })
}

function editPrinter(req, res) {
  let printer = {
    brand: req.body.brand,
    model: req.body.model,
    description: req.body.description,
    campusName: req.body.campusName,
    roomNumber: req.body.roomNumber,
    buildingName: req.body.buildingName,
    printer_id: req.body.printer_id
  };
  spsoModel.editPrinter(printer, function (err, result) {
    if (err) {
      res.status(err.code).json({ message: err.message });
    }
    else {
      res.json({ message: "Cập nhật thông tin máy in thành công!" })
    }
  })
}

function enablePrinter(req, res) {
  spsoModel.enablePrinter(req.body.printer_id, function (err, result) {
    if (err) {
      res.status(err.code).json({ message: err.message });
    }
    else {
      res.json({ message: "Kích hoạt máy in thành công!" })
    }
  })
}

function disablePrinter(req, res) {
  spsoModel.disablePrinter(req.body.printer_id, function (err, result) {
    if (err) {
      res.status(err.code).json({ message: err.message });
    }
    else {
      res.json({ message: "Vô hiệu hoá máy in thành công!" })
    }
  })
}

function removePrinter(req, res) {
  spsoModel.removePrinter(req.body.printer_id, function (err, result) {
    if (err) {
      res.status(err.code).json({ message: err.message });
    }
    else {
      res.json({ message: "Xoá máy in thành công!" })
    }
  })
}

module.exports = { 
  getPrinterList,
  searchPrinter,
  addNewPrinter,
  editPrinter,
  enablePrinter,
  disablePrinter,
  removePrinter
};