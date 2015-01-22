package br.gov.mj.sislegis.app.rest;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import javax.ejb.EJBTransactionRolledbackException;
import javax.inject.Inject;
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

import br.gov.mj.sislegis.app.json.ProposicaoJSON;
import br.gov.mj.sislegis.app.model.Proposicao;
import br.gov.mj.sislegis.app.model.ReuniaoProposicao;
import br.gov.mj.sislegis.app.service.ProposicaoService;
import br.gov.mj.sislegis.app.service.Service;


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
			@QueryParam("data")Date data) throws Exception {
		
		Map<String, Object> parametros = new HashMap<String, Object>();
		parametros.put("idComissao", idComissao);
		parametros.put("data", data);
		
		List<Proposicao> lista = proposicaoService.buscarProposicoesPautaCamaraWS(parametros);
		for (Proposicao proposicao:lista) {
			proposicao.setListaReuniaoProposicoes(new HashSet<ReuniaoProposicao>());
		}
		return lista;
	}

	@GET
	@Path("/proposicoesPautaSenado")
	@Produces("application/json")
	public List<Proposicao> buscarProposicoesPautaSenado(@QueryParam("siglaComissao")String siglaComissao, 
			@QueryParam("data")Date data) throws Exception {
		
		Map<String, Object> parametros = new HashMap<String, Object>();
		parametros.put("siglaComissao", siglaComissao);
		parametros.put("data", data);
		
		List<Proposicao> lista = proposicaoService.buscarProposicoesPautaSenadoWS(parametros);
		for (Proposicao proposicao:lista) {
			proposicao.setListaReuniaoProposicoes(new HashSet<ReuniaoProposicao>());
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
	@Path("/salvarProposicoes")
	@Consumes("application/json")
	public Response salvarProposicoes(List<Proposicao> listaProposicoesSelecionados){
		try{
			proposicaoService.salvarListaProposicao(listaProposicoesSelecionados);
		}catch(EJBTransactionRolledbackException e){
			return Response.status(Response.Status.CONFLICT).build();
		}
		return Response.noContent().build();
		
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
		proposicaoService.deleteById(id);
		return Response.noContent().build();
	}
	
	@DELETE
	@Path("/{id:[0-9][0-9]*}/{reuniaoId:[0-9][0-9]*}")
	public Response deleteById(@PathParam("id") Long id, @PathParam("reuniaoId") Long reuniaoId) {
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
	public List<ProposicaoJSON> listAll(@QueryParam("limit") Integer limit, @QueryParam("offset") Integer offset) {
		List<ProposicaoJSON> results = proposicaoService.listarTodos(offset, limit);
		return results;
	}
	
	@GET
	@Path("/buscarPorSufixo")
	@Produces("application/json")
	public List<ProposicaoJSON> buscarPorSufixo(@QueryParam("sufixo")String sufixo) {
		List<Proposicao> proposicoes = proposicaoService.buscarPorSufixo(sufixo);
		List<ProposicaoJSON> proposicaoJsonList = new ArrayList<ProposicaoJSON>();
		
		for (Proposicao proposicao : proposicoes) {
			ProposicaoJSON proposicaoJSON = new ProposicaoJSON();
			proposicaoJSON.setId(proposicao.getId());
			proposicaoJSON.setIdProposicao(proposicao.getIdProposicao());
			proposicaoJSON.setSigla(proposicao.getSigla());
			
			proposicaoJsonList.add(proposicaoJSON);
		}
		
		return proposicaoJsonList;
	}


	@PUT
	@Path("/{id:[0-9][0-9]*}")
	@Consumes("application/json")
	public Response update(ProposicaoJSON entity) {
		proposicaoService.atualizarProposicaoJSON(entity);
		return Response.noContent().build();
	}
	
}
