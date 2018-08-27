
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
//--Select End

//--Update Start
//--Update End