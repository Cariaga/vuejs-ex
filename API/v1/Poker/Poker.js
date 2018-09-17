var Combinatorics = require('js-combinatorics');
const PokerHand = require('poker-hand-evaluator');
const sortBy = require('sort-array');
module.exports = function (app) {
    app.get('/Api/v1/Poker/:Hand/', (req, res) => {
        let PlayerHand = req.params.Hand;
        let ArrayHand = JSON.parse("[" + PlayerHand + "]"); // to array
        let cmb = Combinatorics.combination(ArrayHand, 7); //5 for holdem 7 for omha
        let AllCombinations = [];
        let a;
        while (a = cmb.next()) {
          AllCombinations.push(a);
        }
        let EvaluatedHand = [];
        for (let i = 0; i < AllCombinations.length; ++i) {
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
        for (let i = 0; i < AllCombinations.length; ++i) {
          EvaluatedHand.push(new PokerHand(AllCombinations[i].join().replace(/\,/ig, " "))); //join = tostring() // replacing "," to " " and i = ignore case sensitive, g = global
        }
        let bestScore = sortBy(EvaluatedHand, 'score');
        res.send(bestScore);
      });
 }

