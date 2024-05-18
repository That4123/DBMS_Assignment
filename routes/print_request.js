const express = require('express')
const router = express.Router();
const printRequestController = require('../controllers/print_request')

router.get("/", printRequestController.getPrintRequestList);
router.get("/:requestId", printRequestController.getPrintRequest);
router.post("/:requestId", printRequestController.processPrintRequest);

module.exports = router;