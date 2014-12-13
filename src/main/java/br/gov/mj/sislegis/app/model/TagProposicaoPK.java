package br.gov.mj.sislegis.app.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class TagProposicaoPK implements Serializable {

	private static final long serialVersionUID = 7949894944142814382L;

	private String tag;

	private Long idProposicao;

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

	public Long getIdProposicao() {
		return idProposicao;
	}

	public void setIdProposicao(Long idProposicao) {
		this.idProposicao = idProposicao;
	}

	public int hashCode() {
		int hashCode = 0;

		if (tag != null)
			hashCode ^= tag.hashCode();
		if (idProposicao != null)
			hashCode ^= idProposicao.hashCode();

		return hashCode;
	}

	public boolean equals(Object obj) {
		if (!(obj instanceof TagProposicaoPK))
			return false;

		TagProposicaoPK target = (TagProposicaoPK) obj;

		return ((this.tag == null) ? (target.tag == null) : this.tag
				.equals(target.tag))
				&& ((this.idProposicao == null) ? (target.idProposicao == null)
						: this.idProposicao.equals(target.idProposicao));
	}

}
