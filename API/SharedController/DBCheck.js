
let DBConnect = require("../SharedController/DBConnect");
const mysql = require('mysql2');
  /**
   *
   *
   * @param {*} Email
   * @param {*} callback
   */
  function UserInfoEmailExist(Email, callback) {
    let query =
    `SET @Email=${Email};`+
    
   
    DBConnect.DBConnect(query,function(response){
      if(response!=undefined){
        console.log(response);
        callback(response);
      }else{
        callback(undefined);
      }
    });
    /*Models.UserInfo.sync();
    let result = Models.UserInfo.findAll({
      where: {
        Email: Email //not null
      }
    }).then(function (result) {
      let Data = result.map(function (item) {
        return item;
      });
      if (Data.length > 0) {
        callback(Data);
      } else {
        callback(undefined);
      }

      // res.send(beautify(Data, null, 2, 100));
    }).catch(function (result) { //catching any then errors
      console.log("Error " + result);
      callback(undefined);
    });*/
  }
  /**
   *
   *
   * @param {*} PhoneNumber
   * @param {*} callback
   */
  function isPhoneNumberExist(PhoneNumber, callback) {
    let query =
    `SET @PhoneNumber=${PhoneNumber};`+
    
   
    DBConnect.DBConnect(query,function(response){
      if(response!=undefined){
        console.log(response);
        callback(response);
      }else{
        callback(undefined);
      }
    });
    /*Models.UserInfo.sync();
    let result = Models.UserInfo.findAll({
      where: {
        PhoneNumber: PhoneNumber //not null

      }
    }).then(function (result) {
      let Data = result.map(function (item) {
        return item;
      });
      if (Data.length > 0) {
        callback(Data);
      } else {
        callback(undefined);
      }


      // res.send(beautify(Data, null, 2, 100));
    }).catch(function (result) { //catching any then errors
      console.log("Error " + result);
      callback(undefined);
    });*/
  }
  /**
   *
   *
   * @param {*} UserAccountID
   * @param {*} callback
   */
  module.exports.isUserAccountBlocked = function isUserAccountBlocked(UserAccountID, callback) {
    let _UserAccountID = UserAccountID;
    let query =
    "SELECT * FROM `sampledb`.`useraccounts` " +
    "WHERE UserAccountID = '"+_UserAccountID+"' ";
    
   
    DBConnect.DBConnect(query,function(response){
      if(response!=undefined){
        console.log(response);
        callback(true);
      }else{
        callback(false);
      }
    });
    /*Models.BlackList.sync();
    let result = Models.BlackList.findAll({
      where: {
        UserAccountID: UserAccountID, //not null
        Status: "Blocked",
      }
    }).then(function (result) {
      let Data = result.map(function (item) {
        return item;
      });
      if (Data.length > 0) {
        callback(Data);
      } else {
        callback(undefined);
      }
      // res.send(beautify(Data, null, 2, 100));
    }).catch(function (result) { //catching any then errors
      console.log(result);
      callback(undefined);
      //callback("Error "+result);
    });*/
  }
  /**
   *
   *
   * @param {*} UserName
   * @param {*} callback
   */
   /* Models.UserAccount.sync();
    let result = Models.UserAccount.findAll({
      where: {
        UserName: UserName //not null
      }
    }).then(function (result) {
      let Data = result.map(function (item) {
        return item;
      });
      if (Data.length > 0) {
        callback(Data);
      } else {
        callback(undefined);
      }
      // res.send(beautify(Data, null, 2, 100));
    }).catch(function (result) { //catching any then errors
      // console.log(result);
      callback(undefined);
    });*/
  
  /**
   *
   *
   * @param {*} UserAccountID
   * @param {*} callback
   */
  module.exports.isUserAccountIDExist = function isUserAccountIDExist(UserAccountID, callback) {
    let _UserAccountID = UserAccountID
    let query = "SELECT * FROM sampledb.useraccounts WHERE useraccounts.UserAccountID ='" + _UserAccountID+"'";
    
    DBConnect.DBConnect(query,function(response){
      if(response!=undefined){
        console.log('UserAccountID exist');
        callback(response);
      }else{
        callback(undefined);
        console.log('UserAccountID does not exist');
      }
    });

    /*Models.UserAccount.sync();
    let result = Models.UserAccount.findAll({
      where: {
        UserAccountID: UserAccountID //not null
      }
    }).then(function (result) {
      let Data = result.map(function (item) {
        return item;
      });
      if (Data.length > 0) {
        callback(Data);
      } else {
        callback(undefined);
      }

      // res.send(beautify(Data, null, 2, 100));
    }).catch(function (result) { //catching any then errors
      // console.log(result);
      callback(undefined);
    });*/
  }
  /**
   *
   *
   * @param {*} UserName
   * @param {*} callback
   */
  module.exports.isUserAccountVerifiedUserName = function isUserAccountVerifiedUserName(UserName, callback) {
    let _UserName = UserName;
    let query =
    "SELECT * FROM `sampledb`.`useraccounts` " +
    "WHERE UserName = '"+_UserName+"' ";
    
   
    DBConnect.DBConnect(query,function(response){
      if(response!=undefined){
        console.log(response);
        callback(true);
      }else{
        callback(false);
      }
    });
    /*Models.UserAccount.sync();
    let result = Models.UserAccount.findAll({
      where: {
        UserName: UserName,
        Verify: true
      }
    }).then(function (result) {
      let Data = result.map(function (item) {
        return item;
      });
      if (Data.length > 0) {
        console.log("isUserAccountVerified test");
        callback(Data);

      } else {
        callback(undefined);
      }
      // res.send(beautify(Data, null, 2, 100));
    }).catch(function (result) { //catching any then errors
      console.log(result);
      callback(undefined);
    });*/
  }
  /**
   *
   *
   * @param {*} HeadOfficeID
   * @param {*} callback
   */
  function isHeadOfficeAlreadyExist(HeadOfficeID, callback) {
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
    /*Models.HeadOffice.sync();
    let result = Models.HeadOffice.findAll({
      where: {
        HeadOfficeID: HeadOfficeID,
      }
    }).then(function (result) {
      let Data = result.map(function (item) {
        return item;
      });
      if (Data.length > 0) {
        callback(Data);
      } else {
        callback(undefined);
      }

      // res.send(beautify(Data, null, 2, 100));
    }).catch(function (result) { //catching any then errors
      callback(result);
    });*/
  }

  /**
   *
   *
   * @param {*} DistributorID
   * @param {*} callback
   */
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
    /*
    Models.Distributor.sync();
    let result = Models.Distributor.findAll({
      where: {
        DistributorID: DistributorID,
      }
    }).then(function (result) {
      let Data = result.map(function (item) {
        return item;
      });
      if (Data.length > 0) {
        callback(Data);
      } else {
        callback(undefined);
      }

      // res.send(beautify(Data, null, 2, 100));
    }).catch(function (result) { //catching any then errors
      console.log(result);
      callback(undefined);
    });*/
  }


  /**
   *
   *
   * @param {*} ShopID
   * @param {*} callback
   */
  function isShopAlreadyExist(ShopID, callback) {
    let query =
    `SET @ShopID=${ShopID};`+
    
   
    DBConnect.DBConnect(query,function(response){
      if(response!=undefined){
        console.log(response);
        callback(response);
      }else{
        callback(undefined);
      }
    });
    /*Models.Shop.sync();
    let result = Models.Shop.findAll({
      where: {
        ShopID: ShopID,

      }
    }).then(function (result) {
      let Data = result.map(function (item) {
        return item;
      });
      if (Data.length > 0) {
        callback(Data);
      } else {
        callback(undefined);
      }

      // res.send(beautify(Data, null, 2, 100));
    }).catch(function (result) { //catching any then errors
      console.log(result);
      callback(undefined);
    });*/
  }

  /**
   *
   *
   * @param {*} PlayersID
   * @param {*} callback
   */
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
    /*Models.Player.sync();
    let result = Models.Player.findAll({
      where: {
        PlayersID: PlayersID,

      }
    }).then(function (result) {
      let Data = result.map(function (item) {
        return item;
      });
      if (Data.length > 0) {
        callback(Data);
      } else {
        callback(undefined);
      }

      // res.send(beautify(Data, null, 2, 100));
    }).catch(function (result) { //catching any then errors
      console.log(result);
      callback(undefined);
    });*/
  }
  /**
   *
   *
   * @param {*} ScreenName
   * @param {*} callback
   */
  module.exports.isScreenNameExist = function isScreenNameExist(ScreenName, callback) {
    let _ScreenName = ScreenName;
    let query =
    "SELECT * FROM `sampledb`.`players` " +
    "WHERE ScreenName = '"+_ScreenName+"' ";
    
   
    DBConnect.DBConnect(query,function(response){
      if(response!=undefined){
        console.log(response);
        callback(true);
      }else{
        callback(false);
      }
    });
    /*Models.Player.sync();
    let result = Models.Player.findAll({
      where: {
        ScreenName: ScreenName,
      }
    }).then(function (result) {
      let Data = result.map(function (item) {
        return item;
      });
      if (Data.length > 0) {
        callback(Data);
      } else {
        callback(undefined);
      }

      // res.send(beautify(Data, null, 2, 100));
    }).catch(function (result) { //catching any then errors
      callback(result);
    });*/
  }

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
    /*Models.Distributor.sync();
    let result = Models.Distributor.findAll({
      where: {
        HeadOfficeID: HeadOfficeID,
      }
    }).then(function (result) {
      let Data = result.map(function (item) {
        return item;
      });
      if (Data.length > 0) {
        callback(Data);
      } else {
        callback(undefined);
      }

      // res.send(beautify(Data, null, 2, 100));
    }).catch(function (result) { //catching any then errors
      console.log(result);
      callback(undefined);
    });*/
  }
  /**
   *
   *
   * @param {*} SupportTicketID
   * @param {*} callback
   */
  module.exports.isSupportTicketIDExist = function isSupportTicketIDExist(SupportTicketID, callback) {
    let _SupportTicketID = SupportTicketID;
    let query =
    "SELECT * FROM `sampledb`.`supporttickets` " +
    "WHERE SupportTicketID = '"+_SupportTicketID+"' ";
   
    DBConnect.DBConnect(query,function(response){
      if(response!=undefined){
        console.log(response);
        callback(true);
      }else{
        callback(false);
      }
    });
    /*Models.SupportTicket.sync();
    let result = Models.SupportTicket.findAll({
      where: {
        SupportTicketID: SupportTicketID
      }
    }).then(function (result) {
      let Data = result.map(function (item) {
        return item;
      });
      if (Data.length > 0) {
        callback(Data);
      } else {
        callback(undefined);
      }

      // res.send(beautify(Data, null, 2, 100));
    }).catch(function (result) { //catching any then errors
      console.log(result);
      callback(undefined);
    });*/
  }
  /**
   *
   *
   * @param {*} SeasonID
   * @param {*} callback
   */
  module.exports.IsRoomIDExist = function IsRoomIDExist(RoomID, callback) {
    let _RoomID = RoomID;
    let query =
    "SELECT * FROM sampledb.roomconfigurations "+
    "WHERE RoomID = '"+_RoomID+"'";
   
    DBConnect.DBConnect(query,function(response){
      if(response.length>0){
        callback(response);
      }else{
        callback(undefined);
      }
    });
  }

  module.exports.TryMinusCurrentPoints = function TryMinusCurrentPoints(UserAccountID, MinusPoints, callback){
    let _UserAccountID = UserAccountID;
    let _MinusPoints = MinusPoints;
    let query = 
    "SELECT CurrentPoints - '"+_MinusPoints+"' AS 'NewPoints' FROM `sampledb`.`players` " +
    "WHERE UserAccountID = '"+_UserAccountID+"' ";

    DBConnect.DBConnect(query,function(response){
      if(response[0].NewPoints>0){
        callback(true);
      }else{
        callback(false);
      }
    });
  }

/**
 *
 *
 * @param {*} NotificationID
 * @param {*} callback
 */
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
  /*Models.Notification.sync();
  let result = Models.Notification.findAll({
    where: {
      NotificationID: NotificationID
    }
  }).then(function (result) {
    let Data = result.map(function (item) {
      return item;

    });
    if (Data.length > 0) {
      callback(Data);
    } else {
      callback(undefined);
    }
  }).catch(function (result) { //catching any then errors
    console.log("Error " + result);
    callback(undefined);
  });*/
}
