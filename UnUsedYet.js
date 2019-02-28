

/*
app.get('/SupportTicket/Request', function (req, res) {
  
  let UserAccountID = req.query.UserAccountID;
  let Title = req.query.Title;
  let Description = req.query.Description;
  let Reason = req.query.Reason;
  let Time = '';
  let Date = '';
  let Status = 'Pending';
  getCurrentTime(function(response){
    Time=response;
  });
  getCurrentDate(function(response){
    Date= response;
  });
  console.log("Time : "+Time);
  console.log("Date : "+Date);
  if(!isNullOrEmpty(UserAccountID)){
    if(!isNullOrEmpty(Title)){
      if(!isNullOrEmpty(Description)){
        if(!isNullOrEmpty(Reason)){
          if(!isNullOrEmpty(Time)){
            if(!isNullOrEmpty(Date)){
              if(!isNullOrEmpty(Status)){
                AddSupportTicket(UserAccountID,Title,Description,Reason,Time,Date,Status,function(response) {
                  res.send(response);
                });
              }
            }else{
              res.send({DateMissing:true});
            }
          }else{
            res.send({TimeMissing:true});
          }
        }else{
          res.send({ReasonMissing:true});
        }
      }else{
        res.send({DescriptionMissing:true});
      }
    }else{
      res.send({TitleMissing:true});
    }
  }else{
    res.send({UserAccountIDMissing:true});
  }
});
*/
/*
app.get('/DepositHistory', function (req, res) {
  //DepositHistory?UserName=4dshg5D4d&Password=sdgsdrhGHSD46&Amount=132&BankNameUsed=BankNameUsed&SecurityCodeUsed=SecurityCodeUsed
   let UserName = req.query.UserName;
   let Password = req.query.Password;
   let Amount = req.query.Amount;
   let BankNameUsed = req.query.BankNameUsed;
   let SecurityCodeUsed = req.query.SecurityCodeUsed;
   let Status = 'Pending';//must be have default
   let RequestedDATE = '';//runtime assigned
   let ApprovedDATE = undefined;//must be undefined
   let RejectedDATE = undefined;//must be undefined
   let ProcessingDATE =undefined;//must be undefined
   let RequestedTIME = '';//runtime assigned here
   let ApprovedTIME = undefined;//must be undefined
   let RejectedTIME = undefined;//must be undefined
   let ProcessingTIME = undefined;//must be undefined
   if(!isNullOrEmpty(UserName)){
    console.log("UserName :"+UserName);
    if(!isNullOrEmpty(Amount)&&Amount>0){
        isUserNameExist(UserName,function(response3){
          let obj = response3;
          let UserAccountID = obj[0].UserAccountID;//runtime assigned by Username
            console.log("UserAccountID: "+UserAccountID);
          if(!isNullOrEmpty(obj)&&obj!=undefined){
          
            async.waterfall([TimeCheck,DateCheck],function(err,result){
              if(!isNullOrEmpty(UserAccountID)&&
              !isNullOrEmpty(Amount)&&
              !isNullOrEmpty(BankNameUsed)&&
              !isNullOrEmpty(SecurityCodeUsed)&&
              !isNullOrEmpty(Status)&&
              !isNullOrEmpty(RequestedDATE)&&
              !isNullOrEmpty(RequestedTIME)){
                AddDepositHistory(UserAccountID,
                  Amount,
                  BankNameUsed,
                  SecurityCodeUsed,
                  Status,
                  RequestedDATE,
                  ApprovedDATE,
                  RejectedDATE,
                  ProcessingDATE,
                  RequestedTIME,
                  ApprovedTIME,
                  RejectedTIME,
                  ProcessingTIME,function(response) {
                    let Data = { IsInvalidUserName:false,IsUserNameNotFound:false,IsInvalidBankInformation:false,IsInvalidAmount:false, ResponseCode:1 };
                    res.send(Data);
                });
              }
              else{
                let Data = { IsInvalidUserName:false,IsUserNameNotFound:false,IsInvalidBankInformation:true,IsInvalidAmount:false, ResponseCode:2 };
                res.send(Data);
                }
            });
              function TimeCheck(callback){
              getCurrentTime(function(response){
                  callback(null,response);
                });
              }
              function DateCheck(arg0,callback2){
            
                let Time = arg0;
                getCurrentDate(function(response){
                    let Date = response;
                    RequestedTIME = Time;
                    RequestedDATE = Date;
                  
                    callback2(null,response);
                });
              }
          }else{
            let Data = {  IsInvalidUserName:true,IsUserNameNotFound:true,IsInvalidBankInformation:true,IsInvalidAmount:false, ResponseCode:3 };
            res.send(Data);
          }
        });
    }else{
      let Data = { IsInvalidUserName:false,IsUserNameNotFound:false,IsInvalidBankInformation:true,IsInvalidAmount:true, ResponseCode:4 };
      res.send(Data);
    }
  }else{
    let Data = {  IsInvalidUserName:true,IsUserNameNotFound:true,IsInvalidBankInformation:true,IsInvalidAmount:false, ResponseCode:5 };
    res.send(Data);
   }
 });
 */