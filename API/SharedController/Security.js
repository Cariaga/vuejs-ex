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
          console.log("Error Token A" );
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
      console.log("Error Token split");
      res.sendStatus(403);
    }
    // Next middleware
  } else {
    // Forbidden
    console.log("Error Token undefined");
    res.sendStatus(403);
  }
}


var failCallback = function (req, res, next, nextValidRequestDate) {
  console.log("DDOS Attempt Ip now Blocked");
  res.sendStatus(429); // brute force protection triggered, send them back to the login page
};
var ExpressBrute = require('express-brute'),
	RedisStore = require('express-brute-redis');
  var store = new RedisStore({
    host: process.env.REDIS_PORT_6379_TCP_ADDR||'localhost', port: process.env.REDIS_PORT_6379_TCP_PORT||6379,no_ready_check: true,auth_pass:'eastcoast'
  });

var handleStoreError = function (error) {
  log.error(error); // log this error so we can figure out what went wrong
  // cause node to exit, hopefully restarting the process fixes the problem
  throw {
      message: error.message,
      parent: error.parent
  };
}

module.exports.globalBruteforce = new ExpressBrute(store, {
  freeRetries: 1000,
  attachResetToRequest: false,
  refreshTimeoutOnRequest: false,
  minWait: 25*60*60*1000, // 1 day 1 hour (should never reach this wait time)
  maxWait: 25*60*60*1000, // 1 day 1 hour (should never reach this wait time)
  lifetime: 24*60*60, // 1 day (seconds not milliseconds)
  failCallback: failCallback,
  handleStoreError: handleStoreError
});

