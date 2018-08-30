var isNullOrEmpty = require('is-null-or-empty');
module.exports = function(app){//selection
    app.get('/UserAccount/SupportTicket', function (req, res) {
        // USAGE /UserAccount/SupportTicket?UserAccountID=bddbe7d1-d28b-4bb6-8b51-eb2d9252c9bb
        // USAGE /UserAccount/SupportTicket?UserAccountID=bddbe7d1-d28b-4bb6-8b51-eb2d9252c9bb&Status=Pending
        let UserAccountID = req.query.UserAccountID;
        let Status = req.query.Status;
        if (!isNullOrEmpty(UserAccountID) && isNullOrEmpty(Status)) {
          Models.SupportTicket.sync();
          let result = Models.SupportTicket.findAll({
            where: {
              UserAccountID: UserAccountID //not null
      
            }
          }).then(function (result) {
            let Data = result.map(function (item) {
              return item;
      
            });
            res.send(beautify(Data, null, 2, 100));
          }).catch(function (result) { //catching any then errors
            res.send("Error " + result);
          });
        }
        if (!isNullOrEmpty(UserAccountID) && !isNullOrEmpty(Status)) {
          Models.SupportTicket.sync();
          let result = Models.SupportTicket.findAll({
            where: {
              UserAccountID: UserAccountID,
              Status: Status //not null
      
            }
          }).then(function (result) {
            let Data = result.map(function (item) {
              return item;
      
            });
            res.send(beautify(Data, null, 2, 100));
          }).catch(function (result) { //catching any then errors
      
            res.send("Error " + result);
          });
        } else {
          let Data = {
            IsInvalidUserAccountID: true
          }
          res.send(Data);
        }
      });
}