package br.gov.mj.sislegis.app.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import br.gov.mj.sislegis.app.enumerated.ElaboracaoNormativaNorma;
import br.gov.mj.sislegis.app.enumerated.ElaboracaoNormativaObjeto;
import br.gov.mj.sislegis.app.enumerated.ElaboracaoNormativaSituacao;
import br.gov.mj.sislegis.app.enumerated.ElaboracaoNormativaTipo;
import br.gov.mj.sislegis.app.json.ComboJSON;
import br.gov.mj.sislegis.app.model.ElaboracaoNormativa;
import br.gov.mj.sislegis.app.model.StatusSidof;
import br.gov.mj.sislegis.app.service.ElaboracaoNormativaService;
import br.gov.mj.sislegis.app.service.Service;

/**
 * 
 */
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
		ElaboracaoNormativa elaboracaoNormativa = elaboracaoNormativaService.buscaElaboracaoNormativaPorId(id);
		return Response.ok(elaboracaoNormativa).build();
	}

	@GET
	@Produces("application/json")
	public List<ElaboracaoNormativa> listAll(
			@QueryParam("start") Integer startPosition,
			@QueryParam("max") Integer maxResult) {
		return elaboracaoNormativaService.listarTodos();
	}
	
	@GET
	@Path("/searchElaboracaoNormativa")
	@Produces("application/json")
	public List<ElaboracaoNormativa> searchElaboracaoNormativa(
			@QueryParam("tipo") String tipo,
			@QueryParam("nup") String nup,
			@QueryParam("identificacao") String identificacao,
			@QueryParam("autor") Long idAutor,
			@QueryParam("origem") Long idOrigem) {
		Map<String, Object> mapaCampos = new HashMap<String, Object>();
		mapaCampos.put("tipo", tipo);
		mapaCampos.put("nup", nup);
		mapaCampos.put("identificacao", identificacao);
		mapaCampos.put("autor", idAutor);
		mapaCampos.put("origem", idOrigem);
		return elaboracaoNormativaService.buscaPorParametros(mapaCampos);
	}
	
	
	@GET
	@Path("/tipos")
	@Produces("application/json")
	public List<ComboJSON<ElaboracaoNormativaTipo>> tipos() {
		List<ComboJSON<ElaboracaoNormativaTipo>> lista = new ArrayList<ComboJSON<ElaboracaoNormativaTipo>>();
		for(ElaboracaoNormativaTipo elaboracaoNormativaTipo:ElaboracaoNormativaTipo.values()){
			lista.add(new ComboJSON<ElaboracaoNormativaTipo>(elaboracaoNormativaTipo.name(), elaboracaoNormativaTipo.getValue()));
		}
		return lista;
	}

	@GET
	@Path("/identificacoes")
	@Produces("application/json")
	public List<ComboJSON<ElaboracaoNormativaObjeto>> identificacoes() {
		List<ComboJSON<ElaboracaoNormativaObjeto>> lista = new ArrayList<ComboJSON<ElaboracaoNormativaObjeto>>();
		for(ElaboracaoNormativaObjeto elaboracaoNormativaIdentificacao:ElaboracaoNormativaObjeto.values()){
			lista.add(new ComboJSON<ElaboracaoNormativaObjeto>(elaboracaoNormativaIdentificacao.name(), elaboracaoNormativaIdentificacao.getValue()));
		}
		return lista;
	}
	
	
	@GET
	@Path("/normas")
	@Produces("application/json")
	public List<ComboJSON<ElaboracaoNormativaNorma>> normas() {
		List<ComboJSON<ElaboracaoNormativaNorma>> lista = new ArrayList<ComboJSON<ElaboracaoNormativaNorma>>();
		for(ElaboracaoNormativaNorma elaboracaoNormativaNorma:ElaboracaoNormativaNorma.values()){
			lista.add(new ComboJSON<ElaboracaoNormativaNorma>(elaboracaoNormativaNorma.name(), elaboracaoNormativaNorma.getValue()));
		}
		return lista;
	}
	
	
	@GET
	@Path("/situacoes")
	@Produces("application/json")
	public List<ComboJSON<ElaboracaoNormativaSituacao>> situacoes() {
		List<ComboJSON<ElaboracaoNormativaSituacao>> lista = new ArrayList<ComboJSON<ElaboracaoNormativaSituacao>>();
		for(ElaboracaoNormativaSituacao elaboracaoNormativaSituacao:ElaboracaoNormativaSituacao.values()){
			lista.add(new ComboJSON<ElaboracaoNormativaSituacao>(elaboracaoNormativaSituacao.name(), elaboracaoNormativaSituacao.getValue()));
		}
		return lista;
	}
	
	
	@PUT
	@Path("/{id:[0-9][0-9]*}")
	@Consumes("application/json")
	public Response update(ElaboracaoNormativa entity) {
		try {
			elaboracaoNormativaService.salvar(entity);
		} catch (OptimisticLockException e) {
			return Response.status(Response.Status.CONFLICT)
					.entity(e.getEntity()).build();
		}

		return Response.noContent().build();
	}
}