package br.org.mj.sislegis.app.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
@Table(name = "elaboracao_normativa_consulta")
public class ElaboracaoNormativaConsulta implements AbstractEntity {
	
	private static final long serialVersionUID = 4338236680426826432L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", updatable = false, nullable = false)
	private Long id;
	
	@ManyToOne
	private ElaboracaoNormativa elaboracaoNormativa;
	
	@Column
	private String area;
	
	@Column
	private String comentario;

	public Long getId() {
		return id;
	}

	public ElaboracaoNormativa getElaboracaoNormativa() {
		return elaboracaoNormativa;
	}

	public String getArea() {
		return area;
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

	public void setArea(String area) {
		this.area = area;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
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
	
	// TODO: anexo

}
