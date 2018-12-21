package com.drawback.drawback.model;

import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.io.Serializable;

/**
 * @ClassName ArticleEntity
 * @Description TODO
 * @Author yanhuo
 * @Date 2018/11/27 16:02
 * @Version 1.0
 **/
@Entity
@Table(name="article")
public class ArticleEntity implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;
    @Column(name = "title")
    private String title;
    @Column(name = "content",columnDefinition = "text COMMENT'正文内容'")
    private String content;
    @Column(name = "img")
    private String img;
    @Column(name = "video")
    private String video;
    @Column(name = "user_id",columnDefinition = "int(20)")
    private int userId;
    @Column(name="create_time")
    private String createTime;
    @Column(name="edit_time")
    private String editTime;
    @Column(name="status",columnDefinition = "int(5)")
    private int status;
    @Column(name = "funny",columnDefinition = "int(20)")
    private int funny;
    @Column(name = "comment",columnDefinition = "int(20)")
    private int comment;
    @Transient


    public int getId() {
        return id;
    }
    public void setId(int id){
        this.id=id;
    }
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
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

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getFunny() {
        return funny;
    }

    public void setFunny(int funny) {
        this.funny = funny;
    }

    public int getComment() {
        return comment;
    }

    public void setComment(int comment) {
        this.comment = comment;
    }

    public String getVideo() {
        return video;
    }

    public void setVideo(String video) {
        this.video = video;
    }


    /*public ArticleEntity(){

    }
    public ArticleEntity(String title, String content, String img, int userId, String createTime, String editTime, int status, int funny, int comment, String userName, String headImage) {
        this.title = title;
        this.content = content;
        this.img = img;
        this.userId = userId;
        this.createTime = createTime;
        this.editTime = editTime;
        this.status = status;
        this.funny = funny;
        this.comment = comment;
        this.userName = userName;
        this.headImage = headImage;
    }*/
}
