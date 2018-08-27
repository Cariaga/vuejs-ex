//--Select Start
app.get('/Api/v1/UserAccount/Update/UserAccountID/:UserAccountID/Status/:VerifiedStatus', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let UserAccountID =  req.params.UserAccountID;
  let VerifiedStatus =  req.params.VerifiedStatus;// only true or false state no other value type
  console.log(UserAccountID+" "+VerifiedStatus);
  if(!isNullOrEmpty(UserAccountID)&&!isNullOrEmpty(VerifiedStatus)){
    if(VerifiedStatus=="true" || VerifiedStatus=="false"){//must be validated like a string because 
      Models.UserAccount.sync();
      let UserAccountIDExist = false;
      async.series([UserAccountIDCheck],function(err,response){
        if(UserAccountIDExist==true){
          //res.send({UserAccountIDExist:UserAccountIDExist});
          VerifyAccountUserAccountID(UserAccountID,VerifiedStatus,function(response){
            if(!isNullOrEmpty(response)&&response!=undefined){
              res.send(response);
            }else{
              res.send({VerifyAccountUserAccountIDFailed:true});
            }
          });
        }else{
          res.send({UserAccountIDExist:UserAccountIDExist});
        }
      });
      function UserAccountIDCheck(callback){
        isUserAccountIDExist(UserAccountID,function(response){
          let obj = response;
          if(!isNullOrEmpty(obj)&&obj!=undefined&&obj.length>0&&obj[0].UserAccountID==UserAccountID){
            UserAccountIDExist = true;
            callback(null,'1');
          }else{
            UserAccountIDExist = false;
            callback(null,'1');
          }
        });
      }
    }else{
      res.send({VerfiedStatusInvalidValue:true});
    }
  }else{
    res.send({MissingParameters:true});
  }
  //res.send("UserAccount "+Offset+" "+ Limit+" "+Sort);
});

app.get('/Api/v1/UserAccount/ConntectedAccounts/UserAccountID/:UserAccountID', function (req, res) {
  let UserAccountID = req.params.UserAccountID;
  let PlayerRelationshipResult = undefined;// the resulting parents of Player
  let PlayerExist = false;
  if(!isNullOrEmpty(UserAccountID)){
    async.series([PlayerCheck,GetParentPlayerLookUp],function(error,response){
      if(PlayerExist==true){
       res.send(PlayerRelationshipResult);
      }else{
       res.send({PlayerInvalidValue:true});
      }
    });
    function PlayerCheck(callback){
      PlayerUserAccountID(UserAccountID,function(response){
        if(response!=undefined){
         PlayerExist= true;
         callback(null,'1');
        }else{
         PlayerExist= false;
         callback(null,'1');
        }
      });
    }
    function GetParentPlayerLookUp(callback){
     GetParentRelationshipPlayerUserAccountID(UserAccountID,function(response){
       if(response!=undefined){
         PlayerRelationshipResult=response;
         callback(null,'2');
       }else{
         PlayerRelationshipResult=undefined;
         callback(null,'2');
       }
     });
    }
  }else{
    res.send({UserAccountIDMissing:true});
  }
 
});
app.get('/Api/v1/UserAccount/AccountType/:UserAccountID', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let UserAccountID = req.params.UserAccountID;
  if(!isNullOrEmpty(UserAccountID)){
    //res.send({success:true});
    AccountTypeFullCheck(UserAccountID,function(response){
      if(response!=undefined){
        if(!isNullOrEmpty(response)&&response.UnSafeDuplicate==false&&response.FoundAccount==true){
          res.send({AccountType:response.AccountType});
        }
        else if(!isNullOrEmpty(response)&&response.UnSafeDuplicate==true&&response.FoundAccount==false){
          res.send("Duplicate UserAccountID AccountType");
        }
        else if(!isNullOrEmpty(response)&&response.UnSafeDuplicate==false&&response.FoundAccount==false){
          res.send("No Account No Duplicate");
        }
      }else{
        res.send("Somthing Went Wrong With AccountTypeFullCheck");
      }
      
    });
  }else{
    res.send("Missing params");
  }
});
app.get('/Api/v1/UserAccount/Update/UserAccountID/:UserAccountID/Verify/:Verify', function (req, res) {//migrated
    let UserAccountIDFound = false;
    let UserAccountID = req.params.UserAccountID;
    let Verify = req.params.Verify;
    async.waterfall([
      myFirstFunction
   ], function (err, result) {//final function
    if(UserAccountIDFound==true){
      VerifyAccountUserAccountID(UserAccountID,Verify,function(response){
        if(response!=undefined){
          res.send({});
        }else{
          res.send({VerifyAccountUserAccountIDFailed:true});
        }
      });
    }else{
      res.send({UserAccountIDInvalid:true});
    }
       callback(result);
   });
    function myFirstFunction(callback2) {
      console.log('1');
      Models.UserAccount.sync(/*{force:true}*/);//makes sure table exist and syncs it
      let result = Models.UserAccount.findAll({ 
        where: {
          UserName:UserName//not null
          ,
          ValidKey:ValidKey//not null
       }
      }).then(function(result) {
        let Data = result.map(function(item) {return item;});
      //  console.log('2');
        if(Data.length>0){
          UserAccountIDFound=true;
        }else{
          UserAccountIDFound=false;
        }
        callback2(null,Data);
      }).catch(function(result2){
        console.log("Verify Error : "+result2);
      //  console.log('2');
        callback2(null,result2);
      });
    }
  });

  app.get('/UserAccount/SupportTicket', function (req, res) {
    // USAGE /UserAccount/SupportTicket?UserAccountID=bddbe7d1-d28b-4bb6-8b51-eb2d9252c9bb
    // USAGE /UserAccount/SupportTicket?UserAccountID=bddbe7d1-d28b-4bb6-8b51-eb2d9252c9bb&Status=Pending
    let UserAccountID =  req.query.UserAccountID;
    let Status =  req.query.Status;
    if(!isNullOrEmpty(UserAccountID)&&isNullOrEmpty(Status)){
      Models.SupportTicket.sync();
      let result = Models.SupportTicket.findAll({ 
        where: {
          UserAccountID: UserAccountID//not null
          
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
    if(!isNullOrEmpty(UserAccountID)&&!isNullOrEmpty(Status)){
      Models.SupportTicket.sync();
      let result = Models.SupportTicket.findAll({ 
        where: {
          UserAccountID: UserAccountID,
          Status:Status//not null
          
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
    else{
      let Data = {IsInvalidUserAccountID:true}
      res.send(Data);
    }
  });
//--Select End

//--Update Start
//--Update End