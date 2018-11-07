var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var isNullOrEmpty = require('is-null-or-empty');
let InGameTransferRequestModel = require('./InGameTransferRequestModel');
let http = require('http');
var Security = require('../../SharedController/Security');
module.exports = function (app) {
    function InGameTransferHistoryRequest(UserAccountIDSender, Amount, UserName, res) {
        if (!isNullOrEmpty(UserAccountIDSender)) {
            if (!isNullOrEmpty(Amount)) {
                if (validator.isNumeric(Amount)) {
                    
                    InGameTransferRequestModel.UserNameUserAccount(UserName, function (response) {
                        if (response != undefined) {
                            let UserAccountIDReceiver = response[0].UserAccountID;
                            var promise = new Promise(function (resolve, reject) {
                                InGameTransferRequestModel.PlayerNewMoneySubtract(UserAccountIDSender,parseInt(Amount), function (response) {
                                    if (response != undefined) {
                                        //console.log("Valid Value "+response.NewMoney>=0);
                                        if (response.NewMoney >= 0) {
                                            resolve(response);
                                        } else {
                                            reject({
                                                NotEnoughSenderPoints: true
                                            });
                                        }
                                    } else {
                                        reject();
                                    }
                                });
                            });
                            var promise2 = new Promise(function (resolve, reject) {
                                InGameTransferRequestModel.PlayerNewMoneyAdd(UserAccountIDReceiver, parseInt(Amount), function (response) {
                                    if (response != undefined) {
                                        resolve(response);
                                    } else {
                                        reject();
                                    }
                                });
                            });
                            Promise.all([promise, promise2]).then(function (response) {
                                let NewMoneyOfSender = parseInt(response[0].NewMoney);
                                let NewMoneyOfReciever = parseInt(response[1].NewMoney);

                                var promise3 = new Promise(function (resolve, reject) {
                                    InGameTransferRequestModel.UpdatePlayerMoney(UserAccountIDSender, NewMoneyOfSender, function (response) { //sender
                                        if (response != undefined) {
                                            resolve();
                                        } else {
                                            reject({
                                                FailedUpdatePlayerSender: true
                                            });
                                        }
                                    });

                                });
                                var promise4 = new Promise(function (resolve, reject) {
                                    InGameTransferRequestModel.UpdatePlayerMoney(UserAccountIDReceiver, NewMoneyOfReciever, function (response) { //reciever
                                        if (response != undefined) {
                                            resolve();
                                        } else {
                                            reject({
                                                FailedUpdatePlayerReciever: true
                                            });
                                        }
                                    });

                                });

                                Promise.all([promise3, promise4]).then(function (response) {
                                    if (response != undefined) {
                                        InGameTransferRequestModel.RequestTransferHistory(UserAccountIDSender, UserAccountIDReceiver, Amount, function (response) {
                                            if (response != undefined) {
                                                let status = 200;
                                                res.status(status).end(http.STATUS_CODES[status]);
                                            } else {
                                                res.send({
                                                    FailedRequestTransferHistory: true
                                                })
                                            }
                                        });

                                    } else {

                                    }

                                }, function (error) {
                                    res.send(error);
                                });

                            }, function (error) {
                                res.send(error);
                            });
                        } else {
                            let status = 404;
                            res.status(status).end(http.STATUS_CODES[status]);
                        }

                    });

                } else {
                    res.send({
                        InvalidAmount: true
                    });
                }
            } else {
                res.send({
                    NoAmount: true
                });
            }
        } else {
            res.send({
                NoUserAccountIDSender: true
            });
        }
    }

    app.post('/Api/v1/InGameTransferRequest/', Security.verifyToken, function (req, res) {
        let UserAccountIDSender = req.body.UserAccountIDSender;
        let Amount =req.body.Amount;
        let UserName = req.body.UserName;
        InGameTransferHistoryRequest(UserAccountIDSender, Amount, UserName, res);
    });

    app.get('/Api/v1/InGameTransferRequest/UserAccountIDSender/:UserAccountIDSender/UserName/:UserName/Amount/:Amount/', Security.verifyToken, function (req, res) {
        let UserAccountIDSender = req.params.UserAccountIDSender;
        let Amount = parseInt(req.params.Amount);
        let UserName = req.params.UserName;
        InGameTransferHistoryRequest(UserAccountIDSender, Amount, UserName, res);
    });






    /*
        app.get('/Api/v1/InGameTransferHistoryRequest/UserAccountIDSender/:UserAccountIDSender/UserAccountIDReceiver/:UserAccountIDReceiver/Amount/:Amount/',Security.verifyToken, function (req, res) {
            let UserAccountIDSender = req.params.UserAccountIDSender;
            let UserAccountIDReceiver = req.params.UserAccountIDReceiver;
            let Amount = req.params.Amount;
            if(UserAccountIDSender==UserAccountIDReceiver){
                if (!isNullOrEmpty(UserAccountIDSender)) {
                    if (!isNullOrEmpty(UserAccountIDReceiver)) {
                   
                            if (!isNullOrEmpty(Amount)) {
                                if (validator.isNumeric(Amount)) {
                                    
                                    var promise = new Promise(function (resolve, reject) {
                                        InGameTransferRequestModel.PlayerNewMoneySubtract(UserAccountIDSender, Amount, function (response) {
                                            if (response != undefined) {
                                                //console.log("Valid Value "+response.NewMoney>=0);
                                                if (response.NewMoney >= 0) {
                                                    resolve(response);
                                                } else {
                                                    reject({
                                                        NotEnoughSenderPoints: true
                                                    });
                                                }
                                            } else {
                                                reject();
                                            }
                                        });
                                    });
                                    var promise2 = new Promise(function (resolve, reject) {
                                        InGameTransferRequestModel.PlayerNewMoneyAdd(UserAccountIDReceiver, Amount, function (response) {
                                            if (response != undefined) {
                                                resolve(response);
                                            } else {
                                                reject();
                                            }
                                        });
                                    });
                                    Promise.all([promise, promise2]).then(function (response) {
                                        let NewMoneyOfSender = response[0].NewMoney;
                                        let NewMoneyOfReciever = response[1].NewMoney;
        
                                        var promise3 = new Promise(function (resolve, reject) {
                                            InGameTransferRequestModel.UpdatePlayerMoney(UserAccountIDSender, NewMoneyOfSender, function (response) { //sender
                                                if (response != undefined) {
                                                    resolve();
                                                } else {
                                                    reject({
                                                        FailedUpdatePlayerSender: true
                                                    });
                                                }
                                            });
        
                                        });
                                        var promise4 = new Promise(function (resolve, reject) {
                                            InGameTransferRequestModel.UpdatePlayerMoney(UserAccountIDReceiver, NewMoneyOfReciever, function (response) { //reciever
                                                if (response != undefined) {
                                                    resolve();
                                                } else {
                                                    reject({
                                                        FailedUpdatePlayerReciever: true
                                                    });
                                                }
                                            });
        
                                        });
        
                                        Promise.all([promise3, promise4]).then(function (response) {
                                            if (response != undefined) {
                                                InGameTransferRequestModel.RequestTransferHistory(UserAccountIDSender, UserAccountIDReceiver, Amount, function (response) {
                                                    if (response != undefined) {
                                                        let status = 200;
                                                        res.status(status).end(http.STATUS_CODES[status]);
                                                    } else {
                                                        res.send({
                                                            FailedRequestTransferHistory: true
                                                        })
                                                    }
        
        
                                                });
                                            } else {
        
                                            }
        
                                        }, function (error) {
                                            res.send(error);
                                        });
        
                                    }, function (error) {
                                        res.send(error);
                                    });
                                } else {
                                    res.send({
                                        InvalidAmount: true
                                    });
                                }
                            } else {
                                res.send({
                                    NoAmount: true
                                });
                            }
                       
                    } else {
                        res.send({
                            NoUserAccountIDReceiver: true
                        });
                    }
                } else {
                    res.send({
                        NoUserAccountIDSender: true
                    });
                }
            }else{
                let status = 404;
                res.status(status).end(http.STATUS_CODES[status]);
            }
            
        });
       


        app.get('/Api/v1/InGameTransferHistoryRequest/UserAccountIDSender/:UserAccountIDSender/UserName/:UserName/Amount/:Amount/',Security.verifyToken, function (req, res) {
            let UserAccountIDSender = req.params.UserAccountIDSender;
            let UserName = req.params.UserName;
            let Amount = req.params.Amount;

            if (!isNullOrEmpty(UserAccountIDSender)) {
                if (!isNullOrEmpty(Amount)) {
                    if (validator.isNumeric(Amount)) {
                        
                        InGameTransferRequestModel.UserNameUserAccount(UserName, function (response) {
                            if (response != undefined) {
                                let UserAccountIDReceiver = response[0].UserAccountID;
                                var promise = new Promise(function (resolve, reject) {
                                    InGameTransferRequestModel.PlayerNewMoneySubtract(UserAccountIDSender, Amount, function (response) {
                                        if (response != undefined) {
                                            //console.log("Valid Value "+response.NewMoney>=0);
                                            if (response.NewMoney >= 0) {
                                                resolve(response);
                                            } else {
                                                reject({
                                                    NotEnoughSenderPoints: true
                                                });
                                            }
                                        } else {
                                            reject();
                                        }
                                    });
                                });
                                var promise2 = new Promise(function (resolve, reject) {
                                    InGameTransferRequestModel.PlayerNewMoneyAdd(UserAccountIDReceiver, Amount, function (response) {
                                        if (response != undefined) {
                                            resolve(response);
                                        } else {
                                            reject();
                                        }
                                    });
                                });
                                Promise.all([promise, promise2]).then(function (response) {
                                    let NewMoneyOfSender = response[0].NewMoney;
                                    let NewMoneyOfReciever = response[1].NewMoney;

                                    var promise3 = new Promise(function (resolve, reject) {
                                        InGameTransferRequestModel.UpdatePlayerMoney(UserAccountIDSender, NewMoneyOfSender, function (response) { //sender
                                            if (response != undefined) {
                                                resolve();
                                            } else {
                                                reject({
                                                    FailedUpdatePlayerSender: true
                                                });
                                            }
                                        });

                                    });
                                    var promise4 = new Promise(function (resolve, reject) {
                                        InGameTransferRequestModel.UpdatePlayerMoney(UserAccountIDReceiver, NewMoneyOfReciever, function (response) { //reciever
                                            if (response != undefined) {
                                                resolve();
                                            } else {
                                                reject({
                                                    FailedUpdatePlayerReciever: true
                                                });
                                            }
                                        });

                                    });

                                    Promise.all([promise3, promise4]).then(function (response) {
                                        if (response != undefined) {
                                            InGameTransferRequestModel.RequestTransferHistory(UserAccountIDSender, UserAccountIDReceiver, Amount, function (response) {
                                                if (response != undefined) {
                                                    let status = 200;
                                                    res.status(status).end(http.STATUS_CODES[status]);
                                                } else {
                                                    res.send({
                                                        FailedRequestTransferHistory: true
                                                    })
                                                }
                                            });

                                        } else {

                                        }

                                    }, function (error) {
                                        res.send(error);
                                    });

                                }, function (error) {
                                    res.send(error);
                                });
                            } else {
                                let status = 404;
                                res.status(status).end(http.STATUS_CODES[status]);
                            }

                        });

                    } else {
                        res.send({
                            InvalidAmount: true
                        });
                    }
                } else {
                    res.send({
                        NoAmount: true
                    });
                }
            } else {
                res.send({
                    NoUserAccountIDSender: true
                });
            }
        });
        */
        
}