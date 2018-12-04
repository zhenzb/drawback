package com.drawback.drawback.commom;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * @ClassName RandomNumber
 * @Description TODO
 * @Author yanhuo
 * @Date 2018/11/29 22:36
 * @Version 1.0
 **/
public class RandomNumber {

    public static String getNewVerificationCode(String phone) {
        String[] beforeShuffle = new String[] { "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" };
        List<String> list = Arrays.asList(beforeShuffle);
        Collections.shuffle(list);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < list.size(); i++) {
            sb.append(list.get(i));
        }
        String afterShuffle = sb.toString();
        String result = afterShuffle.substring(3, 9);

        try {
            /*SendSmsResponse response = SmsUtil.sendSms(phone, "惠点科技", "SMS_128790134", "{\"code\":\""+ result +"\"}", phone);
            System.out.println("短信接口返回的数据----------------");
            System.out.println("Code=" + response.getCode());
            System.out.println("Message=" + response.getMessage());
            System.out.println("RequestId=" + response.getRequestId());
            System.out.println("BizId=" + response.getBizId());*/
            /*int sid = sendObjectCreate(932, phone, "惠点科技", "SMS_128790134", "{\"code\":\""+ result +"\"}", phone, BaseCache.getTIME());
            ResultPoor.getResult(sid);*/

        } catch (Exception e) {
            e.printStackTrace();
            return "000000";
        }

        return result;
    }
}
