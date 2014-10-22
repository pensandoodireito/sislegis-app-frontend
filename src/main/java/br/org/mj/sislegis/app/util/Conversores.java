package br.org.mj.sislegis.app.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class Conversores {

	private static final Locale LOCALE_BR = new Locale("pt", "BR");

	/**
	 * Converte uma Date para String <code>locale</code> configurado.
	 * 
	 * @param date
	 * @return
	 */
	public static String dateToString(Date date) {
		return getSimpleDateFormat("dd/MM/yyyy").format(date);
	}
	
	public static String dateToString(Date date, String format) {
		return getSimpleDateFormat(format).format(date);
	}

	/**
	 * Converte uma String para Date conforme o <code>locale</code> configurado.
	 * 
	 * @param string
	 * @return
	 */
	public static Date stringToDate(String string) throws ParseException {
		return getSimpleDateFormat("dd/MM/yyyy").parse(string);
	}
	
	public static Date stringToDate(String string, String format) throws ParseException {
		return getSimpleDateFormat(format).parse(string);
	}

	public static SimpleDateFormat getSimpleDateFormat(String mascara) {
		SimpleDateFormat format = new SimpleDateFormat(mascara);
		format.setLenient(false);
		return format;
	}

}
