package br.org.mj.sislegis.app.rest;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;

import org.apache.commons.io.IOUtils;
import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;

import br.org.mj.sislegis.app.util.PropertiesUtil;

@Path("/upload")
// Adaptado de: http://www.mkyong.com/webservices/jax-rs/file-upload-example-in-resteasy/
public class UploadEndpoint {

	private final String UPLOADED_FILE_PATH = PropertiesUtil.getProperties().getProperty("upload_path");
	 
	@POST
	@Consumes("multipart/form-data")
	public Response uploadFile(MultipartFormDataInput input) {

		String fileRelativePath = null;
 
		Map<String, List<InputPart>> uploadForm = input.getFormDataMap();
		List<InputPart> inputParts = uploadForm.get("file");
 
		for (InputPart inputPart : inputParts) {
 
		 try {
 
			MultivaluedMap<String, String> header = inputPart.getHeaders();
			String fileName = getFileName(header);
 
			//convert the uploaded file to inputstream
			InputStream inputStream = inputPart.getBody(InputStream.class,null);
 
			byte [] bytes = IOUtils.toByteArray(inputStream);
 
			//constructs upload file path
			Long currentTimeMillis = System.currentTimeMillis();
			
			fileRelativePath = writeFile(bytes, UPLOADED_FILE_PATH, currentTimeMillis.toString(), fileName);
 
		  } catch (IOException e) {
			e.printStackTrace();
		  }
 
		}
 
		return Response.status(200).entity(fileRelativePath).build();
 
	}
 
	/**
	 * header sample
	 * {
	 * 	Content-Type=[image/png], 
	 * 	Content-Disposition=[form-data; name="file"; filename="filename.extension"]
	 * }
	 **/
	//get uploaded filename, is there a easy way in RESTEasy?
	private String getFileName(MultivaluedMap<String, String> header) {
 
		String[] contentDisposition = header.getFirst("Content-Disposition").split(";");
 
		for (String filename : contentDisposition) {
			if ((filename.trim().startsWith("filename"))) {
 
				String[] name = filename.split("=");
 
				String finalFileName = name[1].trim().replaceAll("\"", "");
				return finalFileName;
			}
		}
		return "unknown";
	}
 
	//save to somewhere
	private String writeFile(byte[] content, String dirName, String prefix, String filename) throws IOException {
		File dir = new File(dirName+"/"+prefix);
		 
		if (!dir.exists()) {
			dir.mkdir();
		}
		
		File file = new File(dirName +"/" + prefix + "/"+ filename);
 
		if (!file.exists()) {
			file.createNewFile();
		}
 
		FileOutputStream fop = new FileOutputStream(file);
 
		fop.write(content);
		fop.flush();
		fop.close();
		
		// Retorna apenas o caminho relativo
		return prefix + "/"+ filename;
	}

}
