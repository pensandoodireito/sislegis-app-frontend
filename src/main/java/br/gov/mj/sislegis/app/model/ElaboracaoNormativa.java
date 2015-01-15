package br.gov.mj.sislegis.app.model;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.xml.bind.annotation.XmlRootElement;

import br.gov.mj.sislegis.app.enumerated.ElaboracaoNormativaBotao;
import br.gov.mj.sislegis.app.enumerated.ElaboracaoNormativaNorma;
import br.gov.mj.sislegis.app.enumerated.ElaboracaoNormativaObjeto;
import br.gov.mj.sislegis.app.enumerated.ElaboracaoNormativaSituacao;
import br.gov.mj.sislegis.app.enumerated.ElaboracaoNormativaSubTipo;
import br.gov.mj.sislegis.app.enumerated.ElaboracaoNormativaTipo;
import br.gov.mj.sislegis.app.json.DropdownMultiselectJSON;
import br.gov.mj.sislegis.app.json.TagJSON;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@XmlRootElement
@Table(name = "elaboracao_normativa")
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="@id") 
public class ElaboracaoNormativa implements AbstractEntity  {
	
	private static final long serialVersionUID = 7722617248451501605L;
	
	public ElaboracaoNormativa() {
	}
	

	public ElaboracaoNormativa(Long id, Integer ano, String numero,
			String origemDescricao, String coAutores, String ementa,
			String statusSidof, ElaboracaoNormativaObjeto identificacao,
			String equipe, String parecerista
			) {
		this.id=id;
		this.ano=ano;
		this.numero=numero;
		this.origemDescricao=origemDescricao;
		this.coAutoresDescricao=coAutores;
		this.ementa=ementa;
		this.statusSidofDescricao=statusSidof;
		this.identificacao=identificacao;
		this.valueIdentificacao=Objects.isNull(identificacao)?null:identificacao.getValue();
		this.equipeDescricao=equipe;
		this.pareceristaDescricao=parecerista;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", updatable = false, nullable = false)
	private Long id;
	
	// Dados preliminares
	
	@Column
	private Date dataRegistro;
	
	@Column
	@Enumerated(EnumType.ORDINAL)
	private ElaboracaoNormativaTipo tipo;
	
	@Column
	@Enumerated(EnumType.ORDINAL)
	private ElaboracaoNormativaSubTipo subTipo;	
	
	@Transient
	private List<ElaboracaoNormativaTipo> tipos;

	@Transient
	private List<ElaboracaoNormativaSubTipo> subTipos;
	
	@Transient
	private String valueTipo;
	
	@Column
	private String nup;
	
	@Column
	@Enumerated(EnumType.ORDINAL)
	private ElaboracaoNormativaObjeto identificacao;
	
	@Transient
	private String valueIdentificacao;

	@ManyToOne(fetch = FetchType.EAGER)
	private Orgao coAutor;
	
	

	@ManyToOne(fetch = FetchType.EAGER)
	private Orgao origem;

	@ManyToOne(fetch = FetchType.EAGER)
	private AreaConsultada areaConsultada;
	
	@Column
	private String ementa;
	
	// TODO: tags
	
	// Dados de análise e distribuição
	@Column
	private Date dataDistribuicao;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private Equipe equipe;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private Usuario parecerista;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "elaboracaoNormativa", fetch = FetchType.EAGER)
	private List<ElaboracaoNormativaConsulta> listaElaboracaoNormativaConsulta;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "elaboracaoNormativa", fetch = FetchType.EAGER)
	private List<ElaboracaoNormativaCoAutores> listaElaboracaoNormativaCoAutor;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private List<Comentario> listaComentario;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "elaboracaoNormativa")
	private List<ElaboracaoNormativaTiposMarcados> listaElaboracaoNormativaTiposMarcados;
	
	@Column
	private Comentario comentario;
	
	// Manifestação (por enquanto deixei na mesma entidade para evitar normalização desnecessaria)
	@Column
	private Date dataManifestacao;
	
	@Column
	@Enumerated(EnumType.ORDINAL)
	private ElaboracaoNormativaNorma elaboracaoNormativaNorma;
	
	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "elaboracaoNormativa")
	private Set<TagElaboracaoNormativa> tagsElaboracaoNormativa;
	
	@Column
	private String ementaManifestacao;
	
	@Column
	private String arquivoManifestacao;
	
	@Column
	private Integer ano;
	
	@Column
	private String numero;
	
	@Column
	private String ementaPreliminar;
	
	@Column
	private Date dataInclusaoSIDOF;
	
	@Column
	private Date dataAssinaturaSIDOF;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private StatusSidof statusSidof;
	
	@Column
	private String normaGeradaNumero;
	
	@Column
	private Integer normaGeradaAno;
	
	@Column
	private String normaGeradaLink;
	
	@Column
	private ElaboracaoNormativaBotao elaboracaoNormativaBotao;
	
	@Column
	@Enumerated(EnumType.ORDINAL)
	private ElaboracaoNormativaSituacao elaboracaoNormativaSituacao;
	
	@Transient
	private ElaboracaoNormativaConsulta elaboracaoNormativaConsulta;
	
	@Transient
	private List<TagJSON> tags;
	
	@Transient
	private List<Usuario> pareceristas;
	
	@Transient
	private String origemDescricao;
	
	@Transient
	private List<DropdownMultiselectJSON> listaOrigensSelecionadosDropdown;
	
	@Transient
	private List<DropdownMultiselectJSON> listaCoAutoresSelecionadosDropdown;
	
	@Transient
	private String coAutoresDescricao;
	
	@Transient
	private String statusSidofDescricao;
	
	@Transient
	private String equipeDescricao;
	
	@Transient
	private String pareceristaDescricao;

	public Long getId() {
		return id;
	}

	public Date getDataRegistro() {
		return dataRegistro;
	}

	public ElaboracaoNormativaTipo getTipo() {
		return tipo;
	}

	public String getNup() {
		return nup;
	}

	public ElaboracaoNormativaObjeto getIdentificacao() {
		return identificacao;
	}

	public Orgao getCoAutor() {
		return coAutor;
	}

	public Orgao getOrigem() {
		return origem;
	}

	public String getEmenta() {
		return ementa;
	}

	public Date getDataDistribuicao() {
		return dataDistribuicao;
	}

	public Equipe getEquipe() {
		return equipe;
	}

	public Usuario getParecerista() {
		return parecerista;
	}


	public Date getDataManifestacao() {
		return dataManifestacao;
	}

	public ElaboracaoNormativaNorma getElaboracaoNormativaNorma() {
		return elaboracaoNormativaNorma;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setDataRegistro(Date dataRegistro) {
		this.dataRegistro = dataRegistro;
	}

	public void setTipo(ElaboracaoNormativaTipo tipo) {
		this.tipo = tipo;
	}

	public void setNup(String nup) {
		this.nup = nup;
	}

	public void setIdentificacao(ElaboracaoNormativaObjeto identificacao) {
		this.identificacao = identificacao;
	}

	public void setCoAutor(Orgao coAutor) {
		this.coAutor = coAutor;
	}

	public void setOrigem(Orgao origem) {
		this.origem = origem;
	}

	public void setEmenta(String ementa) {
		this.ementa = ementa;
	}

	public void setDataDistribuicao(Date dataDistribuicao) {
		this.dataDistribuicao = dataDistribuicao;
	}

	public void setEquipe(Equipe equipe) {
		this.equipe = equipe;
	}

	public void setParecerista(Usuario parecerista) {
		this.parecerista = parecerista;
	}

	public void setDataManifestacao(Date dataManifestacao) {
		this.dataManifestacao = dataManifestacao;
	}

	public void setElaboracaoNormativaNorma(
			ElaboracaoNormativaNorma elaboracaoNormativaNorma) {
		this.elaboracaoNormativaNorma = elaboracaoNormativaNorma;
	}

	public List<ElaboracaoNormativaConsulta> getListaElaboracaoNormativaConsulta() {
		return listaElaboracaoNormativaConsulta;
	}

	public void setListaElaboracaoNormativaConsulta(
			List<ElaboracaoNormativaConsulta> listaElaboracaoNormativaConsulta) {
		this.listaElaboracaoNormativaConsulta = listaElaboracaoNormativaConsulta;
	}

	public void setElaboracaoNormativaConsulta(
			ElaboracaoNormativaConsulta elaboracaoNormativaConsulta) {
		this.elaboracaoNormativaConsulta = elaboracaoNormativaConsulta;
	}
	
	public String getArquivoManifestacao() {
		return arquivoManifestacao;
	}

	public void setArquivoManifestacao(String arquivoManifestacao) {
		this.arquivoManifestacao = arquivoManifestacao;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ElaboracaoNormativa other = (ElaboracaoNormativa) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}


	public List<TagJSON> getTags() {
		return tags;
	}

	public void setTags(List<TagJSON> tags) {
		this.tags = tags;
	}

	public Set<TagElaboracaoNormativa> getTagsElaboracaoNormativa() {
		return tagsElaboracaoNormativa;
	}

	public void setTagsElaboracaoNormativa(
			Set<TagElaboracaoNormativa> tagsElaboracaoNormativa) {
		this.tagsElaboracaoNormativa = tagsElaboracaoNormativa;
	}


	public List<Usuario> getPareceristas() {
		return pareceristas;
	}


	public void setPareceristas(List<Usuario> pareceristas) {
		this.pareceristas = pareceristas;
	}
		
		
	public AreaConsultada getAreaConsultada() {
		return areaConsultada;
	}


	public void setAreaConsultada(AreaConsultada areaConsultada) {
		this.areaConsultada = areaConsultada;
	}


	public String getValueTipo() {
		return Objects.isNull(tipo)?"": tipo.getValue();
	}


	public String getValueIdentificacao() {
		return Objects.isNull(identificacao)?"":identificacao.getValue();
	}


	public String getOrigemDescricao() {
		return origemDescricao;
	}


	public void setOrigemDescricao(String origemDescricao) {
		this.origemDescricao = origemDescricao;
	}


	public StatusSidof getStatusSidof() {
		return statusSidof;
	}


	public void setStatusSidof(StatusSidof statusSidof) {
		this.statusSidof = statusSidof;
	}


	public List<Comentario> getListaComentario() {
		return listaComentario;
	}


	public void setListaComentario(List<Comentario> listaComentario) {
		this.listaComentario = listaComentario;
	}


	public Comentario getComentario() {
		return comentario;
	}


	public void setComentario(Comentario comentario) {
		this.comentario = comentario;
	}


	public Integer getAno() {
		return ano;
	}


	public void setAno(Integer ano) {
		this.ano = ano;
	}


	public String getNumero() {
		return numero;
	}


	public void setNumero(String numero) {
		this.numero = numero;
	}


	public String getEmentaPreliminar() {
		return ementaPreliminar;
	}


	public void setEmentaPreliminar(String ementaPreliminar) {
		this.ementaPreliminar = ementaPreliminar;
	}


	public Date getDataInclusaoSIDOF() {
		return dataInclusaoSIDOF;
	}


	public void setDataInclusaoSIDOF(Date dataInclusaoSIDOF) {
		this.dataInclusaoSIDOF = dataInclusaoSIDOF;
	}


	public Date getDataAssinaturaSIDOF() {
		return dataAssinaturaSIDOF;
	}


	public void setDataAssinaturaSIDOF(Date dataAssinaturaSIDOF) {
		this.dataAssinaturaSIDOF = dataAssinaturaSIDOF;
	}


	public ElaboracaoNormativaSituacao getElaboracaoNormativaSituacao() {
		return elaboracaoNormativaSituacao;
	}


	public void setElaboracaoNormativaSituacao(
			ElaboracaoNormativaSituacao elaboracaoNormativaSituacao) {
		this.elaboracaoNormativaSituacao = elaboracaoNormativaSituacao;
	}


	public ElaboracaoNormativaConsulta getElaboracaoNormativaConsulta() {
		return elaboracaoNormativaConsulta;
	}


	public void setValueTipo(String valueTipo) {
		this.valueTipo = valueTipo;
	}


	public void setValueIdentificacao(String valueIdentificacao) {
		this.valueIdentificacao = valueIdentificacao;
	}


	public String getNormaGeradaNumero() {
		return normaGeradaNumero;
	}


	public void setNormaGeradaNumero(String normaGeradaNumero) {
		this.normaGeradaNumero = normaGeradaNumero;
	}


	public Integer getNormaGeradaAno() {
		return normaGeradaAno;
	}


	public void setNormaGeradaAno(Integer normaGeradaAno) {
		this.normaGeradaAno = normaGeradaAno;
	}


	public String getNormaGeradaLink() {
		return normaGeradaLink;
	}


	public void setNormaGeradaLink(String normaGeradaLink) {
		this.normaGeradaLink = normaGeradaLink;
	}


	public String getEmentaManifestacao() {
		return ementaManifestacao;
	}


	public void setEmentaManifestacao(String ementaManifestacao) {
		this.ementaManifestacao = ementaManifestacao;
	}


	public ElaboracaoNormativaBotao getElaboracaoNormativaBotao() {
		return elaboracaoNormativaBotao;
	}


	public void setElaboracaoNormativaBotao(
			ElaboracaoNormativaBotao elaboracaoNormativaBotao) {
		this.elaboracaoNormativaBotao = elaboracaoNormativaBotao;
	}


	public List<ElaboracaoNormativaTiposMarcados> getListaElaboracaoNormativaTiposMarcados() {
		return listaElaboracaoNormativaTiposMarcados;
	}


	public void setListaElaboracaoNormativaTiposMarcados(
			List<ElaboracaoNormativaTiposMarcados> listaElaboracaoNormativaTiposMarcados) {
		this.listaElaboracaoNormativaTiposMarcados = listaElaboracaoNormativaTiposMarcados;
	}


	public List<ElaboracaoNormativaTipo> getTipos() {
		return tipos;
	}


	public void setTipos(List<ElaboracaoNormativaTipo> tipos) {
		this.tipos = tipos;
	}


	public List<DropdownMultiselectJSON> getListaOrigensSelecionadosDropdown() {
		return listaOrigensSelecionadosDropdown;
	}


	public void setListaOrigensSelecionadosDropdown(
			List<DropdownMultiselectJSON> listaOrigensSelecionadosDropdown) {
		this.listaOrigensSelecionadosDropdown = listaOrigensSelecionadosDropdown;
	}


	public List<DropdownMultiselectJSON> getListaCoAutoresSelecionadosDropdown() {
		return listaCoAutoresSelecionadosDropdown;
	}


	public void setListaCoAutoresSelecionadosDropdown(
			List<DropdownMultiselectJSON> listaCoAutoresSelecionadosDropdown) {
		this.listaCoAutoresSelecionadosDropdown = listaCoAutoresSelecionadosDropdown;
	}


	public String getCoAutoresDescricao() {
		return coAutoresDescricao;
	}


	public void setCoAutoresDescricao(String coAutoresDescricao) {
		this.coAutoresDescricao = coAutoresDescricao;
	}


	public String getStatusSidofDescricao() {
		return statusSidofDescricao;
	}


	public void setStatusSidofDescricao(String statusSidofDescricao) {
		this.statusSidofDescricao = statusSidofDescricao;
	}


	public String getEquipeDescricao() {
		return equipeDescricao;
	}


	public void setEquipeDescricao(String equipeDescricao) {
		this.equipeDescricao = equipeDescricao;
	}


	public String getPareceristaDescricao() {
		return pareceristaDescricao;
	}


	public void setPareceristaDescricao(String pareceristaDescricao) {
		this.pareceristaDescricao = pareceristaDescricao;
	}


	public List<ElaboracaoNormativaCoAutores> getListaElaboracaoNormativaCoAutor() {
		return listaElaboracaoNormativaCoAutor;
	}


	public void setListaElaboracaoNormativaCoAutor(
			List<ElaboracaoNormativaCoAutores> listaElaboracaoNormativaCoAutor) {
		this.listaElaboracaoNormativaCoAutor = listaElaboracaoNormativaCoAutor;
	}


	public ElaboracaoNormativaSubTipo getSubTipo() {
		return subTipo;
	}


	public void setSubTipo(ElaboracaoNormativaSubTipo subTipo) {
		this.subTipo = subTipo;
	}


	public List<ElaboracaoNormativaSubTipo> getSubTipos() {
		return subTipos;
	}


	public void setSubTipos(List<ElaboracaoNormativaSubTipo> subTipos) {
		this.subTipos = subTipos;
	}





	
}