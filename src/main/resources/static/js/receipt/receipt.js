
// 小票查询
window.jsel = JSONSelect;
    // 页面进来还没有查询信息的时候要根据里一个接口里面进行判断
    // 点击查询获得小票的内容
    var receipts='';//查询一条小票的信息
    var past ='';//历史记录
    // 历史记录
    var page;
    page = 0;
    var variable;

$(function(){
    // 历史记录
    $.ajax({
        url:  domain_name_url + "/article/getArticle",
        type: "GET",
        dataType: "json", //指定服务器返回的数据类型
        data: {
            status:0
        },
        success: function(data) {
            var depositsHistory =data.result;
            if(depositsHistory !=''){
                var redundantHtml='';
                for(var i = 0;i<depositsHistory.length;i++){
                    console.log("zzzz",depositsHistory[i].userEntity.userName);
                      // 0 未审核
                         redundantHtml += '<li class="receipt_li'+i+'" data-id='+depositsHistory[i].articleEntity.id+' data-img='+depositsHistory[i].articleEntity.img+' data-title='+depositsHistory[i].userName+' data-receipts_order='+depositsHistory[i].userId+' data-status='+depositsHistory[i].status+' data-profit='+depositsHistory[i].status+'>';
                         redundantHtml += '<div class="record_infor">';
                         redundantHtml += '<p class="infor_title">';
                         redundantHtml += '<img src="'+depositsHistory[i].userEntity.headImage+'" class="title_img" />';
                         redundantHtml += '<span>'+depositsHistory[i].userEntity.userName+'</span>';
                         redundantHtml += '</p>';
                         redundantHtml += '<p class="record_plan" data-id='+depositsHistory[i].articleEntity.id+'><em>'+depositsHistory[i].articleEntity.content+'</em>';
                         if(depositsHistory[i].articleEntity.img != "" && depositsHistory[i].articleEntity.img !=undefined){ // 图文
                                redundantHtml += '<img class="aimg" src="'+depositsHistory[i].articleEntity.img+'">';
                            }
                         redundantHtml += '<p class="record_sum1"><span >'+depositsHistory[i].articleEntity.createTime+'</span></p>';
                         redundantHtml += '<p class="record_sum"><span><span id="funnyspan'+i+'">'+depositsHistory[i].articleEntity.funny+'</span><i title="搞笑"class="smile" onclick="simle('+depositsHistory[i].articleEntity.id+','+i+')"></i></span>&nbsp;&nbsp;&nbsp;&nbsp;<span><em>'+depositsHistory[i].articleEntity.comment+'</em><i data-number='+i+' data-id='+depositsHistory[i].articleEntity.id+' title="评论" class="comment"></i></span></p>';
                         redundantHtml +='<div class="kong"></div>';
                         redundantHtml += '</li>';
                }
                $('.without').css({display: 'none'});
                $('.discountgoods_title').css({display: 'block'});
                $('.withdrawal_record ul').html(redundantHtml);


                $('.comment').click(function(){
                    var id = $(this).data('id');//id
                    $.ajax({
                        url: domain_name_url + "/comment/getComment",
                        type: "GET",
                        dataType: "json", //指定服务器返回的数据类型
                        data: {
                            articleId:id
                        },
                        success:function (data) {
                            var commentArray = data.result;

                            if(commentArray !=undefined ){

                                if(commentArray.length>3){
                                    var commentHtml="";
                                    commentHtml +='<textarea class="commenClass"></textarea><button data-id='+id+' type="button" onclick="saveComment('+id+')" class="criticism">评论</button>';
                                    for (var i = 0; i < 3; i++) {
                                        commentHtml += '<ul><li><div class="mess_left"><img src="'+commentArray[i].userEntity.headImage+'"></div>';
                                        commentHtml += '<div class="mess_right"><p class="mess_title"><i>' + commentArray[i].userEntity.userName + ':</i>' + commentArray[i].commentEntity.comment + '</p><p class="mess_time">' + commentArray[i].commentEntity.createTime + '</p></div>';
                                        commentHtml += '</li></ul>';
                                    }
                                    commentHtml += '<div class="mess_right"><p onclick="lookComment('+id+')"  class="mess_comment">点击查看全部评论</p></div>';
                                    $('.record_frame ').html(commentHtml);
                                }else {
                                    var commentHtml2="";
                                    commentHtml2 +='<textarea class="commenClass"></textarea><button data-id='+id+' type="button" onclick="saveComment('+id+')" class="criticism">评论</button>';
                                    for (var i = 0; i < commentArray.length; i++) {
                                        commentHtml2 += '<ul><li><div class="mess_left"><img src="'+commentArray[i].userEntity.headImage+'"></div>';
                                        commentHtml2 += '<div class="mess_right"><p class="mess_title"><i>' + commentArray[i].userEntity.userName + ':</i>' + commentArray[i].commentEntity.comment + '</p><p class="mess_time">' + commentArray[i].commentEntity.createTime + '</p></div>';
                                        commentHtml2 += '</li></ul>';
                                    }
                                    $('.record_frame ').html(commentHtml2);
                                }
                            }else {
                                var commentHtml3="";
                                commentHtml3 +='<textarea class="commenClass"></textarea><button data-id='+id+' type="button" onclick="saveComment('+id+')" class="criticism">评论</button>';
                                $('.record_frame ').html(commentHtml3);
                            }

                        }
                    });
                    var number = $(this).data('number');
                    var a = $(".receipt_li"+number), b = $(".record_frame");
                    $('.record_frame').toggle();
                    a.append(b);
                });

                $('.record_plan').click(function(){
                    var id = $(this).data('id');//id
                    window.location.href=domain_name_url + "/receiptDetaile?sessionId="+sessionId+"&articleId="+id;
                })

            }else{
                $('.without').css({display: 'block'});
                $('.discountgoods_title').css({display: 'block'});
            }

        },
        error:function (data) {
            alert(3);
            alert(data.result);
        }

    });

});

