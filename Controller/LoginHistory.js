
//--Select Start
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
//--Select End

//--Update Start
//--Update End