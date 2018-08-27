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