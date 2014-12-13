package br.gov.mj.sislegis.app.model;

import java.io.Serializable;

import javax.persistence.Embeddable;

@Embeddable
public class EquipeUsuarioPK implements Serializable {
	
	private long idEquipe;
	private long idUsuario;
	
	public EquipeUsuarioPK() {
		super();
	}
	
	public EquipeUsuarioPK(long idEquipe, long idUsuario) {
		super();
		this.idEquipe = idEquipe;
		this.idUsuario = idUsuario;
	}

	public long getIdEquipe() {
		return idEquipe;
	}

	public long getIdUsuario() {
		return idUsuario;
	}

	public void setIdEquipe(long idEquipe) {
		this.idEquipe = idEquipe;
	}

	public void setIdUsuario(long idUsuario) {
		this.idUsuario = idUsuario;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (idEquipe ^ (idEquipe >>> 32));
		result = prime * result + (int) (idUsuario ^ (idUsuario >>> 32));
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
		EquipeUsuarioPK other = (EquipeUsuarioPK) obj;
		if (idEquipe != other.idEquipe)
			return false;
		if (idUsuario != other.idUsuario)
			return false;
		return true;
	}

}
