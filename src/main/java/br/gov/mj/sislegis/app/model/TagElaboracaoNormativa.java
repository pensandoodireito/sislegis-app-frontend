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
public class TagElaboracaoNormativa implements AbstractEntity {
	
	private static final long serialVersionUID = 7949894944142814382L;
	
	@EmbeddedId
	private TagElaboracaoNormativaPK tagElaboracaoNormativaPK;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@MapsId("tag")
	private Tag tag;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@MapsId("id")
	private ElaboracaoNormativa elaboracaoNormativa;

	public TagElaboracaoNormativaPK getTagElaboracaoNormativaPK() {
		return tagElaboracaoNormativaPK;
	}

	public void setTagElaboracaoNormativaPK(
			TagElaboracaoNormativaPK tagElaboracaoNormativaPK) {
		this.tagElaboracaoNormativaPK = tagElaboracaoNormativaPK;
	}

	public Tag getTag() {
		return tag;
	}

	public void setTag(Tag tag) {
		this.tag = tag;
	}

	public ElaboracaoNormativa getElaboracaoNormativa() {
		return elaboracaoNormativa;
	}

	public void setElaboracaoNormativa(ElaboracaoNormativa elaboracaoNormativa) {
		this.elaboracaoNormativa = elaboracaoNormativa;
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
		result = prime * result + ((tagElaboracaoNormativaPK == null) ? 0 : tagElaboracaoNormativaPK.hashCode());
		return result;
	}

	@Override
	public Number getId() {
		// TODO Auto-generated method stub
		return null;
	}
}
