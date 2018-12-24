
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
        url:  domain_name_url + "/drawback/article/getArticleByUserId",
        type: "GET",
        dataType: "json", //指定服务器返回的数据类型
        data: {
            sessionId:sessionId
        },
        success: function(data) {
            var depositsHistory =data.result;
            if(depositsHistory !=''){
                var redundantHtml='';
                for(var i = 0;i<depositsHistory.length;i++){
                         redundantHtml += '<li class="receipt_li'+i+'" data-id='+depositsHistory[i].articleEntity.id+' data-img='+depositsHistory[i].img+' data-title='+depositsHistory[i].userName+' data-receipts_order='+depositsHistory[i].userId+' data-status='+depositsHistory[i].status+' data-profit='+depositsHistory[i].status+'>';
                         redundantHtml += '<div class="record_infor">';
                         redundantHtml += '<p class="infor_title">';
                         redundantHtml += '<img src="'+depositsHistory[i].userEntity.headImage+'" class="title_img" />';
                         redundantHtml += '<span>'+depositsHistory[i].userEntity.userName+'</span>';
                         redundantHtml += '</p>';
                         redundantHtml += '<p class="record_plan" data-id='+depositsHistory[i].articleEntity.id+'><em>'+depositsHistory[i].articleEntity.content+'</em>';
                        if(depositsHistory[i].articleEntity.img != "" && depositsHistory[i].articleEntity.img !=undefined){ // 图文
                            redundantHtml += '<img class="aimg" src="'+depositsHistory[i].articleEntity.img+'">';
                            }
                        if(depositsHistory[i].articleEntity.video != "" && depositsHistory[i].articleEntity.video !=undefined){ // 视频
                        redundantHtml += '<video class="aimg" controls><source src="'+depositsHistory[i].articleEntity.video+'" type="video/mp4"></video>';
                            }
                         redundantHtml += '<p class="record_sum1"><span >'+depositsHistory[i].articleEntity.createTime+'</span></p>';
                        if(depositsHistory[i].articleEntity.status == "0"){
                            redundantHtml += '<span class="record_sum" style="overflow: hidden;"><span style="float: left"><span><em id="funnyspan'+i+'">'+depositsHistory[i].articleEntity.funny+'</em><i title="搞笑"class="smile" onclick="simle('+depositsHistory[i].articleEntity.id+','+i+')"></i>' +
                                '</span>&nbsp;&nbsp;&nbsp;&nbsp;<span><em>'+depositsHistory[i].articleEntity.comment+'</em><i data-number='+i+' data-id='+depositsHistory[i].articleEntity.id+' title="评论" class="comment"></i></span></span>' +
                                '<span style="float: right"><font color="green">已通过</font></span></p>';
                        }else if(depositsHistory[i].articleEntity.status == "1"){
                            redundantHtml += '<span class="record_sum" style="overflow: hidden;"><span style="float: left"><span><em id="funnyspan'+i+'">'+depositsHistory[i].articleEntity.funny+'</em><i title="搞笑"class="smile" onclick="simle('+depositsHistory[i].articleEntity.id+','+i+')"></i>' +
                                '</span>&nbsp;&nbsp;&nbsp;&nbsp;<span><em>'+depositsHistory[i].articleEntity.comment+'</em><i data-number='+i+' data-id='+depositsHistory[i].articleEntity.id+' title="评论" class="comment"></i></span></span>' +
                                '<span style="float: right"><font color="#ffc09f">审核中</font></span></p>';
                        }else if(depositsHistory[i].articleEntity.status == "2"){
                            redundantHtml += '<span class="record_sum" style="overflow: hidden;"><span style="float: left"><span><em id="funnyspan'+i+'">'+depositsHistory[i].articleEntity.funny+'</em><i title="搞笑"class="smile" onclick="simle('+depositsHistory[i].articleEntity.id+','+i+')"></i>' +
                                '</span>&nbsp;&nbsp;&nbsp;&nbsp;<span><em>'+depositsHistory[i].articleEntity.comment+'</em><i data-number='+i+' data-id='+depositsHistory[i].articleEntity.id+' title="评论" class="comment"></i></span></span>' +
                                '<span style="float: right"><font color="red">已拒绝</font></span></p>';
                        }

                         redundantHtml += '</div>';
                         redundantHtml += '<div class="record_img">';
                         redundantHtml += '</div>';
                         redundantHtml += '</li>';
                }
                $('.without').css({display: 'none'});
                $('.discountgoods_title').css({display: 'block'});
                $('.withdrawal_record ul').html(redundantHtml);


                $('.comment').click(function(){
                    var id = $(this).data('id');//id
                    $.ajax({
                        url: domain_name_url + "/drawback/comment/getComment",
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
                                    //commentHtml +='<textarea class="commenClass"></textarea><button data-id='+id+' type="button" onclick="saveComment('+id+')" class="criticism">评论</button>';
                                    for (var i = 0; i < 3; i++) {
                                        commentHtml += '<ul><li><div class="mess_left"><img src="'+commentArray[i].userEntity.headImage+'"></div>';
                                        commentHtml += '<div class="mess_right"><p class="mess_title"><i>' + commentArray[i].userEntity.userName + ':</i>'+commentArray[i].commentEntity.comment +'</p><p class="mess_time">' + commentArray[i].commentEntity.createTime + '</p></div>';
                                        commentHtml += '</li></ul>';
                                    }
                                    $('.record_frame ').html(commentHtml);
                                }else {
                                    var commentHtml2="";
                                    //commentHtml2 +='<textarea class="commenClass"></textarea><button data-id='+id+' type="button" onclick="saveComment('+id+')" class="criticism">评论</button>';
                                    for (var i = 0; i < commentArray.length; i++) {
                                        commentHtml2 += '<ul><li><div class="mess_left"><img src="'+commentArray[i].userEntity.headImage+'"></div>';
                                        commentHtml2 += '<div class="mess_right"><p class="mess_title"><i>' + commentArray[i].userEntity.userName+ ':</i>' + commentArray[i].commentEntity.comment + '</p><p class="mess_time">' + commentArray[i].commentEntity.createTime + '</p></div>';
                                        commentHtml2 += '</li></ul>';
                                    }
                                    $('.record_frame ').html(commentHtml2);
                                }
                            }else {
                                var commentHtml3="";
                                //commentHtml3 +='<textarea class="commenClass"></textarea><button data-id='+id+' type="button" onclick="saveComment('+id+')" class="criticism">评论</button>';
                                commentHtml3 += '<ul><li>';
                                commentHtml3 += '<div class="mess_right"><p class="mess_title">该条趣事还没有被评论,赶快让小伙伴来抢沙发吧！</p><p class="mess_time"></p></div>';
                                commentHtml3 += '</li></ul>';
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
                    window.location.href=domain_name_url + "/drawback/receiptDetaile?sessionId="+sessionId+"&articleId="+id;
                })
            }else{
                $('.without').css({display: 'block'});
                $('.discountgoods_title').css({display: 'block'});
            }

        }

    });

});

