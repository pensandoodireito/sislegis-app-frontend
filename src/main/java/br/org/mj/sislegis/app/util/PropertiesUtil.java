package br.org.mj.sislegis.app.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class PropertiesUtil {
	private static Properties properties = new Properties();
	
	static {
		new PropertiesUtil().loadProps();
	}
    
    public static void main(String[] args) {
        //sample.configProp.get("upload_path");
        System.out.println(PropertiesUtil.getProperties().getProperty("upload_path"));
    }
    
    public static Properties getProperties() {
    	return properties;
    }
 
    private void loadProps() {
        InputStream in = this.getClass().getResourceAsStream("/config.properties");
        try {
            properties.load(in);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
