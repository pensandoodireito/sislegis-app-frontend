package br.org.mj.sislegis.app.enumerated;

public enum ElaboracaoNormativaIdentificacao {
    EXPOSICAO_MOTIVOS(0), EXPOSICAO_MOTIVOS_INTERMINISTERIAL(1);
    
    private int value;

    private ElaboracaoNormativaIdentificacao(int value) {
        this.value = value;
    }
    
	public int getValue() {
		return value;
	}
    
	public static ElaboracaoNormativaIdentificacao get(int id) {
		ElaboracaoNormativaIdentificacao elaboracaoNormativaIdentificacao = null; // Default
		for (ElaboracaoNormativaIdentificacao en : ElaboracaoNormativaIdentificacao.values()) {
			if (en.getValue()==id) {
				elaboracaoNormativaIdentificacao = en;
				break;
			}
		}
		return elaboracaoNormativaIdentificacao;
	}    
}