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

module.exports.LowRank1 = function LowRank1(LowRank, Office, Limit, Offset, callback) {
    let _LowRank = LowRank;
    let _Office = Office;
    let _Limit = Limit;
    let _Offset = Offset;
    
    let query = "select * from calculateManage_"+_LowRank+" WHERE ParentID = \'"+_Office+"\' LIMIT "+_Limit+" OFFSET "+_Offset ;
                
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

module.exports.Pagination = function Pagination(LowRank, Office, callback) {
    let _LowRank = LowRank;
    let _Office = Office;
	console.log('TCL: Pagination -> _LowRank', _LowRank)

    if(_LowRank >= 0 && _LowRank <= 2){
        let query = "select count(*) as ID from calculateManage_"+_LowRank+" WHERE ParentID = \'"+_Office+"\'";
                    
        DBConnect.DBConnect(query, function (response) {
            console.log(query)
            if (response != undefined) {
            console.log(response);
            callback(response);
            } else {
            callback(undefined);
            }
        });
    }else{
        callback(undefined)
    }
      
}
