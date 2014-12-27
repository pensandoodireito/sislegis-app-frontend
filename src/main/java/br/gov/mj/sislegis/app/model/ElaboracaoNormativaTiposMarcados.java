package br.gov.mj.sislegis.app.model;

import java.io.Serializable;

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
import javax.persistence.MapsId;
import javax.xml.bind.annotation.XmlRootElement;

import br.gov.mj.sislegis.app.enumerated.ElaboracaoNormativaTipo;

@Entity
@XmlRootElement
public class ElaboracaoNormativaTiposMarcados implements AbstractEntity{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 7722617248451501605L;
	
	public ElaboracaoNormativaTiposMarcados(){}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", updatable = false, nullable = false)
	private Long id;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private ElaboracaoNormativa elaboracaoNormativa;
	
	@Column
	@Enumerated(EnumType.ORDINAL)
	private ElaboracaoNormativaTipo tipo;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public ElaboracaoNormativaTipo getTipo() {
		return tipo;
	}

	public void setTipo(ElaboracaoNormativaTipo tipo) {
		this.tipo = tipo;
	}


	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (!(obj instanceof ElaboracaoNormativaTiposMarcados)) {
			return false;
		}
		ElaboracaoNormativaTiposMarcados other = (ElaboracaoNormativaTiposMarcados) obj;
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

	public ElaboracaoNormativa getElaboracaoNormativa() {
		return elaboracaoNormativa;
	}

	public void setElaboracaoNormativa(ElaboracaoNormativa elaboracaoNormativa) {
		this.elaboracaoNormativa = elaboracaoNormativa;
	}
	

}
