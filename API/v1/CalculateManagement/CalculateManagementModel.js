let DBConnect = require("../../SharedController/DBConnect");

module.exports.LowRank1 = function LowRank1(LowRank, Office, Limit, Offset, callback) {
    let _LowRank = LowRank;
    let _Office = Office;
    let _Limit = Limit;
    let _Offset = Offset;
    
    let query = "select * from calculateManage_"+_LowRank+" WHERE ParentID = \'"+_Office+"\' LIMIT "+_Limit+" OFFSET "+_Offset ;
    DBConnect.DBConnect(query, function (response) {
        console.log(query)
        if (response != undefined) {
        console.log(response);
        callback(response);
        } else {
        callback(undefined);
        }
    });
      
}

module.exports.Pagination = function Pagination(LowRank, Office, callback) {
    let _LowRank = LowRank;
    let _Office = Office;
	console.log('TCL: Pagination -> _LowRank', _LowRank)

    if(_LowRank >= 1 && _LowRank <= 3){
        let query = "select count(*) as ID from calculateManage_"+_LowRank+" WHERE ParentID = \'"+_Office+"\'";
                    
        DBConnect.DBConnect(query, function (response) {
            console.log(query)
            if (response != undefined) {
            console.log(response);
            callback(response);
            } else {
            callback(undefined);
            }
        });
    }else{
        callback(undefined)
    }
}

module.exports.Search = function Search(LowRank, Office, StartDateTime, EndDateTime, callback) {
    let _LowRank = LowRank;
	console.log('TCL: Search -> _LowRank', _LowRank);
    let _Office = Office;
    let _StartDateTime = StartDateTime;
    let _EndDateTime = EndDateTime;
    let query = "";


    if(_LowRank >= 1 && _LowRank <= 3){
        if(_LowRank == 1){
            query = "select uaho.UserName, uaho.UserAccountID, "
            +" ifnull(ho.Commission,0) as Commission, "
            +" ifnull((select sum(Amount) from deposit_list where HeadOfficeID = uaho.UserName and TransactionStatus = 'approved' and "
            +"      ApprovedDateTime between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\'),0) AS deposit,"
            +" ifnull((select sum(Amount) from money_received_histories where HeadOfficeID = ho.HeadOfficeID and "
            +"      TransferedDateTime between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\' ),0) AS depositTransfer,"
            +" ifnull((select sum(Applicatioom money_sent_histories where HeadOfficeID = ho.HeadOfficeID and "
            +"      TransferedDateTime between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\' ),0) AS withdrawTransfer,"
            +" ifnull((select sum(HandAmountnAmount) from withdraw_list where HeadOfficeID = ho.HeadOfficeID and TransactionStatus = 'approved' and"
            +"      ApprovedDateTime between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\'),0) AS withdraw,"
            +" ifnull((select sum(Amount) fr) from player_to_oho_handamount where HeadOfficeID = ho.HeadOfficeID and "
            +"      HandDateTime between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\' ),0) AS bettingAmount,"
            +" ifnull(round((select sum(HandAmount) from player_to_oho_handamount "
            +"      where HeadOfficeID = ho.HeadOfficeID and "
            +"      HandDateTime between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\') * 0.045,2),0) AS rake,"
            +" ifnull((select sum(PlayerMoney) from total_rake_overall"
            +"      where HeadOfficeID = ho.HeadOfficeID and "
            +"      RecentGame between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\' and LastGame between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\' ),0) AS userHoldingMoney, "
            +" ifnull(round((select sum(hrt.RakeOHO) from handhistory_rake_time hrt " 
            +"      left join player_to_oho pto on hrt.UserAccountID = pto.UserAccountID  "
            +"      where pto.HeadOfficeID = ho.HeadOfficeID and HandDateTime between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\'),2),0) AS parentProfit, "
            +" 0 as storesProfit, "
            +" ((select Commission from operatingheadoffice where OperatingHeadOfficeID = 1 LIMIT 1) - ho.Commission) as ohoPercent, "
            // -- because the points of offices is from the rake...
            +" ifnull(round((select sum(hr.RakeHO) from handhistory_rake_time hr left join players p on p.UserAccountID = hr.UserAccountID "
            +"      left join shops s on s.ShopID = p.ShopID "
            +"      left join distributors d on d.DistributorID = s.DistributorID "
            +"      left join headoffices ho on ho.HeadOfficeID = d.HeadOfficeID "
            +"      where ho.UserAccountID = uaho.UserAccountID and hr.HandDateTime between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\'),2),0) hoMoney, "
            +" ifnull(round((select sum(hr.RakeDistributor) from handhistory_rake_time hr left join players p on p.UserAccountID = hr.UserAccountID "
            +"      left join shops s on s.ShopID = p.ShopID "
            +"      left join distributors d on d.DistributorID = s.DistributorID "
            +"      where d.HeadOfficeID = ho.HeadOfficeID and "
            +"      hr.HandDateTime between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\'),2),0) distributorsMoney, "
            +" oho.UserAccountID ParentID "
            +" from headoffices ho "
            +"      left join useraccounts uaho on uaho.UserAccountID = ho.UserAccountID "
            +"      left join operatingheadoffice oho on oho.OperatingHeadOfficeID = ho.OperatingHeadOfficeID "   
            +" where oho.UserAccountID = \'"+_Office+"\'";

        }else if(_LowRank == 2){

        }else if(_LowRank == 3){

        }else{
            callback(undefined)
        }


    }else{
        callback(undefined)
    }

    DBConnect.DBConnect(query, function (response) {
        console.log(query)
        if (response != undefined) {
        console.log(response);
        callback(response);
        } else {
        callback(undefined);
        }
    });
}

