package br.gov.mj.sislegis.app.util;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

public class SislegisUtil {
	
	
	public static String getDataAtual() {
		Calendar calendar = Calendar.getInstance();
		return Conversores.dateToString(calendar.getTime());
	}

	public static Date getDate() {
		Calendar calendar = Calendar.getInstance();
		return calendar.getTime();
	}
	
	public static Date getFutureDate() {
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.YEAR, 1);
		return calendar.getTime();
	}

	public static List<String> jsonArrayToList(String jsonArray) {
		JSONArray array = new JSONArray("["+jsonArray+"]");
		List<String> lista = new ArrayList<String>();
		for(int i = 0; i < array.length(); i++){
			JSONObject jsonObject = array.getJSONObject(i);
			if(jsonObject.length()>0){
			    lista.add(jsonObject.get(String.valueOf(i)).toString());
			}
		}
		return lista;
	}
}
