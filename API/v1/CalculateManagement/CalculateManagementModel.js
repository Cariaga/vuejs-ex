let DBConnect = require("../../SharedController/DBConnect");

module.exports.UserProfitSearch = function UserProfitSearch(UserAccountID, StartDate, EndDate, callback) {
    let _UserAccountID = UserAccountID;
    let _StartDate = StartDate;
    let _EndDate = EndDate;
    
    let query = "";
                
    DBConnect.DBConnect(query, function (response) {
        console.log(query)
        if (response != undefined) {
        console.log(response);
        callback(response);
        } else {
        callback(undefined);
        }
    });
      
}

module.exports.LowRank1 = function LowRank1(Limit, Offset,callback) {
    let _Offset = Offset;
    let _Limit = Limit;
    
    let query = "select * from calculateManage_1 LIMIT "+_Limit+" OFFSET "+_Offset;
                
    DBConnect.DBConnect(query, function (response) {
        console.log(query)
        if (response != undefined) {
        console.log(response);
        callback(response);
        } else {
        callback(undefined);
        }
    });
      
}