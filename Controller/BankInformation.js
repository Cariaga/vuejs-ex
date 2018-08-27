
//--Select Start
app.get('/Api/v1/BankInformation/Update/:BankInformationID/:UserAccountID/:BankName/:SecurityCode/:Expiration/:Time/:Date', function(req,res){
    let BankInformationID = req.params.BankInformationID;
    let UserAccountID = req.params.UserAccountID;
    let BankName = req.params.BankName;
    let SecurityCode = req.params.SecurityCode;
    let Expiration = req.params.Expiration;
    let Time = req.params.Time;
    let Date = req.params.Date;
  
    if(!isNullOrEmpty(UserAccountID)){
      if(!isNullOrEmpty(BankInformationID)){
        if( !isNullOrEmpty(BankName)){
          if(!isNullOrEmpty(SecurityCode)){
            if(!isNullOrEmpty(Expiration)){
              if(!isNullOrEmpty(Time)){
                if(!isNullOrEmpty(Date)){
                  BankInformationUpdate(UserAccountID,BankInformationID,BankName,SecurityCode,Expiration,Time,Date,function(response){
                    if(response!=undefined){
                      res.send(response);
                    }else{
                      res.send({BankInformationUpdateFailed:true});
                    }
                  });
                }else{
                  res.send({DateMissing:true});
                }
              }else{
                res.send({TimeMissing:true});
              }
            }else{
              res.send({ExpirationMissing:true});
            }
          }else{
            res.send({SecurityCodeMissing:true});
          }
        }else{
          res.send({BankNameMissing:true});
        }
      }else{
        res.send({UserAccountIDMissing:true});
      }
    }else{
      res.send({BankInformationIDMissing:true});
    }
  });
//--Select End

//--Update Start
//--Update End