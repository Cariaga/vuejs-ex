let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var beautify = require("json-beautify");
var uuidv4 = require('uuid/v4');
module.exports = function (app) {
  app.get('/Api/v1/SignOut/UserAccountID/:UserAccountID/', function (req, res) {
    let UserAccountID = req.params.UserAccountID;
      
    if (!isNullOrEmpty(UserName)) {
      let status = 200;
      res.status(status).end(http.STATUS_CODES[status]);
    } else {
      res.send('no params sent');
    }
  });
}