function getCurrentDate(callback){
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth(); 
    let yyyy = today.getFullYear();
    let FormatedDate = yyyy+'/'+mm+'/'+dd;
    callback(FormatedDate);
  }
  //** Returns Current Time String*/
  
  /**
   *
   *
   * @param {*} callback
   */
  function getCurrentTime(callback){
    let today = new Date();
    let Hours = today.getHours();
    let Minutes = today.getMinutes();
    let Seconds = today.getSeconds();
    let FormatedTime =Hours+":"+Minutes+":"+Seconds;
    callback(FormatedTime);
  }
  