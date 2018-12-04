package com.drawback.drawback.commom;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

/**
 * @ClassName CommandLineRunner
 * @Description TODO
 * @Author yanhuo
 * @Date 2018/11/29 22:21
 * @Version 1.0
 **/
@Component
public class CommandLineRunner implements ApplicationListener{
    @Value("${redis}")
    private String redisurl;
    @Value("${redis.port}")
    private String redisPort;
    @Override
    public void onApplicationEvent(ApplicationEvent applicationEvent) {
        RedisClient.initialPool(redisurl,Integer.valueOf(redisPort),"phone_verification_code",0);
    }
}
