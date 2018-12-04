$(function(){
    var wbalance = localStorage.getItem('wbalance');
    $('.y_txt span').html((wbalance/100).toFixed(2)+'元');
    $('#wid_btn').click(function(){
        var wmember = localStorage.getItem('wmember');
        if(wmember==1){
            layer.open({
                type: 1,
                content: $('.warm').html(),
                anim: 'up',
                scrollbar: false,
                shadeClose: false,
                style: 'position:fixed;bottom:50%;left: 8%; right:8%;height: auto;border:none;border-radius:6px'
            });
            $(document).on("click", ".warm_login", function(){
                window.location.href = 'member.jsp';
            });
            $(document).on("click", ".warm_cancel", function() {
                layer.closeAll('page');
            });
            return false;
        }
        var total = $('.y_txt span').html();
        var sumVal = $('#sumVal').val();
        if(sumVal>total){
            layer.open({
                content: '余额不足！',
                skin: 'msg',
                time: 3
            });
            return false;
        }
        if(sumVal<5 && sumVal%5!=0){
            layer.open({
                content: '输入金额有误！',
                skin: 'msg',
                time: 3
            });
            return false;
        }
    })

})