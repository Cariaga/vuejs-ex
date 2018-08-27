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