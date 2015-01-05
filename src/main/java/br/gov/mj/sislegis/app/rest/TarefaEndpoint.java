package br.gov.mj.sislegis.app.rest;

import java.util.List;

import javax.inject.Inject;
import javax.persistence.OptimisticLockException;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;

import br.gov.mj.sislegis.app.model.Tarefa;
import br.gov.mj.sislegis.app.service.Service;
import br.gov.mj.sislegis.app.service.TarefaService;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;


@Path("/tarefas")
public class TarefaEndpoint {
	@Inject
	private Service<Tarefa> service;
	
	@Inject
	private TarefaService tarefaService;

	@POST
	@Consumes("application/json")
	public Response create(Tarefa entity, @HeaderParam("Referer") String referer) {
		tarefaService.save(entity, referer);
		return Response.created(
				UriBuilder.fromResource(TarefaEndpoint.class)
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
		return Response.ok(tarefaService.buscarPorId(id)).build();
	}

	@GET
	@Produces("application/json")
	public List<Tarefa> listAll(
			@QueryParam("start") Integer startPosition,
			@QueryParam("max") Integer maxResult) {
		
		return service.listAll();
	}
	
	@GET
	@Path("/usuario")
	@Produces("application/json")
	public String buscarPorUsuario(@QueryParam("idUsuario") Long idUsuario) {
		ObjectMapper mapper = new ObjectMapper();
		
		// Retorna apenas certos campos da proposicao. A definição do filtro fica na propria classe Proposicao
		FilterProvider filters = new SimpleFilterProvider().addFilter("tarefaFilter", SimpleBeanPropertyFilter.filterOutAllExcept("id", "sigla", "ementa"));
		mapper.setFilters(filters);
		
		List<Tarefa> buscarPorUsuario = tarefaService.buscarPorUsuario(idUsuario);
		
		String json = "";
		
		try {
			json = mapper.writeValueAsString(buscarPorUsuario);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		return json;
	}

	@PUT
	@Path("/{id:[0-9][0-9]*}")
	@Consumes("application/json")
	public Response update(Tarefa entity, @HeaderParam("Referer") String referer) {
		try {
			entity = tarefaService.save(entity, referer);
		} catch (OptimisticLockException e) {
			return Response.status(Response.Status.CONFLICT)
					.entity(e.getEntity()).build();
		}

		return Response.noContent().build();
	}
}