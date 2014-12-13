package br.gov.mj.sislegis.app.rest;

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
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriBuilder;

import br.gov.mj.sislegis.app.json.ComentarioJSON;
import br.gov.mj.sislegis.app.model.Comentario;
import br.gov.mj.sislegis.app.service.ComentarioService;

/**
 * 
 */
@Path("/comentarios")
public class ComentarioEndpoint {

	@Inject
	private ComentarioService comentarioService;

	@POST
	@Consumes("application/json")
	public Response create(ComentarioJSON entity) {
		
		comentarioService.salvarComentario(entity);
		return Response.created(
				UriBuilder.fromResource(ComentarioEndpoint.class)
						.path(String.valueOf(entity.getId())).build()).build();
	}

	@DELETE
	@Path("/{id:[0-9][0-9]*}")
	public Response deleteById(@PathParam("id") Long id) {
		comentarioService.deleteById(id);
		return Response.noContent().build();
	}

	@GET
	@Path("/{id:[0-9][0-9]*}")
	@Produces("application/json")
	public Response findById(@PathParam("id") Long id) {
		Comentario entity = comentarioService.findById(id);
		if (entity == null) {
			return Response.status(Status.NOT_FOUND).build();
		}
		return Response.ok(entity).build();
	}

	@GET
	@Path("/proposicao/{id:[0-9][0-9]*}")
	@Produces("application/json")
	public List<ComentarioJSON> findByProposicao(@PathParam("id") Long id) {
		final List<ComentarioJSON> results = comentarioService.findByProposicao(id);
		return results;
	}

	@GET
	@Produces("application/json")
	public List<Comentario> listAll(@QueryParam("start") Integer startPosition,
			@QueryParam("max") Integer maxResult) {
		final List<Comentario> results = comentarioService.listAll();
		return results;
	}

	@PUT
	@Path("/{id:[0-9][0-9]*}")
	@Consumes("application/json")
	public Response update(ComentarioJSON entity) {
		try {
			comentarioService.salvarComentario(entity);
		} catch (OptimisticLockException e) {
			return Response.status(Response.Status.CONFLICT)
					.entity(e.getEntity()).build();
		}

		return Response.noContent().build();
	}
}