function simle(articleId,i) {
    $.ajax({
        url: domain_name_url + "/drawback/article/updateArticleFunny",
        type: "POST",
        dataType: "json", //指定服务器返回的数据类型
        data: {
            articleId:articleId
        },
        success:function (data) {
            var v = data.result;
            document.getElementById("funnyspan"+i).innerText=v;
        }
    })
}

var flg = true;
$("#publish").click(function () {
    if(!flg){
        return;
    }
    flg = false;
    var formData = new FormData();
    var img_file = document.getElementById("image");
    var video_file = "";//document.getElementById("video");
    var fileObject = undefined;//img_file.files[0];
    var videoObject = video_file.files[0];
    var article = $(".commenClass").val();
    if (fileObject == undefined && article == '' && videoObject == "") {
        layer.open({
            content: '说点什么在发表吧...',
            skin: 'msg',
            time: 2
        });
        return;
    }
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    if (fileObject == undefined && re.test(article) && videoObject == "") {
        layer.open({
            content: '说点什么在发表吧...',
            skin: 'msg',
            time: 2
        });
        return;
    }
    if (videoObject == "") {

        if (fileObject != undefined) {
            if (fileObject.size > 1024 * 1024) {//大于1M，进行压缩上传
                photoCompress(fileObject, {
                    quality: 0.8
                }, function (base64Codes) {
                    //console.log("压缩后：" + base.length / 1024 + " " + base);
                    var bl = convertBase64UrlToBlob(base64Codes);
                    formData.append("file", bl, "file_" + Date.parse(new Date()) + ".jpg"); // 文件对象
                    formData.append("article", article);
                    formData.append("sessionId", sessionId);
                    $.ajax({
                        url: domain_name_url + "/drawback/article/saveArticle",
                        type: "POST",
                        dataType: "json",
                        data: formData,
                        processData: false,
                        async: false,
                        contentType: false,
                        success: function (data) {
                            var v = data.result;
                            if (v == 0) {
                                layer.open({
                                    content: '发表成功,赶快让小伙伴帮你审核通过吧',
                                    skin: 'msg',
                                    time: 3
                                });
                            }
                            setTimeout(function () {  //使用  setTimeout（）方法设定定时2000毫秒
                                window.location.reload();//页面刷新
                            }, 2000);
                        },
                        error: function (data) {
                            console.log("order", data.result)
                        }
                    });
                });
            } else {
                formData.append("file", fileObject);
                formData.append("article", article);
                formData.append("sessionId", sessionId);
                $.ajax({
                    url: domain_name_url + "/drawback/article/saveArticle",
                    type: "POST",
                    dataType: "json",
                    data: formData,
                    processData: false,
                    async: false,
                    contentType: false,
                    success: function (data) {
                        var v = data.result;
                        if (v == 0) {
                            layer.open({
                                content: '发表成功,赶快让小伙伴帮你审核通过吧',
                                skin: 'msg',
                                time: 2
                            });
                        }
                        setTimeout(function () {  //使用  setTimeout（）方法设定定时2000毫秒
                            window.location.reload();//页面刷新
                        }, 2000);

                    },
                    error: function (data) {
                        console.log("order", data.result)
                    }
                });
            }

        } else {
            formData.append("article", article);
            formData.append("sessionId", sessionId);
            $.ajax({
                url: domain_name_url + "/drawback/article/saveArticle",
                type: "POST",
                dataType: "json",
                data: formData,
                processData: false,
                async: false,
                contentType: false,
                success: function (data) {
                    var v = data.result;
                    if (v == 0) {
                        layer.open({
                            content: '发表成功,赶快让小伙伴帮你审核通过吧',
                            skin: 'msg',
                            time: 2
                        });
                    }
                    setTimeout(function () {  //使用  setTimeout（）方法设定定时2000毫秒
                        window.location.reload();//页面刷新
                    }, 2000);

                },
                error: function (data) {
                    console.log("order", data.result)
                }
            });

        }
    }else {
        formData.append("videoFile", videoObject);
        formData.append("article", article);
        formData.append("sessionId", sessionId);
        $.ajax({
            url: domain_name_url + "/drawback/article/saveArticle",
            type: "POST",
            dataType: "json",
            data: formData,
            processData: false,
            async: false,
            contentType: false,
            success: function (data) {
                var v = data.result;
                if (v == 0) {
                    layer.open({
                        content: '发表成功,赶快让小伙伴帮你审核通过吧',
                        skin: 'msg',
                        time: 2
                    });
                }
                setTimeout(function () {  //使用  setTimeout（）方法设定定时2000毫秒
                    window.location.reload();//页面刷新
                }, 2000);

            },
            error: function (data) {
                console.log("order", data.result)
            }
        });
    }
});
/*跳转*/
$("#home").click(function () {
    window.location.href=domain_name_url + "/drawback/main?sessionId="+sessionId;
});
$("#min").click(function () {
    window.location.href=domain_name_url + "/drawback/min?sessionId="+sessionId;
});

