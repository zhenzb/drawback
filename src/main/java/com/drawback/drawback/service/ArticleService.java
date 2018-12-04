package com.drawback.drawback.service;

import com.drawback.drawback.dao.ArticleJPA;
import com.drawback.drawback.model.ArticleEntity;
import com.drawback.drawback.model.ViewInfo;
import com.drawback.drawback.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @ClassName ArticleService
 * @Description TODO
 * @Author yanhuo
 * @Date 2018/11/27 16:38
 * @Version 1.0
 **/
@Service
public class ArticleService {
    @Autowired
    private ArticleJPA articleJPA;

    public List getArticleList(int status){
        List<ViewInfo> articleList = articleJPA.findArticleEntities(status);
        return articleList;
    }
    public List findArticleDetaile(int articleId){
        List<ViewInfo> articleList = articleJPA.findArticleEntityDetaile(articleId);
        return articleList;
    }

    public List getArticleByUser(int userId){
        List articleList = articleJPA.findArticleEntitiesByStatusIsAndUserIdIsOrderByIdDesc(1,userId);
        return articleList;
    }

    public int updateArticleFunny(int id){
        ArticleEntity article = articleJPA.findArticleEntitiesById(id);
        int funny1 = article.getFunny();
        int funny =++funny1;
        int i = articleJPA.updateArticleFunny(funny, id);
        return funny;
    }

    public int updateArticleStatus(int id,int status){
        int i = articleJPA.updateArticleStatus(status, id);
        return i;
    }

    public ArticleEntity articleSave(String article,String img,int userId){
        ArticleEntity articleEntity = new ArticleEntity();
        articleEntity.setContent(article);
        articleEntity.setCreateTime(DateUtils.getTime());
        articleEntity.setEditTime(DateUtils.getTime());
        articleEntity.setFunny(0);
        articleEntity.setImg(img);
        articleEntity.setStatus(0);
        articleEntity.setUserId(userId);
        articleEntity.setTitle("");
        return articleJPA.save(articleEntity);
    }
}
