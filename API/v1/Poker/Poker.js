let PokerModel = require("./PokerModel");
module.exports = function (app) {
    //https://janrueval.herokuapp.com/poker/"QC","4C","5S","7C","KH","2S","6C"
    app.get('/Api/v1/Poker/:Hand0?/:Hand1?/:Hand2?/:Hand3?/:Hand4?/:Hand5?/:Hand6?/:Hand7?/:Hand8?/:Hand9?', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        let PlayerHand = req.params.Hand;
        let PlayerHand = req.params.Hand;
        let PlayerHand = req.params.Hand;
        let PlayerHand = req.params.Hand;
        let PlayerHand = req.params.Hand;
        let PlayerHand = req.params.Hand;
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