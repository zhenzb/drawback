console.log("openid",openid);
var xhr;
//上传图片
/*function receiptImg() {
    var formData = new FormData();
    var img_file = document.getElementById("doc");
    var fileObject = img_file.files[0];
    if(fileObject.size/1024 > 1025){//大于1M，进行压缩上传
        photoCompress(fileObject, {
            quality: 0.2
        }, function(base64Codes){
            //console.log("压缩后：" + base.length / 1024 + " " + base);
            var bl = convertBase64UrlToBlob(base64Codes);
            formData.append("file", bl, "file_"+Date.parse(new Date())+".jpg"); // 文件对象
            formData.append("openid",openid);
        });
    }else {
        formData.append("file", fileObject);
        formData.append("openid",openid);
    }
    $.ajax({
        url: domain_name_url+"/receipts?method=uploadImg",
        type: "POST",
        dataType: "json",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            console.log("sendImg",data.result)
        },
        error: function (data) {
            console.log("sendImg",data.result)
        }
    });
}*/

//下面用于图片上传预览功能
function setImagePreview(avalue) {
    //input
    var docObj = document.getElementById("doc");
    //img
    var imgObjPreview = document.getElementById("preview");
    //div
    var divs = document.getElementById("localImag");
    var add = document.getElementById("add");
        if (docObj.files && docObj.files[0]) {
            //火狐下，直接设img属性
            imgObjPreview.style.display = 'block';
            imgObjPreview.style.width = '1.8rem';
            imgObjPreview.style.height = '1.8rem';
            //imgObjPreview.src = docObj.files[0].getAsDataURL();
            //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
            imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
            add.style.display="none";
            $("#btn").removeAttr("disabled");
			$('#btn').css({'background':'#b61c25','color':'#fff'});
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
                add.style.display="none";
                $("#btn").removeAttr("disabled");
				$('#btn').css({'background':'#b61c25','color':'#fff'});
            } catch(e) {
                alert("您上传的图片格式不正确，请重新选择!");
                return false;
            }
            imgObjPreview.style.display = 'none';
            document.selection.empty();
        }
    var formData = new FormData();
    var img_file = document.getElementById("doc");
    var fileObject = img_file.files[0];
    var image = document.getElementById("preview");
    image.src = window.URL.createObjectURL(docObj.files[0]);
    if(fileObject.size > 1024*1024){//大于1M，进行压缩上传
        //formData = compress(image,openid);
        photoCompress(fileObject, {
            quality: 0.1
        }, function(base64Codes){
            //console.log("压缩后：" + base.length / 1024 + " " + base);
            var bl = convertBase64UrlToBlob(base64Codes);
            formData.append("file", bl, "file_"+Date.parse(new Date())+".jpg"); // 文件对象
            formData.append("openid",openid);
            $.ajax({
                url: domain_name_url+"/drawback/receipts?method=uploadImg",
                type: "POST",
                dataType: "json",
                data: formData,
                processData: false,
                async: false,
                contentType: false,
                success: function (data) {
                    console.log("order",data.result);
                    $('#le').val(data.result);
                    // 判断是否填写小票号
                    var name = document.getElementById("le").value;
                    if(data.code == "1"){//图片失败
                        $('.push_button').css({display: 'none'});
                        console.log('kk');
                        $('.modal').css({display: 'block'});//图片失败显示弹框
                        $(".onec").html(data.result);
                        //点击确定退出
                        $(document).on("click", "#sure", function(){
                            location.reload();
                            $('.modal').css({display: 'none'});
                        });

                    }else {
                        $('.modals').css({display: 'none'});
                        $('.push_button').css({display: 'block'});
                        // 弹框 ----上传
                        $(".up").click(function() {
                            $('.modals').css({display: 'block'});
                        })
                        //点击确定退出
                        $(document).on("click", "#sures", function(){
                            location.reload();
                        });
                    }
                },
                error: function (data) {
                    console.log("order",data.result)
                }
            });
        });

        }else {
            formData.append("file", fileObject);
            formData.append("openid",openid);
        $.ajax({
            url: domain_name_url+"/drawback/receipts?method=uploadImg",
            type: "POST",
            dataType: "json",
            data: formData,
            processData: false,
            async: false,
            contentType: false,
            success: function (data) {
                console.log("order",data.result);
                $('#le').val(data.result);
                // 判断是否填写小票号
                var name = document.getElementById("le").value;
                if(data.code == "1"){//图片失败
                    $('.push_button').css({display: 'none'});
                    console.log('kk')
                    $('.modal').css({display: 'block'});//图片失败显示弹框
                     // document.getElementsByClassName("onec").innerHTML =data.result;
                    $(".onec").html(data.result);

                    //点击确定退出
                    $(document).on("click", "#sure", function(){
                        location.reload();
                        $('.modal').css({display: 'none'});
                    });

                }else {
                    $('.modals').css({display: 'none'});
                    $('.push_button').css({display: 'block'});
                    // 弹框 ----上传
                    $(".up").click(function() {
                        $('.modals').css({display: 'block'});
                    })
                    //点击确定退出
                    $(document).on("click", "#sures", function(){
                        location.reload();
                    });
                }
            },
            error: function (data) {
                console.log("order",data.result)
            }
        });
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
 * 将以base64的图片url数据转换为Blob
 * @param urlData
 *            用url方式表示的base64图片数据
 */
function convertBase64UrlToBlob(urlData){
    var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

//压缩图片
function compress(image,openid){
    var ss = image.src.length;
    var height = image.height;
    var width = image.width;
    var canvas = document.createElement('canvas');
    //height、 width 和图片实际的高、宽一致时，直接赋值canvas的宽高为上述宽高
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFF';//绘制背景色
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    //0.5为压缩的质量比例，范围是0~1。
    var imgBase = canvas.toDataURL("image/jpg",0.8);
    //转成Blob对象，以ajax的方式上传
    var formData = new FormData();
    var arr = imgBase.split(",");
    var mime = arr[0].match(/:(.*?);/)[1];
    var bstr = atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    var obj = new Blob([u8arr],{type:mime});
    formData.append("imageFiles",obj,obj.type);
    formData.append("openid",openid);
    return formData;
    //这里是用了toDataURL,然后再转成了blob，直接用canvas.toBlob不知道好不好使。
}

function getObjectURL(file){
    var url = null ;
    if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
}

/*$("#inputId").change(function() {
    var objUrl = $(this).val();
    //var objUrl = getObjectURL(this.files[0]);
    if(objUrl) {
        //实现预览
        $("#preview").attr("src", objUrl);
        //上传
        uploadImage(objUrl);
    }
})*/

//上传方法
/*function uploadImage(objUrl){
    var image = new Image();
    image.src = objUrl;
    image.onload = function () {
        var formData = new FormData();
        //必须以这种方式获取，以JQuery的方式获取不到
        var file = document.getElementById(location).files[0];
        if(file.size > 1024*1024){
            //大于1M的时候压缩
            formData = compress(image);
        }else{
            formData.append("imageFiles", file, file.type);
        }
        //然后可以添加你所需要一起传到后台的参数
        formData.append("openid",openid);
        $.ajax({
            url: domain_name_url+"/receipts?method=uploadImg",
            type: "POST",
            dataType: "json",
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                console.log("sendImg",data.result)
            },
            error: function (data) {
                console.log("sendImg",data.result)
            }
        });
    }
}*/

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
// 点击重置按钮清空小票号和图片
$("#qingkong").click(function(){
    window.location.reload();
})