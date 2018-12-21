$(function(){
	//验证名字
	$("#uname").blur(function() {
		var name = document.getElementById("uname").value;
		if(name==''){
			layer.open({
				content: '请输入用户名',
				skin: 'msg',
				time: 2
			});
			return false;
		}else {
			$('.mian_btn_login').removeAttr('disabled');
			$('.mian_btn_login').css({'background':'#333','color':'#fff'});
		}
		
	});
	//	手机号码格式验证
	/*$("#unumber").blur(function() {
		var reg = /^1[34578]\d{9}$/;
		var unumber = $('#unumber').val().replace(/\s+/g, "");
		var number = document.getElementById("unumber").value;
		if(number==''){
			layer.open({
				content: '请输入手机号',
				skin: 'msg',
				time: 2
			});
			return false;
		}else if(!reg.test(unumber)) {
			layer.open({
				content: '手机号格式不正确',
				skin: 'msg',
				time: 2
			});
			return false;
		} else {
			$('.mian_btn_login').removeAttr('disabled');
			$('.mian_btn_login').css({'background':'#333','color':'#fff'});
		}
		
	});*/
	//	验证码
	/*var x = 60;
	$(".btn_yanzhengma").click(function() {
		if(x == 60) {
			var cl = setInterval(function() {
				if(x != 0) {
					x = x - 1;
					$(".btn_yanzhengma").val(x + "s");
					$('.btn_yanzhengma').css({'background':'transparent','color':'#666','border':'.01rem solid #333','border-radius': '.3rem'});

				} else {
					$(".btn_yanzhengma").val("获取验证码");
					$('.btn_yanzhengma').css({'background':'#333','color':'#fff','border-radius': '.3rem'});
					x = 60;
					clearInterval(cl);
				}
			}, 1000);
		}
		var number = document.getElementById("unumber").value;
		var data = {
			phone: number
		}
		/!*调用获取验证码接口*!/
		$.ajax({
			url: domain_name_url + "/user/getNewVerificationCodeOptimize",
			type: "GET",
			dataType: "json", //指定服务器返回的数据类型
			data: data,
			success: function(data) {
				console.log("zz",data.code);
				//var result = JSON.stringify(data); //json对象转成字符串
				if(data.code==0){
                    layer.open({
                        content:data.result,
                        skin: 'msg',
                        time: 3
                    });
				}
				if(data.code==1){
					layer.open({
						content:data.result,
						skin: 'msg',
						time: 2
					});
				}
			}
		});
		
	});*/
	$('#invite_code').blur(function(){
		var phone_codema = document.getElementById('invite_code').value;
		if(phone_codema==''){
			layer.open({
				content: '请输入密码',
				skin: 'msg',
				time: 2
			});
			return false;
		}else{
			$('.mian_btn_login').removeAttr('disabled');
			$('.mian_btn_login').css({'background':'#333','color':'#fff'});
		}
	})
	// 登录
	$('.register_cond p img').click(function(){
		var test1 = document.getElementById('test1');
        if(test1.src.indexOf('registernoc') >= 0){
            test1.src="/drawback/image/mine/registerc.png";
        }else{
            test1.src="/drawback/image/mine/registernoc.png";
        }
		
	});
	var id;
	$(document).on("click", ".mian_btn_login", function() {
		var name = document.getElementById("uname").value;
		var password = document.getElementById("invite_code").value;
		if(name==''){
			layer.open({
				content: '请输入用户名',
				skin: 'msg',
				time: 2
			});
			return false;
		}
		if(password==''){
			layer.open({
				content: '请输入密码',
				skin: 'msg',
				time: 2
			});
			return false;
		}
		/*var test1 = document.getElementById('test1');
        if(test1.src.indexOf('registernoc') >= 0){
        	layer.open({
				content: '请勾选注册即同意',
				skin: 'msg',
				time: 2
			});
			return false;
        }*/
		$.ajax({
			url: domain_name_url + "/drawback/user/login",
			type: "POST",
			dataType: "json", //指定服务器返回的数据类型
			data: {
				userName:name,
                password:password
			},
			success: function(data) {
				var da_success = data.code;
                sessionId = data.result;
				if(da_success == 0) {
					layer.open({
						content: '登录成功',
						skin: 'msg',
						time: 2 //2秒后自动关闭
					});
					 setTimeout(function(){jump();}, 1000);
                    function jump() {
                        location.href=domain_name_url+'/drawback/main?sessionId='+sessionId;
                    }
				} else if(da_success == 1){//短信验证码错误
					layer.open({
						content: data.result,
						skin: 'msg',
						time: 2 //2秒后自动关闭
					});
					
				}
			},
			error:function (data) {
				alert("系统发生错误");
            }
		})	
	})
});

$(".mian_btn_register").click(function () {
	window.location.href=domain_name_url+"/drawback/register";
});

