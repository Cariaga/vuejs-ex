const Combinatorics = require('js-combinatorics');
const PokerHand = require('poker-hand-evaluator');
const sortBy = require('sort-array');
module.exports.PokerHandCompute = function PokerHandCompute(PlayerHand, TotalCards) {
        let ArrayHand = JSON.parse("[" + PlayerHand + "]"); // to array
        let cmb = Combinatorics.combination(ArrayHand, TotalCards); //5 for holdem 7 for omha
        let AllCombinations = [];
        let a;
        while (a = cmb.next()) {
            AllCombinations.push(a);
        }
        let EvaluatedHand = [];
        let length = AllCombinations.length;
        for (let i = 0; i < length; ++i) {
            EvaluatedHand.push(new PokerHand(AllCombinations[i].join().replace(/\,/ig, " "))); //join = tostring() // replacing "," to " " and i = ignore case sensitive, g = global
        }
        let scores = sortBy(EvaluatedHand, 'score');
        console.log("----------------");
        for(let i =0;i< scores.length;++i){
            console.log(scores[0]);
        }
        console.log("----------------");
        let bestScore = scores[0];//[0] will return the best score
        return bestScore;
}
