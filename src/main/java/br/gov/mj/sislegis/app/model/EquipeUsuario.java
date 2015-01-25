package br.gov.mj.sislegis.app.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@Table(name = "equipe_usuario")
@XmlRootElement
// http://stackoverflow.com/questions/15130494/how-to-implement-a-complex-many-to-many-relationship-in-jpa
public class EquipeUsuario implements Serializable {
	
	@EmbeddedId
    private EquipeUsuarioPK id;
	
	@ManyToOne
	@MapsId("idEquipe")
	private Equipe equipe;

	@ManyToOne
	@MapsId("idUsuario")
	private Usuario usuario;
	
	@Column
	private Boolean isCoordenador;

	public EquipeUsuario() {
		super();
		id = new EquipeUsuarioPK();
	}

	public EquipeUsuario(EquipeUsuarioPK id, Equipe equipe, Usuario usuario,
			Boolean isCoordenador) {
		super();
		this.id = id;
		this.equipe = equipe;
		this.usuario = usuario;
		this.isCoordenador = isCoordenador;
	}

	public EquipeUsuarioPK getId() {
		return id;
	}

	public void setId(EquipeUsuarioPK id) {
		this.id = id;
	}

	public Equipe getEquipe() {
		return equipe;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public Boolean getIsCoordenador() {
		return isCoordenador;
	}

	public void setEquipe(Equipe equipe) {
		this.equipe = equipe;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public void setIsCoordenador(Boolean isCoordenador) {
		this.isCoordenador = isCoordenador;
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
		EquipeUsuario other = (EquipeUsuario) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	} 
}