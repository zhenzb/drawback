package com.drawback.drawback.utils;
import com.alibaba.fastjson.JSONObject;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * @ClassName HttpUtils
 * @Description TODO
 * @Author yanhuo
 * @Date 2018/12/5 0:04
 * @Version 1.0
 **/
public class HttpUtils {

    //static  private String key = "4a8cf76b6df04f0bad8394b7812550c3";
    public static JSONObject getData(String urls){
        StringBuffer sb = new StringBuffer();
        try {
            URL url = new URL(urls);
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("GET");
                connection.connect();
            /*int responseCode = connection.getResponseCode();
            System.out.println("responseCode:"+responseCode);*/
            InputStream inputStream = connection.getInputStream();
            BufferedReader br = new BufferedReader(new InputStreamReader(inputStream,"UTF-8"));
            String temp = null;
            while((temp = br.readLine())!=null){
                sb.append(temp);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        JSONObject jsonObject = JSONObject.parseObject(sb.toString());
        System.out.println("result:"+jsonObject);
        return jsonObject;
    }
}
