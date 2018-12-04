
window.jsel = JSONSelect;
var uri = localStorage.getItem('uri_goods');//拿到传过来的id
var map = localStorage.getItem('img');//拿到小票图
var dough = localStorage.getItem('cash');//奖励钱
var title = localStorage.getItem('slogan');//标题
var small = localStorage.getItem('smallBanks');//小票号
var situation = localStorage.getItem('final');//状态

$(function(){
    var ticketInformationHtml ='';
    ticketInformationHtml +='<header>';
    ticketInformationHtml +='<div class="title_top">';
    ticketInformationHtml +='<a href="javascript:history.go(-1)" class="title_top_first">';
    ticketInformationHtml +='<img src="../image/mine/return.png" class="hea_img" />';
    ticketInformationHtml +='</a>';
    ticketInformationHtml +=' <span class="title_top_center">小票详情</span>';
    ticketInformationHtml +='</div>';
    ticketInformationHtml +='</header>';

    ticketInformationHtml +=' <div class="ticket_information">';

    if(situation == 0){// 0 未审核
        ticketInformationHtml +='<p class="yellow">待审核</p>';
    }
    if(situation == 1){ //1 已通过
        ticketInformationHtml +='<p class="ticket_state">奖励'+dough+'元</p>';
    }
    if(situation == 2){//2 未通过
        ticketInformationHtml +='<p class="red">虚假信息</p>';
    }

    ticketInformationHtml +='<p class="ticket_name"><em>'+title+'</em>（小票号： <i>'+small+'</i>）</p>';
    ticketInformationHtml +='</div>';
    ticketInformationHtml +=' <div class="kong"></div>';
    ticketInformationHtml +='<div class="details">';
    ticketInformationHtml +='<p class="details_title">上传小票</p>';
    ticketInformationHtml +='<p class="details_imgs"><img src="'+map+'" /></p>';
    ticketInformationHtml +='</div>';

    $('.main').html(ticketInformationHtml);


})