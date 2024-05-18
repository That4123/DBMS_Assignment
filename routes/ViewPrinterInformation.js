// server/printerView.js
const express = require('express');
const ViewPrinterInformation = require('../controllers/ViewPrinterInformation');
const path = require("path");
const ViewPrinterInformation_router = express.Router();

ViewPrinterInformation_router.post('/', ViewPrinterInformation.getPrinterDetail);

ViewPrinterInformation_router.post('/edit', ViewPrinterInformation.editPrinter);
ViewPrinterInformation_router.post('/enable', ViewPrinterInformation.enablePrinter);
ViewPrinterInformation_router.post('/disable', ViewPrinterInformation.disablePrinter);
ViewPrinterInformation_router.post('/remove', ViewPrinterInformation.removePrinter);

module.exports = ViewPrinterInformation_router;
