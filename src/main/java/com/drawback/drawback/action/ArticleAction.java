package com.drawback.drawback.action;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.drawback.drawback.commom.MySessionContext;
import com.drawback.drawback.commom.ResultCommon;
import com.drawback.drawback.commom.UploadImageCommon;
import com.drawback.drawback.commom.UserSession;
import com.drawback.drawback.model.UserEntity;
import com.drawback.drawback.model.WalletEntity;
import com.drawback.drawback.service.ArticleService;
import com.drawback.drawback.service.WalletService;
import com.drawback.drawback.utils.HttpUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.criteria.CriteriaBuilder;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
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
    public String getArticle(HttpServletResponse response,String status,String order){
        response.setHeader("Access-Control-Allow-Origin", "*");
        ResultCommon resultCommon = new ResultCommon();
        String result="";
        try {
            if(null == order){
                order = "0";
            }
            List articleList = articleService.getArticleList(Integer.valueOf(status),Integer.valueOf(order));
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
    public String updateArticleFunny(String articleId,String sessionId,HttpServletResponse response){
        response.setHeader("Access-Control-Allow-Origin", "*");
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
    public String updateArticleStatus(String articleId,String sessionId,String status,HttpServletResponse response){
        response.setHeader("Access-Control-Allow-Origin", "*");
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
        String video = map.get("video");
        HttpSession session = MySessionContext.getSession(sessionId);
        UserEntity user = null;
        if (null !=session){
            user = (UserEntity)session.getAttribute("user");
        }
        articleService.articleSave(article,img,video,user.getId());
        return resultCommon.success("0");
    }

    @RequestMapping(value = "/getJokeAPI",method = RequestMethod.GET)
    public void getJokeAPI(){
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date=new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, -363);
        date = calendar.getTime();
        long time = date.getTime();
        System.out.println(sdf.format(time));
        String url = "https://api.avatardata.cn/Joke/QueryJokeByTime?key=4a8cf76b6df04f0bad8394b7812550c3&page=2&sort=asc&time=TIMESTAMP";
        url = url.replace("TIMESTAMP",String.valueOf(time).substring(0,10));
        JSONObject jokeData = HttpUtils.getData(url);
        JSONArray result = jokeData.getJSONArray("result");
        for (int i=0;i<result.size();i++){
            JSONObject jsonObject = result.getJSONObject(i);
            String content = jsonObject.getString("content");
            articleService.articleSave(content,null,null,10);
        }

    }

}
