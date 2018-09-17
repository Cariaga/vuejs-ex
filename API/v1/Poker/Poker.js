let PokerModel = require("./PokerModel");
module.exports = function (app) {
    //https://janrueval.herokuapp.com/poker/"QC","4C","5S","7C","KH","2S","6C"
    app.get('/Api/v1/Poker/:Hand/', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        let PlayerHand = req.params.Hand;
        let TotalCards  = 5;
        let bestScore = PokerModel.PokerHandCompute(PlayerHand, TotalCards);
        res.send(bestScore);
      });
      

      app.get('/Api/v1/Omaha/:Hand/', (req, res) => {
        let PlayerHand = req.params.Hand;
        let TotalCards  = 7;
        let bestScore = PokerModel.PokerHandCompute(PlayerHand, TotalCards);
        res.send(bestScore);
      });
 }