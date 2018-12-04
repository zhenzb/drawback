package com.drawback.drawback.dao;

import com.drawback.drawback.model.CommentEntity;
import com.drawback.drawback.model.ViewInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.io.Serializable;
import java.util.List;

/**
 * @ClassName CommentJPA
 * @Description TODO
 * @Author yanhuo
 * @Date 2018/11/28 13:32
 * @Version 1.0
 **/
public interface CommentJPA extends JpaRepository<CommentEntity,Integer>,JpaSpecificationExecutor<CommentEntity>,Serializable {

    @Query(value = "select new com.drawback.drawback.model.ViewInfo(u,c) from CommentEntity c LEFT JOIN com.drawback.drawback.model.UserEntity u on c.userId=u.id where c.articleId=?1 and c.status=?2 ORDER BY c.createTime desc")
    List<ViewInfo> findCommentEntityByArticleIdIsAndStatusIsOrderByIdDesc(int articleId, int status);
}
