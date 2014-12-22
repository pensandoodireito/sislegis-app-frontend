package br.gov.mj.sislegis.app.json;

import java.io.Serializable;
import java.util.Date;

import br.gov.mj.sislegis.app.model.Encaminhamento;
import br.gov.mj.sislegis.app.model.Usuario;

public class EncaminhamentoProposicaoJSON implements Serializable {
	private static final long serialVersionUID = -6907134373819848655L;

	public EncaminhamentoProposicaoJSON() {
	}
	
	public EncaminhamentoProposicaoJSON(Long id, Long idProposicao, ComentarioJSON comentario, Encaminhamento encaminhamento,
			Usuario responsavel, Date dataHoraLimite) {
		super();
		this.id = id;
		this.idProposicao = idProposicao;
		this.comentario = comentario;
		this.encaminhamento = encaminhamento;
		this.responsavel = responsavel;
		this.dataHoraLimite = dataHoraLimite;
	}
	
	private Long id;
	private Long idProposicao;
	private ComentarioJSON comentario;
	private Encaminhamento encaminhamento;
	private Usuario responsavel;
	private Date dataHoraLimite;
	
	public Long getIdProposicao() {
		return idProposicao;
	}
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setIdProposicao(Long idProposicao) {
		this.idProposicao = idProposicao;
	}
	public Date getDataHoraLimite() {
		return dataHoraLimite;
	}
	public void setDataHoraLimite(Date dataHoraLimite) {
		this.dataHoraLimite = dataHoraLimite;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public ComentarioJSON getComentario() {
		return comentario;
	}

	public void setComentario(ComentarioJSON comentario) {
		this.comentario = comentario;
	}

	public Encaminhamento getEncaminhamento() {
		return encaminhamento;
	}

	public void setEncaminhamento(Encaminhamento encaminhamento) {
		this.encaminhamento = encaminhamento;
	}

	public Usuario getResponsavel() {
		return responsavel;
	}

	public void setResponsavel(Usuario responsavel) {
		this.responsavel = responsavel;
	}

}
