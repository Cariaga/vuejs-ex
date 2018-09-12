var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
var uuidv4 = require('uuid/v4');
let DBConnect = require("../../SharedController/DBConnect");
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} HeadOfficeID
 * @param {*} Name
 * @param {*} callback
 */
module.exports.AddDistributor = function AddDistributor(UserAccountID, HeadOfficeID, Name, callback) {
  let query ="";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });

  /*var item1 = Models.Distributor.build({
    UserAccountID: UserAccountID,
    HeadOfficeID: HeadOfficeID,
    Name: Name
  });
  Models.Distributor.sync({
    alter: true,
  }); //force removes rebuilds the table only for non production 
  item1.save()
    .then(Success => {

      console.log("----AddDistributor Start-----");
      console.log(Success);
      console.log("----AddDistributor End-----");
      callback("Inserted");
    })
    .catch(error => {
      // mhhh, wth!
      console.log("error inserting " + error);
      callback(undefined);

    });*/
}
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} HeadOfficeID
 * @param {*} Name
 * @param {*} callback
 */
module.exports.DistributorUpdate = function DistributorUpdate(UserAccountID, HeadOfficeID, Name, callback) {
  let query =
    `SET @UserAccountID=${UserAccountID};` +
    `SET @HeadOfficeID=${HeadOfficeID};` +
    `SET @Name=${Name};` +
    "UPDATE `sampledb`.`distributors` "+
    "SET  HeadOfficeID = @HeadOfficeID , Name=@Name"+
    "WHERE HeadOfficeID=@HeadOfficeID and UserAccountID = @UserAccountID;";
    DBConnect.DBConnect(query, function (response) {
      if (response != undefined) {
        console.log(response);
        callback(response);
      } else {
        callback(undefined);
      }
    });
  /*Models.Distributor.update({
      UserAccountID: UserAccountID,
      HeadOfficeID: HeadOfficeID,
      Name: Name
    }, {
      where: {
        DistributorID: DistributorID
      }
    })
    .then(Success => {
      callback("Updated");
    })
    .catch(error => {
      // mhhh, wth!
      console.log("Error Updating " + error);
      callback(undefined);
    });*/

    module.exports.RegisterDistributor = function RegisterDistributor(UserAccountID,Name,PhoneNumber,UserName,Password,Commission,HeadOfficeID,callback){
      let _UserAccountID = UserAccountID;
      let _Name = Name;
      let _PhoneNumber = PhoneNumber;
      let _UserName = UserName;
      let _Password = Password;
      let _Commission = Commission;
      let _HeadOfficeID = HeadOfficeID;
    
      function Q1(){
        let query = "INSERT INTO `sampledb`.`useraccounts` (`UserAccountID`, `UserName`, `Password`, `RegisteredDateTime`, `OnlineStatus`, `Verified`, `Key`) "+
        " VALUES ('"+_UserAccountID+"', '"+_UserName+"', '"+_Password+"', now(), 'Offline', 'true', null);";
        return new Promise(resolve => {
          DBConnect.DBConnect(query, function (response) {
            if (response != undefined) {
              console.log(response);
              resolve(response);
            } else {
              resolve(undefined);
            }
          });
        });
      }
      function Q2(){
        let query ="INSERT INTO `sampledb`.`userinfos` (`UserAccountID`, `Email`, `PhoneNumber`, `TelephoneNumber`) "+
        "VALUES ('"+_UserAccountID+"', null, '"+_PhoneNumber+"', null);";
        return new Promise(resolve => {
          DBConnect.DBConnect(query, function (response) {
            if (response != undefined) {
              console.log(response);
              resolve(response);
            } else {
              resolve(undefined);
            }
          });
        });
      }
      function Q3(){
        let query = "INSERT INTO `sampledb`.`distributors` (`UserAccountID`,`Name`,`Commission`,`HeadOfficeID`) VALUES ('"+_UserAccountID+"', '"+_Name+"', '"+_Commission+"','"+_HeadOfficeID+"');";
        return new Promise(resolve => {
          DBConnect.DBConnect(query, function (response) {
            if (response != undefined) {
              console.log(response);
              resolve(response);
            } else {
              resolve(undefined);
            }
          });
        });
      }
      async function RunAsync() {
        console.log('calling');
        let finalresult = [{}];
        let result = await Q1();
        let result2 = await Q2();
        let result3 = await Q3();
        console.log('Done');
        callback('done');
      }
      RunAsync();
    }
}