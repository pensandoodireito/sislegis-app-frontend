package br.gov.mj.sislegis.app.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "equipe")
@XmlRootElement
//Necessario para evitar bug de recursao do jackson - >http://stackoverflow.com/questions/3325387/infinite-recursion-with-jackson-json-and-hibernate-jpa-issue
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="@id") 
public class Equipe implements AbstractEntity {

	private static final long serialVersionUID = 8516082010865687791L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", updatable = false, nullable = false)
	private Long id;

	@Column
	private String nome;
	
	@OneToMany(fetch = FetchType.EAGER, mappedBy = "equipe", cascade={CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
	private Set<EquipeUsuario> listaEquipeUsuario;

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
	
	public Set<EquipeUsuario> getListaEquipeUsuario() {
		return listaEquipeUsuario;
	}

	public void setListaEquipeUsuario(Set<EquipeUsuario> listaEquipeUsuario) {
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
}