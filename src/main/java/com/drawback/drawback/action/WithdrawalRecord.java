package com.drawback.drawback.action;

import com.drawback.drawback.commom.ResultCommon;
import com.drawback.drawback.commom.UserSession;
import com.drawback.drawback.model.UserEntity;
import com.drawback.drawback.model.WithdrawalsrecordEntity;
import com.drawback.drawback.service.WithdrawalRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @ClassName WithdrawalRecord
 * @Description TODO
 * @Author yanhuo
 * @Date 2018/12/3 11:20
 * @Version 1.0
 **/
@RestController
@RequestMapping("/withdrawalRecord")
public class WithdrawalRecord {
    @Autowired
    WithdrawalRecordService withdrawalRecordService;
    @RequestMapping(value = "/getUserWithdrawalRecord",method = RequestMethod.GET)
    public String getUserWithdrawalRecord(String sessionId){
        ResultCommon resultCommon = new ResultCommon();
        UserEntity user = UserSession.getUser(sessionId);
        List<WithdrawalsrecordEntity> userWithdrawalRecord = withdrawalRecordService.getUserWithdrawalRecord(user.getId());
        return  resultCommon.success(userWithdrawalRecord);
    }
}
