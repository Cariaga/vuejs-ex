let DBConnect = require("../../SharedController/DBConnect");



module.exports.SalesHeadOffice = function SalesHeadOffice(OHOID, Limit, Offset, callback){
    let _OHOID = OHOID;
    let _Limit = Limit;
    let _Offset = Offset;
    let query = "SELECT * FROM sampledb.total_money_headoffices WHERE OperatingHeadOfficeID = \'"+_OHOID+"\' limit "+_Limit +" offset "+_Offset;
    console.log(query);
    DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
            callback(response);
          } else {
            callback(undefined);
          }
    });
}










module.exports.SalesLowRank = function SalesLowRank(HeadOfficeID, callback){
    let _HeadOfficeID = HeadOfficeID;
    let query = "SELECT * FROM sampledb.lowrank WHERE HeadOfficeID = \'"+_HeadOfficeID+"\';";
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
    let query = "SELECT * FROM sampledb.lowrank_dis WHERE DistributorID = \'"+_DistributorID+"\';";
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
    let query = "SELECT * FROM sampledb.lowrank_shop WHERE ShopID = \'"+_ShopID+"\';";
    console.log(query);
    DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
            callback(response);
          } else {
            callback(undefined);
          }
    });
}

