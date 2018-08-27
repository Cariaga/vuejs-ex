
//--Select Start
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
//--Select End

//--Update Start
//--Update End