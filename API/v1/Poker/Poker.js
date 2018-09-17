let PokerModel = require("./PokerModel");
module.exports = function (app) {
    //https://janrueval.herokuapp.com/poker/"QC","4C","5S","7C","KH","2S","6C"
    app.get('/Api/v1/Poker/:Hand0?/:Hand1?/:Hand2?/:Hand3?/:Hand4?/:Hand5?/:Hand6?/:Hand7?/:Hand8?/:Hand9?', (req, res) => {
        //res.setHeader('Content-Type', 'application/json');
        let PlayerHand0 = req.params.Hand0;
        let PlayerHand1 = req.params.Hand1;
        let PlayerHand2 = req.params.Hand2;
        let PlayerHand3 = req.params.Hand3;
        let PlayerHand4 = req.params.Hand4;
        let PlayerHand5 = req.params.Hand5;
        let PlayerHand6 = req.params.Hand6;
        let PlayerHand7 = req.params.Hand7;
        let PlayerHand8 = req.params.Hand8;
        let PlayerHand9 = req.params.Hand8;
      //  let TotalCards  = 5;
      //  let bestScore = PokerModel.PokerHandCompute(PlayerHand, TotalCards);
      
        res.send({PlayerHand0,PlayerHand1,PlayerHand2,PlayerHand3,PlayerHand4,PlayerHand5,PlayerHand6,PlayerHand7,PlayerHand8,PlayerHand9});
      });
      

      app.get('/Api/v1/Omaha/:Hand/', (req, res) => {
        let PlayerHand = req.params.Hand;
        let TotalCards  = 7;
        let bestScore = PokerModel.PokerHandCompute(PlayerHand, TotalCards);
        res.send(bestScore);
      });
 }