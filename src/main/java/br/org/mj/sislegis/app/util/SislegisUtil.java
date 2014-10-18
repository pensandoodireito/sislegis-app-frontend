package br.org.mj.sislegis.app.util;

import java.util.Calendar;

public class SislegisUtil {
	
	
	public static String getDataAtual(){
		Calendar calendar = Calendar.getInstance();
		return Conversores.dateToString(calendar.getTime());
	}

}
