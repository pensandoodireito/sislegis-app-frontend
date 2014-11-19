package br.org.mj.sislegis.app.enumerated;

public enum ElaboracaoNormativaIdentificacao {
    EXPOSICAO_MOTIVOS(0), EXPOSICAO_MOTIVOS_INTERMINISTERIAL(1);
    
    private final int value;

    private ElaboracaoNormativaIdentificacao(int value) {
        this.value = value;
    }
}