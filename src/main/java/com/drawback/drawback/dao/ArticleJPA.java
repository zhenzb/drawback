package com.drawback.drawback.dao;

import com.drawback.drawback.model.ArticleEntity;
import com.drawback.drawback.model.ViewInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.io.Serializable;
import java.util.List;

@Repository
public interface ArticleJPA extends JpaRepository<ArticleEntity,Integer>,JpaSpecificationExecutor<ArticleEntity>,CrudRepository<ArticleEntity,Integer>,Serializable{
    //按时间查询
    @Query(value = "select new com.drawback.drawback.model.ViewInfo(u,a) from ArticleEntity a LEFT JOIN com.drawback.drawback.model.UserEntity u on a.userId = u.id where a.status=?1 order by a.id Desc")
    List<ViewInfo> findArticleEntities(int status);
    //按热度查询
    @Query(value = "select new com.drawback.drawback.model.ViewInfo(u,a) from ArticleEntity a LEFT JOIN com.drawback.drawback.model.UserEntity u on a.userId = u.id where a.status=?1 order by a.comment Desc")
    List<ViewInfo> findArticleEntitiesByRedu(int status);

    @Query(value = "select new com.drawback.drawback.model.ViewInfo(u,a) from ArticleEntity a LEFT JOIN com.drawback.drawback.model.UserEntity u on a.userId = u.id where a.id=?1")
    List<ViewInfo> findArticleEntityDetaile(int articleId);

    @Query(value = "select new com.drawback.drawback.model.ViewInfo(u,a) from ArticleEntity a LEFT JOIN com.drawback.drawback.model.UserEntity u on a.userId = u.id where a.userId=?1 order by a.status Desc")
    List findArticleEntitiesByStatusIsAndUserIdIsOrderByIdDesc(int userId);

    ArticleEntity findArticleEntitiesById(int id);
    @Modifying
    @Transactional
    @Query(value = "UPDATE article set funny=?1 where id=?2",nativeQuery = true)
    int updateArticleFunny(int funny,int id);

    @Modifying
    @Transactional
    @Query(value = "UPDATE article set status=?1 where id=?2",nativeQuery = true)
    int updateArticleStatus(int status,int id);

    @Modifying
    @Transactional
    @Query(value = "UPDATE article set comment=?1 where id=?2",nativeQuery = true)
    int updateArticleComment(int comment,int id);
}
