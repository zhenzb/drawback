package com.drawback.drawback.model;

import java.io.Serializable;

/**
 * @ClassName ViewInfo
 * @Description TODO
 * @Author yanhuo
 * @Date 2018/11/30 15:46
 * @Version 1.0
 **/
public class ViewInfo implements Serializable {
    private UserEntity userEntity;
    private ArticleEntity articleEntity;
    private CommentEntity commentEntity;


    public ViewInfo(UserEntity userEntity, CommentEntity commentEntity) {
        this.userEntity = userEntity;
        this.commentEntity = commentEntity;
    }

    public ViewInfo(){

    }
    /*public ViewInfo(UserEntity userEntity) {
        this.userEntity = userEntity;
    }*/

   /* public ViewInfo(ArticleEntity articleEntity) {
        this.articleEntity = articleEntity;
    }*/

    public ViewInfo(UserEntity userEntity, ArticleEntity articleEntity) {
        this.userEntity = userEntity;
        this.articleEntity = articleEntity;
    }

    public UserEntity getUserEntity() {
        return userEntity;
    }

    public void setUserEntity(UserEntity userEntity) {
        this.userEntity = userEntity;
    }

    public ArticleEntity getArticleEntity() {
        return articleEntity;
    }

    public void setArticleEntity(ArticleEntity articleEntity) {
        this.articleEntity = articleEntity;
    }

    public CommentEntity getCommentEntity() {
        return commentEntity;
    }

    public void setCommentEntity(CommentEntity commentEntity) {
        this.commentEntity = commentEntity;
    }
}
