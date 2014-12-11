package br.org.mj.sislegis.app.service;

import java.util.List;

import br.org.mj.sislegis.app.model.Tarefa;

public interface TarefaService extends Service<Tarefa> {
	
	public Tarefa save(Tarefa entity, String referer);
	public Tarefa buscarPorId(Long idTarefa);
	public List<Tarefa> buscarPorUsuario(Long idUsuario);
	public Tarefa buscarPorEncaminhamentoProposicaoId(Long idEncaminhamentoProposicao);
	
}
