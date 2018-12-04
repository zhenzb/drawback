package com.drawback.drawback.model;

import javax.persistence.*;
import java.io.Serializable;

/**
 * @ClassName CommentEntity
 * @Description TODO
 * @Author yanhuo
 * @Date 2018/11/28 12:13
 * @Version 1.0
 **/
@Entity
@Table(name = "comment")
public class CommentEntity implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;
    @Column(name = "article_id")
    private int articleId;
    @Column(name = "user_id")
    private int userId;
    @Column(name = "create_time")
    private String createTime;
    @Column(name = "comment",columnDefinition = "text COMMENT'评论'")
    private String comment;
    @Column(name = "status")
    private int status;

    public int getId() {
        return id;
    }
    public void setId(int id){
        this.id=id;
    }
    public int getArticleId() {
        return articleId;
    }

    public void setArticleId(int articleId) {
        this.articleId = articleId;
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

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
