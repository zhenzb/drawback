package com.drawback.drawback.action;

import com.drawback.drawback.commom.MySessionContext;
import com.drawback.drawback.commom.UserSession;
import com.drawback.drawback.model.UserEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * @ClassName MainAction
 * @Description TODO
 * @Author yanhuo
 * @Date 2018/11/17 9:46
 * @Version 1.0
 **/
@Controller
public class MainAction {

    @RequestMapping(value="/main",method = RequestMethod.GET)
    public ModelAndView main(ModelAndView modelAndView,HttpServletRequest request){
        String id = request.getParameter("sessionId");
        modelAndView.addObject("sessionId",id);
        modelAndView.setViewName("html/receipt");
        return modelAndView;
    }

    @RequestMapping(value = "/min",method = RequestMethod.GET)
    public ModelAndView min(ModelAndView modelAndView, HttpServletRequest request, HttpServletResponse response) throws IOException {
        String sessionId = request.getParameter("sessionId");
        UserEntity user = UserSession.getUser(sessionId);
        if(user == null){
            response.sendRedirect(request.getContextPath()+"/goLogin");
        }
        modelAndView.addObject("sessionId",sessionId);
        modelAndView.setViewName("html/min");
        return modelAndView;
    }
    @RequestMapping(value = "/register",method = RequestMethod.GET)
    public ModelAndView register(ModelAndView modelAndView){
        modelAndView.setViewName("html/register");
        return modelAndView;
    }
    @RequestMapping(value = "/goLogin",method = RequestMethod.GET)
    public ModelAndView goLogin(ModelAndView modelAndView){
        modelAndView.setViewName("html/login");
        return modelAndView;
    }
    @RequestMapping(value = "/goCenter",method = RequestMethod.GET)
    public ModelAndView goCenter(ModelAndView modelAndView,HttpServletRequest request,HttpServletResponse response) throws IOException {
        String sessionId = request.getParameter("sessionId");
        UserEntity user = UserSession.getUser(sessionId);
        if(user == null){
            response.sendRedirect(request.getContextPath()+"/goLogin");
        }
        modelAndView.addObject("sessionId",sessionId);
        modelAndView.setViewName("html/center");
        return modelAndView;
    }

    @RequestMapping(value = "/wallet",method = RequestMethod.GET)
    public ModelAndView wallet(ModelAndView modelAndView,HttpServletRequest request){
        String sessionId = request.getParameter("sessionId");
        modelAndView.addObject("sessionId",sessionId);
        modelAndView.setViewName("html/wallet");
        return modelAndView;
    }

    @RequestMapping(value = "/bindwechart",method = RequestMethod.GET)
    public ModelAndView bindWechart(ModelAndView modelAndView,HttpServletRequest request){
        String sessionId = request.getParameter("sessionId");
        modelAndView.addObject("sessionId",sessionId);
        modelAndView.setViewName("html/bingwechart");
        return modelAndView;
    }

    @RequestMapping(value = "/wxwithdraw",method = RequestMethod.GET)
    public ModelAndView wxWithdraw(ModelAndView modelAndView,HttpServletRequest request){
        String sessionId = request.getParameter("sessionId");
        modelAndView.addObject("sessionId",sessionId);
        modelAndView.setViewName("html/wxwithdraw");
        return modelAndView;
    }

    @RequestMapping(value = "/withdrawalRecorde",method = RequestMethod.GET)
    public ModelAndView withdrawalRecorde(ModelAndView modelAndView,HttpServletRequest request){
        String sessionId = request.getParameter("sessionId");
        modelAndView.addObject("sessionId",sessionId);
        modelAndView.setViewName("html/withdrawalRecorde");
        return modelAndView;
    }

    @RequestMapping(value = "/checkReceipt",method = RequestMethod.GET)
    public ModelAndView checkReceipt(ModelAndView modelAndView,HttpServletRequest request,HttpServletResponse response) throws IOException {
        String sessionId = request.getParameter("sessionId");
        UserEntity user = UserSession.getUser(sessionId);
        if(user == null){
            response.sendRedirect(request.getContextPath()+"/goLogin");
        }
        modelAndView.addObject("sessionId",sessionId);
        modelAndView.setViewName("html/checkreceipt");
        return modelAndView;
    }

    @RequestMapping(value = "/receiptDetaile",method = RequestMethod.GET)
    public ModelAndView receiptDetaile(ModelAndView modelAndView,HttpServletRequest request,String articleId){
        String sessionId = request.getParameter("sessionId");
        modelAndView.addObject("sessionId",sessionId);
        modelAndView.addObject("articleId",articleId);
        modelAndView.setViewName("html/receiptdetaile");
        return modelAndView;
    }
}
