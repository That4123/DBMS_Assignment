const path = require("path");

module.exports = {
    load: function (req, res) {
        // console.log(req)
        res.json({greeting: "Phản hồi từ server: Bạn đã vào trang chủ!"})
    },

}