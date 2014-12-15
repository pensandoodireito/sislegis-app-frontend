package br.gov.mj.sislegis.app.enumerated;

public enum ElaboracaoNormativaIdentificacao {
    EXPOSICAO_MOTIVOS("Exposição de Motivos"), EXPOSICAO_MOTIVOS_INTERMINISTERIAL("Exposição de Motivos Interministerial");
    
    private String value;

    private ElaboracaoNormativaIdentificacao(String value) {
        this.value = value;
    }
    
	public String getValue() {
		return value;
	}
    
	public static ElaboracaoNormativaIdentificacao get(String id) {
		ElaboracaoNormativaIdentificacao elaboracaoNormativaIdentificacao = null; // Default
		for (ElaboracaoNormativaIdentificacao en : ElaboracaoNormativaIdentificacao.values()) {
			if (en.name().equals(id)) {
				elaboracaoNormativaIdentificacao = en;
				break;
			}
		}
		return elaboracaoNormativaIdentificacao;
	}    
}