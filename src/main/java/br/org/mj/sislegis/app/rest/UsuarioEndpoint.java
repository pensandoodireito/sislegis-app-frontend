package br.org.mj.sislegis.app.rest;

import java.util.List;

import javax.ejb.Stateless;
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

import br.org.mj.sislegis.app.model.Usuario;
import br.org.mj.sislegis.app.service.Service;
import br.org.mj.sislegis.app.service.UsuarioService;

/**
 * 
 */
@Stateless
@Path("/usuarios")
public class UsuarioEndpoint {
	
	@Inject
	private UsuarioService service;

	@POST
	@Consumes("application/json")
	public Response create(Usuario entity) {
		service.save(entity);
		return Response.created(
				UriBuilder.fromResource(UsuarioEndpoint.class)
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
	@Path("/find{nome:.*}")
	@Produces("application/json")
	public Response findByNome(@QueryParam("nome") String nome) {
		return Response.ok(service.findByNome(nome)).build();
	}

	@GET
	@Produces("application/json")
	public List<Usuario> listAll(@QueryParam("start") Integer startPosition,
			@QueryParam("max") Integer maxResult) {
		return service.listAll();
	}

	@PUT
	@Path("/{id:[0-9][0-9]*}")
	@Consumes("application/json")
	public Response update(Usuario entity) {
		try {
			entity = service.save(entity);
		} catch (OptimisticLockException e) {
			return Response.status(Response.Status.CONFLICT)
					.entity(e.getEntity()).build();
		}

		return Response.noContent().build();
	}
}