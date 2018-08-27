
//--Select Start
//--Select End

//--Update Start
//--Update End

//---LoginHistory ROUTING START
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