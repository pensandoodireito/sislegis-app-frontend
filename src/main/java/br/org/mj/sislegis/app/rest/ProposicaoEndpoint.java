package br.org.mj.sislegis.app.rest;

import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.persistence.OptimisticLockException;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;

import br.org.mj.sislegis.app.enumerated.Origem;
import br.org.mj.sislegis.app.model.Proposicao;
import br.org.mj.sislegis.app.model.ProposicaoJSON;
import br.org.mj.sislegis.app.model.Reuniao;
import br.org.mj.sislegis.app.service.ProposicaoService;
import br.org.mj.sislegis.app.service.Service;
import br.org.mj.sislegis.app.util.Conversores;

/**
 * 
 */
@Path("/proposicaos")
public class ProposicaoEndpoint {

	@Inject
	private ProposicaoService proposicaoService;

	@Inject
	private Service<Proposicao> service;
	

	@GET
	@Path("/proposicoesPautaCamara")
	@Produces("application/json")
	public List<Proposicao> buscarProposicoesPautaCamara(@QueryParam("idComissao")Long idComissao, 
			@QueryParam("data")String data) throws Exception {
		
		Date formattedDate = Conversores.stringToDate(data, "yyyyMMdd");
		Map<String, Object> parametros = new HashMap<String, Object>();
		parametros.put("idComissao", idComissao);
		parametros.put("data", formattedDate);
		
		List<Proposicao> lista = proposicaoService.buscarProposicoesPautaCamaraWS(parametros);
		for(Proposicao proposicao:lista){
			proposicao.setOrigem(Origem.CAMARA);
			proposicao.setListaReunioes(new HashSet<Reuniao>());
		}
		return lista;
	}

	@GET
	@Path("/proposicoesPautaSenado")
	@Produces("application/json")
	public List<Proposicao> buscarProposicoesPautaSenado(@QueryParam("siglaComissao")String siglaComissao, 
			@QueryParam("data")String data) throws Exception {
		
		Date formattedDate = Conversores.stringToDate(data, "yyyyMMdd");
		Map<String, Object> parametros = new HashMap<String, Object>();
		parametros.put("siglaComissao", siglaComissao);
		parametros.put("data", formattedDate);
		
		List<Proposicao> lista = proposicaoService.buscarProposicoesPautaSenadoWS(parametros);
		for(Proposicao proposicao:lista){
			proposicao.setOrigem(Origem.SENADO);
			proposicao.setListaReunioes(new HashSet<Reuniao>());
		}
		return lista;
	}

	@GET
	@Path("/detalharProposicaoCamaraWS")
	@Produces("application/json")
	public Proposicao detalharProposicaoCamaraWS(@QueryParam("id") Long id) throws Exception {
		return proposicaoService.detalharProposicaoCamaraWS(id);
	}

	@GET
	@Path("/detalharProposicaoSenadoWS")
	@Produces("application/json")
	public Proposicao detalharProposicaoSenadoWS(@QueryParam("id") Long id) throws Exception {
		return proposicaoService.detalharProposicaoSenadoWS(id);
	}
	
	@POST
	@Consumes("application/json")
	public void salvarProposicoes(List<Proposicao> listaProposicoesSelecionados){
		proposicaoService.salvarListaProposicao(listaProposicoesSelecionados);
	}
	
	@POST
	@Consumes("application/json")
	public Response create(Proposicao entity) {
		service.save(entity);
		return Response.created(
				UriBuilder.fromResource(ProposicaoEndpoint.class)
						.path(String.valueOf(entity.getId())).build()).build();
	}

	@DELETE
	@Path("/{id:[0-9][0-9]*}")
	public Response deleteById(@PathParam("id") Long id) {
		service.deleteById(id);
		return Response.noContent().build();
	}

	@GET
	@Path("/{id:[0-9][0-9]*}")
	@Produces("application/json")
	public Response findById(@PathParam("id") Long id) {
		return Response.ok(proposicaoService.buscarPorId(id)).build();
	}

	@GET
	@Produces("application/json")
	public List<ProposicaoJSON> listAll() {
		List<ProposicaoJSON> results = proposicaoService.listarTodos();
		return results;
	}

	@PUT
	@Path("/{id:[0-9][0-9]*}")
	@Consumes("application/json")
	public Response update(Proposicao entity) {
		try {
			entity = service.save(entity);
		} catch (OptimisticLockException e) {
			return Response.status(Response.Status.CONFLICT)
					.entity(e.getEntity()).build();
		}

		return Response.noContent().build();
	}
	
}
