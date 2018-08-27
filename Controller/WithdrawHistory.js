app.get('/Api/v1/WithdrawHistory/Update/WithdrawHistoryID/:WithdrawHistoryID/UserAccountID/:UserAccountID/Status/Approved/ApprovedDATE/:ApprovedDATE/ApprovedTIME/:ApprovedTIME/',function(req,res){
    let WithdrawHistoryID = req.params.WithdrawHistoryID;
    let UserAccountID =req.params.UserAccountID;
    let ApprovedDATE = req.params.ApprovedDATE;
    let ApprovedTIME = req.params.ApprovedTIME;
    if(!isNullOrEmpty(WithdrawHistoryID)){
      if(!isNullOrEmpty(UserAccountID)){
      
          let ApprovedDATEParsed= moment(ApprovedDATE, "YYYY-MM-DD");
          let isValidApprovedDATEParsed = ApprovedDATEParsed.isValid();
          if(!isNullOrEmpty(ApprovedDATE)&&isValidApprovedDATEParsed==true&&ApprovedDATEParsed.year()>1959){
            if(!isNullOrEmpty(ApprovedTIME)){
  
              WithdrawHistoryUpdateApproved(UserAccountID,WithdrawHistoryID,ApprovedDATE,ApprovedTIME,function(response){
                if(response!=undefined){
                  res.send(response);
                }else{
                  res.send({WithdrawHistoryUpdateApprovalFailed:true});
                }
              });
      
            }else{
              res.send({ApprovedTIMEMissing:true});
            }
          }else{
            res.send({ApprovedDATEMissing:true});
          }
        
      }else{
        res.send({UserAccountIDMissing:true});
      }
    }else{
      res.send({WithdrawHistoryIDMissing:true});
    }
  });
  app.get('/Api/v1/WithdrawHistory/Update/WithdrawHistoryID/:WithdrawHistoryID/UserAccountID/:UserAccountID/Status/Processing/ProcessingDATE/:ProcessingDATE/ProcessingTIME/:ProcessingTIME/',function(req,res){
    let WithdrawHistoryID = req.params.WithdrawHistoryID;
    let UserAccountID =req.params.UserAccountID;
    let ProcessingDATE = req.params.ProcessingDATE;
    let ProcessingTIME = req.params.ProcessingTIME;
    if(!isNullOrEmpty(WithdrawHistoryID)){
      if(!isNullOrEmpty(UserAccountID)){
    
          let ProcessingDATEParsed= moment(ProcessingDATE, "YYYY-MM-DD");
          let  isValidProcessingDATEParsed = ProcessingDATEParsed.isValid();
          if(!isNullOrEmpty(ProcessingDATE)&&isValidProcessingDATEParsed==true&&ProcessingDATEParsed.year()>1959){
            if(!isNullOrEmpty(ProcessingTIME)){
              WithdrawHistoryUpdateProcessing(UserAccountID,WithdrawHistoryID,ProcessingDATE,ProcessingTIME,function(response){
                if(response!=undefined){
                  res.send(response);
                }else{
                  res.send({WithdrawHistoryUpdateProcessingFailed:true});
                }
              });
            }else{
              res.send({ProcessingTIMEMissing:true});
            }
          }else{
            res.send({ProcessingDATEMissing:true});
          
        }
      }else{
        res.send({UserAccountIDMissing:true});
      }
    }else{
      res.send({WithdrawHistoryIDMissing:true});
    }
  });
  app.get('/Api/v1/WithdrawHistory/Update/WithdrawHistoryID/:WithdrawHistoryID/UserAccountID/:UserAccountID/Status/Rejected/RejectedDATE/:RejectedDATE/RejectedTIME/:RejectedTIME/',function(req,res){
    let WithdrawHistoryID = req.params.WithdrawHistoryID;
    let UserAccountID =req.params.UserAccountID;
    
    let RejectedDATE = req.params.RejectedDATE;
    let RejectedTIME = req.params.RejectedTIME;
    if(!isNullOrEmpty(WithdrawHistoryID)){
      if(!isNullOrEmpty(UserAccountID)){
   
          let RejectedDATEParsed= moment(RejectedDATE, "YYYY-MM-DD");
          let  isValidRejectedDATEParsed = RejectedDATEParsed.isValid();
          if(!isNullOrEmpty(RejectedDATE)&&isValidRejectedDATEParsed==true&&RejectedDATEParsed.year()>1959){
            if(!isNullOrEmpty(RejectedTIME)){
              WithdrawHistoryUpdateRejected(UserAccountID,WithdrawHistoryID,RejectedDATE,RejectedTIME,function(response){
                if(response!=undefined){
                  res.send(response);
                }else{
                  res.send({WithdrawHistoryUpdateRejectedFailed:true});
                }
              });
            }else{
              res.send({RejectedTIMEMissing:true});
            }
          }else{
            res.send({RejectedDATEMissing:true});
          }
      }else{
        res.send({UserAccountIDMissing:true});
      }
    }else{
      res.send({WithdrawHistoryIDMissing:true});
    }
  });
