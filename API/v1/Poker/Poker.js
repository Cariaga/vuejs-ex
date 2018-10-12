let PokerModel = require("./PokerModel");
let DBCheck = require("../../SharedController/DBCheck");
let Security = require("../../SharedController/Security")
module.exports = function (app) {
    //https://janrueval.herokuapp.com/poker/"QC","4C","5S","7C","KH","2S","6C"
    app.get('/Api/v1/Poker/:Hand0?/:Hand1?/:Hand2?/:Hand3?/:Hand4?/:Hand5?/:Hand6?/:Hand7?/:Hand8?/:Hand9?',Security.verifyToken, (req, res) => {
        //res.setHeader('Content-Type', 'application/json');
        let BestPlayerScores=[];
        let TotalCards  = 5;
        for (var propName in req.params) {
          if (req.params.hasOwnProperty(propName)&&req.params[propName]!=undefined) {
             // console.log(propName, req.params[propName]);
                let bestScore = PokerModel.PokerHandCompute(req.params[propName], TotalCards);
                BestPlayerScores.push(bestScore);
          }
        }
        res.send(BestPlayerScores);
      });
      

      app.get('/Api/v1/Omaha/:Hand/',Security.verifyToken, (req, res) => {
        let BestPlayerScores=[];
        let TotalCards  = 7;
        for (var propName in req.params) {
          if (req.params.hasOwnProperty(propName)&&req.params[propName]!=undefined) {
             // console.log(propName, req.params[propName]);
                let bestScore = PokerModel.PokerHandCompute(req.params[propName], TotalCards);
                BestPlayerScores.push(bestScore);
          }
        }
        res.send(BestPlayerScores);
      });
 }