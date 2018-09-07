
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} callback
 */
module.exports.VerifyAccountUserAccountID = function VerifyAccountUserAccountID(UserAccountID, callback) { // Verification With UserAccountID
    let _UserAccountID = UserAccountID;
    let query =  
    "UPDATE `sampledb`.`useraccounts` SET `Verified` = 'true' WHERE (`UserAccountID` = '"+_UserAccountID+"');";
    DBConnect.DBConnect(query,function(response){
      if(response!=undefined){
        console.log(response);
        callback(response);
      }else{
        callback(undefined);
      }
    });
  }