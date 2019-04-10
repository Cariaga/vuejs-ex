let DBConnect = require("../../SharedController/DBConnect");

module.exports.PaginationCount = function PaginationCount(index, callback) {
    let page = [
      'deposit_list',
      'blacklist',
      'gamelog_list',
      'player_iplist',
      'player_supportlist',
      'member_list',
      'withdraw_list',
      'player_profit_overall',
      'transferhistories_list',
      //unused
      'notifications',
      'useraccounts',
      'loginhistory_list',
      'headoffice_list'
    ]
    let query = "";
    if(index == 2){
      query ="SELECT count(*) as ID FROM sampledb."+page[index]+" where BeforePoints and AfterPoints and WinPoints != 0;";
    }else{
      query ="SELECT count(*) as ID FROM sampledb."+page[index];
    }
    DBConnect.DBConnect(query,function(response){
      if(response!=undefined){
        // console.log(response);
        callback(response);
      }else{
        callback(false);
      }
    });
  }