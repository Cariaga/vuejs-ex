var AccountVerificationModel = require('./AccountVerificationModel');
module.exports = function (app) {
      //MODIFY
  app.get('/Api/v1/UserAccount/Update/UserAccountID/:UserAccountID/Key/:Key', function (req, res) { 
    let UserAccountID = req.params.UserAccountID;
    let Key = req.params.Key;
    AccountVerificationModel.VerifyAccountUserAccountID(UserAccountID, Verify, function (response) {
       
      });
  });
}
