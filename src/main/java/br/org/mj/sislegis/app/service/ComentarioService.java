package br.org.mj.sislegis.app.service;

import java.util.List;

import javax.ejb.Local;

import br.org.mj.sislegis.app.model.Comentario;

@Local
public interface ComentarioService extends Service<Comentario> {
	public List<Comentario> findByProposicao(Long id);

}
