let GlobalFunctions = require("../../SharedController/GlobalFunctions");
module.exports = function (app) {//MODIFY

    var auth = function (req, res, next) {
        if (req.session && req.session.UserName === "amy")
          return next();
        else
          return res.sendStatus(401);
      };
      // Get content endpoint
        app.get('/content', auth, function (req, res) {
            res.send("You can only see this after you've logged in.");
        });
      //--testing for authetication API key START
      app.post('/Api/v1/Content', verifyToken, (req, res) => {
        jwt.verify(req.token, 'secretkey', (err, authData) => {
          if (err) {
            res.sendStatus(403);
          } else {
            res.json({
              message: 'Post created...',
              authData
            });
          }
        });
      });
      app.post('/Api/v1/authenticate', (req, res) => {
        // Mock user
        const user = {
          id: 1,
          username: 'brad',
          email: 'brad@gmail.com'
        }
      
        jwt.sign({
          user
        }, 'secretkey', {
          expiresIn: '2d'
        }, (err, token) => {
          res.json({
            token
          });
        });
      });
      // FORMAT OF TOKEN
      // Authorization: Bearer <access_token>
      // Verify Token
      function verifyToken(req, res, next) {
        // Get auth header value
        const bearerHeader = req.headers['authorization'];
        // Check if bearer is undefined
        if (typeof bearerHeader !== 'undefined') {
          // Split at the space
          const bearer = bearerHeader.split(' ');
          // Get token from array
          const bearerToken = bearer[1];
          // Set the token
          req.token = bearerToken;
          // Next middleware
          next();
        } else {
          // Forbidden
          res.sendStatus(403);
        }
      
      }
      
      //--testing for authetication API key END
      //--testing for season based authentication START
      // Login endpoint
      app.post('/authenticate', function (req, res) {
        if (!req.body.UserName) {
          res.send('login failed');
        } else if (req.body.UserName === "amy") {
          req.session.UserName = "amy";
          res.send("login success!");
        }
      });
      // Logout endpoint
      app.get('/logout', function (req, res) {
        req.session.destroy();
        res.send("logout success!");
      });
}
