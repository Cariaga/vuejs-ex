let DBConnect = require("../SharedController/DBConnect");

var isNullOrEmpty = require('is-null-or-empty');

module.exports.CheckWithdrawPassword = function (UserAccountID, Password, callback) {
  let _UserAccountID = UserAccountID;
  let _Password = Password
  //we origianlly use withdraw password from user account now we use password of user
  let query =
    "SELECT * FROM sampledb.useraccounts as UA, sampledb.bankinformations as B where UA.UserAccountID=\'" + UserAccountID + "\' and B.SecurityCode=\'" + Password + "\';";
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(true);
    } else {
      callback(false);
    }
  });
}
module.exports.isValidSubractPlayerAmount = function (UserAccountID, Money, callback) {
  let _UserAccountID = UserAccountID;
  let _Money = Money
  let query =
    "SELECT Money-" + _Money + " as Money FROM sampledb.players where UserAccountID = \'" + _UserAccountID + "\'";

  DBConnect.DBConnect(query, function (response) {
    console.log("New Possible Amount " + response[0].Money);
    if (response[0].Money > 0) {
      console.log(response);
      callback(true);
    } else {
      callback(false);
    }
  });
}
/**
 *
 *
 * @param {*} Email
 * @param {*} callback
 */
module.exports.UserInfoEmailExist = function UserInfoEmailExist(Email, callback) {
  let _Email = Email
  let query =
    "SELECT * FROM `sampledb`.`userinfos` " +
    "WHERE Email = \'" + _Email + "\' ";


  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(true);
    } else {
      callback(false);
    }
  });
}
module.exports.PlayerMoney = function PlayerMoney(UserAccountID, callback) {
  let _UserAccountID = UserAccountID
  let query =
    "SELECT Money FROM `sampledb`.`players` where UserAccountID=\'" + _UserAccountID + "\'";


  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(true);
    } else {
      callback(false);
    }
  });
}

module.exports.IsShopExist = function IsShopExist(ShopID, callback) {
  let _ShopID = ShopID
  let query = "SELECT ShopID,UserAccountID FROM sampledb.shops where ShopID=\'" + _ShopID + "\'";
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(true);
    } else {
      callback(false);
    }
  });

}

module.exports.isPhoneNumberExist = function isPhoneNumberExist(PhoneNumber, callback) {
  let _PhoneNumber = PhoneNumber
  let query =
    "SELECT * FROM `sampledb`.`userinfos` " +
    "WHERE PhoneNumber = \'" + _PhoneNumber + "\' ";


  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(true);
    } else {
      callback(false);
    }
  });
}
//used by inquire 1
module.exports.isUserAccountIDUserNameBlocked = function isUserAccountIDUserNameBlocked(UserName, ScreenName, callback) {
  let _UserName = UserName;
  let _ScreenName = ScreenName;
  let query =
    'SELECT p.UserAccountID, p.ScreenName, uap.UserName, IFNULL(bl.Status,"Fresh") as newStatus' +
    ' FROM players p' +
    ' LEFT JOIN useraccounts uap on p.UserAccountID = uap.UserAccountID' +
    ' LEFT JOIN player_black_list bl on bl.UserAccountID = p.UserAccountID' +
    ' HAVING  uap.UserName = "' + _UserName + '" AND ScreenName = "' + _ScreenName + '"AND newStatus != "Blocked"';
  console.log('blacklist query: ' + query)
  DBConnect.DBConnect(query, function (response) {
    if (response) {
      if (response[0].UserName == _UserName) {
        console.log(response);
        callback(true);
      }
    } else {
      callback(false);
    }
  });
}