function simle(articleId,i) {
    $.ajax({
        url: domain_name_url + "/article/updateArticleFunny",
        type: "POST",
        dataType: "json", //指定服务器返回的数据类型
        data: {
            articleId:articleId,
            sessionId:sessionId
        },
        success:function (data) {
            var v = data.result;
            document.getElementById("funnyspan"+i).innerText=v;
        }
    })
}


function saveComment(id) {
    var comment = $(".commenClass").val();
    if(comment==''){
        layer.open({
            content: '说点什么在评论吧...',
            skin: 'msg',
            time: 2
        });
        return;
    }
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    if(re.test(comment)){
        layer.open({
            content: '说点什么在评论吧...',
            skin: 'msg',
            time: 2
        });
        return;
    }
    $.ajax({
        url: domain_name_url + "/comment/saveComment",
        type: "POST",
        dataType: "json", //指定服务器返回的数据类型
        data: {
            articleId:id,
            comment:comment,
            sessionId:sessionId
        },
        success:function (data) {
            var v = data.code;
            if(v==0){
                layer.open({
                    content: '评论成功',
                    skin: 'msg',
                    time: 2
                });
            }else {
                layer.open({
                    content: data.result,
                    skin: 'msg',
                    time: 2
                });
            }
        }
    })
}

function lookComment(id){
    window.location.href=domain_name_url + "/receiptDetaile?sessionId="+sessionId+"&articleId="+id;
};

$("#home").click(function () {
    window.location.href=domain_name_url + "/main?sessionId="+sessionId;
});

$("#min").click(function () {
    window.location.href=domain_name_url + "/min?sessionId="+sessionId;
});

$("#center").click(function () {
    window.location.href=domain_name_url + "/goCenter?sessionId="+sessionId;
});

$("#check").click(function () {
    window.location.href=domain_name_url + "/checkReceipt?sessionId="+sessionId;
});

$("#withdrawal_time").click(function () {
    $('#withdrawal_time').css({color:'#ffc09f'});
    $('#withdrawal_redu').css({color:''});
    articleList(1);
});

$("#withdrawal_redu").click(function () {
    $('#withdrawal_redu').css({color:'#ffc09f'});
    $('#withdrawal_time').css({color:''});
    articleList(2);
});


