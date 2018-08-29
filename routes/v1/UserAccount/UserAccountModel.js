/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} AccessID
 * @param {*} UserName
 * @param {*} Password
 * @param {*} Verify
 * @param {*} ValidKey
 * @param {*} RegisteredDate
 * @param {*} RegisteredTime
 * @param {*} callback
 */

// ---------------------migrated
function AddUserAccount(UserAccountID, AccessID, UserName, Password, Verify, ValidKey, RegisteredDate, RegisteredTime, callback) {
  var item1 = Models.UserAccount.build({
    UserAccountID: UserAccountID,
    AccessID: AccessID,
    UserName: UserName,
    Password: Password,
    Verify: Verify,
    ValidKey: ValidKey,
    RegisteredDate: RegisteredDate,
    RegisteredTime: RegisteredTime
  });
  //force:true deletes the old table Don't DO THIS ON PRODUCTION CODE
  Models.UserAccount.sync({
    alter: true /*,force:true*/
  });
  item1.save()
    .then(Success => {

      console.log("----AddUserAccount Start-----");
      console.log(Success);
      console.log("----AddUserAccount End-----");
      callback("Inserted");
    })
    .catch(error => {
      // mhhh, wth!
      console.log("error inserting UserAccountID:" + UserAccountID + " \n AccessID:" + AccessID + "\n UserName:" + UserName + "\n Password:" + Password + "\n Verify:" + Verify + "\n ValidKey:" + ValidKey + "\n RegisteredDate:" + RegisteredDate + "\n RegisteredTime:" + RegisteredTime);
      callback(undefined);
    });
}

function LoginHistoryUserAccountID(UserAccountID, callback) {
  Models.LoginHistory.sync();
  let result = Models.LoginHistory.findAll({
    where: {
      UserAccountID: UserAccountID
    },
    order: [
      ['updatedAt', 'DESC']
    ]
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

function LoginHistoryUserAccountIDLatest(UserAccountID, callback) {
  Models.LoginHistory.sync();
  let result = Models.LoginHistory.findAll({
    where: {
      UserAccountID: UserAccountID
    },
    limit: 1,
    order: [
      ['updatedAt', 'DESC']
    ]
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
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} VerifiedStatus
 * @param {*} callback
 */
function VerifyAccountUserAccountID(UserAccountID, VerifiedStatus, callback) { // Verification With UserAccountID // Forcing Account To be Verified // Via UserAccountID
  Models.UserAccount.update({
      Verify: VerifiedStatus
    }, {
      where: {
        UserAccountID: UserAccountID
      }
    })
    .then(Success => {
      callback("Updated");
    })

    .catch(error => {
      console.log("Error Updating " + error);
      callback(undefined);
    });
}
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} AccessID
 * @param {*} UserName
 * @param {*} Password
 * @param {*} Verify
 * @param {*} ValidKey
 * @param {*} RegisteredDate
 * @param {*} RegisteredTime
 * @param {*} callback
 */

// ---------------------migrated
function AddUserAccount(UserAccountID, AccessID, UserName, Password, Verify, ValidKey, RegisteredDate, RegisteredTime, callback) {
  var item1 = Models.UserAccount.build({
    UserAccountID: UserAccountID,
    AccessID: AccessID,
    UserName: UserName,
    Password: Password,
    Verify: Verify,
    ValidKey: ValidKey,
    RegisteredDate: RegisteredDate,
    RegisteredTime: RegisteredTime
  });
  //force:true deletes the old table Don't DO THIS ON PRODUCTION CODE
  Models.UserAccount.sync({
    alter: true /*,force:true*/
  });
  item1.save()
    .then(Success => {

      console.log("----AddUserAccount Start-----");
      console.log(Success);
      console.log("----AddUserAccount End-----");
      callback("Inserted");
    })
    .catch(error => {
      // mhhh, wth!
      console.log("error inserting UserAccountID:" + UserAccountID + " \n AccessID:" + AccessID + "\n UserName:" + UserName + "\n Password:" + Password + "\n Verify:" + Verify + "\n ValidKey:" + ValidKey + "\n RegisteredDate:" + RegisteredDate + "\n RegisteredTime:" + RegisteredTime);
      callback(undefined);
    });
}