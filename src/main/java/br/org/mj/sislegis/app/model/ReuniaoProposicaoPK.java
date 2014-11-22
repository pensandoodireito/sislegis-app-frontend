package br.org.mj.sislegis.app.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Embeddable
public class ReuniaoProposicaoPK implements Serializable {

	private static final long serialVersionUID = 7949894944142814382L;

	private Long idReuniao;


	private Long idProposicao;


	public Long getIdProposicao() {
		return idProposicao;
	}

	public void setIdProposicao(Long idProposicao) {
		this.idProposicao = idProposicao;
	}

	public Long getIdReuniao() {
		return idReuniao;
	}

	public void setIdReuniao(Long idReuniao) {
		this.idReuniao = idReuniao;
	}

	public int hashCode() {
		int hashCode = 0;

		if (idProposicao != null)
			hashCode ^= idProposicao.hashCode();
		if (idReuniao != null)
			hashCode ^= idReuniao.hashCode();

		return hashCode;
	}

	public boolean equals(Object obj) {
		if (!(obj instanceof ReuniaoProposicaoPK))
			return false;

		ReuniaoProposicaoPK target = (ReuniaoProposicaoPK) obj;

		return ((this.idProposicao == null) ? (target.idProposicao == null)
				: this.idProposicao.equals(target.idProposicao))
				&& ((this.idReuniao == null) ? (target.idReuniao == null)
						: this.idReuniao.equals(target.idReuniao));
	}

}
