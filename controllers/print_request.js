const printRequest = require('../model/DAO/printRequest_DAO')
module.exports = {
    getPrintRequestList: function (req, res) {
        printRequest.getAllPrintRequest((err, printRequests) => {
            if (err) {
                console.log(err);
                res.status(500).send('Internal server error')
            }
            else {
                res.status(200).json(printRequests);
            }
        })
    },
    getPrintRequest: function (req, res) {
        printRequest.getPrintRequestById(req.params.requestId, (err, printRequest) => {
            if (err) {
                console.log(err);
                res.status(500).send('Internal server error')
            }
            else {
                res.status(200).json(printRequest);
            }
        })
    },
    processPrintRequest: function (req, res) {
        printRequest.processPrintRequest(req.params.requestId, req.body.type, (err, printRequest) => {
            if (err) {
                console.log(err);
                res.status(500).send('Internal server error')
            }
            else {
                res.status(200).json(printRequest);
            }
        })
    },
}