//used by inquire 2
module.exports.isPlayerAccountBlocked = function isPlayerAccountBlocked(Indexx, Value, callback) {
  let _Column = ['uap.UserName','ScreenName'];
  let _Value = Value;
  if(Indexx == 0 || Indexx == 1){
    let query =
      'SELECT p.UserAccountID, p.ScreenName, uap.UserName, IFNULL(bl.Status,"Fresh") as newStatus' +
      ' FROM players p' +
      ' LEFT JOIN useraccounts uap on p.UserAccountID = uap.UserAccountID' +
      ' LEFT JOIN (select * from player_black_list pbl inner join (select max(ReportDate) as lastReport from player_black_list' +
      ' where UserName = \"' + _Value + '\" or ScreenName = \"' + _Value + '\" )' +
      ' pbl2 on pbl.ReportDate = pbl2.lastReport WHERE pbl.BlackListID IN ( SELECT MAX(BlackListID) FROM player_black_list ' +
      ' GROUP BY UserAccountID)) bl on bl.UserAccountID = p.UserAccountID ' +
      ' HAVING '+_Column[Indexx]+' = \"' + _Value + '\" ';
    console.log('blacklist query: ' + query)
    DBConnect.DBConnect(query, function (response) {
      if (response) {
        console.log(response);
        callback(response);
      } else {
        callback(false);
        console.log('failed here')
      }
    });
  }else{
    console.log('failed here')
    callback(false);
  }
}


module.exports.isUserAccountIDBlocked = function isUserAccountIDBlocked(UserAccountID, callback) {
  let _UserAccountID = UserAccountID;
  let query =
    'SELECT p.UserAccountID, p.ScreenName,bl.UserName, IFNULL(bl.Status,"Fresh") as newStatus' +
    ' FROM players p LEFT JOIN player_black_list bl on bl.UserAccountID = p.UserAccountID' +
    ' HAVING  p.UserAccountID = "\'+_UserAccountID+\'" AND newStatus != "Blocked"';
  DBConnect.DBConnect(query, function (response) {
    if (response) {
      if (response[0].UserAccountID == _UserAccountID) {
        console.log(response);
        callback(true);
      }
    } else {
      callback(false);
    }
  });
}


module.exports.isPlayer = function isPlayer(UserName, callback) {
  let _UserName = UserName;
  let query =
    "SELECT `UserName` FROM sampledb.useraccount_types where `AccountType`='Player' and `UserName`=\'" + _UserName + "\' limit 1";
  DBConnect.DBConnect(query, function (response) {
    if (response) {
      if (response[0].UserName == _UserName) {
        console.log(response);
        callback(false);
      }
    } else {
      callback(true);
    }
  });
}

module.exports.isPlayerAdminPrivilege = function isPlayerAdminPrivilege(UserName, callback) {
  let _UserName = UserName;
  let query =
    "SELECT UserName FROM sampledb.useraccounts where `Privilege`='Admin' and `UserName`=\'" + _UserName + "\';";
  DBConnect.DBConnect(query, function (response) {
    if (response) {
      if (response[0].UserName == _UserName) {
        console.log(response);
        callback(false);
      }
    } else {
      callback(true);
    }
  });
}


module.exports.isUserNameBlocked = function isUserNameBlocked(UserName, callback) {
  let _UserName = UserName;
  let query =
    "SELECT p.UserAccountID, p.ScreenName,bl.UserName,bl.Status FROM players p LEFT JOIN player_black_list bl on bl.UserAccountID = p.UserAccountID where " +
    "bl.UserName = \'" + _UserName + "\'  and bl.Status = 'Blocked' order by bl.ReportDate desc;";
  console.log(query);
  DBConnect.DBConnect(query, function (response) {
    // if it was undefined it has never been blocked
    if(response == undefined){
      callback(false);
    }
    else if (response[0].Status == "Blocked") {
      callback(true);
    }
     else if (response[0].newStatus == "Released") { //has been blocked before but now released
      console.log(response);
      callback(false);
    } else { //if all fails to be true its blocked
      callback(false);
    }

  });
}

