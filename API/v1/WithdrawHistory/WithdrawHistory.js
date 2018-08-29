module.exports = function(app){
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
}


app.get('/Api/v1/WithdrawHistory/Clear', function (req, res){
  Models.WithdrawHistory.destroy({
    where: {},
    truncate: true
  })
  .then(Success => {
    res.send("Cleared");
  })
  .catch(err=>{
    res.send("Truncate "+err);
  });
});
app.get('/Api/v1/WithdrawHistory/Delete', function (req, res){
  Models.WithdrawHistory.sync({force:true}).then(function(result) {
    res.send("Deleted");
  }).catch(function(result) {//catching any then errors

    res.send("Error "+result);
  });
});

app.get('/Api/v1/WithdrawHistory/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let Offset =  req.query.Offset;
  let Limit =  req.query.Limit;
  let Sort =  req.query.Sort;
  Models.WithdrawHistory.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
  if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){
    Models.WithdrawHistory.sync();
    let result = Models.WithdrawHistory.findAll({ 
      where: {
        WithdrawHistoryID: {
          ne: null//not null
        }
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
  //res.send("WithdrawHistory "+Offset+" "+ Limit+" "+Sort);
});

app.get('/Api/v1/WithdrawHistory/Describe', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  Models.WithdrawHistory.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
  Models.WithdrawHistory.describe().then(result=>{
    res.send(beautify(result, null, 2, 100));
  });
});

app.get('/Api/v1/UserInfo/Clear', function (req, res){
  Models.UserInfo.destroy({
    where: {},
    truncate: true
  })
  .then(Success => {
    res.send("Cleared");
  })
  .catch(err=>{
    res.send("Truncate "+err);
  });
});
app.get('/Api/v1/UserInfo/Delete', function (req, res){
  Models.UserInfo.sync({force:true}).then(function(result) {
    res.send("Deleted");
  }).catch(function(result) {//catching any then errors

    res.send("Error "+result);
  });
});