<<<<<<< HEAD
  app.get('/Api/v1/WithdrawHistory/Update/WithdrawHistoryID/:WithdrawHistoryID/UserAccountID/:UserAccountID/Amount/:Amount/BankNameUsed/:BankNameUsed/SecurityCodeUsed/:SecurityCodeUsed/Status/:Status/RequestedDATE/:RequestedDATE/ApprovedDATE/:ApprovedDATE/RejectedDATE/:RejectedDATE/ProcessingDATE/:ProcessingDATE/RequestedTIME/:RequestedTIME/ApprovedTIME/:ApprovedTIME/RejectedTIME/:RejectedTIME/ProcessingTIME/:ProcessingTIME', function (req, res) {

    let WithdrawHistoryID = req.params.WithdrawHistoryID;
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
                let RequestedDATEParsed= moment(RequestedDATE, "YYYY-MM-DD");
                let  isValidRequestedDATEParsed = RequestedDATEParsed.isValid();
              if(!isNullOrEmpty(RequestedDATE)&&isValidRequestedDATEParsed==true&&RequestedDATEParsed.year()>1959){
                  let ApprovedDATEParsed= moment(ApprovedDATE, "YYYY-MM-DD");
                  let  isValidApprovedDATEParsed = ApprovedDATEParsed.isValid();
                if(!isNullOrEmpty(ApprovedDATE)&&isValidApprovedDATEParsed==true&&ApprovedDATEParsed.year()>1959){
                    let RejectedDATEParsed=moment(RejectedDATE, "YYYY-MM-DD");
                    let isValidRejectedDATEParsed = RejectedDATEParsed.isValid();
                  if(!isNullOrEmpty(RejectedDATE)&&isValidRejectedDATEParsed==true&&RejectedDATEParsed.year()>1959){
                      let ProcessingDATEParsed= moment(ProcessingDATE, "YYYY-MM-DD");
                      let isValidProcessingDATEParsed = ProcessingDATEParsed.isValid();
                    if(!isNullOrEmpty(ProcessingDATE)&&isValidProcessingDATEParsed==true&&ProcessingDATEParsed.year()>1959){
                      if(!isNullOrEmpty(RequestedTIME)){
                        if( !isNullOrEmpty(ApprovedTIME)){
                          if( !isNullOrEmpty(RejectedTIME)){
                            if(!isNullOrEmpty(ProcessingTIME)){
                          
                              if(validator.isNumeric(Amount)){
                                if(Status=="Approved"||Status=="Processing"||Status=="Rejected"){
                                    let isUserAccountIDFound= false;
                                    async.series([UserAccountIDCheck],function(error,response){
                                      if(isUserAccountIDFound==true){
                                        WithdrawHistoryUpdate(WithdrawHistoryID,UserAccountID,
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
                                          ProcessingTIME,
                                          function(response){
                                          if(response!=undefined){
                                            res.send({Success:true});
                                          }else{
                                            res.send({WithdrawHistoryUpdateFailed:true});
                                          }
                                        });
                                          
                                      }else{
                                        res.send({UserAccountIDFound:false});
                                      }
                                    });
                                    function UserAccountIDCheck(callback){
                                      isUserAccountIDExist(UserAccountID,function(response){
                                        let obj = response;
                                        if(!isNullOrEmpty(obj)&&obj!=undefined&&obj[0].UserAccountID==UserAccountID){
                                          isUserAccountIDFound = true;
                                          callback(null,'1');
                                        }else{
                                          isUserAccountIDFound = false;
                                          callback(null,'1');
                                        }
                                      });
                                    }
                                }else{
                                  res.send({StatusInvalidValue:true});
                                }
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
                      res.send({ProcessingDATEInvalid:true});
                    }
                  }else{
                    res.send({RejectedDATEInvalid:true});
                  }
                }else{
                  res.send({ApprovedDATEInvalid:true});
                }
              }else{
                res.send({RequestedDATEInvalid:true});
              }
            }else{
              res.send({StatusMissing:true});
            }
          }else{
            res.send({SecurityCodeUsedMissing:true});
          }
        }else{
          res.send({BankNameUsedMissing:true});
        }
      }else{
        res.send({AmountMissing:true});
      }
    }else{
      res.send({UserAccountIDMissing:true});
    }
  });
=======
>>>>>>> c849d7201b15df32dc2ad31d609a84046ac63f0a
