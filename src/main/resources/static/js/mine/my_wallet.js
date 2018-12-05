$(function(){
    $.ajax({
        url: domain_name_url + "/wallet/getUserWallet",
        type: "GET",
        dataType: "json", //指定服务器返回的数据类型
        data: {
            sessionId: sessionId,
        },
        success: function(data) {
            var walletRes = data.result;
            if(walletRes.length !=0){
                var balance = walletRes.balance;
                $('.wallet_zo span i').html((walletRes.totalMoney/100).toFixed(2));
                $('#current_balance i').html((walletRes.money/100).toFixed(2));
                sStorage = window.localStorage; //本地存题目
                sStorage.wbalance = balance;
                $('#have_withdrawal i').html((walletRes.balance/100).toFixed(2));
            }

        }
    })
});

$(".first_a").click(function () {
    window.location.href=domain_name_url + "/withdrawalRecorde?sessionId="+sessionId;
});

$("#wit_btn").click(function () {
    layer.open({
        content: '2019-1-1 00:00:00 开放提现',
        skin: 'msg',
        time: 2
    });
});