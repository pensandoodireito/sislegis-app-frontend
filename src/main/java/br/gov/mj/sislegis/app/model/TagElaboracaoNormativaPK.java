package br.gov.mj.sislegis.app.model;

import java.io.Serializable;

import javax.persistence.Embeddable;

@Embeddable
public class TagElaboracaoNormativaPK implements Serializable {
	
	private static final long serialVersionUID = 7949894944142814382L;

	private String tag;

	private Long id;

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public int hashCode() {
		int hashCode = 0;

		if (tag != null)
			hashCode ^= tag.hashCode();
		if (id!= null)
			hashCode ^= id.hashCode();

		return hashCode;
	}

	public boolean equals(Object obj) {
		if (!(obj instanceof TagProposicaoPK))
			return false;

		TagElaboracaoNormativaPK target = (TagElaboracaoNormativaPK) obj;

		return ((this.tag == null) ? (target.tag == null) : this.tag
				.equals(target.tag))
				&& ((this.id == null) ? (target.id == null)
						: this.id.equals(target.id));
	}

}
