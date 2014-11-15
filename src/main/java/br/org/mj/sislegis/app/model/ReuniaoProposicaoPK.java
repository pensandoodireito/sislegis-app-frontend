package br.org.mj.sislegis.app.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * TODO por que existe essa pk composta? Deveria ser uma pk composta entre proposicao e comissao e por que existe uma data aqui? @author guilherme.hott
 *
 */
@Embeddable
public class ReuniaoProposicaoPK implements Serializable {

	private static final long serialVersionUID = 7949894944142814382L;

	@Column
	@Temporal(TemporalType.DATE)
	private Date dataReuniao;

	@Column
	private String siglaComissao;


	public Date getDataReuniao() {
		return dataReuniao;
	}

	public void setDataReuniao(Date dataReuniao) {
		this.dataReuniao = dataReuniao;
	}

	public String getSiglaComissao() {
		return siglaComissao;
	}

	public void setSiglaComissao(String siglaComissao) {
		this.siglaComissao = siglaComissao;
	}

	public int hashCode() {
		int hashCode = 0;

		if (siglaComissao != null)
			hashCode ^= siglaComissao.hashCode();
		if (dataReuniao != null)
			hashCode ^= dataReuniao.hashCode();

		return hashCode;
	}

	public boolean equals(Object obj) {
		if (!(obj instanceof ReuniaoProposicaoPK))
			return false;

		ReuniaoProposicaoPK target = (ReuniaoProposicaoPK) obj;

		return ((this.siglaComissao == null) ? (target.siglaComissao == null)
				: this.siglaComissao.equals(target.siglaComissao))
				&& ((this.dataReuniao == null) ? (target.dataReuniao == null)
						: this.dataReuniao.equals(target.dataReuniao));
	}

}
