
let DBConnect = require("../../SharedController/DBConnect");

module.exports.GameLogList = function GameLogList(limit,offset,callback) {
    let _limit = limit;
    let _offset = offset;
    if(_offset!=undefined&&_limit!=undefined){
        let query = "SELECT * FROM sampledb.gamelog_list limit "+_limit+" offset "+_offset;

        DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
            console.log(response);
            callback(response);
        } else {
            callback(undefined);
        }
    });
    }else{
        let query = "SELECT * FROM sampledb.gamelog_list;";

        DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
            console.log(response);
            callback(response);
        } else {
            callback(undefined);
        }
    });
    }
    
}