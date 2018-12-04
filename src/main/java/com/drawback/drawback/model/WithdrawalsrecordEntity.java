package com.drawback.drawback.model;

import javax.persistence.*;

/**
 * @ClassName WithdrawalsrecordEntity
 * @Description TODO
 * @Author yanhuo
 * @Date 2018/12/3 11:04
 * @Version 1.0
 **/
@Entity
@Table(name = "withdrawal_record")
public class WithdrawalsrecordEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;
    @Column(name = "title")
    private String title;
    @Column(name = "money")
    private int money;
    @Column(name = "create_time")
    private String createTime;
    @Column(name = "remark")
    private String remark;
    @Column(name = "status")
    private int status;
    @Column(name = "userId")
    private int userId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getMoney() {
        return money;
    }

    public void setMoney(int money) {
        this.money = money;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
