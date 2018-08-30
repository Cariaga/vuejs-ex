let DBConnect = require("../../SharedController/DBConnect");
module.exports = function (app) {
  /**
   *
   *
   * @param {*} Email
   * @param {*} callback
   */
  function UserInfoEmailExist(Email, callback) {
    Models.UserInfo.sync();
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
    });
  }
  /**
   *
   *
   * @param {*} PhoneNumber
   * @param {*} callback
   */
  function isPhoneNumberExist(PhoneNumber, callback) {
    Models.UserInfo.sync();
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
    });
  }
  /**
   *
   *
   * @param {*} UserAccountID
   * @param {*} callback
   */
  function isUserAccountBlocked(UserAccountID, callback) {
    Models.BlackList.sync();
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
    });
  }
  /**
   *
   *
   * @param {*} UserName
   * @param {*} callback
   */
  function isUserNameExist(UserName, callback) {
    Models.UserAccount.sync();
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
    });
  }
  /**
   *
   *
   * @param {*} UserAccountID
   * @param {*} callback
   */
  function isUserAccountIDExist(UserAccountID, callback) {
    Models.UserAccount.sync();
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
    });
  }
  /**
   *
   *
   * @param {*} UserName
   * @param {*} callback
   */
  function isUserAccountVerifiedUserName(UserName, callback) {
    Models.UserAccount.sync();
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
    });
  }
  /**
   *
   *
   * @param {*} HeadOfficeID
   * @param {*} callback
   */
  function isHeadOfficeAlreadyExist(HeadOfficeID, callback) {
    Models.HeadOffice.sync();
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
    });
  }

  /**
   *
   *
   * @param {*} DistributorID
   * @param {*} callback
   */
  function isDistributorAlreadyExist(DistributorID, callback) {
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
    });
  }


  /**
   *
   *
   * @param {*} ShopID
   * @param {*} callback
   */
  function isShopAlreadyExist(ShopID, callback) {
    Models.Shop.sync();
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
    });
  }

  /**
   *
   *
   * @param {*} PlayersID
   * @param {*} callback
   */
  function isPlayerAlreadyExist(PlayersID, callback) {
    Models.Player.sync();
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
    });
  }
  /**
   *
   *
   * @param {*} ScreenName
   * @param {*} callback
   */
  function isScreenNameExist(ScreenName, callback) {
    Models.Player.sync();
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
    });
  }

  function ChildDistributorsFromHeadOfficeID(HeadOfficeID, callback) { // returns Distributor
    Models.Distributor.sync();
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
    });
  }
  /**
   *
   *
   * @param {*} SupportTicketID
   * @param {*} callback
   */
  function isSupportTicketIDExist(SupportTicketID, callback) {
    Models.SupportTicket.sync();
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
    });
  }
  /**
   *
   *
   * @param {*} SeasonID
   * @param {*} callback
   */
  function IsSeasonIDExist(SeasonID, callback) {
    Models.RoomConfiguration.sync();
    let result = Models.RoomConfiguration.findAll({
      where: {
        SeasonID: SeasonID
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
    });
  }

}
/**
 *
 *
 * @param {*} NotificationID
 * @param {*} callback
 */
function IsNotificationIDExist(NotificationID, callback) {
  Models.Notification.sync();
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
  });
}