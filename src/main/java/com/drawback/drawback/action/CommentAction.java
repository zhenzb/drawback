package com.drawback.drawback.action;

import com.drawback.drawback.commom.ResultCommon;
import com.drawback.drawback.commom.UserSession;
import com.drawback.drawback.model.*;
import com.drawback.drawback.service.ArticleService;
import com.drawback.drawback.service.CommentService;
import com.drawback.drawback.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @ClassName CommentAction
 * @Description TODO
 * @Author yanhuo
 * @Date 2018/11/28 13:49
 * @Version 1.0
 **/
@RestController
@RequestMapping("/comment")
public class CommentAction {
    @Autowired
    CommentService commentService;
    @Autowired
    ArticleService articleService;
    @Autowired
    WalletService walletService;

    @RequestMapping(value = "/getComment",method = RequestMethod.GET)
    public String findComment(String articleId){
        ResultCommon result = new ResultCommon();
        List<ViewInfo> comment = commentService.findComment(Integer.valueOf(articleId));
        if(comment.size()>0){
           return result.success(comment);
        }else {
           return result.faile(null);
        }
    }

    @RequestMapping(value = "/saveComment",method = RequestMethod.POST)
    public String saveComment(String articleId,String comment,String sessionId){
        ResultCommon result = new ResultCommon();
        if(sessionId == null || "".equals(sessionId)){
            return result.faile("请登录后在评论");
        }
        UserEntity user = UserSession.getUser(sessionId);
        CommentEntity commentEntity = commentService.saveComment(articleId, comment,user.getId());
        List<ViewInfo> viewInfo = articleService.findArticleDetaile(Integer.valueOf(articleId));
        ArticleEntity articleEntity = viewInfo.get(0).getArticleEntity();
        WalletEntity userWallet = walletService.getUserWallet(articleEntity.getUserId());
        int money = userWallet.getMoney()+10;
        int totalMoney = userWallet.getTotalMoney()+10;
        walletService.updateUserWallet(money,totalMoney,articleEntity.getUserId());
        return result.success(0);
    }
}
