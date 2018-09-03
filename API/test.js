
module.exports = function(app) {
    app.get('/pub', function(req, res) {
      console.log('got the get!');
      res.send("Externaltest");
    });
  };
  

 