const express = require('express');
const printer_request_router = express.Router();
const path = require("path");
const print_file_controller = require('../controllers/print_file');


printer_request_router.get("/", print_file_controller.getPrinterListID);
printer_request_router.post("/printerDetail", print_file_controller.getPrintersDetail);
printer_request_router.post("/makePrintRequest", print_file_controller.makePrintRequest);
printer_request_router.post("/makeUpdateRequest", print_file_controller.makeUpdateRequest);
printer_request_router.post("/permittedFileType", print_file_controller.handleUploadFile);
printer_request_router.get("/permittedFileType", print_file_controller.getPermittedFileType);
module.exports = printer_request_router;
