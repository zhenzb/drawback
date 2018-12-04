package com.drawback.drawback.dao;

import com.drawback.drawback.model.WithdrawalsrecordEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.io.Serializable;
import java.util.List;

public interface WithdrawalRecordJPA extends JpaRepository<WithdrawalsrecordEntity,Integer>,JpaSpecificationExecutor<WithdrawalsrecordEntity>,Serializable {

    List<WithdrawalsrecordEntity> findWithdrawalsrecordEntityByUserIdIs(int userId);

}
