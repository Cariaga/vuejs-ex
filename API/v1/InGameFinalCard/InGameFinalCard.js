let http = require('http');
let InGameFinalCardModel = require('./InGameFinalCardModel');
let DBConnect = require("../../SharedController/DBConnect");
let DbCheck = require("../../SharedController/DBCheck");
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
    });
    /*
http://192.168.254.104:8080/Api/v1/PlayerFinalCard/Update/Json/[ {"UserAccountID":"Account8", "SeasonID":"1820b111-dc1d-4f78-b243-d298ca04c81a", "CurrentPoints":0, "WinPoints":0, "AfterPoints":0, "BeforePoints":0}, {"UserAccountID":"Account8", "SeasonID":"1820b111-dc1d-4f78-b243-d298ca04c81a", "CurrentPoints":0, "WinPoints":0, "AfterPoints":0, "BeforePoints":0}, {"UserAccountID":"Account8", "SeasonID":"1820b111-dc1d-4f78-b243-d298ca04c81a", "CurrentPoints":0, "WinPoints":0, "AfterPoints":0, "BeforePoints":0}, {"UserAccountID":"Account8", "SeasonID":"1820b111-dc1d-4f78-b243-d298ca04c81a", "CurrentPoints":0, "WinPoints":0, "AfterPoints":0, "BeforePoints":0}, {"UserAccountID":"Account8", "SeasonID":"1820b111-dc1d-4f78-b243-d298ca04c81a", "CurrentPoints":0, "WinPoints":0, "AfterPoints":0, "BeforePoints":0}, {"UserAccountID":"Account8", "SeasonID":"1820b111-dc1d-4f78-b243-d298ca04c81a", "CurrentPoints":0, "WinPoints":0, "AfterPoints":0, "BeforePoints":0}, {"UserAccountID":"Account8", "SeasonID":"1820b111-dc1d-4f78-b243-d298ca04c81a", "CurrentPoints":0, "WinPoints":0, "AfterPoints":0, "BeforePoints":0}, {"UserAccountID":"Account8", "SeasonID":"1820b111-dc1d-4f78-b243-d298ca04c81a", "CurrentPoints":0, "WinPoints":0, "AfterPoints":0, "BeforePoints":0}, {"UserAccountID":"Account8", "SeasonID":"1820b111-dc1d-4f78-b243-d298ca04c81a", "CurrentPoints":0, "WinPoints":0, "AfterPoints":0, "BeforePoints":0} ]

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
                p = p.then(_ => new Promise((resolve,reject) =>
                    {
                        let UserAccountID = JsonRow[i].UserAccountID;
                        let SeasonID = JsonRow[i].SeasonID;
                        let CurrentPoints = JsonRow[i].CurrentPoints;
                        let WinPoints =   JsonRow[i].WinPoints;
                        let AfterPoints =   JsonRow[i].AfterPoints;
                        let BeforePoints =   JsonRow[i].BeforePoints;
                        console.log(UserAccountID+" "+SeasonID+" "+CurrentPoints+" "+WinPoints+" "+AfterPoints+" "+BeforePoints);
                        if(SeasonID!=undefined&&UserAccountID!=undefined){//if it dosn't have a user accountID it gets skipped which is fine because those are not players but generated data by the api
                        DbCheck.isUserAccountIDExist(UserAccountID,function(response){
                            if(response==true){
                                DbCheck.isUserAccountIDBlocked(UserAccountID,function(response){
                                    if(response==false){
                                        InGameFinalCardModel.UpdatePlayerFinalCard(UserAccountID,SeasonID,CurrentPoints,WinPoints,AfterPoints,BeforePoints,function(response){
                                            if(response==undefined){
                                               
                                                console.log("UserAccount or SeasonID dosn't Exist");
                                            }else{
                                                resolve();
                                            }
                                        });
                                    }else{
                                        console.log("UserAccount Blocked Update"+UserAccountID);
                                        reject("UserAccount Blocked Update"+UserAccountID);
                                      //  throw "UserAccount Blocked " + UserAccountID;
                                    }
                                })
                            }else{
                                console.log("UserAccount dosn't Exist Update" + UserAccountID);
                                reject("UserAccount dosn't Exist Update" + UserAccountID);
                              // throw "UserAccount dosn't Exist" + UserAccountID;
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
    });
}