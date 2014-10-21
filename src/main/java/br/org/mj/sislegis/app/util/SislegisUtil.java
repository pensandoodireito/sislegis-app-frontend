package br.org.mj.sislegis.app.util;

import java.util.Calendar;
import java.util.Date;

public class SislegisUtil {
	
	
	public static String getDataAtual(){
		Calendar calendar = Calendar.getInstance();
		return Conversores.dateToString(calendar.getTime());
	}

	public static Date getDate(){
		Calendar calendar = Calendar.getInstance();
		return calendar.getTime();
	}

}
