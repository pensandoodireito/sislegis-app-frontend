package br.gov.mj.sislegis.app.model;

import javax.persistence.CascadeType;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class TagProposicao implements AbstractEntity {
	
	private static final long serialVersionUID = 7949894944142814382L;
	
	@EmbeddedId
	private TagProposicaoPK tagProposicaoPK;

	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@MapsId("tag")
	private Tag tag;

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@MapsId("idProposicao")
	private Proposicao proposicao;

	public TagProposicaoPK getTagProposicaoPK() {
		return tagProposicaoPK;
	}

	public void setTagProposicaoPK(TagProposicaoPK tagProposicaoPK) {
		this.tagProposicaoPK = tagProposicaoPK;
	}


	public Proposicao getProposicao() {
		return proposicao;
	}

	public void setProposicao(Proposicao proposicao) {
		this.proposicao = proposicao;
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
		result = prime * result + ((tagProposicaoPK == null) ? 0 : tagProposicaoPK.hashCode());
		return result;
	}

	public Tag getTag() {
		return tag;
	}

	public void setTag(Tag tag) {
		this.tag = tag;
	}

	@Override
	public Number getId() {
		// TODO Auto-generated method stub
		return null;
	}

}
