module.exports = function(app){
  app.get('/Api/v1/Shop/Update/:ShopID/:UserAccountID/:DistributorID/:Description/', function (req, res) {
    let ShopID = req.params.ShopID;
    let UserAccountID = req.params.UserAccountID;
    let DistributorID = req.params.DistributorID;
    let Description = req.params.Description;
    if(!isNullOrEmpty(ShopID)&&
    !isNullOrEmpty(UserAccountID)&&
    !isNullOrEmpty(DistributorID)&&
    !isNullOrEmpty(Description)){
      Models.Shop.update({
        UserAccountID: UserAccountID,
        DistributorID: DistributorID,
        Description: Description
      },{
        where: {ShopID: ShopID }
      })
      .then(Success => {
        res.send("Updated");
      })
      
      .catch(error => {
        // mhhh, wth!
        console.log("Error Updating");
        res.send("Error Updating " +error);
      });
    }
  });
}
module.exports = function(app){
  app.get('/Api/v1/Shop/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let Offset =  req.query.Offset;
    let Limit =  req.query.Limit;
    let Sort =  req.query.Sort;
    Models.Shop.sync();//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){
      let result = Models.Shop.findAll({ 
        where: {
          ShopID: {
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
  //  res.send("Shop "+Offset+" "+ Limit+" "+Sort);
  });
}
module.exports = function(app){
  app.get('/Api/v1/Shop/Add/:UserAccountID/:DistributorID/:Description/', function (req, res) {
    //Api/v1/Shop/Add/528861d4-3e49-4223-9b1a-913d72112112/1/Description/
    let UserAccountID = req.params.UserAccountID;
    let DistributorID = req.params.DistributorID;
    let Description = req.params.Description;
    if(!isNullOrEmpty(UserAccountID)){
      if(!isNullOrEmpty(DistributorID)){
        if(!isNullOrEmpty(Description)){
          AddShop(UserAccountID,DistributorID,Description,function(response) {
            if(response!=undefined){
              res.send(response);
            }else{
              res.send({AddShopFailed:true});
            }
          });
        }else{
          res.send({DescriptionMissing:true});
        }
      }else{
        res.send({DistributorIDMissing:true});
      }
    }else{
      res.send({UserAccountIDMissing:true});
    }
  });
}
//--Select Start



  

//--Select End

//--Update Start
//--Update End