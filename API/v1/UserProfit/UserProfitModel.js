let DBConnect = require("../../SharedController/DBConnect");

module.exports.UserProfitSearch = function UserProfitSearch(UserAccountID, StartDate, EndDate, callback) {
    let _UserAccountID = UserAccountID;
    let _StartDate = StartDate;
    let _EndDate = EndDate;
    
    let query = "select distinct p.UserAccountID useracct, p.shopID, d.DistributorID, h.HeadOfficeID, p.ScreenName,"
                //withdraw
                +" ifnull((select sum(amount) from transactions t left join transactioninfo tinfo on tinfo.UserTransactionID = t.UserTransactionID where t.TransactionType = 'withdraw' AND t.UserAccountID = useracct "
                +" AND tinfo.ApprovedDateTime BETWEEN '"+_StartDate+"' AND '"+_EndDate+"'),0) as withdraw,"
                //withdraw transfer
                +" ifnull((select sum(amount) from transferhistories where UserAccountIDSender = useracct AND Status = 'approved'"
                +" AND TransferedDateTime BETWEEN '"+_StartDate+"' AND '"+_EndDate+"'),0) as 'withdrawTransfer',"
                // deposit
                +" ifnull((select sum(amount) from transactions t left join transactioninfo tinfo on tinfo.UserTransactionID = t.UserTransactionID where t.TransactionType = 'deposit' AND t.UserAccountID = useracct"
                +" AND tinfo.ApprovedDateTime BETWEEN '"+_StartDate+"' AND '"+_EndDate+"'),0) as deposit,"
                // deposit transfer
                +" ifnull( (select sum(amount) from transferhistories where UserAccountIDReceiver = useracct AND Status = 'approved'"
                +" AND TransferedDateTime BETWEEN '"+_StartDate+"' AND '"+_EndDate+"'),0) as 'depositTransfer',"
                //betting amount
                +" ifnull((select sum(HandAmount) from handhistory where UserAccountID = useracct"
                +" AND HandDateTime BETWEEN '"+_StartDate+"' AND '"+_EndDate+"'),0)  BettingAmount,"
                //rake
                +" ifnull((select sum(TotalRake) from handhistory_rake_time where UserAccountID = useracct"
                +" AND HandDateTime BETWEEN '"+_StartDate+"' AND '"+_EndDate+"') ,0) TotalRake,"
                //money
                +" money"
                +" from players p"
                //we only use this to get player's parent offices ID
                +" right join shops s on s.shopid = p.ShopID"
                +" right join distributors d on d.distributorID = s.distributorID"
                +" right join headoffices h on h.headofficeid = d.headofficeid"

                +" WHERE p.UserAccountID = '"+_UserAccountID+"';";
                
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