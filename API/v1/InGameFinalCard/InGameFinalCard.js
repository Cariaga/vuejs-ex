let http = require('http');
let InGameFinalCardModel = require('./InGameFinalCardModel');
let DBConnect = require("../../SharedController/DBConnect");
module.exports = function (app) { 
    app.get('/Api/v1/PlayerFinalCard2/Json/:Json/', function (req, res) {
        let Json = req.params.Json;
        let JsonRow =  JSON.parse(Json);
        let length = JsonRow.length;

        /*for loop promise based */
        for (let i = 0, p = Promise.resolve(); i <= length; i++) {
            if(i==length){
                p = p.then(_ => new Promise(resolve =>
                    {
                        console.log("OK Done");
                        let status = 200; res.status(status).end(http.STATUS_CODES[status]);
                        resolve();

                    }
                )).catch(function(error) {
                    console.log("Error Occured "+ error);
                  });
            }else{
                p = p.then(_ => new Promise(resolve =>
                    {
                        let Hand = JsonRow[i].hand;
                        let Score = JsonRow[i].score;
                        let Rank = JsonRow[i].rank;
                        let UserAccountID =   JsonRow[i].UserAccountID;
                        let SeasonID =   JsonRow[i].SeasonID;
                        if(SeasonID!=undefined&&UserAccountID!=undefined){//if it dosn't have a user accountID it gets skipped which is fine because those are not players but generated data by the api
                            InGameFinalCardModel.AddPlayerFinalCard(UserAccountID,SeasonID,Rank,Score,Hand,function(response){
                                if(response==undefined){
                                    console.log("UserAccount or SeasonID dosn't Exist");
                                }else{
                                    resolve();
                                }
                            })
                        }else{
                            //we resolve any way if it dosen't have a user accout or season id but we don't process it
                            resolve();
                        }
                    }
                )).catch(function(error) {
                    console.log("Error Occured "+ error);
                  });
            }
        }
    });
    /*
    http://192.168.254.104:8080/Api/v1/PlayerFinalCard/Update/Json/[ {"CurrentPoints":0, "WinPoints":0, "AfterPoints":0, "BeforePoints":0}, {"CurrentPoints":0, "WinPoints":0, "AfterPoints":0, "BeforePoints":0}, {"CurrentPoints":0, "WinPoints":0, "AfterPoints":0, "BeforePoints":0}, {"CurrentPoints":0, "WinPoints":0, "AfterPoints":0, "BeforePoints":0}, {"CurrentPoints":0, "WinPoints":0, "AfterPoints":0, "BeforePoints":0}, {"CurrentPoints":0, "WinPoints":0, "AfterPoints":0, "BeforePoints":0}, {"CurrentPoints":0, "WinPoints":0, "AfterPoints":0, "BeforePoints":0}, {"CurrentPoints":0, "WinPoints":0, "AfterPoints":0, "BeforePoints":0}, {"CurrentPoints":0, "WinPoints":0, "AfterPoints":0, "BeforePoints":0} ]
    */
    app.get('/Api/v1/PlayerFinalCard/Update/Json/:Json/', function (req, res) {
        let Json = req.params.Json;
        let JsonRow =  JSON.parse(Json);
        let length = JsonRow.length;
           /*for loop promise based */
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
                p = p.then(_ => new Promise(resolve =>
                    {
                        let UserAccountID = JsonRow[i].UserAccountID;
                        let SeasonID = JsonRow[i].SeasonID;
                        let CurrentPoints = JsonRow[i].CurrentPoints;
                        let WinPoints =   JsonRow[i].WinPoints;
                        let AfterPoints =   JsonRow[i].AfterPoints;
                        let BeforePoints =   JsonRow[i].BeforePoints;

                        if(SeasonID!=undefined&&UserAccountID!=undefined){//if it dosn't have a user accountID it gets skipped which is fine because those are not players but generated data by the api
                            InGameFinalCardModel.UpdatePlayerFinalCard(UserAccountID,SeasonID,CurrentPoints,WinPoints,AfterPoints,BeforePoints,function(response){
                                if(response==undefined){
                                    console.log("UserAccount or SeasonID dosn't Exist");
                                }else{
                                    resolve();
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
    });
    app.get('/Api/v1/PlayerFinalCard/Json/:Json/', function (req, res) {
        let Json = req.params.Json;
        let JsonRow =  JSON.parse(Json);
        let length = JsonRow.length;

        /*for loop promise based */
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
                p = p.then(_ => new Promise(resolve =>
                    {
                        let Hand = JsonRow[i].hand;
                        let Score = JsonRow[i].score;
                        let Rank = JsonRow[i].rank;
                        let UserAccountID =   JsonRow[i].UserAccountID;
                        let SeasonID =   JsonRow[i].SeasonID;
                        if(SeasonID!=undefined&&UserAccountID!=undefined){//if it dosn't have a user accountID it gets skipped which is fine because those are not players but generated data by the api
                            InGameFinalCardModel.AddPlayerFinalCard(UserAccountID,SeasonID,Rank,Score,Hand,function(response){
                                if(response==undefined){
                                    console.log("UserAccount or SeasonID dosn't Exist");
                                }else{
                                    resolve();
                                }
                            })
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
    });
}