$(function(){
    $.ajax({
        url: domain_name_url + "/withdrawalRecord/getUserWithdrawalRecord",
        type: "GET",
        dataType: "json", //指定服务器返回的数据类型
        data: {
            sessionId: sessionId,
        },
        success: function(data) {
            var walletRes = data.result;
            var html ="";
            if(walletRes.size>0) {
                for (var v = 0; v < walletRes.size; v++) {
                    html += '<li><div class="record_infor"><p class="infor_title"><span>' + walletRes.title + '</span><span>' + walletRes.money + '</span></p>';
                    html += '<p class="record_time">' + walletRes.createTime + '</p>';
                    html += '<p class="record_plan">' + walletRes.remark + '</p>';
                    html += '</div></li>'
                }
                $(".withdrawal_record ul").html(html);
            }else {
                $('.without').css({display: 'block'});
            }
        }
    })
});