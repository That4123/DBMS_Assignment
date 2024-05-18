module.export = class Printer{
    logId;
    studentId;
    printerId;
    printRequestInfo;
    startTime;
    endTime;
    numOfPageToPrint;
    printingStatus;
    constructor(
        logId,
        studentId,
        printerId,
        printRequestInfo,
        startTime,
        endTime,
        numOfPageToPrint,
        printingStatus){
            this.logId = logId;
            this.studentId = studentId;
            this.printerId = printerId;
            this.printRequestInfo = printRequestInfo;
            this.startTime = startTime;
            this.endTime = endTime;
            this.numOfPageToPrint = numOfPageToPrint;
            this.printingStatus = printingStatus;
    }
}

