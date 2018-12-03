 let DBConnect = require("./API/SharedController/DBConnect");
                    var query2 = "SELECT Amount FROM sampledb.transactions where TransactionStatus='approved' and TransactionType='deposit' and UserTransactionID='"+"c8dafb54-6ecb-4189-b725-19f783acf88f"+"';";
                    console.log(query2);
                    DBConnect.DBConnect(query2, function (response) {
                      if (response != undefined) {
                        console.log("Async test");
                      //  client.Money = client.Money+parseInt(response[0].Amount);
                        //console.log(response[0]);
                      }
                    });