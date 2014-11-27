package br.org.mj.sislegis.app.json;

import java.io.Serializable;
import java.util.Date;

import br.org.mj.sislegis.app.model.Usuario;

public class ComentarioJSON implements Serializable {

	private static final long serialVersionUID = 1L;

	public ComentarioJSON(Long id, String descricao, Usuario autor,
			Date dataCriacao, Long idProposicao) {
		this.id = id;
		this.descricao = descricao;
		this.autor = autor;
		this.dataCriacao = dataCriacao;
		this.idProposicao = idProposicao;
	}
	
	public ComentarioJSON(){
		
	}

	private Long id;
	private String descricao;
	private Usuario autor;
	private Date dataCriacao;
	private Long idProposicao;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Usuario getAutor() {
		return autor;
	}

	public void setAutor(Usuario autor) {
		this.autor = autor;
	}

	public Date getDataCriacao() {
		return dataCriacao;
	}

	public void setDataCriacao(Date dataCriacao) {
		this.dataCriacao = dataCriacao;
	}

	public Long getIdProposicao() {
		return idProposicao;
	}

	public void setIdProposicao(Long idProposicao) {
		this.idProposicao = idProposicao;
	}

}
