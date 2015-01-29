package br.gov.mj.sislegis.app.rest;

import java.rmi.RemoteException;
import java.util.ArrayList;
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
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import javax.xml.rpc.ServiceException;

import br.gov.mj.sislegis.app.enumerated.ElaboracaoNormativaNorma;
import br.gov.mj.sislegis.app.enumerated.ElaboracaoNormativaObjeto;
import br.gov.mj.sislegis.app.enumerated.ElaboracaoNormativaSituacao;
import br.gov.mj.sislegis.app.enumerated.ElaboracaoNormativaSubTipo;
import br.gov.mj.sislegis.app.enumerated.ElaboracaoNormativaTipo;
import br.gov.mj.sislegis.app.json.ComboJSON;
import br.gov.mj.sislegis.app.model.ElaboracaoNormativa;
import br.gov.mj.sislegis.app.service.ElaboracaoNormativaService;
import br.gov.mj.sislegis.app.service.Service;
import br.gov.mj.sislegis.app.ws.RetornoConsultaProcedimento;
import br.gov.mj.sislegis.app.ws.SeiServiceLocator;

/**
 * 
 */
@Path("/elaboracaonormativa")
public class ElaboracaoNormativaEndpoint {

	@Inject
	private Service<ElaboracaoNormativa> service;
	
	@Inject
	private ElaboracaoNormativaService elaboracaoNormativaService;
	
	@Inject
	private SeiServiceLocator seiServiceLocator;
	

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
			@QueryParam("numero") String numero,
			@QueryParam("ano") String ano,
			@QueryParam("listaOrigensSelecionadosDropdown") String listaOrigensSelecionadosDropdown,
			@QueryParam("listaCoAutoresSelecionadosDropdown") String listaCoAutoresSelecionadosDropdown,
			@QueryParam("listaTagsSelecionadosDropdown") String listaTagsSelecionadosDropdown,			
			@QueryParam("ementa") String ementa,
			@QueryParam("statusSidof") Long statusSidof,
			@QueryParam("objeto") String objeto,
			@QueryParam("distribuicao") Long distribuicao,
			@QueryParam("parecerista") Long parecerista,
			@QueryParam("tipo") String tipo,
			@QueryParam("subTipo") String subTipo,
			@QueryParam("elaboracaoNormativaNorma") String elaboracaoNormativaNorma,
			@QueryParam("elaboracaoNormativaSituacao") String elaboracaoNormativaSituacao) {
		Map<String, Object> mapaCampos = new HashMap<String, Object>();
		mapaCampos.put("numero", numero);
		mapaCampos.put("ano", ano);
		mapaCampos.put("listaOrigensSelecionadosDropdown", listaOrigensSelecionadosDropdown);
		mapaCampos.put("listaCoAutoresSelecionadosDropdown", listaCoAutoresSelecionadosDropdown);
		mapaCampos.put("listaTagsSelecionadosDropdown", listaTagsSelecionadosDropdown);
		mapaCampos.put("ementa", ementa);
		mapaCampos.put("statusSidof", statusSidof);
		mapaCampos.put("identificacao", objeto);
		mapaCampos.put("distribuicao", distribuicao);
		mapaCampos.put("parecerista", parecerista);
		mapaCampos.put("tipo", tipo);
		mapaCampos.put("subTipo", subTipo);
		mapaCampos.put("elaboracaoNormativaNorma", elaboracaoNormativaNorma);
		mapaCampos.put("elaboracaoNormativaSituacao", elaboracaoNormativaSituacao);
		
		
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
	@Path("/subTipos")
	@Produces("application/json")
	public List<ComboJSON<ElaboracaoNormativaSubTipo>> subTipos() {
		List<ComboJSON<ElaboracaoNormativaSubTipo>> lista = new ArrayList<ComboJSON<ElaboracaoNormativaSubTipo>>();
		for(ElaboracaoNormativaSubTipo elaboracaoNormativaSubTipo:ElaboracaoNormativaSubTipo.values()){
			lista.add(new ComboJSON<ElaboracaoNormativaSubTipo>(elaboracaoNormativaSubTipo.name(), elaboracaoNormativaSubTipo.getValue()));
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
	@Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
	public Response update(ElaboracaoNormativa entity) {
		try {
			elaboracaoNormativaService.salvar(entity);
		} catch (OptimisticLockException e) {
			return Response.status(Response.Status.CONFLICT)
					.entity(e.getEntity()).build();
		}

		return Response.noContent().build();
	}
	
	@GET
	@Path("/buscarPorSufixo")
	@Produces("application/json")
	public List<ElaboracaoNormativa> buscarPorSufixo(@QueryParam("sufixo")String sufixo) {
		return elaboracaoNormativaService.buscarPorSufixo(sufixo);
	}
	
	
}