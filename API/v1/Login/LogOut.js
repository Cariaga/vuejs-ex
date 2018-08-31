let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var beautify = require("json-beautify");
var uuidv4 = require('uuid/v4');
module.exports = function (app) {
  app.get('/Api/v1/SignOut/:UserName/:SignOutKey', function (req, res) {
    let UserName = req.params.UserName;
    let Password = req.params.SignOutKey;

    if (!isNullOrEmpty(UserName) &&
      !isNullOrEmpty(SignOutKey)) {

      res.send('test login');
    } else {
      res.send('no params sent');
    }
  });
}