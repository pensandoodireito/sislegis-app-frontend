package br.org.mj.sislegis.app.model;

import javax.ws.rs.FormParam;
import org.jboss.resteasy.annotations.providers.multipart.PartType;

//http://www.mkyong.com/webservices/jax-rs/file-upload-example-in-resteasy/
public class FileUploadForm {
 
	public FileUploadForm() {
	}
 
	private byte[] data;
 
	public byte[] getData() {
		return data;
	}
 
	@FormParam("uploadedFile")
	@PartType("application/octet-stream")
	public void setData(byte[] data) {
		this.data = data;
	}
 
}