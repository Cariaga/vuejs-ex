let ConnectingUsersModel = require('./ConnectingUsers');
module.exports = function (app) { 
    app.get('/Api/v1/ConnectingUsers/', function (req, res) {
        Models.BlackList.destroy({
            where: {},
            truncate: true
          })
          .then(Success => {
            res.send("Cleared");
          })
          .catch(err => {
            res.send("Truncate " + err);
          });
      });
}