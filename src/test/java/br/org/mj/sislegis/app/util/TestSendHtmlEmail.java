package br.org.mj.sislegis.app.util;

import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;
import org.junit.Before;
import org.junit.Test;

/**
 * @author guilherme.hott
 * 
 */
public class TestSendHtmlEmail {

	String host = "smtp.gmail.com";
	String port = "587";
	String userName = "sislegissal";
	String userName2 = "guilherme.hott";
	String password = "Sislegis@123";
	String emailServer = "gmail.com";
	String emailServer2 = "gmail.com";

	@Before
	public void setUp() throws Exception {
	}

	@Test
	public void test() {

		final HtmlEmail htmlEmail = new HtmlEmail();

		try {
			String emailFrom = userName + "@" + emailServer;
			
			htmlEmail.setHostName(host);
			htmlEmail.setSmtpPort(Integer.parseInt(port));
			htmlEmail.setTLS(true);
			
			htmlEmail.setAuthenticator(new DefaultAuthenticator(userName, password));
			htmlEmail.setDebug(true);
			
			String body = "<b>Teste de email com formatacao HTML</b>"
					+ "</br></br>"
					+ "<p>Este eh um teste com <span style='font-size:24px'>HTML</span> e imagem:</p>"
					+ "<img src='http://gravatar.com/avatar/33aa7b88426235404466fe8f1f81aefd/?s=120&amp;d=identicon' width='120' height='120' alt='' class='no-grav header-image'>";


			htmlEmail.setFrom(emailFrom, userName);

			htmlEmail.setSubject("Teste de email do Sislegis");

			String emailDestinatarios = userName2 + "@" + emailServer;
			htmlEmail.addTo(emailDestinatarios, userName2);
			htmlEmail.addCc("sislegis-forum@googlegroups.com");

			htmlEmail.setHtmlMsg(body);

			htmlEmail.setCharset("UTF-8");
			htmlEmail.setSocketTimeout(5000);
			htmlEmail.send();
			System.out.println("EMail Sent Successfully with attachment!!");

		} catch (EmailException e) {
			e.printStackTrace();
		}
	}

}
