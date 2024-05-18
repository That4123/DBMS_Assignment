// server/printerView.js
const express = require('express');
const ViewAllPrinter = require('../controllers/ViewAllPrinter');
const path = require("path");
const ViewAllPrinter_router = express.Router();

// Endpoint để lấy tất cả máy in
ViewAllPrinter_router.post('/', ViewAllPrinter.getPrinterList);

// Các endpoint khác liên quan đến hiển thị máy in

ViewAllPrinter_router.post('/search', ViewAllPrinter.searchPrinter);
ViewAllPrinter_router.post('/add', ViewAllPrinter.addNewPrinter);
ViewAllPrinter_router.post('/edit', ViewAllPrinter.editPrinter);
ViewAllPrinter_router.post('/enable', ViewAllPrinter.enablePrinter);
ViewAllPrinter_router.post('/disable', ViewAllPrinter.disablePrinter);
ViewAllPrinter_router.post('/remove', ViewAllPrinter.removePrinter);

module.exports = ViewAllPrinter_router;
