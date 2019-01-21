let http = require('http');
let InGameFinalCardModel = require('../InGameFinalCard/InGameFinalCardModel');
let DbCheck = require("../../SharedController/DBCheck");
var Security = require('../../SharedController/Security');
module.exports = function (app) {
    app.get('/Api/v1/PlayerFinalCard2/', function (req, res) {
        
        res.send("OK test");
    });

    app.get('/Api/v1/PlayerFinalCard2/Json/:Json/',/* Security.rateLimiterMiddleware,*/Security.verifyToken, function (req, res) {
        let Json = req.params.Json;
        
        if(Json!=undefined){
            console.log("---------");
            console.log(Json);
            let JsonRow = JSON.parse(Json);
          

            let length = JsonRow.length;
                   /*for loop promise based */
        for (let i = 0, p = Promise.resolve(); i <= length; i++) {
            if (i == length) {
                p = p.then(_ => new Promise(resolve => {
                    console.log("OK Done");
                    let status = 200;
                    res.status(status).end(http.STATUS_CODES[status]);
                    resolve();

                })).catch(function (error) {
                    let status = 500;
                    res.status(status).end(http.STATUS_CODES[status]);
                    console.log("Error Occured " + error);
                });
            } else {
                console.log("Somthing new ");
                p = p.then(_ => new Promise((resolve, reject) => {
                    let Hand = JsonRow[i].hand;
                    let Score = JsonRow[i].score;
                    let Rank = JsonRow[i].rank;
                    let UserAccountID = JsonRow[i].UserAccountID;//make sure the correct UserAccountID is recived by the route before checking query is wrong
                    let SeasonID = JsonRow[i].SeasonID;
                    let CardsAtHand = JsonRow[i].CardsAtHand;
                   

                    if (SeasonID != undefined && UserAccountID != undefined) { //if it dosn't have a user accountID it gets skipped which is fine because those are not players but generated data by the api
                    
                    console.log("Season of FinalCard: "+SeasonID +" Player:"+UserAccountID);

                        DbCheck.isUserAccountIDExist(UserAccountID, function (response) {
                            if (response == true) {
                                        InGameFinalCardModel.AddPlayerFinalCard(UserAccountID, SeasonID, Rank, Score, Hand,CardsAtHand, function (response) {
                                            if (response == undefined) {
                                                console.log("UserAccount or SeasonID dosn't Exist");
                                            } else {
                                                resolve();
                                                console.log("Resolved Final Card");
                                            }
                                        })

                            } else {
                                console.log("UserAccount dosn't Exist Set" + UserAccountID);
                                reject("UserAccount dosn't Exist Set" + UserAccountID);
                            }
                        });


                    } else {
                        //we resolve any way if it dosen't have a user accout or season id but we don't process it
                        resolve();
                    }
                })).catch(function (error) {
                    let status = 500;
                    res.status(status).end(http.STATUS_CODES[status]);
                    console.log("Error Occured " + error);
                });
            }
        }
        }else{
            let status = 500;
            res.status(status).end(http.STATUS_CODES[status]);
            console.log("Error Occured Empty Json Data" + error);
        }
 
    });
 
    /*
http://192.168.254.104:8080/Api/v1/PlayerFinalCard/Update/Json/[ {"UserAccountID":"Account8", "SeasonID":"1820b111-dc1d-4f78-b243-d298ca04c81a", "CurrentPoints":0, "WinPoints":0, "AfterPoints":0, "BeforePoints":0}, {"UserAccountID":"Account8", "SeasonID":"1820b111-dc1d-4f78-b243-d298ca04c81a", "CurrentPoints":0, "WinPoints":0, "AfterPoints":0, "BeforePoints":0}, {"UserAccountID":"Account8", "SeasonID":"1820b111-dc1d-4f78-b243-d298ca04c81a", "CurrentPoints":0, "WinPoints":0, "AfterPoints":0, "BeforePoints":0}, {"UserAccountID":"Account8", "SeasonID":"1820b111-dc1d-4f78-b243-d298ca04c81a", "CurrentPoints":0, "WinPoints":0, "AfterPoints":0, "BeforePoints":0}, {"UserAccountID":"Account8", "SeasonID":"1820b111-dc1d-4f78-b243-d298ca04c81a", "CurrentPoints":0, "WinPoints":0, "AfterPoints":0, "BeforePoints":0}, {"UserAccountID":"Account8", "SeasonID":"1820b111-dc1d-4f78-b243-d298ca04c81a", "CurrentPoints":0, "WinPoints":0, "AfterPoints":0, "BeforePoints":0}, {"UserAccountID":"Account8", "SeasonID":"1820b111-dc1d-4f78-b243-d298ca04c81a", "CurrentPoints":0, "WinPoints":0, "AfterPoints":0, "BeforePoints":0}, {"UserAccountID":"Account8", "SeasonID":"1820b111-dc1d-4f78-b243-d298ca04c81a", "CurrentPoints":0, "WinPoints":0, "AfterPoints":0, "BeforePoints":0}, {"UserAccountID":"Account8", "SeasonID":"1820b111-dc1d-4f78-b243-d298ca04c81a", "CurrentPoints":0, "WinPoints":0, "AfterPoints":0, "BeforePoints":0} ]


test another
http://192.168.254.101:8080/Api/v1/PlayerFinalCard/Update/Json/[ {"UserAccountID":"Account6", "SeasonID":"362d2fda-5ffd-4d9e-a904-9e1abf77f0f0", "CurrentPoints":0, "WinPoints":-10000, "AfterPoints":0, "BeforePoints":10000}, {"UserAccountID":"Account6", "SeasonID":"362d2fda-5ffd-4d9e-a904-9e1abf77f0f0", "CurrentPoints":0, "WinPoints":100000, "AfterPoints":20000, "BeforePoints":10000} ]
    */
    app.get('/Api/v1/PlayerFinalCard/Update/Json/:Json/',/* Security.rateLimiterMiddleware,*/ Security.verifyToken, function (req, res) {
        let Json = req.params.Json;
        let JsonRow = JSON.parse(Json);
        let length = JsonRow.length;
        

        /*for loop promise based */
        for (let i = 0, p = Promise.resolve(); i <= length; i++) {
            if (i == length) {
                p = p.then(_ => new Promise(resolve => {
                    var finalseason  = JsonRow[0].SeasonID;
                    InGameFinalCardModel.SeasonEnd(finalseason,function(response){

                        if(response!=undefined){
                            console.log("OK Done");
                            let status = 200;
                            res.status(status).end(http.STATUS_CODES[status]);
                            resolve();
                        }else{
                            console.log("OK Done");
                            let status = 200;
                            res.status(status).end(http.STATUS_CODES[status]);
                            resolve();
                        }
                    });
                })).catch(function (error) {
                    let status = 500;
                    res.status(status).end(http.STATUS_CODES[status]);
                    console.log("Error Occured " + error);
                });
            } else {
                p = p.then(_ => new Promise((resolve, reject) => {
                    let UserAccountID = JsonRow[i].UserAccountID;//make sure the correct UserAccountID is recived by the route before checking query is wrong
                    let SeasonID = JsonRow[i].SeasonID;
                    let CurrentPoints = parseInt(JsonRow[i].CurrentPoints);
                    let WinPoints =parseInt(JsonRow[i].WinPoints);
                    let AfterPoints = parseInt(JsonRow[i].AfterPoints);
                    let BeforePoints = parseInt(JsonRow[i].BeforePoints);
                    if(WinPoints>0){
                        console.log("-----------Won--------------");
                        console.log("UserAccountID : "+UserAccountID + " SeasonID :  " + SeasonID + " CurrentPoints : " + CurrentPoints + " WinPoints : " + WinPoints + " AfterPoints : " + AfterPoints + " BeforePoints : " + BeforePoints);
                    }else{
                        console.log("-----------Lost-------------");
                        console.log("UserAccountID : "+ UserAccountID + " SeasonID " + SeasonID + " CurrentPoints " + CurrentPoints + " WinPoints " + WinPoints + " AfterPoints " + AfterPoints + " BeforePoints " + BeforePoints);
                    }
                  
                    if (SeasonID != undefined && UserAccountID != undefined) { //if it dosn't have a user accountID it gets skipped which is fine because those are not players but generated data by the api
                        DbCheck.isUserAccountIDExist(UserAccountID, function (response) {
                            if (response == true) {
                                        //DbCheck.isSeasonEnded(SeasonID,function(response){//not used
                                        //    if(response==false){
                                                InGameFinalCardModel.UpdatePlayerFinalCard(UserAccountID, SeasonID, CurrentPoints, WinPoints, AfterPoints, BeforePoints, function (response) {
                                                    if (response == undefined) {
                                                        console.log("UserAccount or SeasonID dosn't Exist");
                                                    } else {
                                                        if(WinPoints>0){//only winners get to update their points
                                                            InGameFinalCardModel.UpdatePlayerMoney(UserAccountID, WinPoints, function (response) {
                                                                if(response!=undefined){
                                                                    console.log("UpdatePlayerMoney Somebody Won" +UserAccountID);
                                                                    resolve();
                                                                }//no need to update loser money they already lost it during the bet
                                                            });
                                                        }else{
                                                            resolve();
                                                        }
                                                    }
                                                });
                                          // }else{
                                         //       console.log("Season Already Ended");
                                                resolve();
                                         //   }
                                       // })
                            } else {
                                console.log("UserAccount dosn't Exist Update" + UserAccountID);
                                reject("UserAccount dosn't Exist Update" + UserAccountID);
                                // throw "UserAccount dosn't Exist" + UserAccountID;
                            }
                        });


                    } else {
                        //we resolve any way if it dosen't have a user accout or season id but we don't process it
                        resolve();
                    }
                })).catch(function (error) {
                    let status = 500;
                    res.status(status).end(http.STATUS_CODES[status]);
                    console.log("Error Occured " + error);
                });
            }
        }
    });
    /*
    http://192.168.254.102:8080/Api/v1/PlayerFinalCard/Json/[ {"hand":[ "JC", "AH", "KD", "7S", "KH" ], "score":3559, "rank":"ONE_PAIR", "UserAccountID":"Account8", "SeasonID":"5df00465-4b09-492a-8a46-cf9a9ce900e0"}, {"hand":[ "6C", "JC", "AH", "KD", "9C" ], "score":6240, "rank":"HIGH_CARD", "UserAccountID":"Account8", "SeasonID":"5df00465-4b09-492a-8a46-cf9a9ce900e0"}, {"hand":[ "JC", "AH", "KD", "JD", "8C" ], "score":3989, "rank":"ONE_PAIR"}, {"hand":[ "6C", "JC", "AH", "KD", "8D" ], "score":6246, "rank":"HIGH_CARD"}, {"hand":[ "JC", "AH", "KD", "TC", "JH" ], "score":3987, "rank":"ONE_PAIR"}, {"hand":[ "6C", "JC", "AH", "KD", "9S" ], "score":6240, "rank":"HIGH_CARD"}, {"hand":[ "4C", "AH", "KD", "4S", "4H" ], "score":2270, "rank":"THREE_OF_A_KIND"}, {"hand":[ "4C", "AH", "KD", "4D", "AD" ], "score":2567, "rank":"TWO_PAIRS"}, {"hand":[ "6C", "JC", "AH", "KD", "JS" ], "score":3991, "rank":"ONE_PAIR"} ]
    */

    /* //old test only
    app.get('/Api/v1/PlayerFinalCard/Json/:Json/',Security.verifyToken,function (req, res) {
         let Json = req.params.Json;
         let JsonRow =  JSON.parse(Json);
         let length = JsonRow.length;

         //for loop promise based 
         for (let i = 0, p = Promise.resolve(); i <= length; i++) {
             if(i==length){
                 p = p.then(_ => new Promise(resolve =>
                     {
                         console.log("OK Done");
                         let status = 200; res.status(status).end(http.STATUS_CODES[status]);
                         resolve();

                     }
                 )).catch(function(error) {
                     let status = 500; res.status(status).end(http.STATUS_CODES[status]);
                     console.log("Error Occured "+ error);
                   });
             }else{
                 p = p.then(_ => new Promise((resolve,reject) =>
                     {
                         let Hand = JsonRow[i].hand;
                         let Score = JsonRow[i].score;
                         let Rank = JsonRow[i].rank;
                         let UserAccountID =   JsonRow[i].UserAccountID;
                         let SeasonID =   JsonRow[i].SeasonID;
                         if(SeasonID!=undefined&&UserAccountID!=undefined){//if it dosn't have a user accountID it gets skipped which is fine because those are not players but generated data by the api
                         DbCheck.isUserAccountIDExist(UserAccountID,function(response){
                             if(response==true){
                                 DbCheck.isUserAccountIDBlocked(UserAccountID,function(response){
                                     if(response==false){
                                         InGameFinalCardModel.AddPlayerFinalCard(UserAccountID,SeasonID,Rank,Score,Hand,function(response){
                                             if(response==undefined){
                                                 console.log("UserAccount or SeasonID dosn't Exist");
                                             }else{
                                                 resolve();
                                             }
                                         })
                                     }else{
                                         console.log("UserAccount Blocked Set "+UserAccountID);
                                         reject("UserAccount Blocked Set "+UserAccountID);
                                     }
                                 })
                             }else{
                                 console.log("UserAccount dosn't Exist Set" + UserAccountID);
                                 reject("UserAccount dosn't Exist Set" + UserAccountID);
                             }
                         });

                            
                         }else{
                             //we resolve any way if it dosen't have a user accout or season id but we don't process it
                             resolve();
                         }
                     }
                 )).catch(function(error) {
                     let status = 500; res.status(status).end(http.STATUS_CODES[status]);
                     console.log("Error Occured "+ error);
                   });
             }
         }
     });*/
}