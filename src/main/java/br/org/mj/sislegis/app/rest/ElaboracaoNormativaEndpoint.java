package br.org.mj.sislegis.app.rest;

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

import br.org.mj.sislegis.app.enumerated.ElaboracaoNormativaTipo;
import br.org.mj.sislegis.app.json.TipoElaboracaoNormativaJSON;
import br.org.mj.sislegis.app.model.ElaboracaoNormativa;
import br.org.mj.sislegis.app.service.ElaboracaoNormativaService;
import br.org.mj.sislegis.app.service.Service;

/**
 * 
 */
@Stateless
@Path("/elaboracaonormativa")
public class ElaboracaoNormativaEndpoint {

	@Inject
	private Service<ElaboracaoNormativa> service;
	
	@Inject
	private ElaboracaoNormativaService elaboracaoNormativaService;

	@POST
	@Consumes("application/json")
	public Response create(ElaboracaoNormativa entity) {
		elaboracaoNormativaService.salvar(entity);
		return Response.created(
				UriBuilder.fromResource(ElaboracaoNormativaEndpoint.class)
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
	public List<ElaboracaoNormativa> listAll(
			@QueryParam("start") Integer startPosition,
			@QueryParam("max") Integer maxResult) {
		return service.listAll();
	}
	
	@GET
	@Path("/tipos")
	@Produces("application/json")
	public List<TipoElaboracaoNormativaJSON> tipos() {
		List<TipoElaboracaoNormativaJSON> lista = new ArrayList<TipoElaboracaoNormativaJSON>();
		for(ElaboracaoNormativaTipo elaboracaoNormativaTipo:ElaboracaoNormativaTipo.values()){
			TipoElaboracaoNormativaJSON tipoElaboracaoNormativaJSON = new TipoElaboracaoNormativaJSON();
			tipoElaboracaoNormativaJSON.setId(elaboracaoNormativaTipo.getValue());
			tipoElaboracaoNormativaJSON.setDescricao(elaboracaoNormativaTipo.name());
			lista.add(tipoElaboracaoNormativaJSON);
		}
		return lista;
	}

	@PUT
	@Path("/{id:[0-9][0-9]*}")
	@Consumes("application/json")
	public Response update(ElaboracaoNormativa entity) {
		try {
			entity = service.save(entity);
		} catch (OptimisticLockException e) {
			return Response.status(Response.Status.CONFLICT)
					.entity(e.getEntity()).build();
		}

		return Response.noContent().build();
	}
}