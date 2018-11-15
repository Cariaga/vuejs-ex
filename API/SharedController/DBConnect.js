

const mysql = require('mysql2');
const notifier = require('node-notifier');
// String

//DEBUGGING mysql
//if can't connect try to alter ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
//first attempt password

//Test Connection Important here to check if information provided is correct
module.exports.DBConnectTest = function DBConnectTest(){
       /*   const connection = mysql.createConnection({
            host:  process.env.OPENSHIFT_NODEJS_IP || process.env.OPENSHIFT_INTERNAL_IP || 'localhost',
            user: user,
            password: password,
            port: process.env.OPENSHIFT_MYSQL_DB_PORT||3306,
            database: 'sampledb',
          });
         // connection.connect();
          // simple query
          connection.query("select * from `UserAccounts`",
            function (err, results, fields) {
              connection.end();
            
            });*/

}
/*process.env.MYSQL_SERVICE_HOST*/

const pool = mysql.createPool({
  host:process.env.MARIADB_PORT_3306_TCP_ADDR|| 'localhost',
  user: 'user',
  password: 'user',
  database: 'sampledb',
  waitForConnections: true,
  port: process.env.OPENSHIFT_MYSQL_DB_PORT||3307,
  connectionLimit: 160,
  queueLimit: 0,
});

/*pooling version*/
module.exports.DBConnect = function DBConnect(RawQuery,callback){
  pool.getConnection(function(err, conn) {
    if(RawQuery!=undefined&&err==undefined){
      // Do something with the connection
    conn.query(RawQuery,
      function (err, results, fields) {
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
          else if(err.sqlState=='ETIMEDOUT'){
            console.log("DB Connection sharedController DBConnect ERROR");
           // callback('ETIMEDOUT');
          }
          else{
            notifier.notify({
              title: 'Server Error',
              message: err
            });

            console.log("Somthing Bad Happend :" +err);
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
            // Don't forget to release the connection when finished!
        pool.releaseConnection(conn);
      });
    }
    

 });
}

//old non pool version
/*module.exports.DBConnect = function DBConnect(RawQuery,callback){// non connection pool
   const connection = mysql.createConnection({
      host:process.env.MYSQL_SERVICE_HOST|| 'localhost',
      user: user,
      password: password,
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
          else if(err.sqlState=='ETIMEDOUT'){
            console.log("DB Connection sharedController DBConnect ERROR");
           // callback('ETIMEDOUT');
          }
          else{
            console.log("Somthing Bad Happend :" +err);
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
     // connection.end();
}*/
module.exports.DBConnectInsert = function DBConnectInsert(RawQuery,params,callback){
  
  const connection = mysql.createConnection({
    host:process.env.MYSQL_SERVICE_HOST|| 'localhost',
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