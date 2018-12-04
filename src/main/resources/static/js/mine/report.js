$(function(){
	$('#test1').click(function(){
		var test1 = document.getElementById('test1');
        if(test1.src.indexOf('registernoc') >= 0){
            test1.src="../../image/mine/registerc.png";
            $('.report_btn button').removeAttr('disabled');
            $('.report_btn button').css({'background':'#333','color':'#fff'});

        }else{
            test1.src="../../image/mine/registernoc.png";
        }
	})
	$('#test2').click(function(){
		var test2 = document.getElementById('test2');
        if(test2.src.indexOf('registernoc') >= 0){
            test2.src="../../image/mine/registerc.png";
            $('.report_btn button').removeAttr('disabled');
            $('.report_btn button').css({'background':'#333','color':'#fff'});
        }else{
            test2.src="../../image/mine/registernoc.png";
        }
        
	})
	$('#test3').click(function(){
		var test3 = document.getElementById('test3');
        if(test3.src.indexOf('registernoc') >= 0){
            test3.src="../../image/mine/registerc.png";
            $('.report_btn button').removeAttr('disabled');
            $('.report_btn button').css({'background':'#333','color':'#fff'});
        }else{
            test3.src="../../image/mine/registernoc.png";
        }
		
	})
	
})