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
import br.org.mj.sislegis.app.model.Reuniao;

/**
 * 
 */
@Stateless
@Path("/reuniaos")
public class ReuniaoEndpoint
{
   @PersistenceContext(unitName = "sislegis-app-persistence-unit")
   private EntityManager em;

   @POST
   @Consumes("application/json")
   public Response create(Reuniao entity)
   {
      em.persist(entity);
      return Response.created(UriBuilder.fromResource(ReuniaoEndpoint.class).path(String.valueOf(entity.getId())).build()).build();
   }

   @DELETE
   @Path("/{id:[0-9][0-9]*}")
   public Response deleteById(@PathParam("id") Long id)
   {
      Reuniao entity = em.find(Reuniao.class, id);
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
      TypedQuery<Reuniao> findByIdQuery = em.createQuery("SELECT DISTINCT r FROM Reuniao r LEFT JOIN FETCH r.listaProposicao WHERE r.id = :entityId ORDER BY r.id", Reuniao.class);
      findByIdQuery.setParameter("entityId", id);
      Reuniao entity;
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
   @Produces("application/json")
   public List<Reuniao> listAll(@QueryParam("start") Integer startPosition, @QueryParam("max") Integer maxResult)
   {
      TypedQuery<Reuniao> findAllQuery = em.createQuery("SELECT DISTINCT r FROM Reuniao r LEFT JOIN FETCH r.listaProposicao ORDER BY r.id", Reuniao.class);
      if (startPosition != null)
      {
         findAllQuery.setFirstResult(startPosition);
      }
      if (maxResult != null)
      {
         findAllQuery.setMaxResults(maxResult);
      }
      final List<Reuniao> results = findAllQuery.getResultList();
      return results;
   }

   @PUT
   @Path("/{id:[0-9][0-9]*}")
   @Consumes("application/json")
   public Response update(Reuniao entity)
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