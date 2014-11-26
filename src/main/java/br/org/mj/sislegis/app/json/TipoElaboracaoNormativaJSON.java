package br.org.mj.sislegis.app.json;

import java.io.Serializable;

public class TipoElaboracaoNormativaJSON implements Serializable {
	
	private Integer id;
	private String descricao;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

}
