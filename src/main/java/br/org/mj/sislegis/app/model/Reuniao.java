package br.org.mj.sislegis.app.model;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class Reuniao implements AbstractEntity {

	private static final long serialVersionUID = -3187796439185752162L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", updatable = false, nullable = false)
	private Long id;

	@Column
	@Temporal(TemporalType.DATE)
	private Date data;

	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "reuniao")
	private Set<ReuniaoProposicao> listaReuniaoProposicoes = new HashSet<ReuniaoProposicao>();

	public Long getId() {
		return this.id;
	}

	public void setId(final Long id) {
		this.id = id;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (!(obj instanceof Reuniao)) {
			return false;
		}
		Reuniao other = (Reuniao) obj;
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

	public Date getData() {
		return data;
	}

	public void setData(Date data) {
		this.data = data;
	}

	public Set<ReuniaoProposicao> getListaReuniaoProposicoes() {
		return listaReuniaoProposicoes;
	}

	public void setListaReuniaoProposicoes(
			Set<ReuniaoProposicao> listaReuniaoProposicoes) {
		this.listaReuniaoProposicoes = listaReuniaoProposicoes;
	}

	@Override
	public String toString() {
		String result = getClass().getSimpleName() + " ";
		if (id != null)
			result += "id: " + id;
		if (data != null)
			result += ", data: " + data;
		return result;
	}

}