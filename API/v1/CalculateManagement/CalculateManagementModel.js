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
    let _Office = Office;
    let _StartDateTime = StartDateTime;
    let _EndDateTime = EndDateTime;
    let query = "";
    
	console.log('TCL: Search -> _Office', _Office)
	console.log('TCL: Search -> _LowRank', _LowRank)
	console.log('TCL: Search -> _StartDateTime', _StartDateTime)
	console.log('TCL: Search -> _EndDateTime', _EndDateTime)

    if(_LowRank >= 1 && _LowRank <= 3){
        if(_LowRank == 1){
            console.log('this is calculate_manage_1');
            query = "select uaho.UserName, uaho.UserAccountID, "
            +" ifnull(ho.Commission,0) as Commission, "
            +" ifnull((select sum(Amount) from deposit_list where HeadOfficeID = uaho.UserName and TransactionStatus = 'approved' and "
            +"      ApprovedDateTime between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\'),0) AS deposit,"
            +" ifnull((select sum(Amount) from money_received_histories where HeadOfficeID = ho.HeadOfficeID and "
            +"      TransferedDateTime between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\' ),0) AS depositTransfer, "
            +" ifnull((select sum(Amount) from money_sent_histories where HeadOfficeID = ho.HeadOfficeID and "
            +"      TransferedDateTime between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\' ),0) AS withdrawTransfer, "
            +" ifnull((select sum(ApplicationAmount) from withdraw_list where HeadOfficeID = ho.HeadOfficeID and TransactionStatus = 'approved' and "
            +"      ApprovedDateTime between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\'),0) AS withdraw, "
            +" ifnull((select sum(HandAmount) from player_to_oho_handamount where HeadOfficeID = ho.HeadOfficeID and "
            +"      HandDateTime between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\' ),0) AS bettingAmount, "
            +" ifnull(round((select sum(HandAmount) from player_to_oho_handamount "
            +"      where HeadOfficeID = ho.HeadOfficeID and "
            +"      HandDateTime between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\') * 0.045,2),0) AS rake, "
            +" ifnull((select sum(PlayerMoney) from total_rake_overall "
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
            console.log('this is calculate_manage_2')            
            query = "select ua.UserName, ua.UserAccountID, "
            +" ifnull(d.Commission,0) as Commission,"
            +" ifnull((select sum(Amount) from deposit_list where DistributorID = ua.UserName and TransactionStatus = 'approved' and "
            +"      ApprovedDateTime between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\'),0) AS deposit,"
            +" ifnull((select sum(Amount) from money_received_histories where DistributorID = d.DistributorID and "
            +"      TransferedDateTime between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\'),0) AS depositTransfer,"
            +" ifnull((select sum(ApplicationAmount) from withdraw_list where DistributorID = d.DistributorID and TransactionStatus = 'approved' and "
            +"      ApprovedDateTime between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\'),0) AS withdraw,"
            +" ifnull((select sum(Amount) from money_sent_histories where DistributorID = d.DistributorID and "
            +"      TransferedDateTime between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\'),0) AS withdrawTransfer,"
            +" ifnull((select sum(HandAmount) from player_to_oho_handamount where DistributorID = d.DistributorID and "
            +"      HandDateTime between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\'),0) AS bettingAmount,"
            +" ifnull(round((select sum(HandAmount) from player_to_oho_handamount where DistributorID = d.DistributorID and "
            +"      HandDateTime between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\') * 0.045,2),0) AS rake,"
            +" ifnull((select sum(PlayerMoney) from total_rake_overall where DistributorID = d.DistributorID and "
            +"      RecentGame between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\' and LastGame between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\'),0) AS userHoldingMoney,"
            +" ifnull(round((select sum(hrt.RakeHO) from handhistory_rake_time hrt "
            +"      left join player_to_oho pto on hrt.UserAccountID = pto.UserAccountID where pto.DistributorID = d.DistributorID and "
            +"      HandDateTime between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\'),2),0) AS parentProfit, "
            +" ifnull(round((select sum(hrt.RakeStore) from handhistory_rake_time hrt "
            +"      left join player_to_oho pto on hrt.UserAccountID = pto.UserAccountID where pto.DistributorID = d.DistributorID and "
            +"      HandDateTime between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\'),2),0) AS storesProfit, "
            +" 0 as ohoPercent, "
            +" 0 as hoMoney, "
            +" 0 as distributorsMoney, "
            +" ho.UserAccountID ParentID "
            +" from distributors d "
            +"      left join useraccounts ua on ua.UserAccountID = d.UserAccountID "
            +"      left join headoffices ho on ho.HeadOfficeID = d.HeadOfficeID "   
            +" where ho.UserAccountID = \'"+_Office+"\'";
        }else if(_LowRank == 3){
            console.log('this is calculate_manage_3')            
            query = "select ua.UserName, ua.UserAccountID, "
            +" ifnull(s.Commission,0) as Commission,"
            +" ifnull((select sum(Amount) from deposit_list where ShopID = ua.UserName and TransactionStatus = 'approved' and "
            +"      ApprovedDateTime between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\'),0) AS deposit,"
            +" ifnull((select sum(Amount) from money_received_histories where ShopID = s.ShopID and "
            +"      TransferedDateTime between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\'),0) AS depositTransfer,"
            +" ifnull((select sum(ApplicationAmount) from withdraw_list where ShopID = s.ShopID and TransactionStatus = 'approved' and "
            +"      ApprovedDateTime between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\'),0) AS withdraw,"
            +" ifnull((select sum(Amount) from money_sent_histories where ShopID = s.ShopID and "
            +"      TransferedDateTime between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\' ),0) AS withdrawTransfer,"
            +" ifnull((select sum(HandAmount) from player_to_oho_handamount where ShopID = s.ShopID and "
            +"      HandDateTime between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\' ),0) AS bettingAmount,"
            +" ifnull(round((select sum(HandAmount) from player_to_oho_handamount where ShopID = s.ShopID and "
            +"      HandDateTime between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\') * 0.045,2),0) AS rake,"
            +" ifnull((select sum(PlayerMoney) from total_rake_overall where ShopID = s.ShopID and "
            +"      RecentGame between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\' and LastGame between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\' ),0) AS userHoldingMoney,"
            +" 0 AS parentProfit, "
            +" ifnull(round((select sum(hrt.RakeStore) from handhistory_rake_time hrt "
            +" left join player_to_oho pto on hrt.UserAccountID = pto.UserAccountID where pto.ShopID = s.ShopID and "
            +" HandDateTime between \'"+_StartDateTime+"\' and \'"+_EndDateTime+"\'),2),0) AS storesProfit,"
            +" 0 as ohoPercent, "
            +" 0 as hoMoney, "
            +" 0 as distributorsMoney, "
            +" d.UserAccountID ParentID "
            +" from shops s "
            +"      left join useraccounts ua on ua.UserAccountID = s.UserAccountID"
            +"      left join distributors d on d.DistributorID = s.DistributorID "   
            +"      where d.UserAccountID = \'"+_Office+"\'";
        }else{
            console.log('_LowRank value not allowed')
            callback(undefined)
        }

    }else{
        callback(undefined)
    }

    DBConnect.DBConnect(query, function (response) {
        console.log(query)
        if (response != undefined) {
            callback(response);
        } else {
            callback(undefined);
        }
    });
}

