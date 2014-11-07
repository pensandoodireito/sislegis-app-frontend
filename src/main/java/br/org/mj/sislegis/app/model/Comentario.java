package br.org.mj.sislegis.app.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import java.lang.Override;

import javax.xml.bind.annotation.XmlRootElement;

import java.util.Date;
import java.util.Objects;


import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import br.org.mj.sislegis.app.model.Proposicao;

import javax.persistence.ManyToOne;
import javax.persistence.FetchType;


@Entity
@XmlRootElement
public class Comentario implements AbstractEntity {

	private static final long serialVersionUID = 739840933885769688L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", updatable = false, nullable = false)
	private Long id;

	@Column
	private String descricao;

	@Column
	private String autor;

	@Column
	@Temporal(TemporalType.TIMESTAMP)
	private Date dataCriacao;

	@ManyToOne(fetch = FetchType.LAZY)
	private Proposicao proposicao;


	public Long getId() {
		return this.id;
	}

	public void setId(final Long id) {
		this.id = id;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (!(obj instanceof Comentario)) {
			return false;
		}
		Comentario other = (Comentario) obj;
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

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getAutor() {
		return autor;
	}

	public void setAutor(String autor) {
		this.autor = autor;
	}

	public Date getDataCriacao() {
		return dataCriacao;
	}

	public void setDataCriacao(Date dataCriacao) {
		this.dataCriacao = dataCriacao;
	}

	@Override
	public String toString() {
		String result = getClass().getSimpleName() + " ";
		if (descricao != null && !descricao.trim().isEmpty())
			result += "descricao: " + descricao;
		if (autor != null && !autor.trim().isEmpty())
			result += ", autor: " + autor;
		return result;
	}

	public Proposicao getProposicao() {
		if(!Objects.isNull(this.proposicao)){
			Proposicao p = new Proposicao();
			p.setId(proposicao.getId());
			this.proposicao = p;
		}
		return this.proposicao;
	}

	public void setProposicao(final Proposicao proposicao) {
		this.proposicao = proposicao;
	}
}