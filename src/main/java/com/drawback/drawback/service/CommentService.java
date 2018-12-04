package com.drawback.drawback.service;

import com.drawback.drawback.dao.ArticleJPA;
import com.drawback.drawback.dao.CommentJPA;
import com.drawback.drawback.model.ArticleEntity;
import com.drawback.drawback.model.CommentEntity;
import com.drawback.drawback.model.ViewInfo;
import com.drawback.drawback.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @ClassName CommentService
 * @Description TODO
 * @Author yanhuo
 * @Date 2018/11/28 13:43
 * @Version 1.0
 **/
@Service
public class CommentService {
    @Autowired
    private CommentJPA commentJPA;
    @Autowired
    private ArticleJPA articleJPA;

    public List<ViewInfo> findComment(int articleId){
        List<ViewInfo> comment = commentJPA.findCommentEntityByArticleIdIsAndStatusIsOrderByIdDesc(articleId, 0);
        return comment;

    }

    public CommentEntity saveComment(String articleId,String comment,int userId){

        CommentEntity commentEntity = new CommentEntity();
        String time = DateUtils.getTime();
           commentEntity.setArticleId(Integer.valueOf(articleId));
           commentEntity.setComment(comment);
           commentEntity.setCreateTime(time);
           commentEntity.setStatus(0);
           commentEntity.setUserId(userId);
        CommentEntity save = commentJPA.save(commentEntity);
        //更新文章评论数
        ArticleEntity articleEntitiesById = articleJPA.findArticleEntitiesById(Integer.valueOf(articleId));
        int comment1 = articleEntitiesById.getComment();
        int commentResult = ++comment1;
        articleJPA.updateArticleComment(commentResult,Integer.valueOf(articleId));
        return save;
    }
}
