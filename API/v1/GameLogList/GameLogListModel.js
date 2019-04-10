
let DBConnect = require("../../SharedController/DBConnect");

module.exports.GameLogList = function GameLogList(Limit,Offset,Order,Direction,callback) {
    let _Limit = Limit;
    let _Offset = Offset;
    let _Order = Order;
    let _Direction = Direction;
        let query = "SELECT * FROM sampledb.gamelog_list where BeforePoints and WinPoints and AfterPoints != 0 order by "+_Order+" "+_Direction+" limit "+_Limit+" offset "+_Offset;

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

//SELECT * FROM sampledb.gamelog_list where UserAccountID like '%%';
module.exports.GameLogSearch = function GameLogSearch(Column, Value, callback) {
    let _Column = Column;
    let _Value = Value;
    let query = 
    "SELECT * FROM sampledb.gamelog_list where "+_Column+" like \'%"+_Value+"%\' and BeforePoints and WinPoints and AfterPoints != 0;";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  }