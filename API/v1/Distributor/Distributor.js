module.exports = function(app){
  app.get('/Api/v1/Distributor/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let Offset =  req.query.Offset;
    let Limit =  req.query.Limit;
    let Sort =  req.query.Sort;
    Models.Distributor.sync();//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){
      let result = Models.Distributor.findAll({ 
        where: {
          DistributorID: {
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
    //res.send("Distributor "+Offset+" "+ Limit+" "+Sort);
  });
}

module.exports = function(app) {
  app.get('/Api/v1/Distributor/Update/DistributorID/:DistributorID/UserAccountID/:UserAccountID/HeadOfficeID/:HeadOfficeID/Name/:Name/', function (req, res) {
    let DistributorID = req.params.DistributorID;
    let UserAccountID = req.params.UserAccountID;
    let HeadOfficeID = req.params.HeadOfficeID;
    let Name = req.params.Name;
    if(!isNullOrEmpty(DistributorID)){
      if(!isNullOrEmpty(UserAccountID)){
        if(!isNullOrEmpty(HeadOfficeID)){
          if(!isNullOrEmpty(Name)){
            DistributorUpdate(UserAccountID,HeadOfficeID,Name,function(response){
              if(response!=undefined){
                res.send(response);
              }else{
                res.send({DistributorUpdateFailed:true});
              }
            });
          }else{
            res.send({NameFailed:true});
          }
        }else{
          res.send({HeadOfficeIDFailed:true});
        }
      }else{
        res.send({UserAccountIDFailed:true});
      }
    }else{
      res.send({DistributorIDFailed:true});
    }
  });
}
module.exports = function(app) {
  app.get('/Api/v1/Distributor/Add/:UserAccountID/:HeadOfficeID/:Name/', function (req, res) {
    //Usage /Api/v1/Distributor/Add/UserAccountID/HeadOfficeID/Name/
    let UserAccountID = req.params.UserAccountID;
    let HeadOfficeID = req.params.HeadOfficeID;
    let Name = req.params.Name;
  
    if(!isNullOrEmpty(UserAccountID)){
      if(!isNullOrEmpty(HeadOfficeID)){
        if(!isNullOrEmpty(Name)){
          AddDistributor(UserAccountID,HeadOfficeID,Name,function(response){
            if(response!=undefined){
              res.send(response);
            }else{
              res.send({AddDistributorFailed:true});
            }
          });
        }else{
          res.send({NameMissing:true});
        }
      }else{
        res.send({HeadOfficeIDMissing:true});
      }
    }else{
      res.send({UserAccountIDMissing:true});
    }
  });
}
module.exports = function(app){
  app.get('/Api/v1/Shop/DistributorID/:DistributorID/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let DistributorID = req.params.DistributorID;
    if(!isNullOrEmpty(DistributorID)){
      ChildShopsFromDistributorID(DistributorID,function(response){
        if(response!=undefined){
          res.send(beautify(response, null, 2, 100));
        }else{
          res.send([]);
        }
      });
    }else{
      res.send({DistributorIDMissing:true});
    }
  });
}

