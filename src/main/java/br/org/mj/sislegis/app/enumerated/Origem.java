/**
 * 
 */
package br.org.mj.sislegis.app.enumerated;

/**
 * @author sislegis
 *
 */
public enum Origem {

	CAMARA("C"), SENADO("S");

	private String value;

	Origem(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}

	public static Origem parse(int id) {
		Origem origem = null; // Default
		for (Origem o : Origem.values()) {
			if (o.getValue().equals(id)) {
				origem = o;
				break;
			}
		}
		return origem;
	}
}
