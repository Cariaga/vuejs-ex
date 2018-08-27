//--Select Start
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