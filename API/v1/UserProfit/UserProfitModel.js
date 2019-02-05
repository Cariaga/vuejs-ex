let DBConnect = require("../../SharedController/DBConnect");

module.exports.UserProfitSearch = function UserProfitSearch(ScreenName, StartDate, EndDate, callback) {
    let _ScreenName = ScreenName;
    let _StartDate = StartDate;
    let _EndDate = EndDate;
    
    let query = "select uap.UserName PlayerID, uas.UserName ShopID, uad.UserName DistributorID, uaho.UserName HeadOfficeID, p.ScreenName,"
                //withdraw
                +" ifnull((select sum(ApplicationAmount) from withdraw_list where UserAccountID = p.UserAccountID and TransactionStatus = 'approved'"
                +" AND RequestedDateTime BETWEEN \'"+_StartDate+"\' AND \'"+_EndDate+"\'),0) as withdraw,"
                //withdraw transfer
                +" ifnull((select sum(amount) from money_sent_histories where UserAccountIDSender = p.UserAccountID"
                +" AND TransferedDateTime BETWEEN \'"+_StartDate+"\' AND \'"+_EndDate+"\'),0) as 'withdrawTransfer',"
                // deposit
                +" ifnull((select sum(Amount) from deposit_list where UserAccountID = p.UserAccountID and TransactionStatus = 'approved'"
                +" AND RequestedDateTime BETWEEN \'"+_StartDate+"\' AND \'"+_EndDate+"\'),0) as deposit,"
                // deposit transfer
                +" ifnull((select sum(amount) from money_received_histories where UserAccountIDReceiver = p.UserAccountID"
                +" AND TransferedDateTime BETWEEN \'"+_StartDate+"\' AND \'"+_EndDate+"\'),0) as 'depositTransfer',"
                //betting amount
                +" ifnull((select sum(HandAmount) from handhistory where UserAccountID = p.UserAccountID"
                +" AND HandDateTime BETWEEN \'"+_StartDate+"\' AND \'"+_EndDate+"\'),0)  BettingAmount,"
                //rake
                +" ifnull((select sum(TotalRake) from handhistory_rake_time where UserAccountID = p.UserAccountID"
                +" AND HandDateTime BETWEEN \'"+_StartDate+"\' AND \'"+_EndDate+"\') ,0) rake,"
                //money
                +" money"
                +" from players p"
                //we only use this to get player's parent offices ID
                +" left join useraccounts uap on p.UserAccountID = uap.UserAccountID"
                +" left join shops s on p.ShopID = s.ShopID"
                +" left join useraccounts uas on s.UserAccountID = uas.UserAccountID"
                +" left join distributors d on s.DistributorID = d.DistributorID"
                +" left join useraccounts uad on d.UserAccountID = uad.UserAccountID"
                +" left join headoffices h on d.HeadOfficeID = h.HeadOfficeID"
                +" left join useraccounts uaho on h.UserAccountID = uaho.UserAccountID" 

                +" WHERE p.ScreenName = \'"+_ScreenName+"\';";
                
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

module.exports.UserProfit = function UserProfit(Limit, Offset, callback) {
    let _Offset = Offset;
    let _Limit = Limit;
    
    let query = "select * from player_profit_overall LIMIT "+_Limit+" OFFSET "+_Offset;
                
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

module.exports.UserProfit2 = function UserProfit2(Limit, Offset, Order, Direction, callback) {
    let _Offset = Offset;
    let _Limit = Limit;
    let _Order = Order;
    let _Direction = Direction;
    
    let query = "select * from player_profit_overall order by "+_Order+" "+_Direction+" LIMIT "+_Limit+" OFFSET "+_Offset;
                
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