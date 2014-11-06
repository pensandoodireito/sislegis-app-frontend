package br.org.mj.sislegis.app.service;

import java.util.List;

import javax.ejb.Local;

import br.org.mj.sislegis.app.json.ComentarioJSON;
import br.org.mj.sislegis.app.model.Comentario;

@Local
public interface ComentarioService extends Service<Comentario> {
	public List<ComentarioJSON> findByProposicao(Long id);
	public void salvarComentario(ComentarioJSON comentarioJSON);

}
