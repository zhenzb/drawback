package com.drawback.drawback.service;

import com.drawback.drawback.dao.WalletJPA;
import com.drawback.drawback.model.WalletEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @ClassName WalletService
 * @Description TODO
 * @Author yanhuo
 * @Date 2018/11/30 9:51
 * @Version 1.0
 **/
@Service
public class WalletService {
    @Autowired
    WalletJPA walletJPA;
    public WalletEntity getUserWallet(int userId){
        WalletEntity UserWallet = walletJPA.findWalletEntityByUserId(userId);
        return UserWallet;
    }

    public int updateUserWx(String wxAccount,String realName,int userId){
        int i = walletJPA.updateUserWx(wxAccount, realName,userId);
        return i;
    }

    public int updateUserWallet(int money,int totalMoney,int userId){
        int i = walletJPA.updateUserWallet(money, totalMoney,userId);
        return i;
    }

    public WalletEntity saveUserWallet(WalletEntity walletEntity){
        WalletEntity save = walletJPA.save(walletEntity);
        return save;
    }
}
