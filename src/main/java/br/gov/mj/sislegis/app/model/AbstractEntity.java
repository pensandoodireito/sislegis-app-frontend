package br.gov.mj.sislegis.app.model;

import java.io.Serializable;

/**
 * Estipula um contrato base para as entidades persistentes da aplicacao.
 * 
 * @author raphael.santos
 *
 */
public interface AbstractEntity extends Serializable {

	/**
	 * @return A referencia para a chave primaria (Primary Key) de cada objeto persistido.
	 * 		   Caso o objeto ainda não tenha sido persistido, deve retornar <code>null</code>.
	 */
	public Number getId();
	
}
