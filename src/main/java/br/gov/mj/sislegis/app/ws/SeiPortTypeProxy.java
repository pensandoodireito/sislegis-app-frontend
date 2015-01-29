package br.gov.mj.sislegis.app.ws;

public class SeiPortTypeProxy implements br.gov.mj.sislegis.app.ws.SeiPortType {
  private String _endpoint = null;
  private br.gov.mj.sislegis.app.ws.SeiPortType seiPortType = null;
  
  public SeiPortTypeProxy() {
    _initSeiPortTypeProxy();
  }
  
  public SeiPortTypeProxy(String endpoint) {
    _endpoint = endpoint;
    _initSeiPortTypeProxy();
  }
  
  private void _initSeiPortTypeProxy() {
    try {
      seiPortType = (new br.gov.mj.sislegis.app.ws.SeiServiceLocator()).getSeiPortService();
      if (seiPortType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)seiPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)seiPortType)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    }
    catch (javax.xml.rpc.ServiceException serviceException) {}
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (seiPortType != null)
      ((javax.xml.rpc.Stub)seiPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public br.gov.mj.sislegis.app.ws.SeiPortType getSeiPortType() {
    if (seiPortType == null)
      _initSeiPortTypeProxy();
    return seiPortType;
  }
  
  public br.gov.mj.sislegis.app.ws.RetornoGeracaoProcedimento gerarProcedimento(java.lang.String siglaSistema, java.lang.String identificacaoServico, java.lang.String idUnidade, br.gov.mj.sislegis.app.ws.Procedimento procedimento, br.gov.mj.sislegis.app.ws.Documento[] documentos, java.lang.String[] procedimentosRelacionados, java.lang.String[] unidadesEnvio, java.lang.String sinManterAbertoUnidade, java.lang.String sinEnviarEmailNotificacao, java.lang.String dataRetornoProgramado) throws java.rmi.RemoteException{
    if (seiPortType == null)
      _initSeiPortTypeProxy();
    return seiPortType.gerarProcedimento(siglaSistema, identificacaoServico, idUnidade, procedimento, documentos, procedimentosRelacionados, unidadesEnvio, sinManterAbertoUnidade, sinEnviarEmailNotificacao, dataRetornoProgramado);
  }
  
  public br.gov.mj.sislegis.app.ws.RetornoInclusaoDocumento incluirDocumento(java.lang.String siglaSistema, java.lang.String identificacaoServico, java.lang.String idUnidade, br.gov.mj.sislegis.app.ws.Documento documento) throws java.rmi.RemoteException{
    if (seiPortType == null)
      _initSeiPortTypeProxy();
    return seiPortType.incluirDocumento(siglaSistema, identificacaoServico, idUnidade, documento);
  }
  
  public br.gov.mj.sislegis.app.ws.Unidade[] listarUnidades(java.lang.String siglaSistema, java.lang.String identificacaoServico, java.lang.String idTipoProcedimento, java.lang.String idSerie) throws java.rmi.RemoteException{
    if (seiPortType == null)
      _initSeiPortTypeProxy();
    return seiPortType.listarUnidades(siglaSistema, identificacaoServico, idTipoProcedimento, idSerie);
  }
  
  public br.gov.mj.sislegis.app.ws.TipoProcedimento[] listarTiposProcedimento(java.lang.String siglaSistema, java.lang.String identificacaoServico, java.lang.String idUnidade, java.lang.String idSerie) throws java.rmi.RemoteException{
    if (seiPortType == null)
      _initSeiPortTypeProxy();
    return seiPortType.listarTiposProcedimento(siglaSistema, identificacaoServico, idUnidade, idSerie);
  }
  
  public br.gov.mj.sislegis.app.ws.Serie[] listarSeries(java.lang.String siglaSistema, java.lang.String identificacaoServico, java.lang.String idUnidade, java.lang.String idTipoProcedimento) throws java.rmi.RemoteException{
    if (seiPortType == null)
      _initSeiPortTypeProxy();
    return seiPortType.listarSeries(siglaSistema, identificacaoServico, idUnidade, idTipoProcedimento);
  }
  
  public br.gov.mj.sislegis.app.ws.RetornoConsultaProcedimento consultarProcedimento(java.lang.String siglaSistema, java.lang.String identificacaoServico, java.lang.String idUnidade, java.lang.String protocoloProcedimento, java.lang.String sinRetornarAssuntos, java.lang.String sinRetornarInteressados, java.lang.String sinRetornarObservacoes, java.lang.String sinRetornarAndamentoGeracao, java.lang.String sinRetornarAndamentoConclusao, java.lang.String sinRetornarUltimoAndamento, java.lang.String sinRetornarUnidadesProcedimentoAberto, java.lang.String sinRetornarProcedimentosRelacionados, java.lang.String sinRetornarProcedimentosAnexados) throws java.rmi.RemoteException{
    if (seiPortType == null)
      _initSeiPortTypeProxy();
    return seiPortType.consultarProcedimento(siglaSistema, identificacaoServico, idUnidade, protocoloProcedimento, sinRetornarAssuntos, sinRetornarInteressados, sinRetornarObservacoes, sinRetornarAndamentoGeracao, sinRetornarAndamentoConclusao, sinRetornarUltimoAndamento, sinRetornarUnidadesProcedimentoAberto, sinRetornarProcedimentosRelacionados, sinRetornarProcedimentosAnexados);
  }
  
  public br.gov.mj.sislegis.app.ws.RetornoConsultaDocumento consultarDocumento(java.lang.String siglaSistema, java.lang.String identificacaoServico, java.lang.String idUnidade, java.lang.String protocoloDocumento, java.lang.String sinRetornarAndamentoGeracao, java.lang.String sinRetornarAssinaturas, java.lang.String sinRetornarPublicacao) throws java.rmi.RemoteException{
    if (seiPortType == null)
      _initSeiPortTypeProxy();
    return seiPortType.consultarDocumento(siglaSistema, identificacaoServico, idUnidade, protocoloDocumento, sinRetornarAndamentoGeracao, sinRetornarAssinaturas, sinRetornarPublicacao);
  }
  
  public java.lang.String gerarBloco(java.lang.String siglaSistema, java.lang.String identificacaoServico, java.lang.String idUnidade, java.lang.String tipo, java.lang.String descricao, java.lang.String[] unidadesDisponibilizacao, java.lang.String[] documentos, java.lang.String sinDisponibilizar) throws java.rmi.RemoteException{
    if (seiPortType == null)
      _initSeiPortTypeProxy();
    return seiPortType.gerarBloco(siglaSistema, identificacaoServico, idUnidade, tipo, descricao, unidadesDisponibilizacao, documentos, sinDisponibilizar);
  }
  
  public java.lang.String excluirBloco(java.lang.String siglaSistema, java.lang.String identificacaoServico, java.lang.String idUnidade, java.lang.String idBloco) throws java.rmi.RemoteException{
    if (seiPortType == null)
      _initSeiPortTypeProxy();
    return seiPortType.excluirBloco(siglaSistema, identificacaoServico, idUnidade, idBloco);
  }
  
  public java.lang.String disponibilizarBloco(java.lang.String siglaSistema, java.lang.String identificacaoServico, java.lang.String idUnidade, java.lang.String idBloco) throws java.rmi.RemoteException{
    if (seiPortType == null)
      _initSeiPortTypeProxy();
    return seiPortType.disponibilizarBloco(siglaSistema, identificacaoServico, idUnidade, idBloco);
  }
  
  public java.lang.String cancelarDisponibilizacaoBloco(java.lang.String siglaSistema, java.lang.String identificacaoServico, java.lang.String idUnidade, java.lang.String idBloco) throws java.rmi.RemoteException{
    if (seiPortType == null)
      _initSeiPortTypeProxy();
    return seiPortType.cancelarDisponibilizacaoBloco(siglaSistema, identificacaoServico, idUnidade, idBloco);
  }
  
  public java.lang.String incluirDocumentoBloco(java.lang.String siglaSistema, java.lang.String identificacaoServico, java.lang.String idUnidade, java.lang.String idBloco, java.lang.String protocoloDocumento) throws java.rmi.RemoteException{
    if (seiPortType == null)
      _initSeiPortTypeProxy();
    return seiPortType.incluirDocumentoBloco(siglaSistema, identificacaoServico, idUnidade, idBloco, protocoloDocumento);
  }
  
  public java.lang.String retirarDocumentoBloco(java.lang.String siglaSistema, java.lang.String identificacaoServico, java.lang.String idUnidade, java.lang.String idBloco, java.lang.String protocoloDocumento) throws java.rmi.RemoteException{
    if (seiPortType == null)
      _initSeiPortTypeProxy();
    return seiPortType.retirarDocumentoBloco(siglaSistema, identificacaoServico, idUnidade, idBloco, protocoloDocumento);
  }
  
  public java.lang.String incluirProcessoBloco(java.lang.String siglaSistema, java.lang.String identificacaoServico, java.lang.String idUnidade, java.lang.String idBloco, java.lang.String protocoloProcedimento) throws java.rmi.RemoteException{
    if (seiPortType == null)
      _initSeiPortTypeProxy();
    return seiPortType.incluirProcessoBloco(siglaSistema, identificacaoServico, idUnidade, idBloco, protocoloProcedimento);
  }
  
  public java.lang.String retirarProcessoBloco(java.lang.String siglaSistema, java.lang.String identificacaoServico, java.lang.String idUnidade, java.lang.String idBloco, java.lang.String protocoloProcedimento) throws java.rmi.RemoteException{
    if (seiPortType == null)
      _initSeiPortTypeProxy();
    return seiPortType.retirarProcessoBloco(siglaSistema, identificacaoServico, idUnidade, idBloco, protocoloProcedimento);
  }
  
  public java.lang.String reabrirProcesso(java.lang.String siglaSistema, java.lang.String identificacaoServico, java.lang.String idUnidade, java.lang.String protocoloProcedimento) throws java.rmi.RemoteException{
    if (seiPortType == null)
      _initSeiPortTypeProxy();
    return seiPortType.reabrirProcesso(siglaSistema, identificacaoServico, idUnidade, protocoloProcedimento);
  }
  
  public java.lang.String concluirProcesso(java.lang.String siglaSistema, java.lang.String identificacaoServico, java.lang.String idUnidade, java.lang.String protocoloProcedimento) throws java.rmi.RemoteException{
    if (seiPortType == null)
      _initSeiPortTypeProxy();
    return seiPortType.concluirProcesso(siglaSistema, identificacaoServico, idUnidade, protocoloProcedimento);
  }
  
  public br.gov.mj.sislegis.app.ws.ArquivoExtensao[] listarExtensoesPermitidas(java.lang.String siglaSistema, java.lang.String identificacaoServico, java.lang.String idUnidade, java.lang.String idArquivoExtensao) throws java.rmi.RemoteException{
    if (seiPortType == null)
      _initSeiPortTypeProxy();
    return seiPortType.listarExtensoesPermitidas(siglaSistema, identificacaoServico, idUnidade, idArquivoExtensao);
  }
  
  public java.lang.String enviarProcesso(java.lang.String siglaSistema, java.lang.String identificacaoServico, java.lang.String idUnidade, java.lang.String protocoloProcedimento, java.lang.String[] unidadesDestino, java.lang.String sinManterAbertoUnidade, java.lang.String sinRemoverAnotacao, java.lang.String sinEnviarEmailNotificacao, java.lang.String dataRetornoProgramado) throws java.rmi.RemoteException{
    if (seiPortType == null)
      _initSeiPortTypeProxy();
    return seiPortType.enviarProcesso(siglaSistema, identificacaoServico, idUnidade, protocoloProcedimento, unidadesDestino, sinManterAbertoUnidade, sinRemoverAnotacao, sinEnviarEmailNotificacao, dataRetornoProgramado);
  }
  
  public br.gov.mj.sislegis.app.ws.Usuario[] listarUsuarios(java.lang.String siglaSistema, java.lang.String identificacaoServico, java.lang.String idUnidade, java.lang.String idUsuario) throws java.rmi.RemoteException{
    if (seiPortType == null)
      _initSeiPortTypeProxy();
    return seiPortType.listarUsuarios(siglaSistema, identificacaoServico, idUnidade, idUsuario);
  }
  
  public java.lang.String atribuirProcesso(java.lang.String siglaSistema, java.lang.String identificacaoServico, java.lang.String idUnidade, java.lang.String protocoloProcedimento, java.lang.String idUsuario, java.lang.String sinReabrir) throws java.rmi.RemoteException{
    if (seiPortType == null)
      _initSeiPortTypeProxy();
    return seiPortType.atribuirProcesso(siglaSistema, identificacaoServico, idUnidade, protocoloProcedimento, idUsuario, sinReabrir);
  }
  
  
}