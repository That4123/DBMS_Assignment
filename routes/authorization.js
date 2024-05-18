const express = require('express');
const authorization_router = express.Router();
const authorization_controller = require('../controllers/authorization');
const path = require("path");

authorization_router.post("/student", authorization_controller.student);
authorization_router.post("/spso", authorization_controller.spso);
authorization_router.post("/financier", authorization_controller.financier);
authorization_router.post("/admin", authorization_controller.admin);

module.exports = authorization_router;

