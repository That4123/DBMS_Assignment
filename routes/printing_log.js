const express = require('express');
const router = express.Router();
const printingLogController = require("../controllers/printing_log")

router.get("/", printingLogController.getPrintingLog);

module.exports = router;