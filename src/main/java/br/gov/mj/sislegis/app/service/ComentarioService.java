package br.gov.mj.sislegis.app.service;

import java.util.List;

import javax.ejb.Local;

import br.gov.mj.sislegis.app.json.ComentarioJSON;
import br.gov.mj.sislegis.app.model.Comentario;

@Local
public interface ComentarioService extends Service<Comentario> {
	public List<ComentarioJSON> findByProposicao(Long id);
	public void salvarComentario(ComentarioJSON comentarioJSON);

}
