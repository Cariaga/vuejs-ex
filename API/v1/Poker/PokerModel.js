const Combinatorics = require('js-combinatorics');
const PokerHand = require('poker-hand-evaluator');
const sortBy = require('sort-array');
//localhost:3000/Api/v1/Poker/"KD","KC","AS","AH","TD","2H","3H"
 function PokerHandCompute(PlayerHand, TotalCards) {
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
   /* console.log("----------------");
    for(let i =0;i<scores.length;++i){
        console.log(scores[i]);
    }
    console.log("----------------");*/
    let bestScore = scores[0];//[0] will return the best score
    return bestScore;
}

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/Api/v1/Poker/:Hand0?/:Hand1?/:Hand2?/:Hand3?/:Hand4?/:Hand5?/:Hand6?/:Hand7?/:Hand8?/:Hand9?', (req, res) => {
    //res.setHeader('Content-Type', 'application/json');
    let BestPlayerScores=[];
    let TotalCards  = 5;
    for (var propName in req.params) {
      if (req.params.hasOwnProperty(propName)&&req.params[propName]!=undefined) {
         // console.log(propName, req.params[propName]);
            let bestScore = PokerHandCompute(req.params[propName], TotalCards);
            BestPlayerScores.push(bestScore);
      }
    }
    res.send(BestPlayerScores);
  });

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
