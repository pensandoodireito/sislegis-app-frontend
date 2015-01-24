package br.gov.mj.sislegis.app.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.xml.bind.annotation.XmlRootElement;

import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

@Entity
@Table(name = "equipe")
@XmlRootElement
//Necessario para evitar bug de recursao do jackson - >http://stackoverflow.com/questions/3325387/infinite-recursion-with-jackson-json-and-hibernate-jpa-issue
@JsonIdentityReference(alwaysAsId = true)
public class Equipe implements AbstractEntity {

	private static final long serialVersionUID = 8516082010865687791L;
	

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", updatable = false, nullable = false)
	private Long id;

	@Column
	private String nome;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "equipe", fetch = FetchType.EAGER)
	private List<EquipeUsuario> listaEquipeUsuario;
	
	@Transient
	private List<Long> listaEquipeUsuarioIds;

	public Long getId() {
		return this.id;
	}

	public void setId(final Long id) {
		this.id = id;
	}
	
	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
	
	public List<EquipeUsuario> getListaEquipeUsuario() {
		return listaEquipeUsuario;
	}

	public void setListaEquipeUsuario(List<EquipeUsuario> listaEquipeUsuario) {
		this.listaEquipeUsuario = listaEquipeUsuario;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (!(obj instanceof Equipe)) {
			return false;
		}
		Equipe other = (Equipe) obj;
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

	@Override
	public String toString() {
		String result = getClass().getSimpleName() + " ";
		if (nome != null && !nome.trim().isEmpty())
			result += "nome: " + nome;

		return result;
	}

	public List<Long> getListaEquipeUsuarioIds() {
		return listaEquipeUsuarioIds;
	}

	public void setListaEquipeUsuarioIds(List<Long> listaEquipeUsuarioIds) {
		this.listaEquipeUsuarioIds = listaEquipeUsuarioIds;
	}
}