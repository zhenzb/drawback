package com.drawback.drawback.commom;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.fileupload.servlet.ServletRequestContext;
import org.springframework.beans.factory.annotation.Value;

import javax.servlet.http.HttpServletRequest;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @ClassName UploadImageCommon
 * @Description TODO
 * @Author yanhuo
 * @Date 2018/11/29 14:11
 * @Version 1.0
 **/
public class UploadImageCommon {
    public  Map<String, String> upload(HttpServletRequest request,String localtionUserImageUrl,String httpUserImageUrl) {
        Map<String, String> map = new HashMap<>();
        String article = "";
        String sessionId = "";
        FileItem files = null;
        String fileName = null;
        InputStream in;
        OutputStream ops;
        String realFileName = "";
        // 重命名
        String extName = "";
        // 文件后缀
        String imagePath = "";
        try {
            request.setCharacterEncoding("utf-8");
            //2、获得磁盘文件条目工厂
            DiskFileItemFactory factory = new DiskFileItemFactory();
            //3、创建一个文件上传解析器
            ServletFileUpload upload = new ServletFileUpload(factory);
            //4、解决上传文件名的中文乱码
            upload.setHeaderEncoding("utf-8");
            //5、得到FileItem的集合items
            boolean isMultipart = ServletFileUpload.isMultipartContent(request);
            if (isMultipart) {
                List<FileItem> fileItems = upload.parseRequest(new ServletRequestContext(request));
                //6、遍历items
                for (FileItem item : fileItems) {
                    String fieldName = item.getFieldName();
                    SimpleDateFormat sdf1 = new SimpleDateFormat("YYYYMMddHHmmss");
                    Date date = new Date();
                    System.out.println(" filedName: " + fieldName);
                    //若是一个一般的表单域，打印信息
                    if (item.isFormField()) {
                        String value = item.getString("utf-8");
                        if ("article".equals(fieldName)) {
                            article = value;
                        }
                        if("sessionId".equals(fieldName)){
                            sessionId=value;
                        }
                    }else {
                        if ("file".equals(fieldName)) {
                            // 上传文件命名
                            realFileName = sdf1.format(date);
                            fileName = item.getName();
                            files = item;
                        }
                    }
                    //上传文件
                    if (files == null) {

                    } else {

                        try {
                            extName = fileName.substring(fileName.lastIndexOf("."));//.jpg
                            // 文件后缀名字
                            imagePath = localtionUserImageUrl + realFileName + extName;
                            //imagePath = PropertiesConf.WECHAT_IMAGE_LOACH_PATH + realFileName + extName;
                            ops = new FileOutputStream(imagePath);
                            in = files.getInputStream();
                            byte[] buff = new byte[1024];
                            int rc = 0;
                            while ((rc = in.read(buff)) > 0) {
                                ops.write(buff, 0, rc);
                            }

                            ops.close();
                            in.close();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
            //String base = realFileName + extName;
            String base = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + "/upload/image/" + realFileName + extName;
            if(!"".equals(realFileName)){
                map.put("img", base);
            }
            map.put("article",article);
            map.put("sessionId",sessionId);
        }catch (Exception e){
            e.printStackTrace();
        }
        return map;
    }
}
