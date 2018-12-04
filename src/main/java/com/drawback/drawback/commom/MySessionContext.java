package com.drawback.drawback.commom;

import javax.servlet.http.HttpSession;
import java.util.HashMap;

/**
 * @ClassName MySessionContext
 * @Description TODO
 * @Author yanhuo
 * @Date 2018/11/30 23:11
 * @Version 1.0
 **/
public class MySessionContext {

    private static HashMap mymap = new HashMap();
      public static synchronized void AddSession(HttpSession session) {
                 if (session != null) {
                         mymap.put(session.getId(), session);
                     }
             }
      public static synchronized void DelSession(HttpSession session) {
                 if (session != null) {
                         mymap.remove(session.getId());
                     }
             }
     public static synchronized HttpSession getSession(String session_id) {
                 if (session_id == null)
                     return null;
                 return (HttpSession) mymap.get(session_id);
            }
}