function articleList(order) {
    // 历史记录
    $.ajax({
        url:  domain_name_url + "/article/getArticle",
        type: "GET",
        dataType: "json", //指定服务器返回的数据类型
        data: {
            status:0,
            order:order
        },
        success: function(data) {
            var depositsHistory =data.result;
            if(depositsHistory !=''){
                var redundantHtml='';
                for(var i = 0;i<depositsHistory.length;i++){
                    console.log("zzzz",depositsHistory[i].userEntity.userName);
                    // 0 未审核
                    redundantHtml += '<li class="receipt_li'+i+'" data-id='+depositsHistory[i].articleEntity.id+' data-img='+depositsHistory[i].articleEntity.img+' data-title='+depositsHistory[i].userName+' data-receipts_order='+depositsHistory[i].userId+' data-status='+depositsHistory[i].status+' data-profit='+depositsHistory[i].status+'>';
                    redundantHtml += '<div class="record_infor">';
                    redundantHtml += '<p class="infor_title">';
                    redundantHtml += '<img src="'+depositsHistory[i].userEntity.headImage+'" class="title_img" />';
                    redundantHtml += '<span>'+depositsHistory[i].userEntity.userName+'</span>';
                    redundantHtml += '</p>';
                    redundantHtml += '<p class="record_plan" data-id='+depositsHistory[i].articleEntity.id+'><em>'+depositsHistory[i].articleEntity.content+'</em>';
                    if(depositsHistory[i].articleEntity.img != "" && depositsHistory[i].articleEntity.img !=undefined){ // 图文
                        redundantHtml += '<img class="aimg" src="'+depositsHistory[i].articleEntity.img+'">';
                    }
                    redundantHtml += '<p class="record_sum1"><span >'+depositsHistory[i].articleEntity.createTime+'</span></p>';
                    redundantHtml += '<p class="record_sum"><span><span id="funnyspan'+i+'">'+depositsHistory[i].articleEntity.funny+'</span><i title="搞笑"class="smile" onclick="simle('+depositsHistory[i].articleEntity.id+','+i+')"></i></span>&nbsp;&nbsp;&nbsp;&nbsp;<span><em>'+depositsHistory[i].articleEntity.comment+'</em><i data-number='+i+' data-id='+depositsHistory[i].articleEntity.id+' title="评论" class="comment"></i></span></p>';
                    redundantHtml +='<div class="kong"></div>';
                    redundantHtml += '</li>';
                }
                $('.without').css({display: 'none'});
                $('.discountgoods_title').css({display: 'block'});
                $('.withdrawal_record ul').html(redundantHtml);


                $('.comment').click(function(){
                    var id = $(this).data('id');//id
                    $.ajax({
                        url: domain_name_url + "/comment/getComment",
                        type: "GET",
                        dataType: "json", //指定服务器返回的数据类型
                        data: {
                            articleId:id
                        },
                        success:function (data) {
                            var commentArray = data.result;

                            if(commentArray !=undefined ){

                                if(commentArray.length>3){
                                    var commentHtml="";
                                    commentHtml +='<textarea class="commenClass"></textarea><button data-id='+id+' type="button" onclick="saveComment('+id+')" class="criticism">评论</button>';
                                    for (var i = 0; i < 3; i++) {
                                        commentHtml += '<ul><li><div class="mess_left"><img src="'+commentArray[i].userEntity.headImage+'"></div>';
                                        commentHtml += '<div class="mess_right"><p class="mess_title"><i>' + commentArray[i].userEntity.userName + ':</i>' + commentArray[i].commentEntity.comment + '</p><p class="mess_time">' + commentArray[i].commentEntity.createTime + '</p></div>';
                                        commentHtml += '</li></ul>';
                                    }
                                    commentHtml += '<div class="mess_right"><p onclick="lookComment('+id+')"  class="mess_comment">点击查看全部评论</p></div>';
                                    $('.record_frame ').html(commentHtml);
                                }else {
                                    var commentHtml2="";
                                    commentHtml2 +='<textarea class="commenClass"></textarea><button data-id='+id+' type="button" onclick="saveComment('+id+')" class="criticism">评论</button>';
                                    for (var i = 0; i < commentArray.length; i++) {
                                        commentHtml2 += '<ul><li><div class="mess_left"><img src="'+commentArray[i].userEntity.headImage+'"></div>';
                                        commentHtml2 += '<div class="mess_right"><p class="mess_title"><i>' + commentArray[i].userEntity.userName + ':</i>' + commentArray[i].commentEntity.comment + '</p><p class="mess_time">' + commentArray[i].commentEntity.createTime + '</p></div>';
                                        commentHtml2 += '</li></ul>';
                                    }
                                    $('.record_frame ').html(commentHtml2);
                                }
                            }else {
                                var commentHtml3="";
                                commentHtml3 +='<textarea class="commenClass"></textarea><button data-id='+id+' type="button" onclick="saveComment('+id+')" class="criticism">评论</button>';
                                $('.record_frame ').html(commentHtml3);
                            }

                        }
                    });
                    var number = $(this).data('number');
                    var a = $(".receipt_li"+number), b = $(".record_frame");
                    $('.record_frame').toggle();
                    a.append(b);
                });

                $('.record_plan').click(function(){
                    var id = $(this).data('id');//id
                    window.location.href=domain_name_url + "/receiptDetaile?sessionId="+sessionId+"&articleId="+id;
                })

            }else{
                $('.without').css({display: 'block'});
                $('.discountgoods_title').css({display: 'block'});
            }

        },
        error:function (data) {
            alert(3);
            alert(data.result);
        }

    });
}