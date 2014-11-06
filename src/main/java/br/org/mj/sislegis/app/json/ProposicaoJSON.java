package br.org.mj.sislegis.app.json;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import br.org.mj.sislegis.app.enumerated.Origem;
import br.org.mj.sislegis.app.model.Comentario;
import br.org.mj.sislegis.app.model.Posicionamento;
import br.org.mj.sislegis.app.model.Reuniao;


public class ProposicaoJSON implements Serializable {
	
	private static final long serialVersionUID = 7949894944142814382L;

	private Long id;

	private Integer idProposicao;

	private String tipo;

	private String ano;

	private String numero;

	private Date dataApresentacao;

	private String autor;
	
	private String ementa;
	
	private Origem origem;
	
	private String sigla;
	
	private String comissao;
	
	private Integer seqOrdemPauta;
	
	private Set<Reuniao> listaReunioes;
	
	private Set<Comentario> listaComentario;
	
	private Posicionamento posicionamento;
	
	private String tags;
	
	public String getComissao() {
		return comissao;
	}

	public void setComissao(String comissao) {
		this.comissao = comissao;
	}

	public Integer getSeqOrdemPauta() {
		return seqOrdemPauta;
	}

	public void setSeqOrdemPauta(Integer seqOrdemPauta) {
		this.seqOrdemPauta = seqOrdemPauta;
	}

	public String getEmenta() {
		return ementa;
	}

	public void setEmenta(String ementa) {
		this.ementa = ementa;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getIdProposicao() {
		return idProposicao;
	}

	public void setIdProposicao(Integer idProposicao) {
		this.idProposicao = idProposicao;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public String getAno() {
		return ano;
	}

	public void setAno(String ano) {
		this.ano = ano;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public Date getDataApresentacao() {
		return dataApresentacao;
	}

	public void setDataApresentacao(Date dataApresentacao) {
		this.dataApresentacao = dataApresentacao;
	}

	public String getAutor() {
		return autor;
	}

	public void setAutor(String autor) {
		this.autor = autor;
	}


	public String getSigla() {
		return sigla;
	}

	public void setSigla(String sigla) {
		this.sigla = sigla;
	}

	
	public Origem getOrigem() {
		return origem;
	}

	public void setOrigem(Origem origem) {
		this.origem = origem;
	}

	public Posicionamento getPosicionamento() {
		return posicionamento;
	}

	public void setPosicionamento(Posicionamento posicionamento) {
		this.posicionamento = posicionamento;
	}

	public Set<Reuniao> getListaReunioes() {
		return listaReunioes;
	}

	public void setListaReunioes(Set<Reuniao> listaReunioes) {
		this.listaReunioes = listaReunioes;
	}

	public String getTags() {
		return tags;
	}

	public void setTags(String tags) {
		this.tags = tags;
	}

	public Set<Comentario> getListaComentario() {
		return listaComentario;
	}

	public void setListaComentario(Set<Comentario> listaComentario) {
		this.listaComentario = listaComentario;
	}
}
