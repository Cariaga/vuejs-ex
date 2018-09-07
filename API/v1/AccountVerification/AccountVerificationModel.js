
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} VerifiedStatus
 * @param {*} callback
 */
module.exports.VerifyAccountUserAccountID = function VerifyAccountUserAccountID(UserAccountID, VerifiedStatus, callback) { // Verification With UserAccountID // Forcing Account To be Verified // Via UserAccountID
    let query = 
    `SET @UserAccountID=${UserAccountID};`+
    `SET @VerifiedStatus=${VerifiedStatus};`+
  
    DBConnect.DBConnect(query,function(response){
      if(response!=undefined){
        console.log(response);
        callback(response);
      }else{
        callback(undefined);
      }
    });
    /*Models.UserAccount.update({
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
      });*/
  }