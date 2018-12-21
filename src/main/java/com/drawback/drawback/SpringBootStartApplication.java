package com.drawback.drawback;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * @ClassName SpringBootStartApplication
 * @Description TODO
 * @Author yanhuo
 * @Date 2018/12/18 14:44
 * @Version 1.0
 **/
public class SpringBootStartApplication extends SpringBootServletInitializer {
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        // 注意这里要指向原先用main方法执行的Application启动类
        return builder.sources(DrawbackApplication.class);
    }
}
