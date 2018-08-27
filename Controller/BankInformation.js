
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

//---BankInformation ROUTING START
app.get('/Api/v1/BankInformation/Add/:UserAccountID/:BankName/:SecurityCode/:Valid/:Expiration/:Time/:Date', function (req, res) {
    //Uasge /Api/v1/BankInformation/Add/UserAccountID/BankName/SecurityCode/Valid/2018-06-27/01:57:17/2018-06-27
    let UserAccountID = req.params.UserAccountID;
    let BankName = req.params.BankName;
    let SecurityCode = req.params.SecurityCode;
    let Valid = req.params.Valid;
    let Expiration = req.params.Expiration;
    let Time = req.params.Time;
    let Date = req.params.Date;
    
    if(!isNullOrEmpty(UserAccountID)){
      if(!isNullOrEmpty(BankName)){
        if(!isNullOrEmpty(SecurityCode)){
          if(!isNullOrEmpty(Valid)){
            if(!isNullOrEmpty(Expiration)){
              if(!isNullOrEmpty(Time)){
                if(!isNullOrEmpty(Date)){
                  BankInformationAdd(UserAccountID,BankName,SecurityCode,Valid,Expiration,Time,Date,function(response){
                    if(response){
                      res.send(response);
                    }else{
                      res.send({BankInformationAddFailed:true});
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
            res.send({ValidMissing:true});
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
  });


  /**
 *
 *
 * @param {*} UserAccountID
 * @param {*} BankName
 * @param {*} SecurityCode
 * @param {*} Valid
 * @param {*} Expiration
 * @param {*} Time
 * @param {*} Date
 * @param {*} callback
 */
function BankInformationAdd(UserAccountID,BankName,SecurityCode,Valid,Expiration,Time,Date,callback){
    var item1 = Models.BankInformation.build({
      UserAccountID:UserAccountID,
      BankName:BankName,
      SecurityCode:SecurityCode,
      Valid:Valid,
      Expiration:Expiration,
      Time:Time,
      Date:Date
    });
    Models.BankInformation.sync({alter : true/*,force:true*/});//force recreates deletes old table
    item1.save().then(Success => {
     callback("Inserted");
    })
    .catch(error => {
      console.log("error inserting " +error);
      callback(undefined);
    });
  }