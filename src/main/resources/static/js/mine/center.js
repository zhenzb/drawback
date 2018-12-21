// 轮播图
var swiper = new Swiper('.swiper-container', {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    observer: true, //调完接口不能翻页解决方法，修改swiper自己或子元素时，自动初始化swiper  
    observeParents: true, //调完接口不能翻页解决方法，修改swiper的父元素时，自动初始化swiper 

});
// 复制功能
var clipboard = new ClipboardJS('.copy');
clipboard.on('success', function(e) {
    layer.open({
        content: '复制成功',
        skin: 'msg',
        time: 2
    });
});

clipboard.on('error', function(e) {
    // console.log(e);
});


window.onload =function(){
    $.ajax({
        type: "get",
        url: domain_name_url + "/drawback/user/centerUserInfo?sessionId="+sessionId,
        /*data: {"openid":openid},*/
        contentType:"application/json",  //缺失会出现URL编码，无法转成json对象
        cache: false,
        async : false,
        dataType: "json",
        success:function(data) {
            if(data.code ==0){
                $("#set_nickname").html(data.user.userName);
                if(data.user.headImage == "" || data.user.headImage == undefined){
                    $("#headImg").attr("src","../image/mine/head.jpg");
                }else {
                    $("#headImg").attr("src", data.user.headImage);
                }
                $("#iId em").html(data.user.remark);
                $("#pid").html(data.wallet.money/100+"元");

                /*$("#iId em").html(data.wxMember.result.rs[0].id);
                $("#pid").html(data.userWallet.result.rs[0].balance/100+"元");*/
                $("#lowerId").html(data.wallet.totalMoney/100+"元");
                $(".rank").html(data.user.level=="0"?"普通会员":"vip");
                var member = data.user.member_level;
                sStorage = window.localStorage; //本地存题目
                sStorage.wmember = member;
            }else{
                alert("error");
            }
        },
        error : function() {
            alert("出错了");
        }
    });
};

$("#wallet").click(function () {
    window.location.href=domain_name_url + "/drawback/wallet?sessionId="+sessionId;
});
$("#home").click(function () {
    window.location.href=domain_name_url + "/drawback/main?sessionId="+sessionId;
});
$("#min").click(function () {
    window.location.href=domain_name_url + "/drawback/min?sessionId="+sessionId;
});
$("#check").click(function () {
    window.location.href=domain_name_url + "/drawback/checkReceipt?sessionId="+sessionId;
});

$("#headImg").click(function () {
    $("#image").click();
});

function uploadHeadImg() {
    var formData = new FormData();
    var img_file = document.getElementById("image");
    var fileObject = img_file.files[0];
    if (fileObject.size > 1024 * 1024) {//大于1M，进行压缩上传
        photoCompress(fileObject, {
            quality: 0.8
        }, function (base64Codes) {
            //console.log("压缩后：" + base.length / 1024 + " " + base);
            var bl = convertBase64UrlToBlob(base64Codes);
            formData.append("file", bl, "file_" + Date.parse(new Date()) + ".jpg"); // 文件对象
            formData.append("sessionId",sessionId);
            $.ajax({
                url: domain_name_url + "/drawback/user/uploadHeadImg",
                type: "POST",
                dataType: "json",
                data: formData,
                processData: false,
                async: false,
                contentType: false,
                success: function (data) {
                    var v = data.code;
                    if(v==0){
                        layer.open({
                            content: data.result,
                            skin: 'msg',
                            time: 2
                        });
                    }
                    setTimeout(function(){  //使用  setTimeout（）方法设定定时2000毫秒
                        window.location.reload();//页面刷新
                    },2000);
                },
                error: function (data) {
                    console.log("order", data.result)
                }
            });
        });
    } else {
        formData.append("file", fileObject);
        $.ajax({
            url: domain_name_url + "/drawback/user/uploadHeadImg?sessionId="+sessionId,
            type: "POST",
            dataType: "json",
            data: formData,
            processData: false,
            async: false,
            contentType: false,
            success: function (data) {
                var v = data.code;
                if(v==0){
                    layer.open({
                        content: data.result,
                        skin: 'msg',
                        time: 2
                    });
                }
                setTimeout(function(){  //使用  setTimeout（）方法设定定时2000毫秒
                    window.location.reload();//页面刷新
                },2000);

            },
            error: function (data) {
                console.log("order", data.result)
            }
        });
    }
}
