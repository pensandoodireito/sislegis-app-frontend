package br.gov.mj.sislegis.app.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.xml.bind.annotation.XmlRootElement;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@XmlRootElement
@Table(name = "elaboracao_normativa_consulta")
@JsonIgnoreProperties({"elaboracaoNormativa"})
public class ElaboracaoNormativaConsulta implements AbstractEntity {
	
	private static final long serialVersionUID = 4338236680426826432L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", updatable = false, nullable = false)
	private Long id;
	
	@ManyToOne
	private ElaboracaoNormativa elaboracaoNormativa;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private AreaConsultada areaConsultada;
	
	@Column
	private Date prazoResposta;
	
	@Column
	private String comentario;
	
	@Column
	private String arquivo;

	public Long getId() {
		return id;
	}

	public ElaboracaoNormativa getElaboracaoNormativa() {
		return elaboracaoNormativa;
	}

	public String getComentario() {
		return comentario;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setElaboracaoNormativa(ElaboracaoNormativa elaboracaoNormativa) {
		this.elaboracaoNormativa = elaboracaoNormativa;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
	}

	public String getArquivo() {
		return arquivo;
	}

	public void setArquivo(String arquivo) {
		this.arquivo = arquivo;
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
		ElaboracaoNormativaConsulta other = (ElaboracaoNormativaConsulta) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	public AreaConsultada getAreaConsultada() {
		return areaConsultada;
	}

	public void setAreaConsultada(AreaConsultada areaConsultada) {
		this.areaConsultada = areaConsultada;
	}

	public Date getPrazoResposta() {
		return prazoResposta;
	}

	public void setPrazoResposta(Date prazoResposta) {
		this.prazoResposta = prazoResposta;
	}
	
	// TODO: anexo

}
