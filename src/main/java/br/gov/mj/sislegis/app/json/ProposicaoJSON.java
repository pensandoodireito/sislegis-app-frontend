package br.gov.mj.sislegis.app.json;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import br.gov.mj.sislegis.app.enumerated.Origem;
import br.gov.mj.sislegis.app.model.Posicionamento;
import br.gov.mj.sislegis.app.model.Usuario;

public class ProposicaoJSON implements Serializable {

	private static final long serialVersionUID = 7949894944142814382L;

	private Long id;

	private Integer idProposicao;

	private String tipo;

	private String ano;

	private String numero;
	
	private String autor;

	private String ementa;

	private Origem origem;

	private String sigla;

	private String comissao;

	private String resultadoASPAR;

	private Integer seqOrdemPauta;

	private String linkProposicao;

	private String linkPauta;
	
	private Boolean isFavorita;
	
	private Long idReuniao;
	
	private Usuario responsavel;

	private List<ComentarioJSON> listaComentario = new ArrayList<ComentarioJSON>();

	private List<EncaminhamentoProposicaoJSON> listaEncaminhamentoProposicao = new ArrayList<EncaminhamentoProposicaoJSON>();

	private Posicionamento posicionamento;

	private List<TagJSON> tags;
	
	public ProposicaoJSON(){}

	public ProposicaoJSON(Long id, Integer idProposicao, String tipo,
			String ano, String numero, String autor,
			String ementa, Origem origem, String sigla, String comissao,
			Integer seqOrdemPauta, String linkProposicao, String linkPauta,
			String resultadoASPAR,
			Boolean isFavorita,
			Long idReuniao,
			List<ComentarioJSON> listaComentario,
			List<EncaminhamentoProposicaoJSON> listaEncaminhamentoProposicao,
			Posicionamento posicionamento, List<TagJSON> tags,
			Usuario responsavel) {
		this.id=id;
		this.idProposicao=idProposicao;
		this.tipo=tipo;
		this.ano=ano;
		this.numero=numero;
		this.autor=autor;
		this.ementa=ementa;
		this.origem=origem;
		this.sigla=sigla;
		this.comissao=comissao;
		this.seqOrdemPauta=seqOrdemPauta;
		this.linkProposicao=linkProposicao;
		this.linkPauta=linkPauta;
		this.resultadoASPAR=resultadoASPAR;
		this.isFavorita=isFavorita;
		this.idReuniao=idReuniao;
		this.listaComentario=listaComentario;
		this.listaEncaminhamentoProposicao = listaEncaminhamentoProposicao;
		this.posicionamento=posicionamento;
		this.tags=tags;
		this.responsavel=responsavel;
	}
	
	public ProposicaoJSON(Long id, Integer idProposicao, String tipo,
			String ano, String numero, String autor,
			String ementa, Origem origem, String sigla, String comissao) {
		this.id=id;
		this.idProposicao=idProposicao;
		this.tipo=tipo;
		this.ano=ano;
		this.numero=numero;
		this.autor=autor;
		this.ementa=ementa;
		this.origem=origem;
		this.sigla=sigla;
		this.comissao=comissao;
	}

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

	public List<ComentarioJSON> getListaComentario() {
		return listaComentario;
	}

	public void setListaComentario(List<ComentarioJSON> listaComentario) {
		this.listaComentario = listaComentario;
	}

	public String getLinkProposicao() {
		return linkProposicao;
	}

	public void setLinkProposicao(String linkProposicao) {
		this.linkProposicao = linkProposicao;
	}

	public String getLinkPauta() {
		return linkPauta;
	}

	public void setLinkPauta(String linkPauta) {
		this.linkPauta = linkPauta;
	}

	public List<TagJSON> getTags() {
		return tags;
	}

	public void setTags(List<TagJSON> tags) {
		this.tags = tags;
	}

	public Usuario getResponsavel() {
		return responsavel;
	}

	public void setResponsavel(Usuario responsavel) {
		this.responsavel = responsavel;
	}

	public List<EncaminhamentoProposicaoJSON> getListaEncaminhamentoProposicao() {
		return listaEncaminhamentoProposicao;
	}

	public void setListaEncaminhamentoProposicao(List<EncaminhamentoProposicaoJSON> listaEncaminhamentoProposicao) {
		this.listaEncaminhamentoProposicao = listaEncaminhamentoProposicao;
	}

	public String getResultadoASPAR() {
		return resultadoASPAR;
	}

	public void setResultadoASPAR(String resultadoASPAR) {
		this.resultadoASPAR = resultadoASPAR;
	}

	public Boolean isFavorita() {
		return isFavorita;
	}

	public void setFavorita(Boolean isFavorita) {
		this.isFavorita = isFavorita;
	}

	public Long getIdReuniao() {
		return idReuniao;
	}

	public void setIdReuniao(Long idReuniao) {
		this.idReuniao = idReuniao;
	}
}
