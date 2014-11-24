package br.org.mj.sislegis.app.enumerated;

public enum ElaboracaoNormativaNorma {
    DECRETO_LEI(0), MEDIDA_PROVISORIA(1);
    
    private final int value;

    private ElaboracaoNormativaNorma(int value) {
        this.value = value;
    }
}