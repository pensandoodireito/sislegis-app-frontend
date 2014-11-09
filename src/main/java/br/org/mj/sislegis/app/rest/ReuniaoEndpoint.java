package br.org.mj.sislegis.app.rest;



import java.util.Date;
import java.util.List;

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

import br.org.mj.sislegis.app.json.ProposicaoJSON;
import br.org.mj.sislegis.app.model.Reuniao;
import br.org.mj.sislegis.app.service.ProposicaoService;
import br.org.mj.sislegis.app.service.Service;


@Path("/reuniaos")
public class ReuniaoEndpoint {

	@Inject
	private Service<Reuniao> service;

	@Inject
	private ProposicaoService proposicaoService;
	
	@POST
	@Consumes("application/json")
	public Response create(Reuniao entity) {
		service.save(entity);
		return Response.created(
				UriBuilder.fromResource(ReuniaoEndpoint.class)
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
	@Path("/findByData")
	@Produces("application/json")
	public List<ProposicaoJSON> findByData(@QueryParam("data") Date data) throws Exception {
		List<ProposicaoJSON> lista = proposicaoService.buscarProposicoesPorDataReuniao(data);
		return lista;
	}

	@GET
	@Produces("application/json")
	public List<Reuniao> listAll() {
		List<Reuniao> results = service.listAll();
		return results;
	}

	@PUT
	@Path("/{id:[0-9][0-9]*}")
	@Consumes("application/json")
	public Response update(Reuniao entity) {
		try {
			entity = service.save(entity);
		} catch (OptimisticLockException e) {
			return Response.status(Response.Status.CONFLICT)
					.entity(e.getEntity()).build();
		}

		return Response.noContent().build();
	}
}
