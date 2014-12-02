package br.org.mj.sislegis.app.service;

import java.util.List;

import br.org.mj.sislegis.app.model.Tarefa;

public interface TarefaService extends Service<Tarefa> {
	
	public List<Tarefa> buscarPorUsuario(Long idUsuario);
	
}
