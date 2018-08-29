module.exports = function(app){
  app.get('/Api/v1/LoginHistory/Update/:LoginHistoryID/:UserAccountID/:IP/:DeviceName/:DeviceRam/:DeviceCpu/:Time/:Date',function(req,res){
    let LoginHistoryID = req.params.LoginHistoryID;
    let UserAccountID = req.params.UserAccountID;
    let IP = req.params.IP;
    let DeviceName = req.params.DeviceName;
    let DeviceRam = req.params.DeviceRam;
    let DeviceCpu = req.params.DeviceCpu;
    let Time = req.params.Time;
    let Date = req.params.Date;
  
    if(!isNullOrEmpty(LoginHistoryID)){
      if(!isNullOrEmpty(UserAccountID)){
        if(!isNullOrEmpty(IP)){
          if(!isNullOrEmpty(DeviceName)){
            if(!isNullOrEmpty(DeviceRam)){
              if(!isNullOrEmpty(DeviceCpu)){
                if(!isNullOrEmpty(Time)){
                  if(!isNullOrEmpty(Date)){
                    LoginHistoryUpdate(LoginHistoryID,UserAccountID,IP,DeviceName,DeviceRam,DeviceCpu,Time,Date,function(response){
                      if(response!=undefined){
                        res.send(response);
                      }else{
                        res.send({LoginHistoryUpdateFailed:true});
                      }
                    });
                  }else{
                    res.send({DateMissing:true});
                  }
                }else{
                  res.send({TimeMissing:true});
                }
              }else{
                res.send({DeviceCpuMissing:true});
              }
            }else{
              res.send({DeviceRamMissing:true});
            }
          }else{
            res.send({DeviceNameMissing:true});
          }
        }else{
          res.send({IPMissing:true});
        }
      }else{
        res.send({UserAccountIDMissing:true});
      }
    }else{
      res.send({LoginHistoryIDMissing:true});
    }
  });
};
module.exports = function(app){
  app.get('/Api/v1/LoginHistory/Latest/UserAccountID/:UserAccountID/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let UserAccountID = req.params.UserAccountID;
    LoginHistoryUserAccountIDLatest(UserAccountID,function(response){
      if(response!=undefined){
        res.send(beautify(response, null, 2, 100));
      }else{
        res.send({LoginHistoryUserAccountIDFound:false});
      }
    });
  });
  app.get('/Api/v1/LoginHistory/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let Offset =  req.query.Offset;
    let Limit =  req.query.Limit;
    let Sort =  req.query.Sort;
    Models.LoginHistory.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){
      Models.LoginHistory.sync();
      let result = Models.LoginHistory.findAll({ 
        where: {
          LoginHistoryID: {
            ne: null//not null
          }
       }
      }).then(function(result) {
        let Data = result.map(function(item) {
            return item;
            
        });
       
        res.send(beautify(Data, null, 2, 100));
      }).catch(function(result) {//catching any then errors
  
        res.send("Error "+result);
      });
    }
    if(!isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){
  
    }
    if(!isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){
  
    }
    if(!isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){
  
    }
    if(isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){
  
    }
    if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){
  
    }
    if(!isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){
  
    }
    //res.send("LoginHistory "+Offset+" "+ Limit+" "+Sort);
  });
};
module.exports = function(app){
  app.get('/Api/v1/LoginHistory/Add/:UserAccountID/:IP/:DeviceName/:DeviceRam/:DeviceCpu/:Time/:Date', function (req, res) {
    //USAGE /Api/v1/LoginHistory/Add/UserAccountID/IP/DeviceName/DeviceRam/DeviceCpu/01:57:17/2018-06-27
    let UserAccountID = req.params.UserAccountID;
    let IP = req.params.IP;
    let DeviceName = req.params.DeviceName;
    let DeviceRam = req.params.DeviceRam;
    let DeviceCpu = req.params.DeviceCpu;
    let Time = req.params.Time;
    let Date = req.params.Date;
    if(!isNullOrEmpty(UserAccountID)){
      if(!isNullOrEmpty(IP)){
        if(!isNullOrEmpty(DeviceName)){
          if(!isNullOrEmpty(DeviceRam)){
            if(!isNullOrEmpty(DeviceCpu)){
              if(!isNullOrEmpty(Time)){
                if(!isNullOrEmpty(Date)){
                  AddLoginHistory(UserAccountID,IP,DeviceName,DeviceRam,DeviceCpu,Time,Date,function(response){
                    if(response!=undefined){
                      res.send(response);
                    }else{
                      res.send({AddLoginHistoryFailed:true});
                    }
                  });
                }else{
                  res.send({DateMissing:true});
                }
              }else{
                res.send({TimeMissing:true});
              }
            }else{
              res.send({DeviceCpuMissing:true});
            }
          }else{
            res.send({DeviceRamMissing:true});
          }
        }else{
          res.send({DeviceNameMissing:true});
        }
      }else{
        res.send({IPMissing:true});
      }
    }else{
      res.send({UserAccountIDMissing:true});
    }
  });
}
//--Select Start


  

  app.get('/Api/v1/LoginHistory/UserAccountID/:UserAccountID', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let UserAccountID = req.params.UserAccountID;
    LoginHistoryUserAccountID(UserAccountID,function(response){
      if(response!=undefined){
        res.send(beautify(response, null, 2, 100));
      }else{
        res.send({LoginHistoryUserAccountIDFound:false});
      }
    });
  });
//--Select End

//--Update Start
//--Update End

//---LoginHistory ROUTING START


  /**
 *
 *
 * @param {*} LoginHistoryID
 * @param {*} UserAccountID
 * @param {*} IP
 * @param {*} DeviceName
 * @param {*} DeviceRam
 * @param {*} DeviceCpu
 * @param {*} Time
 * @param {*} Date
 * @param {*} callback
 */
function LoginHistoryUpdate(LoginHistoryID,UserAccountID,IP,DeviceName,DeviceRam,DeviceCpu,Time,Date,callback){
    Models.LoginHistory.update({
      IP: IP,
      DeviceName: DeviceName,
      DeviceRam: DeviceRam,
      DeviceCpu: DeviceCpu,
      Time: Time,
      Date: Date
    },{
      where: {LoginHistoryID: LoginHistoryID,UserAccountID: UserAccountID }
    })
    .then(Success => {
      callback("Updated");
    })
    .catch(error => {
     
      console.log("Error Updating " +error);
      callback(undefined);
    }); 
  }