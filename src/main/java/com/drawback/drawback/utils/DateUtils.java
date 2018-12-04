package com.drawback.drawback.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @ClassName DateUtils
 * @Description TODO
 * @Author yanhuo
 * @Date 2018/11/28 17:40
 * @Version 1.0
 **/
public class DateUtils {

    public static String getTime(){
        SimpleDateFormat df = new SimpleDateFormat("YY-MM-dd HH:mm:ss");//设置日期格式
        return df.format(new Date());
    }
}
