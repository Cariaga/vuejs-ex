app.get('/Api/v1/Login/:UserName/:Password/', function (req, res) {
    res.send('Not Used use Query Version Instead');
    /*let UserName = req.params.UserName;
    let Password = req.params.Password;
  
    if(!isNullOrEmpty(UserName)&&
    !isNullOrEmpty(Password)){
      let isVerified;
      let result = Models.UserAccount.findAll({ 
        where: {
          UserName: {
            eq: UserName//not null
          },
          Password: {
            eq: Password//not null
          }
       }
      }).then(function(result) {
        let Data = result.map(function(item) {
            return item;
            
        });
        res.send(beautify(Data, null, 2, 100));
      }).catch(function(result) {//catching any then errors
        
        res.send("Error "+result);
  
      })
  
  /*
    }else{
      res.send('no params sent');
    }*/
  });