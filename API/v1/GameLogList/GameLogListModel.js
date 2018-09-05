
let DBConnect = require("../../SharedController/DBConnect");

module.exports.GameLogList = function GameLogList(limit,offset,callback) {
    let _limit = limit;
    let _offset = offset;
    let query = "SELECT * FROM sampledb.gamelog_list limit "+_limit+" offset "+_offset;

    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
}