$("#center").click(function () {
    window.location.href=domain_name_url + "/drawback/goCenter?sessionId="+sessionId;
});

$("#check").click(function () {
    window.location.href=domain_name_url + "/drawback/checkReceipt?sessionId="+sessionId;
});

/*上传图片*/
$("#imgID").click(function () {
    $("#image").click();
});
/*上传视频*/
$("#videoID").click(function () {
    $("#video").click();
});

/*图片预览*/
function setImagePreview() {
    //input
    var docObj = document.getElementById("image");
    //img
    var imgObjPreview = document.getElementById("preview");
    //div
    var divs = document.getElementById("localImag");
    //var add = document.getElementById("add");
    if (docObj.files && docObj.files[0]) {
        //火狐下，直接设img属性
        imgObjPreview.style.display = 'block';
        imgObjPreview.style.width = '1.8rem';
        imgObjPreview.style.height = '1.8rem';
        //imgObjPreview.src = docObj.files[0].getAsDataURL();
        //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
        imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
        //add.style.display = "none";
        $("#btn").removeAttr("disabled");
        $('#btn').css({'background': '#b61c25', 'color': '#fff'});
    } else {
        //IE下，使用滤镜
        docObj.select();
        var imgSrc = document.selection.createRange().text;
        var localImagId = document.getElementById("localImag");
        //必须设置初始大小
        localImagId.style.width = "1.8rem";
        localImagId.style.height = "1.8rem";
        //图片异常的捕捉，防止用户修改后缀来伪造图片
        try {
            localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
            localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
            //add.style.display = "none";
            $("#btn").removeAttr("disabled");
            $('#btn').css({'background': '#b61c25', 'color': '#fff'});
        } catch (e) {
            alert("您上传的图片格式不正确，请重新选择!");
            return false;
        }
        imgObjPreview.style.display = 'none';
        document.selection.empty();
    }
    return true;
}

