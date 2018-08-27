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






//---UserAccount ROUTING START ------------------migrate
app.get('/Api/v1/UserAccount/Add/:AccessID/:UserName/:Password/:Verify/:ValidKey/:RegisteredDate/:RegisteredTime', function (req, res) {
  //USAGE
  //Api/v1/UserAccount/Add/AccessID/UserName/Password/true/ValidKey/2018-06-27/01:57:17
  let UserAccountID = uuidv4();
  let AccessID = req.params.AccessID;
  let UserName = req.params.UserName;
  let Password = req.params.Password;
  let Verify = req.params.Verify;
  let ValidKey = req.params.ValidKey;
  let RegisteredDate = req.params.RegisteredDate;
  let RegisteredTime =  req.params.RegisteredTime;

  if(!isNullOrEmpty(UserAccountID)){
    if(!isNullOrEmpty(AccessID)){
      if(!isNullOrEmpty(UserName)){
        if(!isNullOrEmpty(Password)){
          if(!isNullOrEmpty(Verify)){
            if(!isNullOrEmpty(ValidKey)){
              if(!isNullOrEmpty(RegisteredDate)){
                if(!isNullOrEmpty(RegisteredTime)){
                  AddUserAccount(UserAccountID,AccessID,UserName,Password,Verify,ValidKey,RegisteredDate,RegisteredTime,function(response) {
                    if(response!=undefined){
                      res.send(response);
                    }else{
                      res.send({AddUserAccountFailed:true});
                    }
                  });
                }else{
                  res.send({RegisteredTimeMissing:true});
                }
              }else{
                res.send({RegisteredDateMissing:true});
              }
            }else{
              res.send({ValidKeyMissing:true});
            }
          }else{
            res.send({VerifyMissing:true});
          }
        }else{
          res.send({PasswordMissing:true});
        }
      }else{
        res.send({UserNameMissing:true});
      }
    }else{
      res.send({AccessIDMissing:true});
    }
  }else{
    res.send({UserAccountIDMissing:true});
  }
});

/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} AccessID
 * @param {*} UserName
 * @param {*} Password
 * @param {*} Verify
 * @param {*} ValidKey
 * @param {*} RegisteredDate
 * @param {*} RegisteredTime
 * @param {*} callback
 */

// ---------------------migrated
function AddUserAccount(UserAccountID,AccessID,UserName,Password,Verify,ValidKey,RegisteredDate,RegisteredTime, callback){
  var item1 = Models.UserAccount.build({
    UserAccountID:UserAccountID,
    AccessID:AccessID,
    UserName:UserName,
    Password:Password,
    Verify:Verify,
    ValidKey:ValidKey,
    RegisteredDate:RegisteredDate,
    RegisteredTime:RegisteredTime
  });
  //force:true deletes the old table Don't DO THIS ON PRODUCTION CODE
  Models.UserAccount.sync({alter : true/*,force:true*/});
  item1.save()
  .then(Success => {

     console.log("----AddUserAccount Start-----");
     console.log(Success);
     console.log("----AddUserAccount End-----");
     callback("Inserted");
  })
  .catch(error => {
    // mhhh, wth!
    console.log("error inserting UserAccountID:"+UserAccountID+" \n AccessID:"+AccessID+"\n UserName:"+UserName+"\n Password:"+Password+"\n Verify:"+Verify+"\n ValidKey:"+ValidKey+"\n RegisteredDate:"+RegisteredDate+"\n RegisteredTime:"+RegisteredTime);
    callback(undefined);
  });
}
