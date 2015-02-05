package br.gov.mj.sislegis.app.rest;

import java.io.File;
import java.io.FileOutputStream;
import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.Date;
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
import javax.ws.rs.core.Response.ResponseBuilder;
import javax.ws.rs.core.UriBuilder;
import javax.xml.rpc.ServiceException;

import jxl.write.DateFormats;
import jxl.write.DateTime;
import jxl.write.Label;
import jxl.write.WritableCellFormat;
import jxl.write.WritableFont;
import jxl.write.WritableSheet;
import jxl.write.WriteException;

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
	@Path("/consultaServicoWS")
	@Produces("application/json")
	public String consultaServicoWS(@QueryParam("nup") String nup){
		//String linkRetorno = elaboracaoNormativaService.consultaServicoWS(nup);
		return "({\"id\":3,\"name\":\"Joe\"})";
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
		
		List<ElaboracaoNormativa> result = elaboracaoNormativaService.buscaPorParametros(mapaCampos);
		
		return result;
	}
	
	
	@GET
	@Path("/exportarDadosParaExcel")
	@Produces("application/vnd.ms-excel")
	public Response exportarDadosParaExcel(
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
		
		//List<ElaboracaoNormativa> result = elaboracaoNormativaService.buscaPorParametros(mapaCampos);
		//ByteArrayOutputStream baos = new ByteArrayOutputStream();
		//Response.ResponseBuilder response = Response.ok(baos.toByteArray());
		
		ResponseBuilder response =null;
		
		try {
			String filename = "NewExcelFile.xls";
			HSSFWorkbook workbook = new HSSFWorkbook();
			HSSFSheet sheet = workbook.createSheet("FirstSheet");

			HSSFRow rowhead = sheet.createRow((short) 0);
			rowhead.createCell(0).setCellValue("No.");
			rowhead.createCell(1).setCellValue("Name");
			rowhead.createCell(2).setCellValue("Address");

			HSSFRow row = sheet.createRow((short) 1);
			row.createCell(0).setCellValue("1");
			row.createCell(1).setCellValue("Raphael");
			row.createCell(2).setCellValue("India");

			FileOutputStream fileOut = new FileOutputStream(filename);
			workbook.write(fileOut);
			fileOut.close();

			response = Response.ok((Object) new File(filename));
			response.header("Content-Disposition",
					"attachment; filename=new-excel-file.xls");

		} catch (Exception ex) {
			System.out.println(ex);

		}

		/*		
		try{
			response.header("Content-Disposition", "attachment; filename=teste.xls");
			WritableWorkbook workbook = Workbook.createWorkbook(baos);
			WritableSheet sheet = workbook.createSheet("Sheet1", 0);
			sheet.addCell(new Label(0, 0, "Hello World"));
			workbook.write();
			workbook.close();
			
			
			
				
		} catch (WriteException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}*/
		
		
/*		File file = new File("NewExcelFile.xls");
		 
		ResponseBuilder response = Response.ok((Object) file);
		response.header("Content-Disposition",
			"attachment; filename=new-excel-file.xls");*/
		return response.build();		
		
	}
		
	
	
	private static void writeDataSheet(WritableSheet s, List<ElaboracaoNormativa> lista) throws WriteException {
		WritableFont wf = new WritableFont(WritableFont.ARIAL, 10,
				WritableFont.BOLD);
		WritableCellFormat cf = new WritableCellFormat(wf);
		cf.setWrap(true);

		/* Creates Label and writes date to one cell of sheet */
		Label l = new Label(0, 0, "Date", cf);
		s.addCell(l);
		WritableCellFormat cf1 = new WritableCellFormat(DateFormats.FORMAT9);

		DateTime dt = new DateTime(0, 1, new Date(), cf1, DateTime.GMT);

		s.addCell(dt);

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