module.exports.isSeasonEnded = function isSeasonEnded(SeasonID, callback) {
  let _SeasonID = SeasonID;
  let query =
    "SELECT * FROM sampledb.playerfinalcard where SeasonID=\'" + _SeasonID + "\'";
  console.log(query);
  DBConnect.DBConnect(query, function (response) {
    // if it was undefined it has never been blocked
    if (response == undefined) {
      callback(false);
    } else { //if all fails to be true its blocked
      callback(true);
    }

  });
}
//Note: this part is not a view because it may need to be changed in the future
module.exports.UserAccountIDBasicInformation = function UserAccountIDBasicInformation(UserAccountID, callback) {

  //dedicate a view for basic user information for websocket use combining user info and player table
  let query = "SELECT ua.UserAccountID,ua.UserName,ua.OnlineStatus,ua.Privilege,pl.Commission,pl.Money,pl.ScreenName,GROUP_CONCAT(pti.ParentUserAccountID) as ParentUserAccountID FROM sampledb.useraccounts as ua join sampledb.players as pl on ua.UserAccountID=pl.UserAccountID join sampledb.player_treebranch_indirect as pti on ua.UserAccountID=pti.PlayerUserAccountID where ua.UserAccountID='"+UserAccountID+"';";
  console.log("Query  UserAccountIDBasicInformation : "+query);
  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      
      //  console.log('UserAccountID exist');
      callback(response);
    } else {
      callback(undefined);
      console.log('UserAccountID does not exist');
    }
  });
}
module.exports.isUserAccountIDExist = function isUserAccountIDExist(UserAccountID, callback) {
  let _UserAccountID = UserAccountID
  let query = "SELECT * FROM sampledb.useraccounts WHERE useraccounts.UserAccountID =\'" + _UserAccountID + "\'";

  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      //  console.log('UserAccountID exist');
      callback(true);
    } else {
      callback(false);
      console.log('UserAccountID does not exist');
    }
  });
}

module.exports.isHeadOfficeIDExist = function isHeadOfficeIDExist(UserAccountID, callback) {
  let _HeadOfficeID = HeadOfficeID
  let query = "SELECT * FROM sampledb.headoffices WHERE headoffices.HeadOfficeID =\'" + _HeadOfficeID + "\'";

  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      //  console.log('UserAccountID exist');
      callback(true);
    } else {
      callback(false);
      console.log('HeadOfficeID does not exist');
    }
  });
}

module.exports.isUserNameExist = function isUserNameExist(UserName, callback) {
  let _UserName = UserName;
  let query =
    "SELECT * FROM `sampledb`.`useraccounts` " +
    "WHERE UserName = \'" + _UserName + "\' ";

  DBConnect.DBConnect(query, function (response) {
    console.log(response);
    if (response != undefined) {
      callback(true);
    } else {
      callback(false);
      console.log('UserName does not exist');
    }
  });
}
module.exports.isNickNameExist = function isNickNameExist(NickName, callback) {
  let _NickName = NickName;
  let query =
    "SELECT * FROM `sampledb`.`useraccounts` " +
    "WHERE UserName = \'" + _UserName + "\' ";


  DBConnect.DBConnect(query, function (response) {
    console.log(response);
    if (response != undefined) {
      callback(true);
    }
  })
}

module.exports.isUserNameExistThenGetUserAccountID = function isUserNameExistThenGetUserAccountID(UserName, callback) {
  let _UserName = UserName;
  let query =
    "SELECT UserAccountID FROM `sampledb`.`useraccounts` " +
    "WHERE UserName = \'" + _UserName + "\' ";

  DBConnect.DBConnect(query, function (response) {
    console.log(response);
    if (response != undefined) {
      callback(response);
    } else {
      callback(false);
      console.log('UserName does not exist');
    }
  });
}
/*
  function isDistributorAlreadyExist(DistributorID, callback) {
    let query =
    `SET @DistributorID=${DistributorID};`+
    
   
    DBConnect.DBConnect(query,function(response){
      if(response!=undefined){
        console.log(response);
        callback(response);
      }else{
        callback(undefined);
      }
    });
  }
*/
/*
  function isPlayerAlreadyExist(PlayersID, callback) {
    let query =
    `SET @PlayersID=${PlayersID};`+
    
   
    DBConnect.DBConnect(query,function(response){
      if(response!=undefined){
        console.log(response);
        callback(response);
      }else{
        callback(undefined);
      }
    });
  }*/
