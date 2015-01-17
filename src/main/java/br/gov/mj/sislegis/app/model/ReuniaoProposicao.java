package br.gov.mj.sislegis.app.model;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class ReuniaoProposicao implements AbstractEntity {

	private static final long serialVersionUID = 7949894944142814382L;

	@EmbeddedId
	private ReuniaoProposicaoPK reuniaoProposicaoPK;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("idReuniao")
	private Reuniao reuniao;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("idProposicao")
	private Proposicao proposicao;
	
	@Column
	private String siglaComissao;
	
	@Column
	private Integer seqOrdemPauta;

	@Column
	private String linkPauta;

	public String getSiglaComissao() {
		return siglaComissao;
	}

	public void setSiglaComissao(String siglaComissao) {
		this.siglaComissao = siglaComissao;
	}

	public Number getId() {
		return reuniaoProposicaoPK.hashCode();
	}

	public Reuniao getReuniao() {
		return reuniao;
	}

	public void setReuniao(Reuniao reuniao) {
		this.reuniao = reuniao;
	}

	public Proposicao getProposicao() {
		return proposicao;
	}

	public void setProposicao(Proposicao proposicao) {
		this.proposicao = proposicao;
	}

	public Integer getSeqOrdemPauta() {
		return seqOrdemPauta;
	}

	public String getLinkPauta() {
		return linkPauta;
	}

	public void setSeqOrdemPauta(Integer seqOrdemPauta) {
		this.seqOrdemPauta = seqOrdemPauta;
	}

	public void setLinkPauta(String linkPauta) {
		this.linkPauta = linkPauta;
	}

	public ReuniaoProposicaoPK getReuniaoProposicaoPK() {
		return reuniaoProposicaoPK;
	}

	public void setReuniaoProposicaoPK(ReuniaoProposicaoPK reuniaoProposicaoPK) {
		this.reuniaoProposicaoPK = reuniaoProposicaoPK;
	}

	@Override
	public String toString() {
		String result = getClass().getSimpleName() + " ";
		return result;
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (!(obj instanceof Reuniao)) {
			return false;
		}
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((reuniaoProposicaoPK == null) ? 0 : reuniaoProposicaoPK.hashCode());
		return result;
	}	


}
