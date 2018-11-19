let DBConnect = require("../../SharedController/DBConnect");

module.exports.UserProfitSearch = function UserProfitSearch(UserAccountID, StartDate, EndDate, callback) {
    let _UserAccountID = UserAccountID;
    let _StartDate = StartDate;
    let _EndDate = EndDate;
    
    let query = "select distinct UserAccountID useracct, "

                +" ifnull((select sum(amount) from transactions t left join transactioninfo tinfo on tinfo.UserTransactionID = t.UserTransactionID where t.TransactionType = 'withdraw' AND t.UserAccountID = useracct "
                +" AND tinfo.ApprovedDateTime BETWEEN '"+_StartDate+"' AND '"+_EndDate+"'),0) as withdraw,"

                +" ifnull((select sum(amount) from transferhistories where UserAccountIDSender = useracct AND Status = 'approved'"
                +" AND TransferedDateTime BETWEEN '"+_StartDate+"' AND '"+_EndDate+"'),0) as 'withdraw(transfer)',"

                +" ifnull((select sum(amount) from transactions t left join transactioninfo tinfo on tinfo.UserTransactionID = t.UserTransactionID where t.TransactionType = 'deposit' AND t.UserAccountID = useracct"
                +" AND tinfo.ApprovedDateTime BETWEEN '"+_StartDate+"' AND '"+_EndDate+"'),0) as deposit,"

                +" ifnull( (select sum(amount) from transferhistories where UserAccountIDReceiver = useracct AND Status = 'approved'"
                +" AND TransferedDateTime BETWEEN '"+_StartDate+"' AND '"+_EndDate+"'),0) as 'deposit(transfer)',"
                
                +" ifnull((select sum(HandAmount) from handhistory where UserAccountID = useracct"
                +" AND HandDateTime BETWEEN '"+_StartDate+"' AND '"+_EndDate+"'),0)  BettingAmount,"

                +" ifnull((select sum(TotalRake) from handhistory_rake_time where UserAccountID = useracct"
                +" AND HandDateTime BETWEEN '"+_StartDate+"' AND '"+_EndDate+"') ,0) rake,"

                +" money"

                +" money from players WHERE UserAccountID = '"+_UserAccountID+"';";
  
    DBConnect.DBConnect(query, function (response) {
        if (response != undefined) {
        console.log(response);
        callback(response);
        } else {
        callback(undefined);
        }
    });
    
      
}