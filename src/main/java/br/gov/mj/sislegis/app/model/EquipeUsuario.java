package br.gov.mj.sislegis.app.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

@Entity
@Table(name = "equipe_usuario")
@XmlRootElement
// http://stackoverflow.com/questions/15130494/how-to-implement-a-complex-many-to-many-relationship-in-jpa
public class EquipeUsuario implements AbstractEntity {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	
	@EmbeddedId
    private EquipeUsuarioPK equipeUsuarioPK;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("idEquipe")
	private Equipe equipe;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("idUsuario")
	private Usuario usuario;
	
	
	 public Usuario build() {
	    return new Usuario();
	  }
	
	@Column
	private Boolean isCoordenador;

	public EquipeUsuario() {
		super();
		equipeUsuarioPK = new EquipeUsuarioPK();
	}

	public EquipeUsuario(EquipeUsuarioPK id, Equipe equipe, Usuario usuario,
			Boolean isCoordenador) {
		super();
		this.equipeUsuarioPK = id;
		this.equipe = equipe;
		this.usuario = usuario;
		this.isCoordenador = isCoordenador;
	}

	public Number getId() {
		return equipeUsuarioPK.hashCode();
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


	public EquipeUsuarioPK getEquipeUsuarioPK() {
		return equipeUsuarioPK;
	}

	public void setEquipeUsuarioPK(EquipeUsuarioPK equipeUsuarioPK) {
		this.equipeUsuarioPK = equipeUsuarioPK;
	} 
}