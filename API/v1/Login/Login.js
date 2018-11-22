let DBCheck = require("../../SharedController/DBCheck");
let isNullOrEmpty = require('is-null-or-empty');
let LoginHistoryModel = require('./LoginHistoryModel');
let jwt = require('jsonwebtoken');
let http = require('http');
let Security = require("../../SharedController/Security");

module.exports = function (app) {
  app.post('/Api/v1/ContentTest/', Security.verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.json({
          message: 'Post created...',
          authData
        });
      }
    });
  });
  app.get('/Api/v1/ContentTest/', Security.verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.json({
          message: 'Get created...',
          authData
        });
      }
    });
  });
  app.get('/Api/v1/logout', function (req, res) {
    res.send("logout success!");
  });
  
  //admins or certain account type can authorize then login already
  app.post('/Api/v1/Admin/Login/', function (req, res) {
    var _UserName = req.body.UserName;
    var _Password = req.body.Password;
    if (!isNullOrEmpty(_UserName)) {
      if (!isNullOrEmpty(_Password)) {
        DBCheck.isUserNameExist(_UserName,function(response){
          if(response==true){
            DBCheck.isUserNameBlocked(_UserName,function(response){
              if(response==false){
                LoginHistoryModel.LoginAccount(_UserName, _Password, function (response) {
                  if (response) {
                    //let firstRow = response[0];
                    let AccountType = response[0].AccountType;
                    let UserAccountID = response[0].UserAccountID;
                    let Privilege = response[0].Privilege;
                    let ParentType = "";
                    let ParentUserAccountID = "";
                    let ParentIndex = "";

                    if(AccountType=="Player"){
                      ParentType ="Shops";
                      LoginHistoryModel.UserAccountIDOFShopID(response[0].ShopID,function(response){

                        let ParentUserAccountID = response[0].UserAccountID;//Shop UserAccount
                        
                        if(UserAccountIDOfShop!=undefined){
                          newFunction(AccountType, Privilege, _UserName, UserAccountID, ParentType,ParentUserAccountID, res);
                        }
                      });
                    }
                    if(AccountType=="Shops"){
                      ParentType ="Distributor";
                      LoginHistoryModel.UserAccountIDOFDistributorID(response[0].DistributorID,function(response){
                        let ParentUserAccountID = response[0].UserAccountID;//Distributor UserAccount
                        if(UserAccountIDOFDistributor!=undefined){
                          newFunction(AccountType, Privilege, _UserName, UserAccountID, ParentType,ParentUserAccountID, res);
                        }
                      });
                    }
                    if(AccountType=="Distributor"){
                      ParentType ="HeadOffice";
                      LoginHistoryModel.UserAccountIDOFHeadOfficeID(response[0].HeadOfficeID,function(response){
                        let ParentUserAccountID = response[0].UserAccountID;//HeadOffice UserAccount
                        if(UserAccountIDOFHeadOffice!=undefined){
                          newFunction(AccountType, Privilege, _UserName, UserAccountID, ParentType,ParentUserAccountID, res);
                        }
                      });
                    }
                    if(AccountType=="HeadOffice"){
                      ParentType ="OperatingHeadOffice";
                    }
                    console.log(ParentType);

                    // Mock user
                   


                  } else {
                    let status = 404;
                    res.status(status).end(http.STATUS_CODES[status]);
                  }
                  // res.send("login success!");
                });
              }else{
                //possibly blocked or dose not exist
                let status = 404;
                res.status(status).end(http.STATUS_CODES[status]);
              }
            });
          }else{
            let status = 404;
            res.status(status).end(http.STATUS_CODES[status]);
          }
        });
      } else {
        let status = 404;
        res.status(status).end(http.STATUS_CODES[status]);
      }
    } else {
      let status = 404;
      res.status(status).end(http.STATUS_CODES[status]);
    }
  });
  app.post('/Api/v1/Admin/Login/Token', function (req, res) {
    Security.DecompileToken(req,res);
  });
  
 //Player Authorization process only
  app.post('/Api/v1/Login/', function (req, res) {// this route if for player only while /Api/v1/Admin/Login/  is for admins only
    var _UserName = req.body.UserName;
    var _Password = req.body.Password;
    if (!isNullOrEmpty(_UserName)) {
      if (!isNullOrEmpty(_Password)) {
        DBCheck.isUserNameExist(_UserName,function(response){
          if(response==true){
            DBCheck.isUserNameBlocked(_UserName,function(response){
              if(response==false){
                LoginHistoryModel.LoginAccount(_UserName, _Password, function (response) {
                  if (response) {
                    //let firstRow = response[0];
                    let AccountType = response[0].AccountType;
                    let UserAccountID = response[0].UserAccountID;
                    let Privilege = response[0].Privilege;
                    // Mock user
                    if(AccountType=="Player"||Privilege=="Admin"){//only certain account types and privilage are allowed
                      const user = {
                        id: 1,
                        UserName: _UserName,
                        UserAccountID: UserAccountID,
                        AccountType: AccountType,
                        Privilege:Privilege
                      }
                      jwt.sign({
                        user
                      }, 'secretkey', {
                        expiresIn: '1d'
                      }, (err, token) => {
                        res.json({
                          token
                        });
                      });
        
                    }else{
                      //if the above is invalid
                      let status = 401;
                      res.status(status).end(http.STATUS_CODES[status]);
                    }
                  } else {
                    let status = 404;
                    res.status(status).end(http.STATUS_CODES[status]);
                  }
                  // res.send("login success!");
                });
              }else{
                res.send({UserNameBlocked:true});
              }
            });

          }else{
            let status = 404;
            res.status(status).end(http.STATUS_CODES[status]);
          }
        });
      } else {
        let status = 404;
        res.status(status).end(http.STATUS_CODES[status]);
      }
    } else {
      let status = 404;
      res.status(status).end(http.STATUS_CODES[status]);
    }
  });

  function Login(UserName, Password, IP, DeviceName, DeviceRam, DeviceCpu, res) {
    console.log("Try Login "+ UserName+" : "+Password);
    if (!isNullOrEmpty(UserName)) {
      if (!isNullOrEmpty(Password)) {
        if (!isNullOrEmpty(IP)) {
          if (!isNullOrEmpty(DeviceName)) {
            if (!isNullOrEmpty(DeviceRam)) {
              if (!isNullOrEmpty(DeviceCpu)) {

                LoginHistoryModel.LoginAccount(UserName, Password, function (response) {
                  if (response != undefined) {
                    console.log("Login Response : "+response);
                    let firstRow = response[0];
                    console.log(firstRow.Verified);
                    if (firstRow.Verified == "true") {
                      if (firstRow.Status != "Blocked") {

                        LoginHistoryModel.AddLoginHistory(UserName, Password, IP, DeviceName, DeviceRam, DeviceCpu, function (response3) {

                          if (response3 != undefined) {
                             console.log("Account "+firstRow.Commission);
                            res.send({
                              UserAccountID: firstRow.UserAccountID,
                              OnlineStatus: firstRow.OnlineStatus,
                              Email: firstRow.Email,
                              PhoneNumber: firstRow.PhoneNumber,
                              Status: firstRow.Status,
                              AccountType: firstRow.AccountType,
                              Privilege: firstRow.Privilege,
                              Commission: firstRow.Commission
                            });

                          } else {
                            let status = 500;
                            res.status(status).end(http.STATUS_CODES[status]);
                          }
                        });
                      } else {
                        res.send({
                          AccountBlocked: true
                        });
                      }
                    } else {
                      res.send({
                        AccountUnverified: true
                      });
                    }
                  } else {
                    res.send({
                      AccountNotFound: true
                    });
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

          } else {
            res.send({
              DeviceNameMissing: true
            })
          }
        } else {
          res.send({
            IPMissing: true
          })
        }
      } else {
        res.send({
          PasswordMissing: true
        })
      }
    } else {
      res.send({
        UserNameMissing: true
      })
    }
  }
  //GET : only possible when its authorized
  /*app.get('/Api/v1/Game/Login/UserName/:UserName/Password/:Password/IP/:IP/DeviceName/:DeviceName/DeviceRam/:DeviceRam/DeviceCpu/:DeviceCpu/', Security.verifyToken, function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let UserName = req.params.UserName;
    let Password = req.params.Password;
    let DeviceUUID = req.params.DeviceUUID;
    let IP = req.params.IP;
    let DeviceName = req.params.DeviceName;
    let DeviceRam = req.params.DeviceRam;
    let DeviceCpu = req.params.DeviceCpu;
    let OperatingSystem = req.params.OperatingSystem;
    let GraphicsDevice = req.params.GraphicsDevice;
    Login(UserName, Password, IP, DeviceName, DeviceRam, DeviceCpu, res);

  });*/
 // app.options('/Api/v1/Game/Login/', cors());

  //Post : only possible when its authorized
  app.post('/Api/v1/Game/Login/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "Accept, X-Access-Token, X-Application-Name, X-Request-Sent-Time");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Origin", "*");

    let UserName = req.body.UserName;
    let Password = req.body.Password;
    let DeviceUUID = req.body.DeviceUUID;
    let IP = req.body.IP;
    let DeviceName = req.body.DeviceName;
    let DeviceRam = req.body.DeviceRam;
    let DeviceCpu = req.body.DeviceCpu;
    let OperatingSystem = req.body.OperatingSystem;
    let GraphicsDevice = req.body.GraphicsDevice;
    Login(UserName, Password, IP, DeviceName, DeviceRam, DeviceCpu, res);
  });


/*
  app.get('/Api/v1/Login/UserName/:UserName/Password/:Password/IP/:IP/DeviceName/:DeviceName/DeviceRam/:DeviceRam/DeviceCpu/:DeviceCpu/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
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
                  if (response != undefined) {
                    let firstRow = response[0];
                    console.log(firstRow.Verified);
                    if (firstRow.Verified == "true") {
                      if (firstRow.Status != "Blocked") {

                        LoginHistoryModel.AddLoginHistory(UserName, Password, IP, DeviceName, DeviceRam, DeviceCpu, function (response3) {

                          if (response3 != undefined) {
                            // console.log("Accountz "+firstRow.AccountType);
                            res.send({
                              UserAccountID: firstRow.UserAccountID,
                              OnlineStatus: firstRow.OnlineStatus,
                              Email: firstRow.Email,
                              PhoneNumber: firstRow.PhoneNumber,
                              Status: firstRow.Status
                            });
                          } else {
                            let status = 500;
                            res.status(status).end(http.STATUS_CODES[status]);
                          }
                        });
                      } else {
                        res.send({
                          AccountBlocked: true
                        });
                      }
                    } else {
                      res.send({
                        AccountUnverified: true
                      });
                    }
                  } else {
                    res.send({
                      AccountNotFound: true
                    });
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

          } else {
            res.send({
              DeviceNameMissing: true
            })
          }
        } else {
          res.send({
            IPMissing: true
          })
        }
      } else {
        res.send({
          PasswordMissing: true
        })
      }
    } else {
      res.send({
        UserNameMissing: true
      })
    }
  });
*/
}

function newFunction(AccountType, Privilege, _UserName, UserAccountID, ParentType,ParentUserAccountID, res) {
  if (AccountType == "HeadOffice" || AccountType == "Distributor" || AccountType == "Shops" || Privilege == "Admin") { //only certain account types and admin type of player can login
    const user = {
      id: 1,
      UserName: _UserName,
      UserAccountID: UserAccountID,
      AccountType: AccountType,
      Privilege: Privilege,
      ParentType: ParentType,
      ParentUserAccountID:ParentUserAccountID
    };
    console.log(user);
    jwt.sign({
      user
    }, 'secretkey', {
        expiresIn: '1d'
      }, (err, token) => {
        res.json({
          token
        });
      });
  }
  else {
    //Players can't login on Page without privllage or account type access
    let status = 401;
    res.status(status).end(http.STATUS_CODES[status]);
  }
}
