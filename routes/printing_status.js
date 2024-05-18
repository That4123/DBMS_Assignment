const express = require('express');
const printing_status_router = express.Router();
const path = require("path");
const printing_status_controller = require('../controllers/printing_status');

printing_status_router.post("/", printing_status_controller.getPrintReqStatusList);

printing_status_router.post("/getConfigDetail", printing_status_controller.getConfigDetail);
// printing_status_router.post("/", printing_status_controller.);
module.exports = printing_status_router;
