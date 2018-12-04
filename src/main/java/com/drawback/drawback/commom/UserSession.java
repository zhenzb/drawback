package com.drawback.drawback.commom;

import com.drawback.drawback.model.UserEntity;

import javax.servlet.http.HttpSession;

/**
 * @ClassName UserSession
 * @Description TODO
 * @Author yanhuo
 * @Date 2018/12/1 7:16
 * @Version 1.0
 **/
public class UserSession {

    public static UserEntity getUser(String sessionId){
        HttpSession session = MySessionContext.getSession(sessionId);
        UserEntity user = null;
        if (null !=session){
            user = (UserEntity)session.getAttribute("user");
        }
        return user;
    }
}
