package com.drawback.drawback.model;

import javax.persistence.*;

/**
 * @ClassName WalletEntity
 * @Description TODO
 * @Author yanhuo
 * @Date 2018/11/30 9:32
 * @Version 1.0
 **/
@Entity
@Table(name = "wallet")
public class WalletEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;
    @Column(name = "user_id")
    private int userId;
    @Column(name = "total_money")
    private int totalMoney;
    @Column(name = "money")
    private int money;
    @Column(name = "balance")
    private int balance;
    @Column(name="status")
    private int status;
    @Column(name = "create_time",columnDefinition = "varchar(50)")
    private String createTime;
    @Column(name = "edit_time",columnDefinition = "varchar(50)")
    private String editTime;

    @Column(name = "wx_account")
    private String wxAccount;
    @Column(name = "real_name")
    private String realName;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(int totalMoney) {
        this.totalMoney = totalMoney;
    }

    public int getMoney() {
        return money;
    }

    public void setMoney(int money) {
        this.money = money;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getEditTime() {
        return editTime;
    }

    public void setEditTime(String editTime) {
        this.editTime = editTime;
    }

    public int getBalance() {
        return balance;
    }

    public void setBalance(int balance) {
        this.balance = balance;
    }

    public String getWxAccount() {
        return wxAccount;
    }

    public void setWxAccount(String wxAccount) {
        this.wxAccount = wxAccount;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }
}
