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

module.exports.SalesLowRankDistributor = function SalesLowRankDistributor(DistributorID, callback){
    let _DistributorID = DistributorID;
    let query = "SELECT * FROM sampledb.lowrank_dis WHERE DistributorID = '"+_DistributorID+"';";
    console.log(query);
    DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
            callback(response);
          } else {
            callback(undefined);
          }
    });
}

module.exports.SalesLowRankShop = function SalesLowRankShop(ShopID, callback){
    let _ShopID = ShopID;
    let query = "SELECT * FROM sampledb.lowrank_shop WHERE ShopID = '"+_ShopID+"';";
    console.log(query);
    DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
            callback(response);
          } else {
            callback(undefined);
          }
    });
}

