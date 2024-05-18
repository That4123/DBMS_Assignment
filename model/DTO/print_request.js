module.export = class PrintRequest{
    fileName;
    pathToUploadFile;
    chosenPrinter;
    paperSize;
    pagesToPrint;
    isDoubleSide;
    numberOfCopies;
    printType;
    createdBy;
    request_status;
    constructor(fileName,
        pathToUploadFile,
        chosenPrinter,
        paperSize,
        pagesToPrint,
        isDoubleSide,
        numberOfCopies,
        printType,
        createdBy,
        request_status){
            this.fileName = fileName;
            this.pathToUploadFile = pathToUploadFile;
            this.chosenPrinter = chosenPrinter; 
            this.paperSize = paperSize;
            this.pagesToPrint = pagesToPrint;
            this.isDoubleSide = isDoubleSide;
            this.numberOfCopies = numberOfCopies;
            this.printType = printType;
            this.createdBy = createdBy;
            this.request_status = request_status
    }
}