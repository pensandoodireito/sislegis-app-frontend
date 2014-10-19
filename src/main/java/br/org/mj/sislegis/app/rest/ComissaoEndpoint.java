package br.org.mj.sislegis.app.rest;

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
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;

import br.org.mj.sislegis.app.model.Comissao;
import br.org.mj.sislegis.app.service.ComissaoService;
import br.org.mj.sislegis.app.service.Service;

/**
 * 
 */
@Path("/comissaos")
public class ComissaoEndpoint {

	@Inject
	private ComissaoService comissaoService;

	@Inject
	private Service<Comissao> service;

	@POST
	@Consumes("application/json")
	public Response create(Comissao entity) {
		service.save(entity);
		return Response.created(
				UriBuilder.fromResource(ComissaoEndpoint.class)
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
		Comissao entity = comissaoService.findById(id);
		return Response.ok(entity).build();
	}
	@GET
	@Path("/comissoesCamara")
	@Produces("application/json")
	public List<Comissao> listarComissoesCamara() throws Exception {
		return comissaoService.listarComissoesCamara();
	}

	@GET
	@Path("/comissoesSenado")
	@Produces("application/json")
	public List<Comissao> listarComissoesSenado() throws Exception {
		return comissaoService.listarComissoesCamara();
	}

	
	@PUT
	@Path("/{id:[0-9][0-9]*}")
	@Consumes("application/json")
	public Response update(Comissao entity) {
		try {
			entity = comissaoService.save(entity);
		} catch (OptimisticLockException e) {
			return Response.status(Response.Status.CONFLICT)
					.entity(e.getEntity()).build();
		}

		return Response.noContent().build();
	}
}