
//--Select Start
//--Select End

//--Update Start
//--Update End

//---DepositHistory ROUTING START 
app.get('/Api/v1/DepositHistory/Add/UserAccountID/:UserAccountID/Amount/:Amount/BankNameUsed/:BankNameUsed/SecurityCodeUsed/:SecurityCodeUsed/Status/:Status/RequestedDATE/:RequestedDATE/ApprovedDATE/:ApprovedDATE/RejectedDATE/:RejectedDATE/ProcessingDATE/:ProcessingDATE/RequestedTIME/:RequestedTIME/ApprovedTIME/:ApprovedTIME/RejectedTIME/:RejectedTIME/ProcessingTIME/:ProcessingTIME', function (req, res) {
    // Usage /Api/v1/DepositHistory/Add/UserAccountID/6f6776bd-3fd6-4dcb-a61d-ba90b5b35dc6/Amount/0/BankNameUsed/BankNameUsed/SecurityCodeUsed/SecurityCodeUsed/Status/Processing/RequestedDATE/2018-06-26/ApprovedDATE/2018-06-26/RejectedDATE/2018-06-26/ProcessingDATE/2018-06-26/RequestedTIME/01:59:17/ApprovedTIME/01:59:17/RejectedTIME/01:59:17/ProcessingTIME/01:59:17
     let UserAccountID = req.params.UserAccountID;
     let Amount = req.params.Amount;
     let BankNameUsed = req.params.BankNameUsed;
     let SecurityCodeUsed = req.params.SecurityCodeUsed;
     let Status = req.params.Status;
     let RequestedDATE = req.params.RequestedDATE;
     let ApprovedDATE = req.params.ApprovedDATE;
     let RejectedDATE = req.params.RejectedDATE;
     let ProcessingDATE = req.params.ProcessingDATE;
     let RequestedTIME = req.params.RequestedTIME;
     let ApprovedTIME = req.params.ApprovedTIME;
     let RejectedTIME = req.params.RejectedTIME;
     let ProcessingTIME = req.params.ProcessingTIME;
     if(!isNullOrEmpty(UserAccountID)){
       if(!isNullOrEmpty(Amount)){
         if(!isNullOrEmpty(BankNameUsed)){
           if(!isNullOrEmpty(SecurityCodeUsed)){
             if(!isNullOrEmpty(Status)){
               let RequestedDATEParsed = moment(RequestedDATE,"YYYY-MM-DD");
               let  isValidRequestedDATEParsed = RequestedDATEParsed.isValid();
   
               if(!isNullOrEmpty(RequestedDATE)&&isValidRequestedDATEParsed==true&&RequestedDATEParsed.year()>1959){
                 let ApprovedDATEParsed = moment(ApprovedDATE,"YYYY-MM-DD");
                 let  isValidApprovedDATEParsed = ApprovedDATEParsed.isValid();
   
                 if(!isNullOrEmpty(ApprovedDATE)&&isValidApprovedDATEParsed==true&&ApprovedDATEParsed.year()>1959){
                   let RejectedDATEParsed = moment(RejectedDATE,"YYYY-MM-DD");
                   let  isValidRejectedDATEParsed = RejectedDATEParsed.isValid();
   
                   if(!isNullOrEmpty(RejectedDATE)&&isValidRejectedDATEParsed==true&&RejectedDATEParsed.year()>1959){
                     let ProcessingDATEParsed = moment(ProcessingDATE,"YYYY-MM-DD");
                     let  isValidProcessingDATEParsed = ProcessingDATEParsed.isValid();
   
                     if(!isNullOrEmpty(ProcessingDATE)&&isValidProcessingDATEParsed==true&&ProcessingDATEParsed.year()>1959){
   
                       if(!isNullOrEmpty(RequestedTIME)){
                         if(!isNullOrEmpty(ApprovedTIME)){
                           if(!isNullOrEmpty(RejectedTIME)){
                             if(!isNullOrEmpty(ProcessingTIME)){
                               
                               if(Amount>0){
                                 if(Status=="Approved"||Status=="Rejected"||Status=="Processing"){
                                   let isUserAccountIDFound =false;
   
                                   async.series([IsUserAccountIDExistCheck],function(error,response){
                                     if(isUserAccountIDFound==true){
   
                                       AddDepositHistory(UserAccountID,Amount,BankNameUsed,SecurityCodeUsed,Status,RequestedDATE,ApprovedDATE,RejectedDATE,ProcessingDATE,RequestedTIME,ApprovedTIME,RejectedTIME,ProcessingTIME,function(response) {
                                         res.send(response);
                                       });
                                  
                                     }else{
                                       res.send({IsUserAccountIDExist:false});
                                     }
                                   });
   
                                   function IsUserAccountIDExistCheck(callback){
                                     isUserAccountIDExist(UserAccountID,function(response){
                                       if(response!=undefined){
                                         isUserAccountIDFound=true;
                                         callback(null,'1');
                                       }else{
                                         isUserAccountIDFound=false;
                                         callback(null,'1');
                                       }
                                     });
                                   }
                    
                                 }else{
                                   res.send({StatusInvalidValue:true});
                                 }
                               }else{
                                 res.send({AmountInvalidValue:true});
                               }
                             }else{
                               res.send({ProcessingTIMEMissing:true});
                             }
                           }else{
                             res.send({RejectedTIMEMissing:true});
                           }
                         }else{
                           res.send({ApprovedTIMEMissing:true});
                         }
                       }else{
                         res.send({RequestedTIMEMissing:true});
                       }
                     }else{
                       res.send({ProcessingDATEMissing:true});
                     }
                   }else{
                     res.send({RejectedDATEMissing:true});
                   }
                 }else{
                   res.send({ApprovedDATEMissing:true});
                 }
               }else{
                 res.send({RequestedDATEMissing:true});
               }
             }else{
               res.send({StatusMissing:true});
             }
           }else{
             res.send({SecurityCodeUsedMissing:true});
           }
         }else{
           res.send({BankNameUsed:true});
         }
       }else{
         res.send({AmountMissing:true})
       }
     }else{
       res.send({UserAccountIDMissing:true});
     }  
   });

   /**
 *
 *
 * @param {*} UserAccountID
 * @param {*} Amount
 * @param {*} BankNameUsed
 * @param {*} SecurityCodeUsed
 * @param {*} Status
 * @param {*} RequestedDATE
 * @param {*} ApprovedDATE
 * @param {*} RejectedDATE
 * @param {*} ProcessingDATE
 * @param {*} RequestedTIME
 * @param {*} ApprovedTIME
 * @param {*} RejectedTIME
 * @param {*} ProcessingTIME
 * @param {*} callback
 */
function AddDepositHistory(UserAccountID,Amount,BankNameUsed,SecurityCodeUsed,Status,RequestedDATE,ApprovedDATE,RejectedDATE,ProcessingDATE,RequestedTIME,ApprovedTIME,RejectedTIME,ProcessingTIME,callback){
    var item1 = Models.DepositHistory.build({
      UserAccountID:UserAccountID,
      Amount:Amount, 
      BankNameUsed:BankNameUsed,
      SecurityCodeUsed:SecurityCodeUsed,
      Status:Status,
      RequestedDATE:RequestedDATE,
      ApprovedDATE:ApprovedDATE,
      RejectedDATE:RejectedDATE,
      ProcessingDATE:ProcessingDATE, 
      RequestedTIME:RequestedTIME,
      ApprovedTIME:ApprovedTIME,
      RejectedTIME:RejectedTIME,
      ProcessingTIME:ProcessingTIME, 
    });
    Models.DepositHistory.sync({alter : true});
    item1.save()
    .then(Success => {
      console.log("----AddDepositHistory Start-----");
      console.log(Success);
     
      console.log("----AddDepositHistory End-----");
      callback("Inserted");
    })
    .catch(error => {
      console.log("error inserting " +error);
      callback(undefined);
    });
  }