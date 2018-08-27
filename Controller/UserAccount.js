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


//---UserInfo ROUTING START
app.get('/Api/v1/UserInfo/Add/UserAccountID/:UserAccountID/Email/:Email/PhoneNumber/:PhoneNumber/TelephoneNumber/:TelephoneNumber/', function (req, res) {
  //USAGE /Api/v1/UserInfo/Add/UserAccountID/6f6776bd-3fd6-4dcb-a61d-ba90b5b35dc6/Email/Cariagajkl.info@gmail.com/PhoneNumber/02121547894/TelephoneNumber/1324579/

  //Tests for foreignKey should result in  foreign key constraint fails Error
  // /Api/v1/UserInfo/Add/5879999/Email14535432/PhoneNumber/TelephoneNumber

  let UserAccountID = req.params.UserAccountID;
  let Email = req.params.Email;
  let PhoneNumber = req.params.PhoneNumber;
  let TelephoneNumber = req.params.TelephoneNumber;

  if(!isNullOrEmpty(UserAccountID)){
    if(!isNullOrEmpty(Email)){
      if(!isNullOrEmpty(PhoneNumber)){
        if(!isNullOrEmpty(TelephoneNumber)){
          let UserAccountIDExist= false;
          let UserInfoExist= false;
          let isEmailExist =false;
          async.series([UserAccountIDCheck,UserInfoCheck,UserInfoEmailExistCheck],function(error,response){
           
            if(UserAccountIDExist==true){
              if(UserInfoExist==false){//must not exist already
                if(isEmailExist==false){//must Be False
                  AddUserInfo(UserAccountID,Email,PhoneNumber,TelephoneNumber,function(response) {
                    if(response!=undefined){
                      res.send(response);
                    }else{
                      res.send({AddUserInfoFailed:true});
                    }
                  });
                }else{
                  res.send({UserInfoExist:true});
                }
                
              }else{
                res.send({UserInfoExist:true});
              }
            }else{
              res.send({UserAccountIDExist:true});
            }
          });
          
          function UserAccountIDCheck(callback){
            isUserAccountIDExist(UserAccountID,function(response){
              let obj = response;
              if(!isNullOrEmpty(obj)&&obj!=undefined&&obj[0].UserAccountID==UserAccountID){
                UserAccountIDExist = true;
                callback(null,'1');
              }else{
                UserAccountIDExist = false;
                callback(null,'1');
              }
            });
          }
          function UserInfoCheck(callback){
            UserInfoUserAccountID(UserAccountID,function(response){
              if(response!=undefined){
                UserInfoExist=true;
               callback(null,'3');
              }else{
                UserInfoExist= false;
               callback(null,'3');
              }
            });
          }
          function UserInfoEmailExistCheck(callback){
            UserInfoEmailExist(Email,function(response){
              let obj = response;
              if(!isNullOrEmpty(obj)&&obj!=undefined&&obj.length>0&&obj[0].Email==Email){
                isEmailExist=true;
                callback(null,2);
                
              }else{
                isEmailExist=false;
                callback(null,2);
              }
            });
          }
        }else{
          res.send({TelephoneNumberMissing:true});
        }
      }else{
        res.send({PhoneNumberMissing:true});
      }
    }else{
      res.send({EmailMissing:true});
    }
  }else{
    res.send({UserAccountIDMissing:true});
  }
});

// migrated
function AddUserInfo(UserAccountID,Email,PhoneNumber,TelephoneNumber,callback){

    Models.UserInfo.sync(/*{force:true}*/);
    var item1 = Models.UserInfo.build({
      UserAccountID:UserAccountID,
      Email:Email,
      PhoneNumber:PhoneNumber,
      TelephoneNumber:TelephoneNumber
    });
    Models.UserInfo.sync();//only use force true if you want to destroy replace table
    item1.save()
    .then(Success => {
      callback("Inserted");
    })
    .catch(error => {
    
      console.log("error inserting " +error);
      callback(undefined);
    });
}