/*视频预览*/
function setVideoPreview() {
    //input
    var docObj = document.getElementById("video");
    //img
    var imgObjPreview = document.getElementById("preview");
    //div
    var divs = document.getElementById("localImag");
    //var add = document.getElementById("add");
    if (docObj.files && docObj.files[0]) {
        //火狐下，直接设img属性
        imgObjPreview.style.display = 'block';
        imgObjPreview.style.width = '1.8rem';
        imgObjPreview.style.height = '1.8rem';
        //imgObjPreview.src = docObj.files[0].getAsDataURL();
        //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
        imgObjPreview.src = "/drawback/image/video.png"//window.URL.createObjectURL(docObj.files[0]);
        //add.style.display = "none";
        $("#btn").removeAttr("disabled");
        $('#btn').css({'background': '#b61c25', 'color': '#fff'});
    } else {
        //IE下，使用滤镜
        docObj.select();
        //var imgSrc = document.selection.createRange().text;
        var localImagId = document.getElementById("localImag");
        //必须设置初始大小
        localImagId.style.width = "1.8rem";
        localImagId.style.height = "1.8rem";
        //图片异常的捕捉，防止用户修改后缀来伪造图片
        try {
            localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
            localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = "/image/video.png";
            //add.style.display = "none";
            $("#btn").removeAttr("disabled");
            $('#btn').css({'background': '#b61c25', 'color': '#fff'});
        } catch (e) {
            alert("您上传的视频格式不正确，请重新选择!");
            return false;
        }
        imgObjPreview.style.display = 'none';
        document.selection.empty();
    }
    return true;
}
function photoCompress(file,w,objDiv){
    var ready=new FileReader();
    /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
    ready.readAsDataURL(file);
    ready.onload=function(){
        var re=this.result;
        canvasDataURL(re,w,objDiv)
    }
}

function canvasDataURL(path, obj, callback){
    var img = new Image();
    img.src = path;
    img.onload = function(){
        var that = this;
        // 默认按比例压缩
        var w = that.width,
            h = that.height,
            scale = w / h;
        w = obj.width || w;
        h = obj.height || (w / scale);
        var quality = 0.7;  // 默认图片质量为0.7
        //生成canvas
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        // 创建属性节点
        var anw = document.createAttribute("width");
        anw.nodeValue = w;
        var anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(that, 0, 0, w, h);
        // 图像质量
        if(obj.quality && obj.quality <= 1 && obj.quality > 0){
            quality = obj.quality;
        }
        // quality值越小，所绘制出的图像越模糊
        var base64 = canvas.toDataURL('image/jpeg', quality);
        // 回调函数返回base64的值
        callback(base64);
    }
}

/**
 * 将以base64的图片url数据转换为Blob 可以直接上传文件
 * @param urlData
 *            用url方式表示的base64图片数据
 */
function convertBase64UrlToBlob(urlData){

    var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte

    //处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }

    return new Blob( [ab] , {type : 'image/png'});
}

$("#center").click(function () {
    window.location.href=domain_name_url + "/drawback/goCenter?sessionId="+sessionId;
});


