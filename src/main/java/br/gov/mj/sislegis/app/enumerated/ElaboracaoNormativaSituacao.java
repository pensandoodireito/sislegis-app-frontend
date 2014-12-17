package br.gov.mj.sislegis.app.enumerated;

public enum ElaboracaoNormativaSituacao {
	
    PENDENTE("Pendente"), 
    FINALIZADA("Finalizada");
    
    private String value;

    private ElaboracaoNormativaSituacao(String value) {
        this.value = value;
    }
    
	public String getValue() {
		return value;
	}
    
	public static ElaboracaoNormativaObjeto get(String id) {
		ElaboracaoNormativaObjeto elaboracaoNormativaIdentificacao = null; // Default
		for (ElaboracaoNormativaObjeto en : ElaboracaoNormativaObjeto.values()) {
			if (en.name().equals(id)) {
				elaboracaoNormativaIdentificacao = en;
				break;
			}
		}
		return elaboracaoNormativaIdentificacao;
	}    	

}
