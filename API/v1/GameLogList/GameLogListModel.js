
let DBConnect = require("../../SharedController/DBConnect");

module.exports.GameLogList = function GameLogList(callback) {
    let query = '';
    
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}