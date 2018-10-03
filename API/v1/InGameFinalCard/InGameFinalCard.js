let http = require('http');
let InGameFinalCardModel = require('./InGameFinalCardModel');
module.exports = function (app) { 
    app.get('/Api/v1/PlayerFinalCard/Json/:Json/', function (req, res) {
        let Json = req.params.Json;
        let JsonRow =  JSON.parse(Json);
        let length = JsonRow.length;
        function Q1() {
            for(let i =0;i<length;++i){
                if(JsonRow[i].UserAccountID!=undefined){//if it dosn't have a user accountID it gets skipped which is fine because those are not players but generated data by the api
                    let Hand = JsonRow[i].hand;
                    let Score = JsonRow[i].score;
                    let Rank = JsonRow[i].rank;
                    let UserAccountID =   JsonRow[i].UserAccountID;
                    let SeasonID =   JsonRow[i].SeasonID;
                    InGameFinalCardModel.AddPlayerFinalCard(UserAccountID,SeasonID,Rank,Score,Hand,function(response){
                        if(response==undefined){
                            console.log("UserAccount or SeasonID dosn't Exist");
                            
                        }
                    });
                }
            }
        }
        async function RunAsync() {
            let result = await Q1();
            let status = 200;
            res.status(status).end(http.STATUS_CODES[status]);
            console.log('Done');
            callback('done');
          }
          RunAsync();
    });
}