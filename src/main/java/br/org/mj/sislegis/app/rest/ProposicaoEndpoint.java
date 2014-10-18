package br.org.mj.sislegis.app.rest;

import java.util.HashMap;
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

import br.org.mj.sislegis.app.model.Proposicao;
import br.org.mj.sislegis.app.service.ProposicaoService;
import br.org.mj.sislegis.app.service.Service;

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
	@Produces("application/json")
	public List<Proposicao> buscarProposicoes(@QueryParam("texto")String texto, 
			@QueryParam("origem")String origem,
			@QueryParam("data")String data) {
		
		Map<String, Object> parametros = new HashMap<String, Object>();
		parametros.put("texto", texto);
		parametros.put("data", data);
		parametros.put("origem", origem);
		
		return proposicaoService.buscarProposicoes(parametros);
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
		return Response.ok(service.findById(id)).build();
	}

	@GET
	@Produces("application/json")
	public List<Proposicao> listAll(@QueryParam("start") Integer startPosition,
			@QueryParam("max") Integer maxResult) {
		final List<Proposicao> results = service.listAll();
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