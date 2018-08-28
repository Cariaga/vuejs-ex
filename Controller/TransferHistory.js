module.exports = function(app){
  app.get('/Api/v1/TransferHistory/Update/TransferHistoryUUID/:TransferHistoryUUID/UserAccountIDReceiver/:UserAccountIDReceiver/UserAccountIDSender/:UserAccountIDSender/Amount/:Amount/Status/:Status/Reason/:Reason/TransferedDATE/:TransferedDATE/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let TransferHistoryUUID = req.params.TransferHistoryUUID;
    let UserAccountIDReceiver = req.params.UserAccountIDReceiver;
    let UserAccountIDSender = req.params.UserAccountIDSender;
    let Amount = req.params.Amount;
    let Status = req.params.Status;
    let Reason = req.params.Reason;
    let TransferedDATE = req.params.TransferedDATE;
    if(!isNullOrEmpty(TransferHistoryUUID)){
      if(!isNullOrEmpty(UserAccountIDReceiver)){
        if(!isNullOrEmpty(UserAccountIDSender)){
          if(!isNullOrEmpty(Amount)){
            if(!isNullOrEmpty(Status)){
              if(!isNullOrEmpty(Reason)){
                if(!isNullOrEmpty(TransferedDATE)){
                  if(Amount>=0){
                  let TransferHistoryUUIDExist= false;
                  async.series([TransferHistoryUUIDExistCheck],function(error,response){
                    if(TransferHistoryUUIDExist==true){
                      TransferHistoryUpdate(TransferHistoryUUID,UserAccountIDReceiver,UserAccountIDSender,Amount,Status,Reason,TransferedDATE,function(response){
                        if(response!=undefined){
                          res.send(response);
                        }else{
                          res.send([{TransferHistoryUpdateFailed:true}]);
                        }
                      });
                    }else{
                      res.send({TransferHistoryUUIDExist:false});
                    }
                  });
                  function TransferHistoryUUIDExistCheck(callback){
                    TransferHistoryTransferHistoryUUID(TransferHistoryUUID,function(response){
                      console.log(response);
                      if(response!=undefined){
                        TransferHistoryUUIDExist=true;
                        callback(null,'1');
                      }else{
                        TransferHistoryUUIDExist=false;
                        callback(null,'1');
                      }
                    });
                  }
                  }else{
                    res.send({AmountInvalidValue:true});
                  }
                
                }else{
                  res.send({TransferedDATEMissing:true});
                }
              }else{
                res.send({ReasonMissing:true});
              }
            }else{
              res.send({StatusMissing:true});
            }
          }else{
            res.send({AmountMissing:true});
          }
        }else{
          res.send({UserAccountIDSenderMissing:true});
        }
      }else{
        res.send({UserAccountIDReceiverMissing:true});
      }
    }else{
      res.send({TransferHistoryUUIDMissing:true});
    }
  });
}
module.exports = function(app){
  //--Select Start
app.get('/Api/v1/TransferHistory/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
  Models.TransferHistory.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){
    TransferHistoryAll(function(response){
      if(response!=undefined){
        res.send(beautify(response, null, 2, 100));
      }else{
        res.send([]);
      }
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
});
app.get('/Api/v1/TransferHistory/UserAccountSentAndRecievedID/:UserAccountSentAndRecievedID/',function (req, res){
  res.setHeader('Content-Type', 'application/json');
  let UserAccountSentAndRecievedID = req.params.UserAccountSentAndRecievedID;
  let SentTransferResult =undefined;
  let RecievedTransferResult = undefined;

  async.series([GetSentTransfer,GetReceiverTransfer],function(error,response){
    let FullTransferHistory = {SentTransferResult:SentTransferResult,RecievedTransferResult:RecievedTransferResult};

    res.send(FullTransferHistory);
  });

 function GetSentTransfer(callback1){
    TransferHistoryUserAccountIDSender(UserAccountSentAndRecievedID,function(response1){
      if(response1!=undefined){
        SentTransferResult=response1;
        callback1(null,'1');
      }else{
        SentTransferResult=[];
        callback1(null,'1');
      }
     
    });
  }
  function GetReceiverTransfer(callback2){
    TransferHistoryUserAccountIDReceiver(UserAccountSentAndRecievedID,function(response){
      if(response!=undefined){
        RecievedTransferResult = response;
        callback2(null,'2');
      }else{
        RecievedTransferResult =[];
        callback2(null,'2');
      }
    });
    }
});
app.get('/Api/v1/TransferHistory/UserAccountIDReceiver/:UserAccountIDReceiver/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let UserAccountIDReceiver = req.params.UserAccountIDReceiver;
  if(!isNullOrEmpty(UserAccountIDReceiver)){
    TransferHistoryUserAccountIDReceiver(UserAccountIDReceiver,function(response){
      if(response!=undefined){
        res.send(beautify(response, null, 2, 100));
      }else{
        res.send([]);
      }
    });
  }else{
    res.send({UserAccountIDMissing:true});
  }
});
app.get('/Api/v1/TransferHistory/UserAccountSentAndRecievedID/:UserAccountSentAndRecievedID/',function (req, res){
  res.setHeader('Content-Type', 'application/json');
  let UserAccountSentAndRecievedID = req.params.UserAccountSentAndRecievedID;
  let SentTransferResult =undefined;
  let RecievedTransferResult = undefined;

  async.series([GetSentTransfer,GetReceiverTransfer],function(error,response){
    let FullTransferHistory = {SentTransferResult:SentTransferResult,RecievedTransferResult:RecievedTransferResult};

    res.send(FullTransferHistory);
  });

 function GetSentTransfer(callback1){
    TransferHistoryUserAccountIDSender(UserAccountSentAndRecievedID,function(response1){
      if(response1!=undefined){
        SentTransferResult=response1;
        callback1(null,'1');
      }else{
        SentTransferResult=[];
        callback1(null,'1');
      }
     
    });
  }
  function GetReceiverTransfer(callback2){
    TransferHistoryUserAccountIDReceiver(UserAccountSentAndRecievedID,function(response){
      if(response!=undefined){
        RecievedTransferResult = response;
        callback2(null,'2');
      }else{
        RecievedTransferResult =[];
        callback2(null,'2');
      }
    });
    }
});
}
module.exports = function(app){
  app.get('/Api/v1/TransferHistory/Add/UserAccountIDReceiver/:UserAccountIDReceiver/UserAccountIDSender/:UserAccountIDSender/Amount/:Amount/Status/:Status/Reason/:Reason/TransferedDATE/:TransferedDATE/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let TransferHistoryUUID = uuidv4();
    let UserAccountIDReceiver = req.params.UserAccountIDReceiver;
    let UserAccountIDSender = req.params.UserAccountIDSender;
    let Amount = req.params.Amount;
    let Status = req.params.Status;
    let Reason = req.params.Reason;
    let TransferedDATE = req.params.TransferedDATE;
      if(!isNullOrEmpty(UserAccountIDReceiver)){
        if(!isNullOrEmpty(UserAccountIDSender)){
          if(!isNullOrEmpty(Amount)){
            if(!isNullOrEmpty(Status)){
              if(!isNullOrEmpty(Reason)){
                if(!isNullOrEmpty(TransferedDATE)){
                  if(parseInt(Amount)>0){
                    let UserAccountIDReceiverExist=false;
                    let UserAccountIDSenderExist=false;
                    async.series([UserAccountIDReceiverExistCheck,UserAccountIDSenderExistCheck],function(error,response){
                      if(UserAccountIDReceiverExist==true){
                          if(UserAccountIDSenderExist==true){
                          AddTransferHistory(TransferHistoryUUID,UserAccountIDReceiver,UserAccountIDSender,Amount,Status,Reason,TransferedDATE,function(response){
                            if(response!=undefined){
                              res.send(response);
                            }else{
                              res.send([{TransferHistoryUpdateFailed:true}]);
                            }
                          });
                        }else{
                          res.send({UserAccountIDSenderExist:false});
                        }
                      }else{
                        res.send({UserAccountIDReceiverExist:false});
                      }
                    });
  
                    function UserAccountIDReceiverExistCheck(callback){
                      isUserAccountIDExist(UserAccountIDReceiver,function(response){
                        if(response!=null){
                          UserAccountIDReceiverExist=true;
                          callback(null,'1');
                        }else{
                          UserAccountIDReceiverExist=false;
                          callback(null,'1');
                        }
                      });
                    }
                    function UserAccountIDSenderExistCheck(callback){
                      isUserAccountIDExist(UserAccountIDSender,function(response){
                        if(response!=null){
                          UserAccountIDSenderExist=true;
                          callback(null,'2');
                        }else{
                          UserAccountIDSenderExist=false;
                          callback(null,'2');
                        }
                      });
  
                    }
                  }else{
                    res.send({AmountInvalidValue:true});
                  }
                  
                }else{
                  res.send({TransferedDATEMissing:true});
                }
              }else{
                res.send({ReasonMissing:true});
              }
            }else{
              res.send({StatusMissing:true});
            }
          }else{
            res.send({AmountMissing:true});
          }
        }else{
          res.send({UserAccountIDSenderMissing:true});
        }
      }else{
        res.send({UserAccountIDReceiverMissing:true});
      }
  });
}


//--Select End

//--Update Start
//--Update End

//*not implemented*
// if the player has points the player can add and subtract transfer to other player
//must update both the reciving/sender current player points 
// -------------------------- MIGRATED

  
  function AddTransferHistory(TransferHistoryUUID,UserAccountIDReceiver,UserAccountIDSender,Amount,Status,Reason,TransferedDATE,callback){
    Models.TransferHistory.sync({alter : true/*,force:true*/});
    var item1 = Models.TransferHistory.build({
      TransferHistoryUUID:TransferHistoryUUID,
      UserAccountIDReceiver:UserAccountIDReceiver,
      UserAccountIDSender:UserAccountIDSender,
      Amount:Amount,
      Status:Status,
      Reason:Reason,
      TransferedDATE:TransferedDATE
    });
    //force:true deletes the old table Don't DO THIS ON PRODUCTION CODE
    Models.TransferHistory.sync({/*alter : true*//*,force:true*/});
    item1.save()
    .then(Success => {
  
       console.log("----AddTransferHistory Start-----");
       console.log(Success);
       console.log("----AddTransferHistory End-----");
       callback("Inserted");
    })
    .catch(error => {
      // mhhh, wth!
      console.log();
      callback(undefined);
    });
  }

