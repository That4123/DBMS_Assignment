const express = require('express');
const ViewPermittedFileType = require('../controllers/ViewPermittedFileType');
const path = require("path");
const ViewPermittedFileType_router = express.Router();

ViewPermittedFileType_router.post("/", ViewPermittedFileType.getPermittedFileTypeList);

ViewPermittedFileType_router.post("/add", ViewPermittedFileType.addNewPermittedFileType);
ViewPermittedFileType_router.post("/edit", ViewPermittedFileType.editPermittedFileType);
ViewPermittedFileType_router.post("/remove", ViewPermittedFileType.removePermittedFileType);

module.exports = ViewPermittedFileType_router;