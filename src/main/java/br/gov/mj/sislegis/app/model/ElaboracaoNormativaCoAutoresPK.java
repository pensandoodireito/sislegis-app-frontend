package br.gov.mj.sislegis.app.model;

import java.io.Serializable;

import javax.persistence.Embeddable;

@Embeddable
public class ElaboracaoNormativaCoAutoresPK implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private long idElaboracaoNormativa;
	private long idOrgao;
	
	public ElaboracaoNormativaCoAutoresPK(long idElaboracaoNormativa, long idOrgao){
		super();
		this.idElaboracaoNormativa=idElaboracaoNormativa;
		this.idOrgao=idOrgao;
	}

	public ElaboracaoNormativaCoAutoresPK(){
		super();
	}

	public long getIdElaboracaoNormativa() {
		return idElaboracaoNormativa;
	}

	public void setIdElaboracaoNormativa(long idElaboracaoNormativa) {
		this.idElaboracaoNormativa = idElaboracaoNormativa;
	}

	public long getIdOrgao() {
		return idOrgao;
	}

	public void setIdOrgao(long idOrgao) {
		this.idOrgao = idOrgao;
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (idElaboracaoNormativa ^ (idElaboracaoNormativa >>> 32));
		result = prime * result + (int) (idOrgao ^ (idOrgao >>> 32));
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ElaboracaoNormativaCoAutoresPK other = (ElaboracaoNormativaCoAutoresPK) obj;
		if (idElaboracaoNormativa != other.idElaboracaoNormativa)
			return false;
		if (idOrgao != other.idOrgao)
			return false;
		return true;
	}	
}
