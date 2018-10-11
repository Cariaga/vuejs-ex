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
      var decoded = jwt.decode(bearerToken, {
        complete: true
      });

      jwt.verify(bearerToken, 'secretkey', function (err, decoded) {
        if (err) {
          console.log("Error Token");
          res.sendStatus(403);
        } else {
          console.log(decoded.header);
          console.log(decoded.payload);
          next();
        }
      });
    }else{
      res.sendStatus(403);
    }
    // Next middleware
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}