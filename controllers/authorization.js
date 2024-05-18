const path = require("path");
const authorization_model = require('../model/DAO/authorization');

module.exports = {
    student: [authorization_model.loadCurMember, authorization_model.authorizeStudent, function (req, res) {
        res.status(200).json({});
    }],
    spso: [authorization_model.loadCurMember, authorization_model.authorizeSPSO, function (req, res) {
        res.status(200).json({});
    }],
    financier: [authorization_model.loadCurMember, authorization_model.authorizeFinancialOfficer, function (req, res) {
        res.status(200).json({});
    }],
    admin: [authorization_model.loadCurMember, authorization_model.authorizeAdmin, function (req, res) {
        res.status(200).json({});
    }]
}