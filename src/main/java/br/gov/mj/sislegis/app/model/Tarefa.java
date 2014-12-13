package br.gov.mj.sislegis.app.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.xml.bind.annotation.XmlRootElement;

import br.gov.mj.sislegis.app.enumerated.TipoTarefa;

@Entity
@Table(name = "tarefa")
@XmlRootElement
public class Tarefa implements AbstractEntity {
	
	private static final long serialVersionUID = -806063711060116952L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", updatable = false, nullable = false)
	private Long id;

	@Column(name = "data")
	@Temporal(TemporalType.TIMESTAMP)
	private Date data;

	@Column
	@Enumerated(EnumType.ORDINAL)
	private TipoTarefa tipoTarefa;
	
	private boolean isFinalizada;
	
	@OneToOne(fetch = FetchType.EAGER)
	private EncaminhamentoProposicao encaminhamentoProposicao;

	@ManyToOne(fetch = FetchType.EAGER)
	private Usuario usuario;
	
	@Transient
	private Long idProposicao;

	public Long getId() {
		return this.id;
	}

	public void setId(final Long id) {
		this.id = id;
	}

	public Date getData() {
		return data;
	}

	public void setData(Date data) {
		this.data = data;
	}

	public TipoTarefa getTipoTarefa() {
		return tipoTarefa;
	}

	public void setTipoTarefa(TipoTarefa tipoTarefa) {
		this.tipoTarefa = tipoTarefa;
	}

	public boolean isFinalizada() {
		return isFinalizada;
	}

	public void setFinalizada(boolean isFinalizada) {
		this.isFinalizada = isFinalizada;
	}

	public EncaminhamentoProposicao getEncaminhamentoProposicao() {
		return encaminhamentoProposicao;
	}

	public void setEncaminhamentoProposicao(
			EncaminhamentoProposicao encaminhamentoProposicao) {
		this.encaminhamentoProposicao = encaminhamentoProposicao;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public Long getIdProposicao() {
		return idProposicao;
	}

	public void setIdProposicao(Long idProposicao) {
		this.idProposicao = idProposicao;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (!(obj instanceof Tarefa)) {
			return false;
		}
		Tarefa other = (Tarefa) obj;
		if (id != null) {
			if (!id.equals(other.id)) {
				return false;
			}
		}
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

}