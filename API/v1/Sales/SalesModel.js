let DBConnect = require("../../SharedController/DBConnect");



module.exports.SalesHeadOffice = function SalesHeadOffice(OHOID, Limit, Offset, callback){
    let _OHOID = OHOID;
    let _Limit = Limit;
    let _Offset = Offset;
    let query = "SELECT * FROM sampledb.sales_headoffice WHERE ParentID = \'"+_OHOID+"\' limit "+_Limit +" offset "+_Offset;
    console.log(query);
    DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
            callback(response);
          } else {
            callback(undefined);
          }
    });
}

module.exports.SaledDistributor = function SaledDistributor(HeadOfficeID, Limit, Offset, callback){
    let _HeadOfficeID = HeadOfficeID;
    let _Limit = Limit;
    let _Offset = Offset;
    let query = "SELECT * FROM sampledb.sales_distributor WHERE ParentID = \'"+_HeadOfficeID+"\' limit "+_Limit +" offset "+_Offset;
    console.log(query);
    DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
            callback(response);
          } else {
            callback(undefined);
          }
    });
}

module.exports.SalesShop = function SalesShop(DistributorID, Limit, Offset, callback){
    let _DistributorID = DistributorID;
    let _Limit = Limit;
    let _Offset = Offset;
    let query = "SELECT * FROM sampledb.sales_shop WHERE ParentID = \'"+_DistributorID+"\' limit "+_Limit +" offset "+_Offset;
    console.log(query);
    DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
            callback(response);
          } else {
            callback(undefined);
          }
    });
}

module.exports.SalesPaginationCount = function SalesPaginationCount(index, callback) {
    let page = [
      'sales_headoffice',
      'sales_distributor',
      'sales_shop'
    ]

    let query ="SELECT count(*) as ID FROM sampledb."+page[index];
    DBConnect.DBConnect(query,function(response){
      if(response!=undefined){
        // console.log(response);
        callback(response);
      }else{
        callback(false);
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

