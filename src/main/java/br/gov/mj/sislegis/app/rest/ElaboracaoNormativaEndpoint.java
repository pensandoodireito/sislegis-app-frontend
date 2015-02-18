package br.gov.mj.sislegis.app.rest;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

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
import javax.ws.rs.core.Response.ResponseBuilder;
import javax.ws.rs.core.UriBuilder;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import br.gov.mj.sislegis.app.enumerated.ElaboracaoNormativaNorma;
import br.gov.mj.sislegis.app.enumerated.ElaboracaoNormativaObjeto;
import br.gov.mj.sislegis.app.enumerated.ElaboracaoNormativaSituacao;
import br.gov.mj.sislegis.app.enumerated.ElaboracaoNormativaSubTipo;
import br.gov.mj.sislegis.app.enumerated.ElaboracaoNormativaTipo;
import br.gov.mj.sislegis.app.json.ComboJSON;
import br.gov.mj.sislegis.app.model.ElaboracaoNormativa;
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
			@QueryParam("elaboracaoNormativaSituacao") String elaboracaoNormativaSituacao,
			@QueryParam("nup") String nup) {
		Map<String, Object> mapaCampos = populaMapaCampos(ano, numero, listaOrigensSelecionadosDropdown,
				listaCoAutoresSelecionadosDropdown,
				listaTagsSelecionadosDropdown, ementa, statusSidof, objeto,
				distribuicao, parecerista, tipo, subTipo,
				elaboracaoNormativaNorma, elaboracaoNormativaSituacao, nup);
		
		List<ElaboracaoNormativa> result = elaboracaoNormativaService.buscaPorParametros(mapaCampos);
		
		return result;
	}
	
	
	@GET
	@Path("/exportarDadosParaExcel/{ano}/{numero}/{listaOrigensSelecionadosDropdown}/{listaCoAutoresSelecionadosDropdown}"
			+ "/{listaTagsSelecionadosDropdown}/{ementa}/{statusSidof}/{objeto}/{distribuicao}/{parecerista}/{tipo}"
			+ "/{subTipo}/{elaboracaoNormativaNorma}/{elaboracaoNormativaSituacao}/{nup}")
	@Produces("application/json")
	public Response exportarDadosParaExcel(@PathParam("ano") String ano, 
			@PathParam("numero") String numero,
			@PathParam("listaOrigensSelecionadosDropdown") String listaOrigensSelecionadosDropdown,
			@PathParam("listaCoAutoresSelecionadosDropdown") String listaCoAutoresSelecionadosDropdown,
			@PathParam("listaTagsSelecionadosDropdown") String listaTagsSelecionadosDropdown,
			@PathParam("ementa") String ementa,
			@PathParam("statusSidof") Long statusSidof,
			@PathParam("objeto") String objeto,
			@PathParam("distribuicao") Long distribuicao,
			@PathParam("parecerista") Long parecerista,
			@PathParam("tipo") String tipo,
			@PathParam("subTipo") String subTipo,
			@PathParam("elaboracaoNormativaNorma") String elaboracaoNormativaNorma,
			@PathParam("elaboracaoNormativaSituacao") String elaboracaoNormativaSituacao,
			@PathParam("nup") String nup){
		Map<String, Object> mapaCampos = populaMapaCampos(checkStringNull(ano), checkStringNull(numero), 
				checkStringNull(listaOrigensSelecionadosDropdown),
				checkStringNull(listaCoAutoresSelecionadosDropdown),
				checkStringNull(listaTagsSelecionadosDropdown), checkStringNull(ementa), statusSidof, checkStringNull(objeto),
				distribuicao, parecerista, checkStringNull(tipo), checkStringNull(subTipo), checkStringNull(elaboracaoNormativaNorma), 
				checkStringNull(elaboracaoNormativaSituacao), checkStringNull(nup));
		
		List<ElaboracaoNormativa> result = elaboracaoNormativaService.buscaPorParametros(mapaCampos);
		ResponseBuilder response =null;
		OutputStream fileOut = null;
		
		try {
			String filename = "elaboracaoNormativa.xls";
			HSSFWorkbook workbook = new HSSFWorkbook();
			HSSFSheet sheet = workbook.createSheet("ElaboracaoNormativa");
			HSSFFont font = workbook.createFont();
			font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
			font.setFontName(HSSFFont.FONT_ARIAL);
			HSSFCellStyle style = workbook.createCellStyle();
			style.setFont(font);

			HSSFRow rowhead = sheet.createRow((short) 0);
			rowhead.createCell(0).setCellValue("Tipo");
			rowhead.createCell(1).setCellValue("Ementa");
			rowhead.createCell(2).setCellValue("Identificação");
			rowhead.createCell(3).setCellValue("Origem");
			rowhead.createCell(4).setCellValue("Situação");
			rowhead.createCell(5).setCellValue("Tipo Norma");
			rowhead.createCell(6).setCellValue("Status sidof");
			rowhead.createCell(7).setCellValue("Data inclusão sidof");
			rowhead.createCell(8).setCellValue("Data assinatura sidof");
			rowhead.createCell(9).setCellValue("NUP");
			rowhead.createCell(10).setCellValue("Equipe");
			rowhead.createCell(11).setCellValue("Ano");
			rowhead.createCell(12).setCellValue("Número");
			rowhead.createCell(13).setCellValue("Situação");
			rowhead.createCell(14).setCellValue("Ementa manifestação");
			rowhead.createCell(15).setCellValue("Data nota SAL");
			rowhead.createCell(16).setCellValue("Número norma");
			rowhead.createCell(17).setCellValue("Ano norma");
			rowhead.setRowStyle(style);
			
			int i=1;
			for(ElaboracaoNormativa elaboracaoNormativa:result){
				HSSFRow row = sheet.createRow((short) i);
				row.createCell(0).setCellValue(elaboracaoNormativa.getValueTipoSubTipo());
				row.createCell(1).setCellValue(elaboracaoNormativa.getEmenta());
				row.createCell(2).setCellValue(elaboracaoNormativa.getValueIdentificacao());
				row.createCell(3).setCellValue(elaboracaoNormativa.getOrigemDescricao());
				row.createCell(4).setCellValue(elaboracaoNormativa.getSituacaoDescricao());
				row.createCell(5).setCellValue(elaboracaoNormativa.getTipoNormaDescricao());
				row.createCell(6).setCellValue(elaboracaoNormativa.getStatusSidofDescricao());
				row.createCell(7).setCellValue(elaboracaoNormativa.getDataInclusaoSIDOFFormatada());
				row.createCell(8).setCellValue(elaboracaoNormativa.getDataAssinaturaSIDOFFormatada());
				row.createCell(9).setCellValue(elaboracaoNormativa.getNup());
				row.createCell(10).setCellValue(elaboracaoNormativa.getEquipeDescricao());
				row.createCell(11).setCellValue(elaboracaoNormativa.getAno());
				row.createCell(12).setCellValue(elaboracaoNormativa.getNumero());
				row.createCell(13).setCellValue(elaboracaoNormativa.getSituacaoDescricao());
				row.createCell(14).setCellValue(elaboracaoNormativa.getEmentaManifestacao());
				row.createCell(15).setCellValue(elaboracaoNormativa.getDataMinifestacaoFormatada());
				row.createCell(16).setCellValue(elaboracaoNormativa.getNormaGeradaNumero());
				row.createCell(17).setCellValue(checkObjectNull(elaboracaoNormativa.getNormaGeradaAno()));
				i++;
			}

			fileOut = new FileOutputStream(filename);
			workbook.write(fileOut);
			fileOut.close();
			
			response = Response.ok((Object) new File(filename));
			response.header("Content-Disposition",
					"attachment; filename="+filename);
			response.header("Content-Type","application/vnd.ms-excel");

		} catch (Exception ex) {
			System.out.println(ex);

		}
		return response.build();
	}
	
	private String checkStringNull(String var){
		return var.equals("null")?"":var;
	}
	
	private String checkObjectNull(Object obj){
		return Objects.isNull(obj)?"":obj.toString();
	}

	private Map<String, Object> populaMapaCampos(String ano, String numero,
			String listaOrigensSelecionadosDropdown,
			String listaCoAutoresSelecionadosDropdown,
			String listaTagsSelecionadosDropdown, String ementa,
			Long statusSidof, String objeto, Long distribuicao,
			Long parecerista, String tipo, String subTipo,
			String elaboracaoNormativaNorma, String elaboracaoNormativaSituacao, String nup) {
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
		mapaCampos.put("nup", nup);
		return mapaCampos;
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