module.exports.UserAccountIDScreenName = function UserAccountIDScreenName(UserAccountID, callback) {
  let _UserAccountID = UserAccountID;
  let query =
    "SELECT * FROM `sampledb`.`players` " +
    "WHERE UserAccountID = \'" + _UserAccountID + "\' ";


  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(response);
    } else {
      callback(response);
    }
  });
}
module.exports.isScreenNameExist = function isScreenNameExist(ScreenName, callback) {
  let _ScreenName = ScreenName;
  let query =
    "SELECT * FROM `sampledb`.`players` " +
    "WHERE ScreenName = \'" + _ScreenName + "\' ";


  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      console.log(response);
      callback(true);
    } else {
      callback(false);
    }
  });
}
/*
  function ChildDistributorsFromHeadOfficeID(HeadOfficeID, callback) { // returns Distributor
    let query =
    `SET @HeadOfficeID=${HeadOfficeID};`+
    
   
    DBConnect.DBConnect(query,function(response){
      if(response!=undefined){
        console.log(response);
        callback(response);
      }else{
        callback(undefined);
      }
    });
  }*/

module.exports.isSupportTicketIDExist = function isSupportTicketIDExist(SupportTicketID, callback) {
  let _SupportTicketID = SupportTicketID;
  let query =
    "SELECT * FROM `sampledb`.`supporttickets` " +
    "WHERE SupportTicketID = \'" + _SupportTicketID + "\' ";

  DBConnect.DBConnect(query, function (response) {
    if (response[0].SupportTicketID == _SupportTicketID) {
      console.log(response);
      callback(true);
    } else {
      callback(false);
    }
  });
}

module.exports.IsRoomIDExist = function IsRoomIDExist(RoomID, callback) {
  let _RoomID = RoomID;
  let query =
    "SELECT * FROM sampledb.roomconfigurations " +
    "WHERE RoomID = \'" + _RoomID + "\'";

  DBConnect.DBConnect(query, function (response) {
    if (response != undefined) {
      callback(true);
    } else {
      callback(false);
    }
  });
}

module.exports.TryMinusCurrentPoints = function TryMinusCurrentPoints(UserAccountID, MinusPoints, callback) {
  let _UserAccountID = UserAccountID;
  let _MinusPoints = MinusPoints;
  let query =
    "SELECT CurrentPoints - '" + _MinusPoints + "' AS 'NewPoints' FROM `sampledb`.`players` " +
    "WHERE UserAccountID = \'" + _UserAccountID + "\' ";

  DBConnect.DBConnect(query, function (response) {
    if (response[0].NewPoints > 0) {
      callback(true);
    } else {
      callback(false);
    }
  });
}
/*
function IsNotificationIDExist(NotificationID, callback) {
  let query =
  `SET @NotificationID=${NotificationID};`+
  
 
  DBConnect.DBConnect(query,function(response){
    if(response!=undefined){
      console.log(response);
      callback(response);
    }else{
      callback([]);
    }
  });
}*/

module.exports.CheckUserAccountIDKey = function CheckUserAccountIDKey(UserAccountID, Key, callback) {
  let _UserAccountID = UserAccountID;
  let _Key = Key;
  let query =
    "SELECT * FROM `sampledb`.`useraccounts` " +
    "WHERE UserAccountID = \'" + _UserAccountID + "\' AND `Key` = \'" + _Key + "\' ";

  DBConnect.DBConnect(query, function (response) {
    if (response[0].UserAccountID == _UserAccountID && Key == _Key) {
      console.log(response);
      callback(true);
    } else {
      callback(false);
    }
  });
}


  module.exports.isUserAccountInSeasonIDExist = function isUserAccountInSeasonIDExist(UserAccountID, SeasonID, callback) {
    let _UserAccountID = UserAccountID;
    let _SeasonID = SeasonID;
    let query =
      "SELECT UserAccountID, SeasonID FROM `sampledb`.`playerfinalcard` " +
      "WHERE UserAccountID = '" + _UserAccountID + "' AND SeasonID = \'" + _SeasonID + "\' ";

    DBConnect.DBConnect(query, function (response) {
      if (response[0].UserAccountID == _UserAccountID && response[0].SeasonID == _SeasonID) {
        console.log(response);
        callback(true);
      } else {
        callback(false);
      }
    });
  }


