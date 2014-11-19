package br.org.mj.sislegis.app.enumerated;

public enum ElaboracaoNormativaTipo {
    ANTEPROJETO(0), PRELIMINAR(1);
    
    private final int value;

    private ElaboracaoNormativaTipo(int value) {
        this.value = value;
    }
}