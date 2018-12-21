
// 调取上传历史
window.jsel = JSONSelect;
$(function(){
    $.ajax({
        url:  domain_name_url + "/drawback/receipts",
        type: "GET",
        dataType: "jsonp", //指定服务器返回的数据类型
        data: {
            method: 'getReceiptsRecord',
            userId:userId,
            receipts_order: '',
            url_type:'receipts'
        },
        success: function(data) {
            var depositsHistory =data.result.rs;

            var pastRecordsId = jsel.match('.id', depositsHistory);//获得id
            var pastRecordsSumo =jsel.match('.profit', depositsHistory);//获得奖励钱数
            var pastRecordsImg =jsel.match('.receipts_img_url', depositsHistory);//获得小票图片
            var pastRecordsTitle =jsel.match('.title', depositsHistory);//获得小票的抬头
            var pastRecordsUserId =jsel.match('.receipts_order', depositsHistory);//获得小票号
            var pastCondition =jsel.match('.status', depositsHistory);//获得状态

            if(depositsHistory !=''){
                var redundantHtml='';
                for(var i = 0;i<depositsHistory.length;i++){
                    past = depositsHistory[i].receipts_order;//小票号
                        redundantHtml += '<li class="re_li" data-id='+pastRecordsId[i]+' data-img='+pastRecordsImg[i]+' data-title='+pastRecordsTitle[i]+' data-receipts_order='+pastRecordsUserId[i]+' data-status='+pastCondition[i]+' data-profit='+pastRecordsSumo[i]+'>';
                        redundantHtml += '<a>';
                        redundantHtml += '<div class="record_infor">';
                        redundantHtml += '<p class="infor_title">';
                        redundantHtml += '<span>'+depositsHistory[i].title+'</span>';
                        redundantHtml += '</p>';
                        redundantHtml += '<p class="record_plan">小票号：<em>'+past+'</em> <span class="record_t">消费: <i>'+depositsHistory[i].money +'</i></span></p>';
                        redundantHtml += '</div>';
                        redundantHtml += '<div class="record_img">';
                         if(depositsHistory[i].status == 0){ // 0 未审核
                            redundantHtml += '<span class="yellow">待审核</span>';
                         }else if(depositsHistory[i].status == 1){  //1 已通过
                            redundantHtml += ' <span class="green">奖励'+depositsHistory[i].profit/100+'</span>';
                        } else if(depositsHistory[i].status == 2){ //2 未通过
                            redundantHtml += ' <span class="red">虚假信息</span>';
                        }
                         redundantHtml += ' <img src="../image/mine/enter.png" />';
                         redundantHtml += ' </div>';
                         redundantHtml += ' </a>';
                         redundantHtml += ' </li>';
                } 
                $('.vacant').css({display: 'none'});
                $('.withdrawal_record ul').html(redundantHtml);

                $('.re_li').click(function(){
                    var uri = $(this).data('id');//id
                    var pastImg = $(this).data('img');//小票图片
                    var pastMoney = $(this).data('profit');//奖励钱
                    var pastTitle = $(this).data('title');//标题
                    var pastUser = $(this).data('receipts_order');//小票号
                    var pastActual = $(this).data('status');//状态

                    sStorage = window.localStorage; //本地存题目

                    sStorage.uri_goods = uri;//id
                    sStorage.img= pastImg;//小票图片
                    sStorage.cash= pastMoney/100;//奖励钱
                    sStorage.slogan= pastTitle;//标题
                    sStorage.smallBanks = pastUser;//小票号
                    sStorage.final = pastActual;//状态

                    var gurl = window.location.href;

                    localStorage.setItem('gurl', window.location.href);
                    location.href = '/drawback/receiptsQuery.jsp?spuId=' + uri +'&url=' + gurl ;
                })

            }
        }

    })



    $(document).on("click", ".main_qingkong_title_btn", function() {

         // 弹框
         layer.open({
            type: 1,
            content: $('.warm').html(),
            anim: 'up',
            scrollbar: false,
            shadeClose: false,
            style: 'position:fixed;bottom:50%;left: 8%; right:8%;height: auto;border:none;border-radius:6px'
        });

        $(document).on("click", ".warm_login", function(){
            $.ajax({
                url:  domain_name_url + "/drawback/receipts",
                type: "GET",
                dataType: "jsonp", //指定服务器返回的数据类型
                data: {
                    method: 'emptyHistory',
                    userId:userId,
                    receipts_order: '',
                    url_type:'receipts'
                },
                success: function(data) {
                    console.log(data,'jk')
                    $('.withdrawal_record ul').remove(); 
                    $('.vacant').css({display: 'block'});
                    layer.closeAll('page'); 
                }
                
            })
        });

        $(document).on("click", ".warm_cancel", function() {
            layer.closeAll('page');
            $('.warm').css({display: 'none'});  
        });	
      
    })
      

})