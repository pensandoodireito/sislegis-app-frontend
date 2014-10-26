package br.org.mj.sislegis.app.exception;


/**
 * Classe criada para organizar as mensagens de exceção no sistema
 * 
 * @author sislegis
 */
public class SislegisException extends RuntimeException {

	private String mensagem;
	
	public SislegisException(String mensagem){
		super(mensagem);
		this.mensagem = mensagem;
	}
	
}
