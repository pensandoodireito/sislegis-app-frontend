package br.org.mj.sislegis.app.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class ReuniaoProposicao implements AbstractEntity {

	private static final long serialVersionUID = 7949894944142814382L;

	@Id
	private ReuniaoProposicaoPK reuniaoProposicaoPK;

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "idReuniao")
	private Reuniao reuniao;

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "idProposicao")
	private Proposicao proposicao;

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
