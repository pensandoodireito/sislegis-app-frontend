package br.org.mj.sislegis.app.model;

import java.util.Date;
import java.util.List;
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
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.xml.bind.annotation.XmlRootElement;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import br.org.mj.sislegis.app.enumerated.ElaboracaoNormativaIdentificacao;
import br.org.mj.sislegis.app.enumerated.ElaboracaoNormativaNorma;
import br.org.mj.sislegis.app.enumerated.ElaboracaoNormativaTipo;
import br.org.mj.sislegis.app.json.TagJSON;

@Entity
@XmlRootElement
@Table(name = "elaboracao_normativa")
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="@id") 
public class ElaboracaoNormativa implements AbstractEntity  {
	
	private static final long serialVersionUID = 7722617248451501605L;
	
	public ElaboracaoNormativa() {
		// TODO Auto-generated constructor stub
	}
	

	public ElaboracaoNormativa(Long id, Date dataRegistro, ElaboracaoNormativaTipo tipo,
			String nup,
			ElaboracaoNormativaIdentificacao identificacao,
			String autor,
			String coAutor,
			String origem,
			String ementa			
			) {
		this.id=id;
		this.dataRegistro=dataRegistro;
		this.tipo=tipo;
		this.nup=nup;
		this.identificacao=identificacao;
		this.autor=autor;
		this.coAutor=coAutor;
		this.origem=origem;
		this.ementa=ementa;
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
	
	@Transient
	private String codElaboracaoNormativaTipo;
	
	@Column
	private String nup;
	
	@Column
	@Enumerated(EnumType.ORDINAL)
	private ElaboracaoNormativaIdentificacao identificacao;
	
	@Transient
	private String codElaboracaoNormativaIdentificacao;

	@Column
	private String autor;
	
	@Column
	private String coAutor;

	@Column
	private String origem;
	
	@Column
	private String ementa;
	
	// TODO: tags
	
	// Dados de análise e distribuição
	@Column
	private Date dataDistribuicao;
	
	@Column
	private Equipe equipe;
	
	@Column
	private Usuario parecerista;

	@OneToMany(cascade=CascadeType.ALL, mappedBy = "elaboracaoNormativa", fetch = FetchType.EAGER)
	private Set<ElaboracaoNormativaConsulta> listaElaboracaoNormativaConsulta;
	
	// Manifestação (por enquanto deixei na mesma entidade para evitar normalização desnecessaria)
	@Column
	private Date dataManifestacao;
	
	@Column
	@Enumerated(EnumType.ORDINAL)
	private ElaboracaoNormativaNorma elaboracaoNormativaNorma;
	
	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "elaboracaoNormativa")
	private Set<TagElaboracaoNormativa> tagsElaboracaoNormativa;
	
	@Transient
	private String codElaboracaoNormativaNorma;
	
	@Column
	private String comentarioManifestacao;
	
	@Column
	private String arquivoManifestacao;
	
	@Transient
	private ElaboracaoNormativaConsulta elaboracaoNormativaConsulta;
	
	@Transient
	private List<TagJSON> tags;


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

	public ElaboracaoNormativaIdentificacao getIdentificacao() {
		return identificacao;
	}

	public String getAutor() {
		return autor;
	}

	public String getCoAutor() {
		return coAutor;
	}

	public String getOrigem() {
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

	public String getComentarioManifestacao() {
		return comentarioManifestacao;
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

	public void setIdentificacao(ElaboracaoNormativaIdentificacao identificacao) {
		this.identificacao = identificacao;
	}

	public void setAutor(String autor) {
		this.autor = autor;
	}

	public void setCoAutor(String coAutor) {
		this.coAutor = coAutor;
	}

	public void setOrigem(String origem) {
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

	public void setComentarioManifestacao(String comentarioManifestacao) {
		this.comentarioManifestacao = comentarioManifestacao;
	}

	public Set<ElaboracaoNormativaConsulta> getListaElaboracaoNormativaConsulta() {
		return listaElaboracaoNormativaConsulta;
	}

	public void setListaElaboracaoNormativaConsulta(
			Set<ElaboracaoNormativaConsulta> listaElaboracaoNormativaConsulta) {
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

	public String getCodElaboracaoNormativaTipo() {
		return codElaboracaoNormativaTipo;
	}

	public void setCodElaboracaoNormativaTipo(String codElaboracaoNormativaTipo) {
		this.codElaboracaoNormativaTipo = codElaboracaoNormativaTipo;
	}

	public String getCodElaboracaoNormativaIdentificacao() {
		return codElaboracaoNormativaIdentificacao;
	}

	public void setCodElaboracaoNormativaIdentificacao(
			String codElaboracaoNormativaIdentificacao) {
		this.codElaboracaoNormativaIdentificacao = codElaboracaoNormativaIdentificacao;
	}

	public String getCodElaboracaoNormativaNorma() {
		return codElaboracaoNormativaNorma;
	}

	public void setCodElaboracaoNormativaNorma(String codElaboracaoNormativaNorma) {
		this.codElaboracaoNormativaNorma = codElaboracaoNormativaNorma;
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
	
}
