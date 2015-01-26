package br.gov.mj.sislegis.app.rest;

import java.util.ArrayList;
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

import br.gov.mj.sislegis.app.model.Equipe;
import br.gov.mj.sislegis.app.model.EquipeUsuario;
import br.gov.mj.sislegis.app.service.EquipeService;
import br.gov.mj.sislegis.app.service.Service;

/**
 * 
 */
@Stateless
@Path("/equipes")
public class EquipeEndpoint {
	@Inject
	private Service<Equipe> service;
	
	@Inject
	private EquipeService equipeService;

	@POST
	@Consumes("application/json")
	public Response create(Equipe entity) {
		equipeService.salvarEquipe(entity);
		return Response.created(
				UriBuilder.fromResource(EquipeEndpoint.class)
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
		Equipe equipe = service.findById(id);
/*		List<EquipeUsuario> lista = new ArrayList<EquipeUsuario>(equipe.getListaEquipeUsuario());
		equipe.setListaEquipeUsuario(new ArrayList<EquipeUsuario>());
		for(EquipeUsuario equipeUsuario: lista){
			equipe.getListaEquipeUsuario().add(new EquipeUsuario(equipeUsuario.getEquipeUsuarioPK(), 
					equipeUsuario.getEquipe(), equipeUsuario.getUsuario(), equipeUsuario.getIsCoordenador()));
		}*/
		return Response.ok(equipe).build();
	}

	@GET
	@Produces("application/json")
	public List<Equipe> listAll(@QueryParam("start") Integer startPosition,
			@QueryParam("max") Integer maxResult) {
		return service.listAll();
	}

	@PUT
	@Path("/{id:[0-9][0-9]*}")
	@Consumes("application/json")
	public Response update(Equipe entity) {
		try {
			entity = equipeService.salvarEquipe(entity);
		} catch (OptimisticLockException e) {
			return Response.status(Response.Status.CONFLICT)
					.entity(e.getEntity()).build();
		}

		return Response.noContent().build();
	}
}