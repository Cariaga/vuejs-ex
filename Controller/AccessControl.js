
//--Select Start
module.exports = function(app) {
    app.get('/selectTest', function(req, res) {
      console.log('got the get!');
      res.send("Worked Select");
    });
  };
  
//--Select End

//--Update Start
module.exports = function(app) {
    app.get('/', function(req, res) {
      console.log('got the update!');
      res.send("Worked Update");
    });
  };
//--Update End