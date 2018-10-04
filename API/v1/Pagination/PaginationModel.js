let DBConnect = require("../../SharedController/DBConnect");

module.exports.PaginationCount = function PaginationCount(callback) {
    let query ="SELECT * FROM sampledb.paginationcount";
    DBConnect.DBConnect(query,function(response){
      if(response!=undefined){
        // console.log(response);
        callback(response);
      }else{
        callback(false);
      }
    });
  }