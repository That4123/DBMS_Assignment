module.export = class Printer{
    printerID;
    brandName;
    model;
    description;
    campusName;
    roomNumber;
    buildingName;
    printerStatus;
    constructor(printerID,
        brandName,
        model,
        description,
        campusName,
        roomNumber,
        buildingName,
        printerStatus){
            this.printerID = printerID;
            this.brandName = brandName;
            this.model = model;
            this.description = description;
            this.campusName = campusName;
            this.roomNumber = roomNumber;
            this.buildingName = buildingName;
            this.printerStatus = printerStatus;
    }
}

