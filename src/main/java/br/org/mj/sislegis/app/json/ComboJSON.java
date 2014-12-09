package br.org.mj.sislegis.app.json;

import java.io.Serializable;

public class ComboJSON<T> implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public ComboJSON(String shade, String name){
		this.shade=shade;
		this.name=name;
	}
	
	private String shade;
	
	private String name;

	public String getShade() {
		return shade;
	}

	public void setShade(String shade) {
		this.shade = shade;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
