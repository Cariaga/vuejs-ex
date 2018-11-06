let DBConnect = require("../../SharedController/DBConnect");

module.exports.SalesLowRank = function SalesLowRank(HeadOfficeID, callback){
    let _HeadOfficeID = HeadOfficeID;
    let query = "SELECT * FROM sampledb.lowrank WHERE HeadOfficeID = '"+_HeadOfficeID+"';";
    console.log(query);
    DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
            callback(response);
          } else {
            callback(undefined);
          }
    });
}