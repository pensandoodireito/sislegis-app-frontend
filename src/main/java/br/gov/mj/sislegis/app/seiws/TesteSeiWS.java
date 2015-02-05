package br.gov.mj.sislegis.app.seiws;

import java.rmi.RemoteException;
import java.util.Arrays;
import java.util.List;

import javax.xml.rpc.ServiceException;


public class TesteSeiWS {

    public static void main(String[] args) {
	
	try {
		SeiServiceLocator locator = new SeiServiceLocator();
	    RetornoConsultaProcedimento retorno = locator.getSeiPortService().consultarProcedimento("SISLEGIS", "sislegis",
		    null, "08027.000007/2014-49", null, null, null, null, null, null, null, null, null);
	    
	    
	    //locator.getSeiPortService().incluirDocumento(siglaSistema, identificacaoServico, idUnidade, documento)
	    
	    System.out.println(retorno.getLinkAcesso());
	    // 08000.000010/2014-61

	    Usuario[] usuario = locator.getSeiPortService().listarUsuarios("SISLEGIS", "sislegis", "110001114", "");
	    for (Usuario us : usuario) {
		System.out.println("Usuario :" + us.getNome() + " sigla " + us.getSigla() + " id " + us.getIdUsuario());
	    }

	    // locator.getSeiPortService().consultarProcedimento(siglaSistema,
	    // identificacaoServico, idUnidade,
	    // protocoloProcedimento, sinRetornarAssuntos,
	    // sinRetornarInteressados, sinRetornarObservacoes,
	    // sinRetornarAndamentoGeracao, sinRetornarAndamentoConclusao,
	    // sinRetornarUltimoAndamento,
	    // sinRetornarUnidadesProcedimentoAberto,
	    // sinRetornarProcedimentosRelacionados,
	    // sinRetornarProcedimentosAnexados);

	    /*
	     * RetornoConsultaProcedimento retorno =
	     * locator.getSeiPortService().consultarProcedimento("SEI", "lu",
	     * "110000834", "08000.000002/2014-14", null, null, null, null,
	     * null, null, null, null, null);
	     * 
	     * System.out.println("retorno "+retorno.getLinkAcesso()+" - "+retorno
	     * .getTipoProcedimento().getNome());
	     * 
	     * RetornoConsultaDocumento retornoDoc =
	     * locator.getSeiPortService().consultarDocumento("SEI", "lu",
	     * "110000834", "0000001", null, null, null);
	     * 
	     * locator.getSeiPortService().listarTiposProcedimento("SEI", "lu",
	     * "110000834", null);
	     */

	    // "08000.000002/2014-14"
	    // RetornoConsultaProcedimento retorno =
	    // locator.getSeiPortService().consultarProcedimento("SEI", "lu",
	    // "110000834", "08000.000002/2014-14", null, null, null, null,
	    // null, null, null, null, null);
	    // retorno.getUltimoAndamento();
	    //
	    // locator.getSeiPortService().listarTiposProcedimento("SEI", "lu",
	    // "110000834", null);
	    // locator.getSeiPortService().listarSeries("SEI", "lu",
	    // "110000834", null);

	    List<Unidade> listaUnidades = Arrays.asList(locator.getSeiPortService().listarUnidades("SISLEGIS", "sislegis", null,
		    null));

	    
	    System.out.println("############################## USUÁRIOS...");

	    for (Unidade unidade : listaUnidades) {
		 if(unidade.getDescricao().contains("anistia")){
		    usuario = locator.getSeiPortService().listarUsuarios("SISLEGIS", "sislegis", unidade.getIdUnidade(), "");
        	    System.out.println("");
        	    for (Usuario us : usuario) {
        		System.out.println("Usuario :" + us.getNome() + " sigla " + us.getSigla() + " id " + us.getIdUsuario()+" Unidade "+unidade.getDescricao());
        	    }
    	        }
	    }
	    // System.out.println(retornoDoc.getDocumentoFormatado());

	} catch (RemoteException e) {
	    // TODO Auto-generated catch block
	    e.printStackTrace();
	} catch (ServiceException e) {
	    // TODO Auto-generated catch block
	    e.printStackTrace();
	}

    }
}