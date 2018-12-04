package com.drawback.drawback.model;

import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.io.Serializable;

/**
 * @ClassName UserEntity
 * @Description TODO
 * @Author yanhuo
 * @Date 2018/11/27 19:52
 * @Version 1.0
 **/
@Entity
@Table(name = "user")
public class UserEntity implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;
    @Column(name = "user_name")
    private String userName;
    @Column(name="password")
    private String password;
    @Column(name = "sex")
    private int sex;
    @Column(name = "phone")
    private String phone;
    @Column(name = "create_time")
    private String createTime;
    @Column(name="status")
    private int status;
    @Column(name = "head_image")
    private String headImage;
    @Column(name = "level")
    private int level;
    @Column(name = "remark")
    private String remark;


    public int getId() {
        return id;
    }
    public void setId(int id){
        this.id=id;
    }
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getSex() {
        return sex;
    }

    public void setSex(int sex) {
        this.sex = sex;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getHeadImage() {
        return headImage;
    }

    public void setHeadImage(String headImage) {
        this.headImage = headImage;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}
