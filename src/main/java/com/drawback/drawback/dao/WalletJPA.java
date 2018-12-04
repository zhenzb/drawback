package com.drawback.drawback.dao;

import com.drawback.drawback.model.WalletEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.io.Serializable;

public interface WalletJPA extends JpaRepository<WalletEntity,Integer>,JpaSpecificationExecutor<WalletEntity>,Serializable {

    WalletEntity findWalletEntityByUserId(int userId);

    @Modifying
    @Transactional
    @Query(value = "UPDATE wallet set wx_account=?1,real_name=?2 where id=?3",nativeQuery = true)
    int updateUserWx(String wxAccount,String realName,int id);

    @Modifying
    @Transactional
    @Query(value = "UPDATE wallet set money=?1,total_money=?2 where id=?3",nativeQuery = true)
    int updateUserWallet(int money,int totalName,int id);
}
