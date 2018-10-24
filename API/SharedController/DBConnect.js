

const mysql = require('mysql2');
//DEBUGGING mysql
//if can't connect try to alter ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
module.exports.DBConnect = function DBConnect(RawQuery,callback){
  
    const connection = mysql.createConnection({
      host: 'localhost'||'172.30.166.206',
      user: 'user',
      password: 'user',
      port: process.env.OPENSHIFT_MYSQL_DB_PORT||3306,
      database: 'sampledb',
    });
    connection.connect();
    // simple query
    connection.query(RawQuery,
      function (err, results, fields) {
       // console.log(err);//remove this to see real error
     
        if(err!=undefined){
          console.log(err);
          if(err.sqlState=='23000'){
            console.log("Foreign Key Error or Duplicate");
            callback(undefined);
          }
          else if(err.sqlState=='02000'){
            console.log("Key Already Used In Another Table");
            callback(undefined);
          }
          else if(err.sqlState=='42000'){
            console.log("Empty Query Requested");
            callback(undefined);
          }
          else{
            console.log("Somthing Bad Happend :" +err.sqlState);
          }
        }
        else if(results!=undefined&&results.length>0){//select
          callback(results);
        }
        else if(results!=undefined&&results.affectedRows>0){//updated
          callback(results);
        }
        else{
        //  console.log("Empty");
          callback(undefined);
        }
      });
      connection.end();
}
module.exports.DBConnectInsert = function DBConnectInsert(RawQuery,params,callback){
  
  const connection = mysql.createConnection({
    host: 'localhost'||'172.30.166.206',
    user: 'root',
    password: 'password',
    mutipleStatements: true,// required for multi statement in one query
    port: process.env.OPENSHIFT_MYSQL_DB_PORT||3306,
    database: 'sampledb'
  });
  connection.connect();
  // simple query
  connection.execute(RawQuery,params,
    function (err, results, fields) {
      if(err!=undefined){
         console.log(err); // results contains rows returned by server
      }
      if(results!=undefined){
        console.log(results);
        callback(results);
      }else{
        callback(undefined);
      }
      
     
      
    });
    connection.end();
}