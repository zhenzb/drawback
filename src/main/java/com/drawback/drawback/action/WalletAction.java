package com.drawback.drawback.action;

import com.drawback.drawback.commom.ResultCommon;
import com.drawback.drawback.commom.UserSession;
import com.drawback.drawback.model.UserEntity;
import com.drawback.drawback.model.WalletEntity;
import com.drawback.drawback.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * @ClassName WalletAction
 * @Description TODO
 * @Author yanhuo
 * @Date 2018/12/3 10:42
 * @Version 1.0
 **/
@RestController
@RequestMapping("/wallet")
public class WalletAction {
    @Autowired
    WalletService walletService;

    @RequestMapping(value = "/getUserWallet",method = RequestMethod.GET)
    public String getUserWallet(String sessionId){
        ResultCommon resultCommon = new ResultCommon();
        UserEntity user = UserSession.getUser(sessionId);
        WalletEntity userWallet = walletService.getUserWallet(user.getId());
        return resultCommon.success(userWallet);
    }

    @RequestMapping(value = "/bingwx",method = RequestMethod.POST)
    public String bingWx(String wxAccount, String realName, String sessionId){
        ResultCommon resultCommon = new ResultCommon();
        UserEntity user = UserSession.getUser(sessionId);
        int i = walletService.updateUserWx(wxAccount, realName, user.getId());
       return resultCommon.success(0);
    }

}
