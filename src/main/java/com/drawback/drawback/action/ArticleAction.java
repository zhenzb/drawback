package com.drawback.drawback.action;

import com.drawback.drawback.commom.MySessionContext;
import com.drawback.drawback.commom.ResultCommon;
import com.drawback.drawback.commom.UploadImageCommon;
import com.drawback.drawback.commom.UserSession;
import com.drawback.drawback.model.UserEntity;
import com.drawback.drawback.model.WalletEntity;
import com.drawback.drawback.service.ArticleService;
import com.drawback.drawback.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.criteria.CriteriaBuilder;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

/**
 * @ClassName ArticleAction
 * @Description TODO
 * @Author yanhuo
 * @Date 2018/11/27 16:26
 * @Version 1.0
 **/
@RestController
@RequestMapping("/article")
public class ArticleAction {
    @Value("${localtion.userImageUrl}")
    private String localtionUserImageUrl;
    @Value("${http.userImageUrl}")
    private String httpUserImageUrl;
    @Autowired
    ArticleService articleService;
    @Autowired
    WalletService walletService;
    @RequestMapping(value = "/getArticle",method = RequestMethod.GET)
    public String getArticle(HttpServletResponse response,String status){
        response.setHeader("Access-Control-Allow-Origin", "*");
        ResultCommon resultCommon = new ResultCommon();
        String result="";
        try {
            List articleList = articleService.getArticleList(Integer.valueOf(status));
            result = resultCommon.success(articleList);
        }catch (Exception e){
            e.printStackTrace();
            result= resultCommon.faile(null);
        }

        return result;
    }

    @RequestMapping(value = "/getArticleDetaile",method = RequestMethod.GET)
    public String getArticleDetaile(HttpServletResponse response,String articleId){
        response.setHeader("Access-Control-Allow-Origin", "*");
        ResultCommon resultCommon = new ResultCommon();
        String result="";
        try {
            List articleList = articleService.findArticleDetaile(Integer.valueOf(articleId));
            result = resultCommon.success(articleList);
        }catch (Exception e){
            e.printStackTrace();
            result= resultCommon.faile(null);
        }

        return result;
    }

    @RequestMapping(value = "/getArticleByUserId",method = RequestMethod.GET)
    public String getArticleByUserId(HttpServletResponse response,HttpServletRequest request){
        response.setHeader("Access-Control-Allow-Origin", "*");
        String id = request.getParameter("sessionId");
        HttpSession session = MySessionContext.getSession(id);
        UserEntity user = null;
        if (null !=session){
            user = (UserEntity)session.getAttribute("user");
        }
        ResultCommon resultCommon = new ResultCommon();
        String result="";
        try {
            List articleList = articleService.getArticleByUser(user.getId());
            result = resultCommon.success(articleList);
        }catch (Exception e){
            e.printStackTrace();
            result= resultCommon.faile(null);
        }

        return result;
    }

    @RequestMapping(value = "/updateArticleFunny",method = RequestMethod.POST)
    public String updateArticleFunny(String articleId,String sessionId){
        ResultCommon resultCommon = new ResultCommon();
        int funny = articleService.updateArticleFunny(Integer.valueOf(articleId));
        System.out.println("ID为:"+articleId+" 获得 "+funny+" 赞");
        return resultCommon.success(funny);
    }

    /**
     * 审核趣事 增加钱包
     * @param articleId
     * @param sessionId
     * @param status
     * @return
     */
    @RequestMapping(value = "/updateArticleStatus",method = RequestMethod.POST)
    public String updateArticleStatus(String articleId,String sessionId,String status){
        ResultCommon resultCommon = new ResultCommon();
        UserEntity user = UserSession.getUser(sessionId);
        int i = articleService.updateArticleStatus(Integer.valueOf(articleId),Integer.valueOf(status));
        WalletEntity userWallet = walletService.getUserWallet(user.getId());
        int money = userWallet.getMoney()+5;
        int totalMoney = userWallet.getTotalMoney()+5;
        walletService.updateUserWallet(money,totalMoney,user.getId());
        return resultCommon.success(i);
    }

    @RequestMapping(value = "/saveArticle",method = RequestMethod.POST)
    public String saveArticle(HttpServletRequest request){
        ResultCommon resultCommon = new ResultCommon();
        UploadImageCommon uploadImageCommon = new UploadImageCommon();
        Map<String, String> map = uploadImageCommon.upload(request,localtionUserImageUrl,httpUserImageUrl);
        String article = map.get("article");
        String sessionId = map.get("sessionId");
        String img = map.get("img");
        HttpSession session = MySessionContext.getSession(sessionId);
        UserEntity user = null;
        if (null !=session){
            user = (UserEntity)session.getAttribute("user");
        }
        articleService.articleSave(article,img,user.getId());
        return resultCommon.success("0");
    }

}
