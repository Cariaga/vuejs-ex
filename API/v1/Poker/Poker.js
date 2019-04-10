let PokerModel = require("./PokerModel");
let DBCheck = require("../../SharedController/DBCheck");
let Security = require("../../SharedController/Security");
var beautify = require("json-beautify");
var fuzzyEqual = require('fuzzy-equal');
const Combinatorics = require('js-combinatorics');
var Management = require('../../SharedController/Management');
module.exports = function (app) {
    //https://janrueval.herokuapp.com/poker/"QC","4C","5S","7C","KH","2S","6C"
    app.get('/Api/v1/Poker/:Hand0?/:Hand1?/:Hand2?/:Hand3?/:Hand4?/:Hand5?/:Hand6?/:Hand7?/:Hand8?/:Hand9?', Management.RouteCalled,Security.rateLimiterMiddleware,Security.verifyToken, (req, res) => {
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
    
    app.get('/Api/v1/PokerBalancer/:Hand0?/:Hand1?/:Hand2?/:Hand3?/:Hand4?/:Hand5?/:Hand6?/:Hand7?/:Hand8?/:Hand9?'/*, Management.RouteCalled,Security.rateLimiterMiddleware,Security.verifyToken,*/ ,(req, res) => {

        res.setHeader('Content-Type', 'application/json');
        let BestPlayerScores=[];
        let TotalCards  = 5;
        for (var propName in req.params) {
          if (req.params.hasOwnProperty(propName)&&req.params[propName]!=undefined) {
             // console.log(propName, req.params[propName]);
                let bestScore = PokerModel.PokerHandCompute2(req.params[propName], TotalCards);
                BestPlayerScores.push(bestScore);
          }
        }
        let BestPreFlopByPlayer=[];
        let BestIndex=0;
        for (var propName in req.params) {//main loop
          if (req.params.hasOwnProperty(propName)&&req.params[propName]!=undefined) {
             // console.log(propName, req.params[propName]);
             BestIndex++;
            // if(BestIndex==1){
                let bestScore = PokerModel.PokerHandCompute2(req.params[propName], TotalCards);
                //--do recommend on current selected player if we want it to win
                //console.log(req.params[propName] +" : "+JSON.stringify(bestScore));
                let PlayerToMakeWin = InTableCard(req.params[propName], bestScore);//what ever we select in the main loop is the selected best player we want to increase chance on pre flop
                  //--do recommend on current selected player if we want it to win
                  console.log("Player to make win");
                // console.log(PlayerToMakeWin);
                //---do recommend on other players
                PlayerToMakeWin.BestPlayer=true;
                
                PlayerToMakeWin.BestIndex =BestIndex;
                BestPreFlopByPlayer.push(PlayerToMakeWin);
          
                for (var propName2 in req.params) {//main loop
                if (req.params.hasOwnProperty(propName2)&&req.params[propName2]!=undefined) 
                  {
                    console.log("Se "+req.params[propName2]);
                    let bestScore2 = PokerModel.PokerHandCompute2(req.params[propName2], TotalCards);
                
                    
                    if(bestScore.BestScore.score!=bestScore2.BestScore.score){//exclude self to make lose because we don't want to loop over the same player from to make win
                    console.log("Conted");
                                        //This is the suggested cards for non winners to make sure the selected wins if not atleast bet on preflop 
                    let SuggestedForNonWinningPlayers = {};
                    SuggestedForNonWinningPlayers.A = PlayerToMakeWin.PreFlopCardRecommended[0];
                    SuggestedForNonWinningPlayers.B = PlayerToMakeWin.PreFlopCardRecommended[1];
                    SuggestedForNonWinningPlayers.C = PlayerToMakeWin.PreFlopCardRecommended[2];
                    SuggestedForNonWinningPlayers.D = PlayerToMakeWin.TurnCardRecommended;
                    SuggestedForNonWinningPlayers.E = PlayerToMakeWin.RiverRecommended;
                  // console.log("Player to make lose from ");
                    console.log("parm "+req.params[propName2]);
                    SuggestForNonWinners(req.params[propName2], bestScore2,SuggestedForNonWinningPlayers,function(response){
                      if(response!=undefined){
                        BestPreFlopByPlayer.push(response);
                      }
                    });

                  // console.log();
                    }else{
                    // console.log("Self")
                    }
                  }
               // }
                //--do recommend on other players
            }
          }
        }
        res.send(BestPreFlopByPlayer);


      //  let FirstCards =req.params.Hand0;
      //  let FirstCards01 =req.params.Hand1;

     //   console.log(InTableCard(FirstCards, BestPlayerScores));
      //  console.log(InTableCard(FirstCards01, BestPlayerScores));

       // res.send(beautify(BestPlayerScores, null, 2, 100)); // deprecated
      });
    



      app.get('/Api/v1/Omaha/:Hand/',Security.verifyToken, (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        let BestPlayerScores=[];
        let TotalCards  = 7;
        for (var propName in req.params) {
          if (req.params.hasOwnProperty(propName)&&req.params[propName]!=undefined) {
             // console.log(propName, req.params[propName]);
                let bestScore = PokerModel.PokerHandCompute(req.params[propName], TotalCards);
                BestPlayerScores.push(bestScore);
          }
        }
    
        res.send(beautify(BestPlayerScores, null, 2, 100));
      });
 }


function SuggestForNonWinners(PlayerCard, BestPlayerScores,SuggestedForNonWinningPlayers,callback) {//Recomend a preflop for player with the highest chance on a card
  let ObjectFirstCards = PlayerCard.replace(/['"]+/g, '').split(",").slice(0, 5); //In Table Card
  let PlayerCardAtHand = PlayerCard.replace(/['"]+/g, '').split(",").slice(5, 7);

  let FlopChances = [];

 
   // for (let i = 0; i < BestPlayerScores.length; ++i) {


      let ToCompare = {
        A: BestPlayerScores.BestScore.toString().split(" ")[0],
        B: BestPlayerScores.BestScore.toString().split(" ")[1],
        C: BestPlayerScores.BestScore.toString().split(" ")[2],
        D: BestPlayerScores.BestScore.toString().split(" ")[3],
        E: BestPlayerScores.BestScore.toString().split(" ")[4]
      };
      let Reality = {
        A: SuggestedForNonWinningPlayers.A,
        B: SuggestedForNonWinningPlayers.B,
        C: SuggestedForNonWinningPlayers.C,
        D: SuggestedForNonWinningPlayers.D,
        E: SuggestedForNonWinningPlayers.E
      };
      let PreFlop = Reality.A + "," + Reality.B + "," + Reality.C;
      let TurnCard = Reality.D;
      let River = Reality.E;
      var comparison = fuzzyEqual(ToCompare, Reality); // first value what we compare second value what we want to be included
      //the higher the similarity the more likly its safe to bet
      FlopChances.push({
        BestCard: BestPlayerScores.BestScore.toString().split(" "),
        score: BestPlayerScores.BestScore.score,
        rank: BestPlayerScores.BestScore.rank,
        PlayerCardAtHand: PlayerCardAtHand,
        PreFlopCardRecommended: PreFlop.split(','),
        TurnCardRecommended: TurnCard,
        RiverRecommended: River,
        PreFlopChance: comparison.similarity, //the higher the similarity the more likly its safe to bet
        BestPlayer:false
      });
      /* console.log(
                 "Best Card : "+BestPlayerScores[i].BestScore.toString().split(" ")+
                 " Player Card At Hand: "+PlayerCardAtHand+
                 " PreFlop Card : "+PreFlop+
                 " TurnCard Card : "+TurnCard+
                 " River Card : "+River+
                 " Similarity : "+comparison.similarity
       );*/

  
  let FlopChanceSorted = FlopChances.sort((obj1, obj2) => obj1.PreFlopChance - obj2.PreFlopChance).reverse();
  // let HighestChanceOnPreFlop = FlopChanceSorted[0];
  callback(FlopChanceSorted[0]);
  /*for (let k = 0; k < FlopChanceSorted.length; ++k) {
    console.log(FlopChanceSorted[k].PlayerCardAtHand + " " + FlopChanceSorted[k].PreFlopChance);
  }*/
}


function InTableCard(PlayerCard, BestPlayerScores) {//Recomend a preflop for player with the highest chance on a card

  let ObjectFirstCards = PlayerCard.replace(/['"]+/g, '').split(",").slice(0, 5); //In Table Card
  console.log(ObjectFirstCards);
  
  let PlayerCardAtHand = PlayerCard.replace(/['"]+/g, '').split(",").slice(5, 7);
  console.log(PlayerCardAtHand);

  let cmb = Combinatorics.permutation(ObjectFirstCards, 5);
  let FlopChances = [];
  while (a = cmb.next()) {

   // for (let i = 0; i < BestPlayerScores.length; ++i) {


      let ToCompare = {
        A: BestPlayerScores.BestScore.toString().split(" ")[0],
        B: BestPlayerScores.BestScore.toString().split(" ")[1],
        C: BestPlayerScores.BestScore.toString().split(" ")[2],
        D: BestPlayerScores.BestScore.toString().split(" ")[3],
        E: BestPlayerScores.BestScore.toString().split(" ")[4]
      };
      let Reality = {
        A: a[0],
        B: a[1],
        C: a[2],
        D: a[3],
        E: a[4]
      };
      let PreFlop = Reality.A + "," + Reality.B + "," + Reality.C;
      let TurnCard = Reality.D;
      let River = Reality.E;
      var comparison = fuzzyEqual(ToCompare, Reality); // first value what we compare second value what we want to be included
      //the higher the similarity the more likly its safe to bet
      FlopChances.push({
        BestCard: BestPlayerScores.BestScore.toString().split(" "),
        score: BestPlayerScores.BestScore.score,
        rank: BestPlayerScores.BestScore.rank,
        PlayerCardAtHand: PlayerCardAtHand,
        PreFlopCardRecommended: PreFlop.split(','),
        TurnCardRecommended: TurnCard,
        RiverRecommended: River,
        PreFlopChance: comparison.similarity //the higher the similarity the more likly its safe to bet
      });


      /* console.log(
                 "Best Card : "+BestPlayerScores[i].BestScore.toString().split(" ")+
                 " Player Card At Hand: "+PlayerCardAtHand+
                 " PreFlop Card : "+PreFlop+
                 " TurnCard Card : "+TurnCard+
                 " River Card : "+River+
                 " Similarity : "+comparison.similarity
       );*/
   // }
  }
  let FlopChanceSorted = FlopChances.sort((obj1, obj2) => obj1.PreFlopChance - obj2.PreFlopChance).reverse();
  // let HighestChanceOnPreFlop = FlopChanceSorted[0];
  return FlopChanceSorted[0];
  /*for (let k = 0; k < FlopChanceSorted.length; ++k) {
    console.log(FlopChanceSorted[k].PlayerCardAtHand + " " + FlopChanceSorted[k].PreFlopChance);
  }*/
}
