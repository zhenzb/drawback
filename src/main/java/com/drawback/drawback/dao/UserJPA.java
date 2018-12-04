package com.drawback.drawback.dao;


import com.drawback.drawback.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.io.Serializable;
import java.util.List;

public interface UserJPA extends JpaRepository<UserEntity,Integer>,JpaSpecificationExecutor<UserEntity>,Serializable {

    List<UserEntity> findUserEntityByUserName(String userName);

    UserEntity findUserEntityByUserNameIsAndPasswordIs(String userName,String password);

    UserEntity findUserEntityById(int userId);

    @Modifying
    @Transactional
    @Query(value = "UPDATE user set head_image=?1 where id=?2",nativeQuery = true)
    int updateUserInfo(String headImage,int id);


}
