package com.drawback.drawback.commom;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;

/**
 * @ClassName ResultCommon
 * @Description TODO
 * @Author yanhuo
 * @Date 2018/11/27 16:46
 * @Version 1.0
 **/
public class ResultCommon {

    public static String success(Object obj){
        JSONObject result = new JSONObject();
        result.put("code","0");
        result.put("msg","");
        result.put("result",obj);
        return JSON.toJSONString(result, SerializerFeature.DisableCircularReferenceDetect);
    }
    public static String  faile(Object obj){
        JSONObject result = new JSONObject();
        result.put("code","1");
        result.put("msg","");
        result.put("result",obj);
        return result.toString();
    }
}
