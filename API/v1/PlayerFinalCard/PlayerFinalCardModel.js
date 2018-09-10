var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");

module.exports.RegisterAccount = function RegisterAccount(UserAccountID, SeasonID, Rank, Score, Card, DateTime, BeforePoints, AfterPoints, WinPoints, callback) {
    let query ="INSERT INTO `sampledb`.`playerfinalcard` (`UserAccountID`, `SeasonID`, `Rank`, `Score`, `Card`, `DateTime`, `BeforePoints`, `AfterPoints`, `WinPoints`) "+
    "VALUES ('Account8', 'S2', 'RK2', '0', 'C3', '1996-05-31 00:00:00', '200', '0', '0');"
}