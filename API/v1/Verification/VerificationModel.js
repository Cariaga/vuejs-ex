/**
 *
 *
 * @param {*} UserName
 * @param {*} ValidKey
 * @param {*} callback
 */
function VerifyAccount(UserName,ValidKey,callback){ // Verification with ValidKey // Public only use // Via ValidKey
    Models.UserAccount.update({
      Verify: true
    },
    {
      where: {UserName:UserName,ValidKey:ValidKey}
    })
    .then(Success => {
      callback("Updated");
    })
    
    .catch(error => {
      console.log("Error Updating " +error);
      callback();
    }); 
  }