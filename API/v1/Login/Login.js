let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var uuidv4 = require('uuid/v4');
var LoginHistoryModel = require('./LoginHistoryModel');
module.exports = function (app) {
    app.get('/Api/v1/Login/UserName/:UserName/Password/:Password/IP/:IP/DeviceName/:DeviceName/DeviceRam/:DeviceRam/DeviceCpu/:DeviceCpu/:DateTime', function (req, res) {
          res.setHeader('Content-Type', 'application/json');
          // Usage /Login?UserName=Username21441&Password=awAF12441124&DeviceUUID=DeviceUUID&IP=IP&DeviceName=DeviceName&DeviceRam=DeviceRam&DeviceCpu=DeviceCpu&OperatingSystem=OperatingSystem&GraphicsDevice=GraphicsDevice&Time=Time&Date=Date
          let UserName = req.params.UserName;
          let Password = req.params.Password;
          let DeviceUUID = req.params.DeviceUUID;
          let IP = req.params.IP;
          let DeviceName = req.params.DeviceName;
          let DeviceRam = req.params.DeviceRam;
          let DeviceCpu = req.params.DeviceCpu;
          let OperatingSystem = req.params.OperatingSystem;
          let GraphicsDevice = req.params.GraphicsDevice;
          let DateTime = req.query.DateTime; //2018-06-27 01:57:17
          if (!isNullOrEmpty(UserName)) {
            if (!isNullOrEmpty(Password)) {
              if (!isNullOrEmpty(IP)) {
                if (!isNullOrEmpty(DeviceName)) {
                  if (!isNullOrEmpty(DeviceRam)) {
                    if (!isNullOrEmpty(DeviceCpu)) {
                      if (!isNullOrEmpty(DateTime)) {
                        LoginHistoryModel.AddLoginHistory(UserName,Password, IP, DeviceName, DeviceRam, DeviceCpu, DateTime, Date, function (response3) {
                          res.send(response3);
                        });
                      } else {
                        res.send({
                          DateTimeMissing: true
                        })
                      }
                    } else {
                      res.send({
                        DeviceCpuMissing: true
                      })
                    }
                  } else {
                    res.send({
                      DeviceRamMissing: true
                    })
                  }

                }
              }
            }
          }
        });
                  
              app.get('/Api/v1/Login/:UserName/:Password/', function (req, res) {
                res.send('Not Used use Query Version Instead');
                /*let UserName = req.params.UserName;
                  let Password = req.params.Password;
    
                  if(!isNullOrEmpty(UserName)&&
                  !isNullOrEmpty(Password)){
                    let isVerified;
                    let result = Models.UserAccount.findAll({ 
                      where: {
                        UserName: {
                          eq: UserName//not null
                        },
                        Password: {
                          eq: Password//not null
                        }
                     }
                    }).then(function(result) {
                      let Data = result.map(function(item) {
                          return item;
                          
                      });
                      res.send(beautify(Data, null, 2, 100));
                    }).catch(function(result) {//catching any then errors
                      
                      res.send("Error "+result);
    
                    })
    
                /*
                  }else{
                    res.send('no params sent');
                  }*/
              });
            }