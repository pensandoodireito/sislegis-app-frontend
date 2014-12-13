package br.gov.mj.sislegis.app.service.ejbs;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;

import br.gov.mj.sislegis.app.model.Tarefa;
import br.gov.mj.sislegis.app.service.AbstractPersistence;
import br.gov.mj.sislegis.app.service.TarefaService;
import br.gov.mj.sislegis.app.util.PropertiesUtil;

@Stateless
public class TarefaServiceEjb extends AbstractPersistence<Tarefa, Long> implements TarefaService {
	
	@PersistenceContext
    private EntityManager em;
	
	public TarefaServiceEjb() {
		super(Tarefa.class);
	}
	
	@Override
	protected EntityManager getEntityManager() {
		return em;
	}
	
	@Override
	public Tarefa save(Tarefa entity, String referer){
		entity = super.save(entity);
		sendEmailNotification(entity, referer);
		return entity;
	}
	
	private void sendEmailNotification(Tarefa entity, String referer) {
		final HtmlEmail htmlEmail = new HtmlEmail();

		try {
			String emailFrom = PropertiesUtil.getProperties().getProperty("email");
			
			htmlEmail.setHostName(PropertiesUtil.getProperties().getProperty("host"));
			htmlEmail.setSmtpPort(Integer.parseInt(PropertiesUtil.getProperties().getProperty("port")));
			htmlEmail.setTLS(true);
			
			htmlEmail.setAuthenticator(new DefaultAuthenticator(
					emailFrom, 
					PropertiesUtil.getProperties().getProperty("password")));
			
			String linkTarefa = referer+"#/Tarefas";
			String linkTodasTarefas = linkTarefa+"/edit/"+entity.getId();
			
			String body = "<h2> A tarefa <i>"+entity.getEncaminhamentoProposicao().getEncaminhamento().getNome()
					+ "</i> foi atribuída a você</h2>"
					+ "</br></br>"
					+ "Prezado(a) "+entity.getUsuario().getNome()+","
					+ "</br></br>"
					+ "<p>Você foi definido como o(a) responsável pela tarefa <b>"+entity.getEncaminhamentoProposicao().getEncaminhamento().getNome() + "</b>.</p>"
					+ "<p>Acompanhe <a href='"+linkTarefa +"'>essa tarefa</a>, ou veja o quadro de <a href='"+ linkTodasTarefas +"'>todas as suas tarefas</a> no SISLEGIS.</p>"
					+ "</br></br>"
					+ "Atenciosamente,"
					+ "</br></br>"
					+ "</br></br>"
					+ "<p><b>SISLEGIS - acompanhamento legislativo</b></p>";


			htmlEmail.setFrom(emailFrom, PropertiesUtil.getProperties().getProperty("username"));

			htmlEmail.setSubject("[SISLEGIS] Nova tarefa atribuída a você");

			htmlEmail.addTo(entity.getUsuario().getEmail(), entity.getUsuario().getNome());

			htmlEmail.setHtmlMsg(body);

			htmlEmail.setCharset("UTF-8");
			htmlEmail.setSocketTimeout(Integer.parseInt(PropertiesUtil.getProperties().getProperty("emailTimeout")));
			htmlEmail.send();

		} catch (EmailException e) {
			e.printStackTrace();
		}
	}

	@Override
	public Tarefa buscarPorId(Long idTarefa) {
		TypedQuery<Tarefa> findByIdQuery = em.createQuery("SELECT t FROM Tarefa t WHERE t.id = :idTarefa", Tarefa.class);
		findByIdQuery.setParameter("idTarefa", idTarefa);
		List<Tarefa> resultList = findByIdQuery.getResultList();
		
		if (resultList.size() > 0) {
			for (Tarefa tarefa : resultList) {
				if (tarefa.getEncaminhamentoProposicao() != null) {
					tarefa.getEncaminhamentoProposicao().getProposicao();
				}
			}
			return resultList.get(0);
		}
		return null;
	}

	@Override
	public List<Tarefa> buscarPorUsuario(Long idUsuario) {
		TypedQuery<Tarefa> findByIdQuery = em.createQuery("SELECT t FROM Tarefa t WHERE t.usuario.id = :idUsuario", Tarefa.class);
		findByIdQuery.setParameter("idUsuario", idUsuario);
		List<Tarefa> resultList = findByIdQuery.getResultList();
		// Carrega para evitar lazy exception
		for (Tarefa tarefa : resultList) {
			if (tarefa.getEncaminhamentoProposicao() != null) {
				tarefa.getEncaminhamentoProposicao().getProposicao();
			}
		}
		return resultList;
	}
	
	@Override
	public Tarefa buscarPorEncaminhamentoProposicaoId(Long idEncaminhamentoProposicao) {
		TypedQuery<Tarefa> findByIdQuery = em.createQuery("SELECT t FROM Tarefa t WHERE t.encaminhamentoProposicao.id = :idEncaminhamentoProposicao", Tarefa.class);
		findByIdQuery.setParameter("idEncaminhamentoProposicao", idEncaminhamentoProposicao);
		List<Tarefa> resultList = findByIdQuery.getResultList();
		// Carrega para evitar lazy exception
		if (resultList.size() > 0) {
			return resultList.get(0);
		}
		return null;
	}
	
	

}
