let DBConnect = require("../../SharedController/DBConnect");

module.exports.PaginationCount = function PaginationCount(callback) {
    let page = [
      'deposit_list',
      'withdraw_list',
      'notifications',
      'player_supportlist',
      'useraccounts',
      'player_iplist',
      'blacklist',
      'gamelog_list',
      'loginhistory_list',
      'member_list',
      'headoffice_list'
    ]

    let query ="SELECT count(*) FROM sampledb."+page[0];
    DBConnect.DBConnect(query,function(response){
      if(response!=undefined){
        // console.log(response);
        callback(response);
      }else{
        callback(false);
      }
    });
  }