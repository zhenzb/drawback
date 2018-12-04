package com.drawback.drawback;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication
@ServletComponentScan
public class DrawbackApplication {

	public static void main(String[] args) {
		SpringApplication.run(DrawbackApplication.class, args);
	}
}
