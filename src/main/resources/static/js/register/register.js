﻿$(function(){
	//验证名字
	$("#uname").blur(function() {
		var name = document.getElementById("uname").value;
		if(name==''){
			layer.open({
				content: '请输入手机号',
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
	$("#unumber").blur(function() {
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
		
	});
	//	验证码
	var x = 60;
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

        var reg = /^1[34578]\d{9}$/;
        var unumbers = number.replace(/\s+/g, "");
        if(number==''){
            layer.open({
                content: '请输入手机号',
                skin: 'msg',
                time: 2
            });
            return ;
        }else if(!reg.test(unumbers)) {
            layer.open({
                content: '手机号格式不正确',
                skin: 'msg',
                time: 2
            });
            return ;
        } else {
            $('.mian_btn_login').removeAttr('disabled');
            $('.mian_btn_login').css({'background':'#333','color':'#fff'});
        }



		var data = {
			phone: number
		}
		/*调用获取验证码接口*/
		$.ajax({
			url: domain_name_url + "/drawback/user/getNewVerificationCodeOptimize",
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
		
	});
	$('#phone_codema').blur(function(){
		var phone_codema = document.getElementById('phone_codema').value;
		if(phone_codema==''){
			layer.open({
				content: '请输入验证码',
				skin: 'msg',
				time: 2
			});
			return false;
		}else{
			$('.mian_btn_login').removeAttr('disabled');
			$('.mian_btn_login').css({'background':'#333','color':'#fff'});
		}
	})
	// 注册
	$('.register_cond p img').click(function(){
		var test1 = document.getElementById('test1');
        if(test1.src.indexOf('registernoc') >= 0){
            test1.src="/drawback/image/mine/registerc.png";
        }else{
            test1.src="/drawback/image/mine/registernoc.png";
        }
		
	})
	$(document).on("click", ".mian_btn_login", function() {
		var name = document.getElementById("uname").value;
		var number = document.getElementById("unumber").value;
		var phone_codema = document.getElementById('phone_codema').value;
		var invite_code = document.getElementById('invite_code').value;
		if(name==''){
			layer.open({
				content: '请输入真实姓名',
				skin: 'msg',
				time: 2
			});
			return false;
		}
		if(number==''){
			layer.open({
				content: '请输入手机号',
				skin: 'msg',
				time: 2
			});
			return false;
		}
		if(phone_codema==''){
			layer.open({
				content: '请输入验证码',
				skin: 'msg',
				time: 2
			});
			return false;
		}
		if(invite_code==''){
			layer.open({
				content: '请输入邀请人ID',
				skin: 'msg',
				time: 2
			});
			return false;
		}
		var test1 = document.getElementById('test1');
        if(test1.src.indexOf('registernoc') >= 0){
        	layer.open({
				content: '请勾选注册即同意',
				skin: 'msg',
				time: 2
			});
			return false;
        }
		$.ajax({
			url: domain_name_url + "/drawback/user/addNewUserOptimize",
			type: "POST",
			dataType: "json", //指定服务器返回的数据类型
			data: {
				phone: number,
				code: phone_codema,
				userName:name,
                password:invite_code
			},
			success: function(data) {
				$('.mian_btn_login').attr('disabled',true);
				$('.mian_btn_login').css({'background':'#b4b4b4','color':'#fff'});
				var da_success = data.code;
				if(da_success == 0) {
					layer.open({
						content: '恭喜！注册成功',
						skin: 'msg',
						time: 2 //2秒后自动关闭
					});
					 setTimeout("location.href=domain_name_url+'/drawback/goLogin'", 1000);

				} else if(da_success == 2){//短信验证码错误
					layer.open({
						content: data.result,
						skin: 'msg',
						time: 2 //2秒后自动关闭
					});
					
				}else if(data.success==3){//邀请人不存在
					layer.open({
						content: data.result,
						skin: 'msg',
						time: 2 //2秒后自动关闭
					});
					
				}
			}
		})	
	})
});
