package br.org.mj.sislegis.app.service;

import java.util.List;

import javax.ws.rs.core.UriInfo;

import br.org.mj.sislegis.app.model.Tarefa;

public interface TarefaService extends Service<Tarefa> {
	
	public Tarefa save(Tarefa entity, UriInfo uriInfo);
	public Tarefa buscarPorId(Long idTarefa);
	public List<Tarefa> buscarPorUsuario(Long idUsuario);
	public Tarefa buscarPorEncaminhamentoProposicaoId(Long idEncaminhamentoProposicao);
	
}
