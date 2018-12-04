package com.drawback.drawback.service;

import com.drawback.drawback.dao.UserJPA;
import com.drawback.drawback.model.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @ClassName UserService
 * @Description TODO
 * @Author yanhuo
 * @Date 2018/11/29 22:34
 * @Version 1.0
 **/
@Service
public class UserService {
    @Autowired
    UserJPA userJPA;

    public List getUserByName(String userName){
        List<UserEntity> userEntityByUserName = userJPA.findUserEntityByUserName(userName);
        return userEntityByUserName;
    }

    public UserEntity saveuser(UserEntity userEntity){
        UserEntity user = userJPA.save(userEntity);
        return user;
    }


    public UserEntity findUser(String userName,String password){
        UserEntity userEntityByUserNameAndPasswordAndStatusIs = userJPA.findUserEntityByUserNameIsAndPasswordIs(userName, password);
        return userEntityByUserNameAndPasswordAndStatusIs;
    }

    public UserEntity getUserInfo(int userId){
        UserEntity userEntityById = userJPA.findUserEntityById(userId);
        return userEntityById;
    }

    public int updateuserInfo(String headImage,int id){
        int i = userJPA.updateUserInfo(headImage, id);
        return i;
    }

}
