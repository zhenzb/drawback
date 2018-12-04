package com.drawback.drawback.service;

import com.drawback.drawback.dao.WithdrawalRecordJPA;
import com.drawback.drawback.model.WithdrawalsrecordEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @ClassName WithdrawalRecordService
 * @Description TODO
 * @Author yanhuo
 * @Date 2018/12/3 11:17
 * @Version 1.0
 **/
@Service
public class WithdrawalRecordService {
    @Autowired
    WithdrawalRecordJPA withdrawalRecordJPA;

    public List<WithdrawalsrecordEntity> getUserWithdrawalRecord(int userId){
        List<WithdrawalsrecordEntity> withdrawalsrecordEntityByUserIdIs = withdrawalRecordJPA.findWithdrawalsrecordEntityByUserIdIs(userId);
    return withdrawalsrecordEntityByUserIdIs;
    }
}
