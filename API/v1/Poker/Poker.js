const Combinatorics = require('js-combinatorics');
const PokerHand = require('poker-hand-evaluator');
const sortBy = require('sort-array');
module.exports = function (app) {
    //https://janrueval.herokuapp.com/poker/"QC","4C","5S","7C","KH","2S","6C"
    app.get('/Api/v1/Poker/:Hand/', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        let PlayerHand = req.params.Hand;
        let ArrayHand = JSON.parse("[" + PlayerHand + "]"); // to array
        let cmb = Combinatorics.combination(ArrayHand, 5); //5 for holdem 7 for omha
        let AllCombinations = [];
        let a;
        while (a = cmb.next()) {
          AllCombinations.push(a);
        }
        let EvaluatedHand = [];
        let length =AllCombinations.length;
        for (let i = 0; i < length; ++i) {
          EvaluatedHand.push(new PokerHand(AllCombinations[i].join().replace(/\,/ig, " "))); //join = tostring() // replacing "," to " " and i = ignore case sensitive, g = global
        }
        let bestScore = sortBy(EvaluatedHand, 'score');
        res.send(bestScore);
      });

      app.get('/Api/v1/Omaha/:Hand/', (req, res) => {
        let PlayerHand = req.params.Hand;
        let ArrayHand = JSON.parse("[" + PlayerHand + "]"); // to array
      
        let cmb = Combinatorics.combination(ArrayHand, 7); //5 for holdem 7 for omha
        let AllCombinations = [];
        let a;
        while (a = cmb.next()) {
          AllCombinations.push(a);
        }
        let EvaluatedHand = [];
        let length =AllCombinations.length;
        for (let i = 0; i <length; ++i) {
          EvaluatedHand.push(new PokerHand(AllCombinations[i].join().replace(/\,/ig, " "))); //join = tostring() // replacing "," to " " and i = ignore case sensitive, g = global
        }
        let bestScore = sortBy(EvaluatedHand, 'score');
        res.send(bestScore);
      });
 }

