var jwt = require('jsonwebtoken');
// FORMAT OF TOKEN
// Authorization: Bearer <access_token>
// Verify Token
module.exports.verifyToken = function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');

    if (bearer != null && bearer != undefined && bearer[0] != undefined) {
      // Get token from array


      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
     

      jwt.verify(bearerToken, 'secretkey', function (err, decoded) {
        if (err) {
          console.log("Error Token");
          res.sendStatus(403);
        } else {
          let resultDecoded = jwt.decode(bearerToken, {
            complete: true
          });
         // console.log(resultDecoded.header);
         // console.log(resultDecoded.payload);
          var dateNow = new Date();
          
          if(resultDecoded.expiresIn < dateNow.getTime())// token expired
          {
            console.log("Expired");
            res.sendStatus(401);
          }else{
            next();
          }
        }
      });
    }else{
      console.log("Error Token Null");
      res.sendStatus(403);
    }
    // Next middleware
  } else {
    // Forbidden
    console.log("Error Token Null");
    res.sendStatus(403);
  }
}

