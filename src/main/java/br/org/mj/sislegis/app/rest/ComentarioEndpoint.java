package br.org.mj.sislegis.app.rest;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.OptimisticLockException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriBuilder;
import br.org.mj.sislegis.app.model.Comentario;

/**
 * 
 */
@Stateless
@Path("/comentarios")
public class ComentarioEndpoint
{
   @PersistenceContext(unitName = "sislegis-app-persistence-unit")
   private EntityManager em;

   @POST
   @Consumes("application/json")
   public Response create(Comentario entity)
   {
      em.persist(entity);
      return Response.created(UriBuilder.fromResource(ComentarioEndpoint.class).path(String.valueOf(entity.getId())).build()).build();
   }

   @DELETE
   @Path("/{id:[0-9][0-9]*}")
   public Response deleteById(@PathParam("id") Long id)
   {
      Comentario entity = em.find(Comentario.class, id);
      if (entity == null)
      {
         return Response.status(Status.NOT_FOUND).build();
      }
      em.remove(entity);
      return Response.noContent().build();
   }

   @GET
   @Path("/{id:[0-9][0-9]*}")
   @Produces("application/json")
   public Response findById(@PathParam("id") Long id)
   {
      TypedQuery<Comentario> findByIdQuery = em.createQuery("SELECT DISTINCT c FROM Comentario c WHERE c.id = :entityId ORDER BY c.id", Comentario.class);
      findByIdQuery.setParameter("entityId", id);
      Comentario entity;
      try
      {
         entity = findByIdQuery.getSingleResult();
      }
      catch (NoResultException nre)
      {
         entity = null;
      }
      if (entity == null)
      {
         return Response.status(Status.NOT_FOUND).build();
      }
      return Response.ok(entity).build();
   }

   @GET
   @Path("/proposicao/{id:[0-9][0-9]*}")
   @Produces("application/json")
   public List<Comentario> findByProposicao(@PathParam("id") Long id)
   {
      TypedQuery<Comentario> findByIdQuery = em.createQuery("SELECT DISTINCT c FROM Comentario c "
      		+ "LEFT JOIN FETCH c.proposicao p WHERE p.id = :entityId ORDER BY c.id", Comentario.class);
      findByIdQuery.setParameter("entityId", id);
      final List<Comentario> results = findByIdQuery.getResultList();
      return results;
   }

   @GET
   @Produces("application/json")
   public List<Comentario> listAll(@QueryParam("start") Integer startPosition, @QueryParam("max") Integer maxResult)
   {
      TypedQuery<Comentario> findAllQuery = em.createQuery("SELECT DISTINCT c FROM Comentario c ORDER BY c.id", Comentario.class);
      if (startPosition != null)
      {
         findAllQuery.setFirstResult(startPosition);
      }
      if (maxResult != null)
      {
         findAllQuery.setMaxResults(maxResult);
      }
      final List<Comentario> results = findAllQuery.getResultList();
      return results;
   }

   @PUT
   @Path("/{id:[0-9][0-9]*}")
   @Consumes("application/json")
   public Response update(Comentario entity)
   {
      try
      {
         entity = em.merge(entity);
      }
      catch (OptimisticLockException e)
      {
         return Response.status(Response.Status.CONFLICT).entity(e.getEntity()).build();
      }

      return Response.noContent().build();
   }
}