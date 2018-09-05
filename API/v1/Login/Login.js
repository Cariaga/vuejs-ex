let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var uuidv4 = require('uuid/v4');
var LoginHistoryModel = require('./LoginHistoryModel');
module.exports = function (app) {
    app.get('/Api/v1/Login/UserName/:UserName/Password/:Password/IP/:IP/DeviceName/:DeviceName/DeviceRam/:DeviceRam/DeviceCpu/:DeviceCpu/', function (req, res) {
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
  
          if (!isNullOrEmpty(UserName)) {
            if (!isNullOrEmpty(Password)) {
              if (!isNullOrEmpty(IP)) {
                if (!isNullOrEmpty(DeviceName)) {
                  if (!isNullOrEmpty(DeviceRam)) {
                    if (!isNullOrEmpty(DeviceCpu)) {
                      
                      LoginHistoryModel.LoginAccount(UserName, Password, function (response) {
                        let firstRow = response[0];
                        console.log(firstRow.Verified);
                        if(firstRow.Verified=="true"){
                          if(firstRow.Status!="Blocked"){
                            
                            LoginHistoryModel.AddLoginHistory(UserName,Password, IP, DeviceName, DeviceRam, DeviceCpu, function (response3) {

                              if(response3!=undefined){
                                res.send({
                                  UserAccountID:firstRow.UserAccountID,
                                  OnlineStatus:firstRow.OnlineStatus,
                                  Email:firstRow.Email,
                                  PhoneNumber:firstRow.PhoneNumber,
                                  Status:firstRow.Status});
                              }else{
                                let status = 500;
                                res.status(status).end(http.STATUS_CODES[status]);
                              }

                            });
                            
                            
  
                          }else{
                            res.send({AccountBlocked:true});
                          }
                        }else{
                          res.send({AccountUnverified:true});
                        }
                        
                      });

                      
                      
                        
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

                }else{
                  res.send({
                    DeviceNameMissing: true
                  })
                }
              }else{
                res.send({
                  IPMissing: true
                })
              }
            }else{
              res.send({
                PasswordMissing: true
              })
            }
          }else{
            res.send({
              UserNameMissing: true
            })
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