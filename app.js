var express = require('express');
var url = require('url');
var fs = require('fs');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var rateLimit = require("express-rate-limit");
var session = require('express-session');
var cookieParser = require('cookie-parser');

const homepageRoute = require('./routes/homepage');
const signinRoute = require('./routes/signin');
const authorizationRoute = require("./routes/authorization");
const registrationRoute = require("./routes/registration");
const printFileRoute = require("./routes/print_file")
const viewAllPrinterRoute = require("./routes/ViewAllPrinter");
const viewPrinterInfo = require("./routes/ViewPrinterInformation");
const permittedFileTypeRoute = require("./routes/ViewPermittedFileType")
const printRequestRoute = require("./routes/print_request")
const printingLogRoute = require("./routes/printing_log.js")
const buyPaper = require("./routes/buyPaper")
const printingStatusRoute = require("./routes/printing_status.js")
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10000 // limit each IP to 100 requests per windowMs
});

const cspConfig = {
    directives: {
      scriptSrc: ["'self'", "ajax.googleapis.com", "cdn.jsdelivr.net", "www.google.com"],
      frameSrc: ["'self'", "www.google.com"],
    },
  };



var app = express();
// app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet.contentSecurityPolicy(cspConfig));
app.use(express.static('assets'));
app.use(limiter);
app.use(cookieParser());
app.use(session({
    secret: "Your secret key",
    resave: false,
    saveUninitialized: true,
}));

app.use("/api/homepage", homepageRoute);

app.use("/api/signin", signinRoute);

app.use("/api/authorization", authorizationRoute);

app.use("/api/register", registrationRoute);

app.use("/api/viewAllPrinter", viewAllPrinterRoute);

app.use("/api/viewPrinterInfo", viewPrinterInfo);

app.use("/api/chooseprinter", printFileRoute);

app.use("/api/printFile", printFileRoute);

app.use("/api/printingStatus", printingStatusRoute);

app.use("/api/uploadfile", printFileRoute)

app.use("/api/viewPermittedFileType", permittedFileTypeRoute);

app.use("/api/buyPaper", buyPaper);
app.use("/api/printRequest", printRequestRoute);

app.use("/api/printingLog", printingLogRoute);

app.listen(8080);
