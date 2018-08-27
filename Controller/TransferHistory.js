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
//--Select End

//--Update Start
//--Update End