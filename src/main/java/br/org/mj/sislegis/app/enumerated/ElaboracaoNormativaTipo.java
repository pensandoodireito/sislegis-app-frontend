package br.org.mj.sislegis.app.enumerated;

public enum ElaboracaoNormativaTipo {
    ANTEPROJETO(0), PRELIMINAR(1);
    
    private int value;
	public int getValue() {
		return value;
	}

    private ElaboracaoNormativaTipo(int value) {
        this.value = value;
    }
}