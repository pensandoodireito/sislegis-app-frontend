package br.gov.mj.sislegis.app.rest;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.OptimisticLockException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriBuilder;

import br.gov.mj.sislegis.app.model.AreaConsultada;
import br.gov.mj.sislegis.app.model.ElaboracaoNormativaConsulta;
import br.gov.mj.sislegis.app.service.Service;

/**
 * 
 */
@Path("/elaboracaonormativaconsulta")
public class ElaboracaoNormativaConsultaEndpoint
{
   private Service<ElaboracaoNormativaConsulta> service;

	@POST
	@Consumes("application/json")
	public Response create(ElaboracaoNormativaConsulta entity) {
		service.save(entity);
		return Response.created(UriBuilder.fromResource(ElaboracaoNormativaConsultaEndpoint.class)
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
	public List<ElaboracaoNormativaConsulta> listAll(@QueryParam("start") Integer startPosition, @QueryParam("max") Integer maxResult) {
		return service.listAll();
	}

	@GET
	@Path("/find{descricao:.*}")
	@Produces("application/json")
	public Response findByDescricao(@QueryParam("descricao") String descricao) {
		return Response.ok(service.findByProperty("descricao", descricao, "ASC")).build();
	}

	@PUT
	@Path("/{id:[0-9][0-9]*}")
	@Consumes("application/json")
	public Response update(ElaboracaoNormativaConsulta entity) {
		try {
			entity = service.save(entity);
		} catch (OptimisticLockException e) {
			return Response.status(Response.Status.CONFLICT).entity(e.getEntity()).build();
		}

		return Response.noContent().build();
	}
}