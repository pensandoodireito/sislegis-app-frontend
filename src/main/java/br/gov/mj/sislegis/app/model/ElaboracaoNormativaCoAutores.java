package br.gov.mj.sislegis.app.model;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class ElaboracaoNormativaCoAutores implements AbstractEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7949894944142814382L;
	
	@EmbeddedId
	private ElaboracaoNormativaCoAutoresPK elaboracaoNormativaCoAutoresPK;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("idElaboracaoNormativa")
	private ElaboracaoNormativa elaboracaoNormativa;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("idOrgao")
	private Orgao orgao;


	public ElaboracaoNormativa getElaboracaoNormativa() {
		return elaboracaoNormativa;
	}

	public void setElaboracaoNormativa(ElaboracaoNormativa elaboracaoNormativa) {
		this.elaboracaoNormativa = elaboracaoNormativa;
	}

	public Orgao getOrgao() {
		return orgao;
	}

	public void setOrgao(Orgao orgao) {
		this.orgao = orgao;
	}
	
	public Number getId() {
		return elaboracaoNormativaCoAutoresPK.hashCode();
	}

	public ElaboracaoNormativaCoAutoresPK getElaboracaoNormativaCoAutoresPK() {
		return elaboracaoNormativaCoAutoresPK;
	}

	public void setElaboracaoNormativaCoAutoresPK(
			ElaboracaoNormativaCoAutoresPK elaboracaoNormativaCoAutoresPK) {
		this.elaboracaoNormativaCoAutoresPK = elaboracaoNormativaCoAutoresPK;
	}
	
}
