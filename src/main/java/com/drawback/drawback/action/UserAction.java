package com.drawback.drawback.action;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.drawback.drawback.commom.*;
import com.drawback.drawback.dao.WalletJPA;
import com.drawback.drawback.model.UserEntity;
import com.drawback.drawback.model.WalletEntity;
import com.drawback.drawback.service.UserService;
import com.drawback.drawback.service.WalletService;
import com.drawback.drawback.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @ClassName UserAction
 * @Description TODO
 * @Author yanhuo
 * @Date 2018/11/29 22:11
 * @Version 1.0
 **/
@RestController
@RequestMapping("/user")
public class UserAction {
    @Autowired
    UserService userService;
    @Autowired
    WalletService walletService;
    @Value("${localtion.userImageUrl}")
    private String localtionUserImageUrl;
    @Value("${http.userImageUrl}")
    private String httpUserImageUrl;
    //手机验证码
    @RequestMapping(value = "/getNewVerificationCodeOptimize",method = RequestMethod.GET)
    public String getNewVerificationCodeOptimize(String phone) {
        ResultCommon resultCommon = new ResultCommon();
       /* String verificationCodeR = RedisClient.hget("phone_verification_code", phone, "verification_code");
        if(verificationCodeR!=null) {
            HashMap<String, Object> map = new HashMap<String, Object>();
            Long tll = RedisClient.tll("phone_verification_code", phone);
            map.put("tll", tll);
            return creatResult(2, "验证码已发送"+(tll/60+1)+"分后再试!", map).toString();
        }*/
        String verificationCode = RandomNumber.getNewVerificationCode(phone);
        if(verificationCode.equals("000000")) {
            return resultCommon.faile("短信发送失败");
        }
        RedisClient.hset("phone_verification_code",phone,"verification_code",verificationCode,300);
        return resultCommon.success("验证码："+verificationCode);
    }

    //用户注册
    @RequestMapping(value = "/addNewUserOptimize",method = RequestMethod.POST)
    public String addNewUserOptimize(String phone,String code,String userName,String password,HttpServletRequest request,
                                     HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        String base = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + "/upload/image/head.jpg";
        ResultCommon resultCommon = new ResultCommon();
        String verificationCode = RedisClient.hget("phone_verification_code", phone, "verification_code");
        if(verificationCode!=null && verificationCode.equals(code)) {
            List userByName = userService.getUserByName(userName);
            HashMap<String, Object> map = new HashMap<String, Object>();
            //判断用户是否存在
            if(userByName.size() != 0) {
                return resultCommon.faile("该用户已注册");
            }else{
                new Thread(){
                    public void run(){
                        UserEntity user = new UserEntity();
                        user.setUserName(userName);
                        user.setPassword(password);
                        user.setPhone(phone);
                        user.setCreateTime(DateUtils.getTime());
                        user.setHeadImage(base);
                        UserEntity saveuser = userService.saveuser(user);
                        WalletEntity walletEntity = new WalletEntity();
                        walletEntity.setBalance(0);
                        walletEntity.setCreateTime(DateUtils.getTime());
                        walletEntity.setEditTime(DateUtils.getTime());
                        walletEntity.setMoney(0);
                        walletEntity.setStatus(0);
                        walletEntity.setTotalMoney(0);
                        walletEntity.setUserId(saveuser.getId());
                        walletService.saveUserWallet(walletEntity);
                        RedisClient.hdel("phone_verification_code", phone);
                    }
                }.start();
            }
            return resultCommon.success("恭喜！注册成功").toString();
        }else {
            return resultCommon.faile("验证码错误");
        }
    }

    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public String login(String userName, String password, HttpServletRequest request,HttpServletResponse response){
        response.setHeader("Access-Control-Allow-Origin", "*");
        ResultCommon resultCommon = new ResultCommon();
        if(null==userName || "".equals(userName)||null==password||"".equals(password)){
            return resultCommon.faile("账号密码不匹配");
        }else {
            UserEntity user = userService.findUser(userName, password);
            if(null == user){
                return resultCommon.faile("该账户未注册");
            }
            if(user.getStatus() !=0){
                return resultCommon.faile("该账户已被禁止登录");
            }
                HttpSession session = request.getSession();
                String id = session.getId();
                session.setAttribute("user",user);
                return resultCommon.success(id);

        }
    }

    @RequestMapping(value = "/centerUserInfo",method = RequestMethod.GET)
    public String centerUserInfo(HttpServletRequest request){
        JSONObject json = new JSONObject();
        String sessionId = request.getParameter("sessionId");
        UserEntity user = UserSession.getUser(sessionId);
        //UserEntity userInfo = userService.getUserInfo(user.getId());
        WalletEntity userWallet = walletService.getUserWallet(user.getId());
        json.put("code",0);
        json.put("user",user);
        json.put("wallet",userWallet);
        return json.toString();
    }

    @RequestMapping(value = "/uploadHeadImg",method = RequestMethod.POST)
    public String uploadHeadImg(HttpServletRequest request){
        ResultCommon resultCommon = new ResultCommon();
        String sessionId = request.getParameter("sessionId");
        UserEntity user = UserSession.getUser(sessionId);
        UploadImageCommon uploadImageCommon = new UploadImageCommon();
        Map<String, String> map = uploadImageCommon.upload(request,localtionUserImageUrl,httpUserImageUrl);
        String img = map.get("img");
        userService.updateuserInfo(img,user.getId());
        return resultCommon.success("头像上传成功");
    }

}
