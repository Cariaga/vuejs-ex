
//--Select Start
app.get('/Api/v1/Player/ShopID/:ShopID/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let ShopID = req.params.ShopID;
    if(!isNullOrEmpty(ShopID)){
      ChildPlayersFromShopID(ShopID,function(response){
        if(response!=undefined){
          res.send(beautify(response, null, 2, 100));
        }else{
          res.send([]);
        }
      });
    }else{
      res.send({ShopIDMissing:true});
    }
  });
//--Select End

//--Update Start
//--Update End