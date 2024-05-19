const printingLog = require("../model/DAO/SPSO_DAO")
module.exports = {
    getPrintingLog: function (req, res) {
        printingLog.getPrintingLog((err, printingLog) => {
            if (err) {
                console.log(err)
                res.status(500).send('Internal server error')
            }
            else {
                res.status(200).json(printingLog);
            }
        })
    }
}